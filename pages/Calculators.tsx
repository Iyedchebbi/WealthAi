
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Sparkles, TrendingUp, Wallet, ShieldAlert, 
  BarChart3, ArrowLeft, RefreshCw, ChevronRight, DollarSign, 
  Calendar, Percent, Lock, Zap, CreditCard
} from 'lucide-react';
import { CALCULATOR_CATEGORIES } from '../constants.tsx';
import { getFinancialInsight } from '../services/gemini.ts';
import { supabase } from '../lib/supabase.ts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface CalculationState {
  totalValue: number;
  invested: number;
  returns: number;
  chartData: { name: string; value: number }[];
}

const Calculators: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeType, setActiveType] = useState<string>(searchParams.get('type') || 'SIP');
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Credit System State from Supabase
  const [credits, setCredits] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeResults, setActiveResults] = useState<CalculationState | null>(null);

  // Form States
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [inflation, setInflation] = useState<number>(6);
  const [expense, setExpense] = useState<number>(30000);
  const [assets, setAssets] = useState<number>(1000000);
  const [liabilities, setLiabilities] = useState<number>(200000);

  const fetchCredits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single();
        if (data) setCredits(data.credits);
      }
    } catch (e) {
      console.error("Credit fetch error:", e);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchCredits();
  }, []);

  const deductCredit = async () => {
    if (!userId) return false;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ credits: credits - 1 })
        .eq('id', userId)
        .select('credits')
        .single();
      
      if (!error && data) {
        setCredits(data.credits);
        window.dispatchEvent(new CustomEvent('wealth_ai_credits_updated'));
        return true;
      }
    } catch (e) {
      console.error("Credit deduct error:", e);
    }
    return false;
  };

  const runCalculation = (): CalculationState => {
    let total = 0;
    let invested = 0;
    let returns = 0;
    let chartData = [];

    switch (activeType) {
      case 'SIP': {
        const i = (rate / 100) / 12;
        const n = years * 12;
        if (i === 0) {
           total = amount * n;
        } else {
           total = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        }
        invested = amount * n;
        returns = total - invested;
        chartData = [
            { name: 'Invested Capital', value: invested },
            { name: 'Total Growth', value: Math.max(0, returns) }
        ];
        break;
      }
      case 'FD':
      case 'MUTUAL_FUND':
      case 'COMPOUND_INTEREST': {
        total = amount * Math.pow(1 + (rate / 100), years);
        invested = amount;
        returns = total - invested;
        chartData = [
            { name: 'Principal', value: invested },
            { name: 'Wealth Created', value: Math.max(0, returns) }
        ];
        break;
      }
      case 'INFLATION': {
        total = amount * Math.pow(1 + (inflation / 100), years);
        invested = amount;
        returns = total - invested;
        chartData = [
            { name: 'Today Price', value: invested },
            { name: 'Future Price', value: total }
        ];
        break;
      }
      case 'EMERGENCY_FUND': {
        total = expense * years;
        invested = expense;
        returns = 0;
        chartData = [
            { name: 'Safety Buffer', value: total },
            { name: 'Monthly Burn', value: expense }
        ];
        break;
      }
      case 'NET_WORTH': {
        total = assets - liabilities;
        invested = assets;
        returns = liabilities;
        chartData = [
          { name: 'Total Assets', value: assets },
          { name: 'Total Debt', value: liabilities }
        ];
        break;
      }
      case 'RETIREMENT': {
        const infRate = inflation / 100;
        const futureMonthlyExpense = expense * Math.pow(1 + infRate, years);
        total = futureMonthlyExpense * 12 * 25;
        invested = expense * 12 * years;
        returns = total - invested;
        chartData = [
            { name: 'Projected Principal', value: invested },
            { name: 'Required Growth', value: Math.max(0, returns) }
        ];
        break;
      }
    }

    return { 
      totalValue: Math.round(total), 
      invested: Math.round(invested), 
      returns: Math.round(returns), 
      chartData 
    };
  };

  const handleCalculateNow = async () => {
    if (credits > 0) {
      setLoading(true);
      const results = runCalculation();
      
      const success = await deductCredit();
      if (!success) {
        setLoading(false);
        return;
      }
      
      setActiveResults(results);
      setShowResults(true);
      setAiInsight(null); 

      const insight = await getFinancialInsight(
        activeType, 
        { amount, rate, years, inflation, expense, assets, liabilities }, 
        results
      );
      setAiInsight(insight);
      setLoading(false);
    }
  };

  const changeType = (id: string) => {
    setActiveType(id);
    setSearchParams({ type: id });
    setAiInsight(null);
    setShowResults(false);
    setActiveResults(null);
  };

  const activeCategory = CALCULATOR_CATEGORIES.find(c => c.id === activeType);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-end mb-8">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3">
            <Zap className={`w-5 h-5 ${credits > 0 ? 'text-blue-600' : 'text-slate-400'}`} />
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Available Credits</span>
            <span className={`text-xl font-black ${credits > 0 ? 'text-slate-900' : 'text-rose-600'}`}>{credits}</span>
            <div className="h-4 w-[1px] bg-slate-100 mx-2" />
            <Link to="/profile" className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">Upgrade</Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-[280px] shrink-0">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sticky top-28 overflow-hidden">
              <div className="flex items-center space-x-3 mb-8 px-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Toolkit</h3>
              </div>
              <div className="space-y-1">
                {CALCULATOR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => changeType(cat.id)}
                    className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 text-left ${
                        activeType === cat.id 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="font-bold text-sm tracking-tight">{cat.title.replace(' Calculator', '')}</span>
                    </div>
                    {activeType === cat.id && <ChevronRight className="w-4 h-4 text-white/50" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <motion.div 
              key={activeType}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50 overflow-hidden relative"
            >
              <div className="px-12 py-12 border-b border-slate-50 bg-slate-50/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-4xl">{activeCategory?.icon}</span>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{activeCategory?.title}</h2>
                    </div>
                    <p className="text-slate-500 font-semibold text-lg max-w-lg">{activeCategory?.desc}</p>
                  </div>
                  <div className="flex items-center space-x-2 self-start bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] border border-emerald-100/50 shadow-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-time Analytics</span>
                  </div>
                </div>
              </div>

              {credits === 0 && (
                <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-12 text-center">
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md">
                    <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <Lock className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Account Depleted</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                      You have used all your free AI credits. Upgrade to Pro for unlimited calculations and real-time intelligence reports.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <Link to="/profile" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Upgrade Now</span>
                      </Link>
                      <Link to="/" className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Return to Home</Link>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-5 space-y-12">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeType}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-10"
                      >
                        {(activeType !== 'NET_WORTH' && activeType !== 'EMERGENCY_FUND' && activeType !== 'INFLATION') && (
                          <InputField label="Monthly Savings" value={amount} onChange={setAmount} min={0} max={10000000} step={100} icon={<DollarSign className="w-5 h-5" />} />
                        )}
                        {activeType === 'INFLATION' && (
                          <InputField label="Current Cost" value={amount} onChange={setAmount} min={0} max={50000000} step={1000} icon={<DollarSign className="w-5 h-5" />} />
                        )}
                        {(activeType !== 'NET_WORTH' && activeType !== 'EMERGENCY_FUND' && activeType !== 'INFLATION') && (
                          <InputField label="Expected Returns" value={rate} onChange={setRate} min={0} max={1000} step={0.5} icon={<Percent className="w-5 h-5" />} suffix="%" />
                        )}
                        {(activeType === 'RETIREMENT' || activeType === 'INFLATION') && (
                          <InputField label="Projected Inflation" value={inflation} onChange={setInflation} min={0} max={100} step={0.5} icon={<Percent className="w-5 h-5" />} suffix="%" />
                        )}
                        {(activeType === 'EMERGENCY_FUND' || activeType === 'RETIREMENT') && (
                          <InputField label={activeType === 'EMERGENCY_FUND' ? "Monthly Expenses" : "Future Monthly Income"} value={expense} onChange={setExpense} min={0} max={10000000} step={1000} icon={<DollarSign className="w-5 h-5" />} />
                        )}
                        {activeType === 'NET_WORTH' && (
                          <>
                            <InputField label="Total Financial Assets" value={assets} onChange={setAssets} min={0} max={10000000000} step={10000} icon={<DollarSign className="w-5 h-5" />} />
                            <InputField label="Total Liabilities" value={liabilities} onChange={setLiabilities} min={0} max={10000000000} step={10000} icon={<ShieldAlert className="w-5 h-5" />} />
                          </>
                        )}
                        {activeType !== 'NET_WORTH' && (
                          <InputField 
                              label={activeType === 'EMERGENCY_FUND' ? 'Safety Buffer' : 'Investment Period'} 
                              value={years} 
                              onChange={setYears} 
                              min={1} 
                              max={activeType === 'EMERGENCY_FUND' ? 600 : 100} 
                              icon={<Calendar className="w-5 h-5" />}
                              suffix={activeType === 'EMERGENCY_FUND' ? ' Months' : ' Years'} 
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {credits > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCalculateNow}
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center space-x-3 shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all disabled:opacity-50"
                      >
                        {loading ? <RefreshCw className="animate-spin w-6 h-6" /> : <Zap className={`w-6 h-6 ${showResults ? 'text-blue-200' : 'text-blue-400'}`} />}
                        <span>{loading ? 'Calculating...' : (showResults ? 'Recalculate (-1 Credit)' : 'Calculate Now')}</span>
                      </motion.button>
                    )}
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-10 min-w-0">
                    <div className="bg-slate-50/60 rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center overflow-hidden min-h-[600px] justify-center relative">
                      {!showResults || !activeResults ? (
                        <div className="text-center p-12">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <BarChart3 className="w-10 h-10 text-slate-300" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-4">Ready to analyze?</h3>
                          <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                            Adjust your inputs and click 'Calculate Now' to generate your wealth projection and AI insights.
                          </p>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                          <div className="w-full h-[320px] relative flex items-center justify-center">
                            <div className="absolute top-0 right-0 p-2 text-slate-200">
                              <BarChart3 className="w-20 h-20" />
                            </div>
                            {isMounted && (
                              <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                  <Pie
                                      data={activeResults.chartData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={85}
                                      outerRadius={115}
                                      paddingAngle={10}
                                      dataKey="value"
                                      stroke="none"
                                  >
                                      {activeResults.chartData.map((_, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                  </Pie>
                                  <RechartsTooltip 
                                      contentStyle={{ 
                                        borderRadius: '24px', 
                                        border: 'none', 
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                        padding: '16px 24px'
                                      }}
                                      itemStyle={{ fontWeight: 800, fontSize: '14px' }}
                                      formatter={(value: number) => formatCurrency(value)} 
                                  />
                                  </PieChart>
                              </ResponsiveContainer>
                            )}
                            <div className="absolute flex flex-col items-center justify-center max-w-[160px] text-center">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Projected Total</p>
                              <p className={`font-black text-slate-900 leading-tight tabular-nums ${
                                activeResults.totalValue.toString().length > 12 ? 'text-lg' : 
                                activeResults.totalValue.toString().length > 9 ? 'text-2xl' : 'text-3xl'
                              }`}>
                                {formatCurrency(activeResults.totalValue)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-4 w-full mt-10">
                            <ResultCard label={activeType === 'NET_WORTH' ? 'Net Position' : 'EST. MATURITY'} value={activeResults.totalValue} icon={<Wallet className="w-6 h-6" />} theme="emerald" />
                            {activeType !== 'EMERGENCY_FUND' && (
                              <ResultCard label={activeType === 'NET_WORTH' ? 'Total Liabilities' : 'WEALTH GAIN'} value={activeResults.returns} icon={activeType === 'NET_WORTH' ? <ShieldAlert className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />} theme={activeType === 'NET_WORTH' ? 'rose' : 'blue'} />
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {showResults && (
                <div className="px-12 py-16 bg-blue-600 relative overflow-hidden border-t border-blue-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800" />
                  <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-[-20deg] translate-x-[20%]" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    {loading ? (
                      <div className="flex-grow flex flex-col items-center justify-center py-8">
                         <RefreshCw className="animate-spin w-12 h-12 text-white mb-4" />
                         <p className="text-white font-bold text-lg">AI is generating your wealth strategy...</p>
                      </div>
                    ) : aiInsight ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                              <Sparkles className="text-white w-6 h-6" />
                            </div>
                            <h4 className="text-3xl font-black text-white">Strategic Roadmap</h4>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-inner">
                          <div className="prose prose-invert max-w-none text-blue-50 leading-relaxed font-medium">
                            <div className="whitespace-pre-wrap">{aiInsight}</div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Sparkles className="text-white w-6 h-6" />
                          </div>
                          <h4 className="text-3xl font-black text-white tracking-tight">AI Strategy Insight</h4>
                        </div>
                        <p className="text-blue-100 text-lg font-medium max-w-2xl leading-relaxed">
                          Your latest calculation is ready. The AI has analyzed the data and is ready to explain your trajectory.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Input Component
const InputField = ({ label, value, onChange, min, max, step = 1, icon, suffix = "" }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="group space-y-4">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
        <div className={`flex items-center bg-white border-2 transition-all duration-300 rounded-2xl px-4 py-2.5 shadow-sm min-w-[160px] ${isFocused ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100'}`}>
          <div className={`mr-2 transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-slate-300'}`}>
            {icon}
          </div>
          <input 
            type="number" 
            value={value} 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              const val = e.target.value === '' ? 0 : Number(e.target.value);
              onChange(val);
            }}
            className="bg-transparent text-slate-900 font-black text-right w-full text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none tabular-nums"
          />
          {suffix && <span className="text-slate-400 font-black ml-1.5 text-sm">{suffix}</span>}
        </div>
      </div>
      <div className="relative h-2 px-1">
        <div className="absolute inset-x-1 inset-y-0 bg-slate-100 rounded-full" />
        <motion.div 
          className="absolute inset-y-0 left-1 bg-blue-600 rounded-full origin-left h-full"
          initial={false}
          animate={{ width: `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%` }}
        />
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
      </div>
    </div>
  );
};

const ResultCard = ({ label, value, icon, theme }: any) => {
    const themeStyles: any = {
        emerald: { bg: 'bg-emerald-50/50', border: 'border-emerald-100/30', text: 'text-emerald-700', iconBg: 'bg-emerald-100 text-emerald-600' },
        rose: { bg: 'bg-rose-50/50', border: 'border-rose-100/30', text: 'text-rose-700', iconBg: 'bg-rose-100 text-rose-600' },
        blue: { bg: 'bg-blue-50/50', border: 'border-blue-100/30', text: 'text-blue-700', iconBg: 'bg-blue-100 text-blue-600' }
    };
    const style = themeStyles[theme];
    return (
        <div className={`p-6 md:p-8 rounded-[2.5rem] border ${style.bg} ${style.border} shadow-sm transition-all hover:scale-[1.01] duration-300 flex flex-row items-center space-x-6 min-w-0 w-full`}>
            <div className={`shrink-0 flex items-center justify-center w-16 h-16 rounded-3xl shadow-sm ${style.iconBg}`}>{icon}</div>
            <div className="flex-grow min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5 truncate">{label}</p>
                <p className={`font-black tracking-tighter ${style.text} text-4xl tabular-nums leading-none whitespace-nowrap overflow-hidden text-ellipsis`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}
                </p>
            </div>
        </div>
    );
};

export default Calculators;
