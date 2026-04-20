/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, ChevronRight } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const doPasswordsMatch = useMemo(() => {
    return password !== '' && password === confirmPassword;
  }, [password, confirmPassword]);

  const isFormValid = isEmailValid && doPasswordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="h-screen flex flex-col font-sans selection:bg-diner-yellow overflow-hidden bg-[#FEF9F5]">
      {/* Top Navigation */}
      <header className="h-8 md:h-10 checkered-pattern border-b-2 border-diner-red shrink-0 z-50 shadow-sm" />

      <main className="flex-1 flex flex-col items-center justify-between p-4 md:p-6 paper-texture overflow-hidden relative">
        <div className="w-full max-w-[360px] flex flex-col items-center flex-1 justify-center gap-4 md:gap-6">
          
          {/* Logo Section */}
          <div className="text-center shrink-0">
            <motion.h1 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-5xl md:text-6xl text-diner-yellow drop-shadow-[3px_3px_0px_#C72822] uppercase tracking-tighter leading-none"
            >
              trust<br/>the chef
            </motion.h1>
          </div>

          {/* Registration Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white shadow-[0_8px_0px_rgba(0,0,0,0.05)] border border-slate-200 rounded-sm zig-zag-bottom shrink-0 overflow-visible"
          >
            <div className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="space-y-3 md:space-y-4"
                  >
                    {/* Email Field */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-tight text-diner-red flex items-center gap-1 font-mono">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="NAME@DOMAIN.COM"
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 text-sm focus:border-diner-red outline-none transition-colors uppercase font-mono text-slate-600"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-tight text-diner-red flex items-center gap-1 font-mono">
                        Create Password
                      </label>
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 text-sm focus:border-diner-red outline-none transition-colors font-mono text-slate-600"
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-tight text-diner-red flex items-center gap-1 font-mono">
                        Confirm Password
                      </label>
                      <input
                        required
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-slate-50 border p-2.5 text-sm focus:ring-0 transition-colors outline-none font-mono text-slate-600 ${
                          confirmPassword && !doPasswordsMatch ? 'border-red-500' : 'border-slate-200 focus:border-diner-red'
                        }`}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        disabled={!isFormValid || isLoading}
                        className={`w-full py-3.5 font-display text-lg uppercase transition-all transform active:translate-y-[2px] disabled:opacity-50 ${
                          isFormValid && !isLoading
                            ? 'bg-diner-red text-white shadow-[0_4px_0px_#8b1b17] active:shadow-[0_2px_0px_#8b1b17]'
                            : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto text-white" />
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            Register
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-3"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-1">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl text-slate-900 uppercase leading-tight">Registration successful!</h3>
                    <p className="text-slate-600 text-xs px-2">
                      Ticket sent to <span className="font-bold text-diner-red">{email}</span>.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-2 text-xs font-bold uppercase text-slate-400 hover:text-diner-red transition-colors border-b border-transparent hover:border-diner-red"
                    >
                      Return
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Instruction Text */}
          <div className="w-full text-center py-2 shrink-0">
            <p className="text-diner-red font-bold text-xs uppercase tracking-tight leading-tight">
              Already registered?<br/>Show your confirmation at the counter.
            </p>
          </div>
        </div>

        {/* Minimal info for diner feel - Version hidden or very small */}
        <div className="pb-1">
            <p className="font-mono text-[8px] text-slate-400 opacity-50 uppercase">
                CT01-TRUST-CHEF-v2.1
            </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="h-8 md:h-10 checkered-pattern border-t-2 border-diner-red shrink-0 z-50 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]" />
    </div>
  );
}
