
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase.ts';
import { User, Mail, Zap, Shield, CreditCard, ChevronRight, History, Calendar } from 'lucide-react';
import { PRICING_PLANS } from '../constants.tsx';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('start_date', { ascending: false });
        
        if (profileData) setProfile(profileData);
        if (subData) setSubscriptions(subData);
      }
    } catch (e) {
      console.error("Profile fetch error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpgrade = (link?: string) => {
    if (link) window.location.href = link;
  };

  if (loading) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-50"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16 border-b border-slate-50 pb-12">
            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center shadow-inner">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Overview</h1>
              <p className="text-slate-500 font-medium text-lg mt-1">Manage your planning tier and usage.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
              <div className="flex items-center space-x-3 text-slate-400 mb-4">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Email Address</span>
              </div>
              <p className="text-xl font-black text-slate-900">{profile?.email}</p>
            </div>

            <div className="space-y-4 p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50">
              <div className="flex items-center space-x-3 text-blue-400 mb-4">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Available Credits</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <p className="text-4xl font-black text-blue-600">{profile?.credits}</p>
                <span className="text-blue-400 font-bold">AI Explorations</span>
              </div>
            </div>

            <div className="space-y-4 p-8 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100/50 md:col-span-2">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 text-emerald-600 mb-4">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Active Plan</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                    {profile?.plan || 'Free Tier'}
                  </p>
                </div>
                {profile?.plan === 'free' && (
                  <div className="flex gap-3">
                    {PRICING_PLANS.filter(p => p.stripeLink).map(plan => (
                      <button 
                        key={plan.name}
                        onClick={() => handleUpgrade(plan.stripeLink)}
                        className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center space-x-2 transition-all ${
                          plan.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Upgrade to {plan.name}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subscription History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-50"
        >
          <div className="flex items-center space-x-4 mb-10">
            <div className="p-3 bg-slate-50 rounded-xl">
              <History className="w-6 h-6 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Transaction & Plan History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Plan</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Start Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {subscriptions.length > 0 ? subscriptions.map((sub) => (
                  <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 pr-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${sub.plan_type === 'elite' ? 'bg-blue-600' : 'bg-emerald-500'}`} />
                        <span className="font-bold text-slate-900 uppercase text-sm">{sub.plan_type}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        sub.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center space-x-2 text-slate-500 font-medium text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(sub.start_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-400 font-medium italic">
                      No payment history found. Start your journey with one of our paid plans.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
