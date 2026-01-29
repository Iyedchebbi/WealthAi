
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, ArrowUpRight, Mail, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2 mb-6 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <Zap className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">WealthAI</span>
            </Link>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
              Institutional-grade financial intelligence for the modern investor. Precision planning powered by Gemini.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Calculators</h4>
            <ul className="space-y-4">
              <FooterLink to="/calculators?type=SIP">SIP Growth</FooterLink>
              <FooterLink to="/calculators?type=RETIREMENT">Retirement Planner</FooterLink>
              <FooterLink to="/calculators?type=MUTUAL_FUND">Mutual Funds</FooterLink>
              <FooterLink to="/calculators?type=NET_WORTH">Net Worth Tracker</FooterLink>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4">
              <FooterLink to="/#plans">Pricing Plans</FooterLink>
              <FooterLink to="/#testimonials">User Stories</FooterLink>
              <FooterLink to="/profile">My Account</FooterLink>
              <FooterLink to="/auth">Sign Up Free</FooterLink>
            </ul>
          </div>

          {/* Support Column - Updated with requested contact info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Support & Legal</h4>
            <ul className="space-y-4">
              <FooterLink to="/privacy">Privacy Center</FooterLink>
              <FooterLink to="/terms">Usage Terms</FooterLink>
              
              <li className="pt-2 border-t border-slate-50">
                <a 
                  href="mailto:iyedchebbi18@gmail.com" 
                  className="group flex items-center text-slate-500 hover:text-blue-600 font-semibold text-sm transition-all"
                >
                  <Mail className="w-4 h-4 mr-2 text-slate-300 group-hover:text-blue-500" />
                  Email Support
                  <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              </li>
              
              <li>
                <a 
                  href="https://wa.me/21693443378" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center text-slate-500 hover:text-emerald-600 font-semibold text-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-slate-300 group-hover:text-emerald-500" />
                  WhatsApp Admin
                  <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} WealthAI. All assets protected by secure protocols.
          </p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              System Status: Operational
            </span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-300 font-medium max-w-3xl mx-auto uppercase tracking-tighter">
            Disclaimer: The information provided by WealthAI is for educational purposes only and does not constitute financial advice. Investments involve market risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors block"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
