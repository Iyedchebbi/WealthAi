
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Shield, BarChart3, Globe, CheckCircle2, 
  ArrowRight, Star, Quote, ChevronRight 
} from 'lucide-react';
import { PRICING_PLANS, TESTIMONIALS, MILESTONES, CALCULATOR_CATEGORIES } from '../constants.tsx';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handlePlanAction = (plan: any) => {
    if (plan.stripeLink) {
      window.location.href = plan.stripeLink;
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blob-bg animate-float" />
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blob-bg animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-blue-700">Next-Gen AI Advisor 2.5</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8">
                Your Personal <br />
                <span className="text-blue-600">Wealth Blueprint</span> <br />
                Built with AI
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Transform complex financial projections into clear, actionable roadmaps. No spreadsheets, no jargon—just pure financial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/calculators" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 hover:-translate-y-1 flex items-center justify-center">
                  Start Calculating <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a href="#plans" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
                  View Pricing
                </a>
              </div>
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-slate-400">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/seed/${i+40}/64/64`} className="w-10 h-10 rounded-full border-2 border-white" alt="user" />)}
                </div>
                <p className="text-sm font-semibold"><span className="text-slate-900">450k+</span> joined this month</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <img src="https://images.unsplash.com/photo-1611974714014-48fce8143478?auto=format&fit=crop&q=80&w=1200" alt="App UI" className="rounded-[2rem] shadow-sm" />
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xl">↑</div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Yield Potential</p>
                    <p className="text-xl font-extrabold text-slate-900">+18.4%</p>
                  </div>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50"
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Users</p>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">1.2M+</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {MILESTONES.map((m, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{m.value}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Financial Intelligence Suite</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">Everything you need to visualize, plan, and grow your net worth with institutional-grade accuracy.</p>
            </div>
            <Link to="/calculators" className="text-blue-600 font-bold flex items-center hover:translate-x-1 transition-transform mb-2">
              Explore All Tools <ChevronRight className="ml-1" />
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {CALCULATOR_CATEGORIES.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <Link to={`/calculators?type=${tool.id}`} className="group relative block p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-500 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] transition-all h-full">
                  <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">{tool.icon}</div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">{tool.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">{tool.desc}</p>
                  <div className="absolute bottom-8 left-8 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    Try Tool <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Voice of the Future</h2>
            <div className="flex justify-center items-center space-x-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col h-full"
              >
                <Quote className="w-12 h-12 text-blue-100 mb-8" />
                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-10 italic">"{t.content}"</p>
                <div className="mt-auto flex items-center">
                  <img src={t.avatar} className="w-14 h-14 rounded-2xl mr-4 shadow-lg border-2 border-white" alt={t.name} />
                  <div>
                    <p className="font-extrabold text-slate-900">{t.name}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-32 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Built for Success</h2>
            <p className="text-slate-400 text-xl font-medium">Simple plans for serious financial goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`relative p-10 rounded-[3rem] border transition-all flex flex-col ${
                  plan.highlighted 
                  ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20' 
                  : 'bg-slate-800/50 border-slate-700 backdrop-blur-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-blue-600 px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-10">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-slate-400 ml-2 font-bold">{plan.price !== '$0' && '/month'}</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-sm font-semibold">
                      <CheckCircle2 className={`w-5 h-5 mr-3 ${plan.highlighted ? 'text-white' : 'text-blue-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanAction(plan)}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all ${
                  plan.highlighted 
                  ? 'bg-white text-blue-600 hover:bg-slate-50' 
                  : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
