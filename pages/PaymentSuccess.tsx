
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, LayoutDashboard } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-[#f8fafc]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200 text-center border border-slate-50"
      >
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Payment Successful!</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
          Thank you for upgrading. Your account is being provisioned with your new credits and features. 
          Please allow a few moments for the systems to sync.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/calculators" 
            className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center justify-center space-x-2 bg-white text-slate-900 border-2 border-slate-100 px-8 py-5 rounded-2xl font-black text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
