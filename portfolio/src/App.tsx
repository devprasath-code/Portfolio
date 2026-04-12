/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { Navigation } from './components/Navigation';

import { Overlay } from './components/Overlay';
import { AICursor } from './components/AICursor';
import { AIAssistant } from './components/AIAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    let requestId: number;

    function raf(time: number) {
      lenis.raf(time);
      requestId = requestAnimationFrame(raf);
    }

    requestId = requestAnimationFrame(raf);

    // Simulate loading or wait for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(requestId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black min-h-screen selection:bg-white selection:text-black">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 border-2 border-[#4DA6FF] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#4DA6FF]">
                Initializing Intelligence
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Scene />
      <Overlay />
      <Navigation />
      <AICursor />
      <AIAssistant />
    </main>
  );
}

