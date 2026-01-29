
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, UserCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-50"
        >
          <div className="flex items-center space-x-4 mb-10">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Center</h1>
          </div>

          <div className="prose prose-slate max-w-none space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-blue-500" />
                Data Security First
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                At WealthAI, your financial privacy is our highest priority. We employ institutional-grade encryption for all data at rest and in transit. Your investment inputs are never shared with third parties for marketing purposes.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <Eye className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Information We Collect</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We collect your email address for account management and your calculator inputs to provide accurate financial projections. This data is stored securely on Supabase servers.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <Server className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">AI Processing</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Financial insights are generated using Google's Gemini API. Your data is sent as a prompt to the AI model but is not used by Google to train future models, ensuring your specific figures remain private.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                <UserCheck className="w-5 h-5 text-blue-500" />
                Your Rights
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                You have the right to access, rectify, or delete your personal data at any time through your Profile dashboard. For any specific data requests or privacy concerns, please contact our support team at <span className="text-blue-600 font-bold underline">iyedchebbi18@gmail.com</span>.
              </p>
            </section>

            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Last Updated: May 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
