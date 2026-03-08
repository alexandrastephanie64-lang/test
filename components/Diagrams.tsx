
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, BarChart2 } from 'lucide-react';

// --- SURFACE CODE DIAGRAM ---
export const SurfaceCodeDiagram: React.FC = () => {
  const [errors, setErrors] = useState<number[]>([]);
  
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], 
  };

  const toggleError = (id: number) => {
    setErrors(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const activeStabilizers = [0, 1, 2, 3].filter(stabId => {
    let errorCount = 0;
    Object.entries(adjacency).forEach(([dataId, stabs]) => {
        if (errors.includes(parseInt(dataId)) && stabs.includes(stabId)) {
            errorCount++;
        }
    });
    return errorCount % 2 !== 0;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-geek-zinc/50 rounded-none border border-geek-border my-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <h3 className="font-mono text-xl mb-4 text-geek-cyan uppercase tracking-tighter terminal-glow">02.1 // SYNDROME_DETECTION</h3>
      <p className="text-[10px] text-stone-500 mb-6 text-center max-w-md uppercase tracking-widest">
        Inject errors into [DATA_QUBITS]. Monitor [STABILIZERS] for parity violations.
      </p>
      
      <div className="relative w-64 h-64 bg-geek-black rounded-none border border-geek-border p-4 flex flex-wrap justify-between content-between relative overflow-hidden">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-2/3 h-2/3 border border-geek-cyan"></div>
            <div className="absolute w-full h-[1px] bg-geek-cyan"></div>
            <div className="absolute h-full w-[1px] bg-geek-cyan"></div>
         </div>

         {/* Stabilizers (Z=Cyan, X=Green) */}
         {[
             {id: 0, x: '50%', y: '20%', type: 'Z', color: 'bg-geek-cyan'},
             {id: 1, x: '20%', y: '50%', type: 'X', color: 'bg-geek-green'},
             {id: 2, x: '80%', y: '50%', type: 'X', color: 'bg-geek-green'},
             {id: 3, x: '50%', y: '80%', type: 'Z', color: 'bg-geek-cyan'},
         ].map(stab => (
             <motion.div
                key={`stab-${stab.id}`}
                className={`absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-black text-xs font-bold rounded-none shadow-sm transition-all duration-300 ${activeStabilizers.includes(stab.id) ? stab.color + ' opacity-100 scale-110 shadow-[0_0_15px_rgba(0,242,255,0.6)]' : 'bg-geek-zinc border border-geek-border text-stone-600 opacity-40'}`}
                style={{ left: stab.x, top: stab.y }}
             >
                 {stab.type}
             </motion.div>
         ))}

         {/* Data Qubits */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, 
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`data-${q.id}`}
                onClick={() => toggleError(q.id)}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-none border flex items-center justify-center transition-all duration-200 z-10 ${errors.includes(q.id) ? 'bg-geek-cyan border-geek-cyan text-black shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-geek-black border-geek-border text-stone-600 hover:border-geek-cyan hover:text-geek-cyan'}`}
                style={{ left: q.x, top: q.y }}
             >
                {errors.includes(q.id) ? <Activity size={14} /> : <div className="w-1 h-1 bg-current opacity-30"></div>}
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-[8px] font-mono text-stone-500 uppercase tracking-widest">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-geek-cyan"></div> Error</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-geek-cyan opacity-40"></div> Z-Check</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-geek-green opacity-40"></div> X-Check</div>
      </div>
      
      <div className="mt-4 h-6 text-[10px] font-mono text-geek-cyan uppercase tracking-widest terminal-glow">
        {errors.length === 0 ? "> SYSTEM_STABLE" : `> PARITY_VIOLATIONS_DETECTED: ${activeStabilizers.length}`}
      </div>
    </div>
  );
};

// --- TRANSFORMER DECODER DIAGRAM ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-geek-zinc/50 rounded-none border border-geek-border my-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <h3 className="font-mono text-xl mb-4 text-geek-green uppercase tracking-tighter terminal-glow">02.2 // NEURAL_ENGINE</h3>
      <p className="text-[10px] text-stone-500 mb-6 text-center max-w-md uppercase tracking-widest">
        Processing syndrome history via Recurrent Transformer architecture.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-geek-black rounded-none overflow-hidden mb-6 border border-geek-border flex items-center justify-center gap-8 p-4">
        
        {/* Input Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-none border flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-geek-cyan bg-geek-cyan/10' : 'border-geek-border bg-geek-zinc/20'}`}>
                <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => <div key={i} className={`w-2 h-2 ${Math.random() > 0.7 ? 'bg-geek-cyan shadow-[0_0_5px_rgba(0,242,255,0.5)]' : 'bg-stone-800'}`}></div>)}
                </div>
            </div>
            <span className="text-[8px] uppercase font-bold tracking-widest text-stone-500">Syndrome</span>
        </div>

        {/* Arrows */}
        <motion.div className="text-geek-border" animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>{" >>> "}</motion.div>

        {/* Transformer Stage */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-24 h-24 rounded-none border flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-geek-cyan bg-geek-cyan/5 text-white' : 'border-geek-border bg-geek-zinc/20'}`}>
                <Cpu size={24} className={step === 1 || step === 2 ? 'text-geek-cyan animate-pulse terminal-glow' : 'text-stone-800'} />
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-geek-cyan absolute top-1/3 animate-ping opacity-30"></div>
                        <div className="w-full h-[1px] bg-geek-cyan absolute top-2/3 animate-ping delay-75 opacity-30"></div>
                    </div>
                )}
             </div>
             <span className="text-[8px] uppercase font-bold tracking-widest text-stone-500">Transformer</span>
        </div>

        {/* Arrows */}
        <motion.div className="text-geek-border" animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>{" >>> "}</motion.div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-none border flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-geek-green bg-geek-green/10' : 'border-geek-border bg-geek-zinc/20'}`}>
                {step === 3 ? (
                    <span className="text-2xl font-mono text-geek-green terminal-glow">X</span>
                ) : (
                    <span className="text-2xl font-mono text-stone-800">?</span>
                )}
            </div>
            <span className="text-[8px] uppercase font-bold tracking-widest text-stone-500">Correction</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 transition-all duration-300 ${step === s ? 'w-8 bg-geek-cyan' : 'w-2 bg-geek-border'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [distance, setDistance] = useState<3 | 5 | 11>(5);
    
    const data = {
        3: { mwpm: 3.5, alpha: 2.9 },
        5: { mwpm: 3.6, alpha: 2.75 },
        11: { mwpm: 0.0041, alpha: 0.0009 } 
    };

    const currentData = data[distance];
    const maxVal = Math.max(currentData.mwpm, currentData.alpha) * 1.25;
    
    const formatValue = (val: number) => {
        if (val < 0.01) return val.toFixed(4) + '%';
        return val.toFixed(2) + '%';
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-geek-black rounded-none my-8 border border-geek-border shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-mono text-xl mb-2 text-geek-cyan uppercase tracking-tighter terminal-glow">02.3 // PERFORMANCE_METRICS</h3>
                <p className="text-stone-500 text-[10px] mb-4 leading-relaxed uppercase tracking-widest">
                    AlphaQubit vs MWPM [INDUSTRY_STANDARD]. Lower Logical Error Rate (LER) indicates higher reliability.
                </p>
                <div className="flex gap-2 mt-6">
                    {[3, 5, 11].map((d) => (
                        <button 
                            key={d}
                            onClick={() => setDistance(d as any)} 
                            className={`px-3 py-1.5 rounded-none text-[10px] font-bold transition-all duration-200 border ${distance === d ? 'bg-geek-cyan text-black border-geek-cyan shadow-[0_0_10px_rgba(0,242,255,0.4)]' : 'bg-transparent text-stone-600 border-geek-border hover:border-geek-cyan hover:text-geek-cyan'}`}
                        >
                            DISTANCE_{d}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-[8px] text-stone-700 flex items-center gap-2 tracking-[0.2em]">
                    <BarChart2 size={14} className="text-geek-cyan" /> 
                    <span>LOGICAL_ERROR_RATE_ANALYSIS</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-geek-zinc/10 rounded-none border border-geek-border p-6 flex justify-around items-end overflow-hidden">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-5">
                   <div className="w-full h-[1px] bg-geek-cyan"></div>
                   <div className="w-full h-[1px] bg-geek-cyan"></div>
                   <div className="w-full h-[1px] bg-geek-cyan"></div>
                   <div className="w-full h-[1px] bg-geek-cyan"></div>
                </div>

                {/* MWPM Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-[8px] font-mono text-stone-600 font-bold bg-geek-black py-1 px-2 border border-geek-border">{formatValue(currentData.mwpm)}</div>
                        <motion.div 
                            className="w-full bg-geek-zinc border border-geek-border"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.mwpm / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-[8px] font-bold text-stone-600 uppercase tracking-widest">MWPM</div>
                </div>

                {/* AlphaQubit Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-[8px] font-mono text-geek-cyan font-bold bg-geek-black py-1 px-2 border border-geek-cyan shadow-[0_0_10px_rgba(0,242,255,0.2)]">{formatValue(currentData.alpha)}</div>
                        <motion.div 
                            className="w-full bg-geek-cyan/20 border border-geek-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(1, (currentData.alpha / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-t from-geek-cyan/40 to-transparent"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-[8px] font-bold text-geek-cyan uppercase tracking-widest terminal-glow">ALPHA</div>
                </div>
            </div>
        </div>
    )
}
