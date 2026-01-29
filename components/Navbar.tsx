
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Zap, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase.ts';

interface NavbarProps {
  session: any;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [credits, setCredits] = useState<number>(0);
  
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!session?.user?.id) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', session.user.id)
        .single();
      
      if (data && !error) {
        setCredits(data.credits);
      }
    } catch (e) {
      console.error("Error fetching credits:", e);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    fetchProfile();

    const handleCreditUpdate = () => fetchProfile();
    window.addEventListener('wealth_ai_credits_updated', handleCreditUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wealth_ai_credits_updated', handleCreditUpdate);
    };
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              WealthAI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {session && (
              <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Zap className={`w-4 h-4 ${credits > 0 ? 'text-blue-600' : 'text-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Credits:</span>
                <span className={`text-sm font-black ${credits > 0 ? 'text-slate-900' : 'text-rose-600'}`}>{credits}</span>
              </div>
            )}

            <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm">Home</Link>
            <Link to="/calculators" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm">Calculators</Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button onClick={handleLogout} className="group flex items-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-rose-600 transition-all shadow-xl shadow-slate-200">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="group flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {session && (
              <div className="flex items-center space-x-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <Zap className={`w-3 h-3 ${credits > 0 ? 'text-blue-600' : 'text-rose-500'}`} />
                <span className="text-xs font-black text-slate-900">{credits}</span>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center text-center">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 font-bold py-2">Home</Link>
              <Link to="/calculators" onClick={() => setIsOpen(false)} className="text-slate-600 font-bold py-2">Calculators</Link>
              {session ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-600 font-bold py-2">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-center bg-rose-600 text-white py-4 rounded-2xl font-bold">Logout</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="w-full text-center bg-blue-600 text-white py-4 rounded-2xl font-bold">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
