import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Car, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'owner'>('customer');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  
  // Cursor tracking for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, role);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-gold/30">
      {/* Interactive Cursor Glow */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-30 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(212, 175, 55, 0.15), transparent 80%)`,
        }}
      />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ rotate: 3, scale: 0.9 }}
            animate={{ rotate: 3, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.3)] mb-6 transition-all duration-500 group"
          >
            <Car className="w-10 h-10 text-navy group-hover:scale-110 transition-transform" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-black text-white mb-2 tracking-tighter"
          >
            UK<span className="text-gold">Travels</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-gold/30" />
            <p className="text-white/40 font-bold tracking-[0.2em] uppercase text-[10px]">Premium Mobility</p>
            <div className="h-[1px] w-8 bg-gold/30" />
          </div>
        </div>

        {/* Login Card */}
        <div className="relative group">
          {/* Card Border Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-blue-500/50 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </motion.h2>
              </AnimatePresence>
              <p className="text-slate-400 text-sm font-medium">
                {isLogin ? 'Sign in to access your premium dashboard' : 'Join the elite club of travelers in Udupi'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-2xl text-center font-medium">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-gold transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold focus:bg-white/10 outline-none transition-all font-medium text-white placeholder:text-slate-600"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-gold transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold focus:bg-white/10 outline-none transition-all font-medium text-white placeholder:text-slate-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Membership Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all font-bold text-xs ${
                        role === 'customer'
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/5 text-slate-500 hover:border-white/10'
                      }`}
                    >
                      <UserIcon className="w-4 h-4" />
                      CUSTOMER
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('owner')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all font-bold text-xs ${
                        role === 'owner'
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/5 text-slate-500 hover:border-white/10'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      OWNER
                    </button>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-gold-dark text-navy py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group/btn"
              >
                {isLogin ? 'SIGN IN' : 'GET STARTED'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm font-medium">
                {isLogin ? "New to UK Travels?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gold font-bold hover:text-white transition-colors ml-1"
                >
                  {isLogin ? 'Register Now' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            End-to-end Encrypted
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Premium Security
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}