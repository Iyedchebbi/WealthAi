
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CreditCard, Scale, HelpCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-50"
        >
          <div className="flex items-center space-x-4 mb-10">
            <div className="p-3 bg-slate-900 rounded-2xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Usage Terms</h1>
          </div>

          <div className="prose prose-slate max-w-none space-y-12">
            <section className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
              <h2 className="text-xl font-bold text-amber-900 flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Disclaimer: No Financial Advice
              </h2>
              <p className="text-amber-800 leading-relaxed font-medium text-sm">
                The information, calculations, and AI-generated insights provided by WealthAI are for educational and illustrative purposes only. WealthAI is not a registered investment advisor or broker-dealer. Always consult with a qualified professional before making significant financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Subscription & Credits
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                WealthAI operates on a tiered subscription model. "Credits" are consumed whenever an AI-generated insight is requested. Free tier users receive a limited amount of credits upon registration. Subscriptions are billed monthly via Stripe and can be cancelled at any time through your profile.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-100 rounded-[2rem]">
                <Scale className="w-6 h-6 text-slate-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Acceptable Use</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Users are prohibited from attempting to scrape, reverse-engineer, or exploit any part of the WealthAI platform. Automated usage of the AI tools without explicit permission is strictly forbidden.
                </p>
              </div>
              <div className="p-8 border border-slate-100 rounded-[2rem]">
                <HelpCircle className="w-6 h-6 text-slate-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">Termination</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  We reserve the right to suspend or terminate accounts that violate our usage policies or engage in fraudulent activities without prior notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed font-medium italic">
                WealthAI shall not be liable for any financial losses or damages resulting from the use or inability to use our platform tools. Your use of the service is at your own risk.
              </p>
            </section>

            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Version 2.0 • Last Revised: May 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
