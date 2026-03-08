
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { AIAssistant } from './components/AIAssistant';
import { ArrowDown, Menu, X, BookOpen } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-geek-zinc/80 rounded-none border border-geek-border shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-geek-cyan transition-all duration-300 w-full max-w-xs" style={{ animationDelay: delay }}>
      <h3 className="font-mono text-xl text-geek-cyan text-center mb-3 terminal-glow">{name}</h3>
      <div className="w-full h-[1px] bg-geek-border mb-4"></div>
      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-[0.3em] text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-geek-black text-stone-300 font-mono selection:bg-geek-cyan selection:text-black">
      <div className="scanline"></div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-geek-black/90 backdrop-blur-md border-geek-border py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 border border-geek-cyan flex items-center justify-center text-geek-cyan font-mono font-bold text-xl shadow-[0_0_10px_rgba(0,242,255,0.3)]">AQ</div>
            <span className={`font-mono font-bold text-lg tracking-tighter transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              ALPHA_QUBIT <span className="font-normal text-stone-600">v1.0.24</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] text-stone-500">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">01_INTRO</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">02_SYSTEM</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">03_IMPACT</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">04_TEAM</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-1.5 border border-geek-cyan text-geek-cyan hover:bg-geek-cyan hover:text-black transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)] cursor-pointer"
            >
              READ_PAPER
            </a>
          </div>

          <button className="md:hidden text-geek-cyan p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-geek-black flex flex-col items-center justify-center gap-8 text-xl font-mono animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">01_INTRO</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">02_SYSTEM</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">03_IMPACT</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-geek-cyan transition-colors cursor-pointer uppercase">04_TEAM</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 border border-geek-cyan text-geek-cyan shadow-lg cursor-pointer"
            >
              READ_PAPER
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden border-b border-geek-border">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.8)_0%,rgba(5,5,5,0.4)_50%,rgba(5,5,5,0.9)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-geek-cyan text-geek-cyan text-[10px] tracking-[0.3em] uppercase font-bold bg-geek-cyan/5 backdrop-blur-sm">
            STATUS: OPERATIONAL // NATURE_2024
          </div>
          <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 text-white terminal-glow uppercase tracking-tighter">
            AlphaQubit <br/><span className="text-geek-cyan text-2xl md:text-4xl block mt-4 font-normal opacity-80 tracking-widest">[ NEURAL_DECODER_INIT ]</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-stone-400 font-mono leading-relaxed mb-12 uppercase tracking-wide">
            Recurrent Transformer architecture optimized for real-time quantum error correction and surface code decoding.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-[10px] font-bold text-stone-500 hover:text-geek-cyan transition-colors cursor-pointer tracking-[0.4em]">
                <span>SCROLL_TO_DESCEND</span>
                <span className="p-3 border border-geek-border rounded-none group-hover:border-geek-cyan transition-colors bg-geek-zinc/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-geek-black border-b border-geek-border">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] text-geek-cyan uppercase">01 // CONTEXT</div>
              <h2 className="font-mono text-3xl mb-6 leading-tight text-white uppercase tracking-tighter">The Noise Barrier</h2>
              <div className="w-16 h-[2px] bg-geek-cyan mb-6 shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>
            </div>
            <div className="md:col-span-8 text-sm md:text-base text-stone-400 leading-relaxed space-y-6 font-mono">
              <p>
                <span className="text-4xl float-left mr-3 mt-[-4px] font-mono text-geek-cyan">[B]</span>uilding a large-scale quantum computer requires correcting the errors that inevitably arise in physical systems. The state of the art is the <strong>surface code</strong>, which encodes information redundantly across many physical qubits.
              </p>
              <p>
                Interpreting noisy signals from these codes—a task called "decoding"—is a massive computational challenge. Complex noise effects like cross-talk and leakage confuse standard algorithms. <strong className="text-geek-cyan font-bold">AlphaQubit</strong> leverages deep learning to map these complex error patterns directly from the quantum processor.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Surface Code */}
        <section id="science" className="py-24 bg-geek-zinc/30 border-b border-geek-border">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-geek-zinc text-geek-cyan text-[10px] font-bold tracking-[0.3em] uppercase border border-geek-border mb-6">
                            <BookOpen size={14}/> SYSTEM_ARCHITECTURE
                        </div>
                        <h2 className="font-mono text-3xl md:text-4xl mb-6 text-white uppercase tracking-tighter">Surface Code Topology</h2>
                        <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                           In a surface code, "Data Qubits" hold the quantum information, while "Stabilizer Qubits" act as watchdogs. They measure parity checks (X and Z type) to detect errors without destroying the quantum state.
                        </p>
                        <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                            When a data qubit flips, adjacent stabilizers trigger. The pattern of these triggers is the "syndrome." The decoder's job is to analyze the syndrome and predict the most likely error path.
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Transformer Decoder */}
        <section className="py-24 bg-geek-black overflow-hidden relative border-b border-geek-border">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[grid-white/5] [mask-image:radial-gradient(white,transparent)]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-geek-zinc text-geek-green text-[10px] font-bold tracking-[0.3em] uppercase border border-geek-border mb-6">
                            CORE_INNOVATION
                        </div>
                        <h2 className="font-mono text-3xl md:text-4xl mb-6 text-white uppercase tracking-tighter">Neural Decoding Engine</h2>
                        <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                            Standard decoders assume simple, independent errors. Real hardware is messier. AlphaQubit treats decoding as a sequence prediction problem, using a <strong>Recurrent Transformer</strong> architecture.
                        </p>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            It ingests the history of stabilizer measurements and uses "soft" analog information—probabilities rather than just binary 0s and 1s—to make highly informed predictions about logical errors.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Results */}
        <section className="py-24 bg-geek-zinc/20 border-b border-geek-border">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-mono text-3xl md:text-4xl mb-6 text-white uppercase tracking-tighter">Benchmark Analysis</h2>
                    <p className="text-sm text-stone-400 leading-relaxed max-w-2xl mx-auto">
                        Tested on Google's Sycamore processor, AlphaQubit consistently outperforms "Minimum-Weight Perfect Matching" (MWPM), the industry standard, effectively reducing the logical error rate.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-geek-black border-b border-geek-border">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-geek-zinc/50 border border-geek-border overflow-hidden relative shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-[8px] text-stone-600 font-mono uppercase tracking-widest">SYCAMORE_PROCESSOR_SIM_v2.0</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] text-geek-cyan uppercase">03 // IMPACT</div>
                    <h2 className="font-mono text-3xl mb-6 text-white uppercase tracking-tighter">Fault-Tolerant Future</h2>
                    <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                        AlphaQubit maintains its advantage even as the code distance increases (up to distance 11). It handles realistic noise including cross-talk and leakage, effects that often cripple standard decoders.
                    </p>
                    <p className="text-sm text-stone-400 mb-8 leading-relaxed">
                        By learning from data directly, machine learning decoders can adapt to the unique quirks of each quantum processor, potentially reducing the hardware requirements for useful quantum computing.
                    </p>
                    
                    <div className="p-6 bg-geek-zinc/50 border border-geek-border border-l-2 border-l-geek-cyan">
                        <p className="font-mono text-sm text-stone-300 mb-4 leading-relaxed">
                            "Our work illustrates the ability of machine learning to go beyond human-designed algorithms by learning from data directly, highlighting machine learning as a strong contender for decoding in quantum computers."
                        </p>
                        <span className="text-[10px] font-bold text-geek-cyan tracking-widest uppercase">— Bausch et al., Nature (2024)</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-geek-zinc/10 border-b border-geek-border">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">RESEARCH_TEAM</div>
                    <h2 className="font-mono text-3xl md:text-4xl mb-4 text-white uppercase tracking-tighter">Key Contributors</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto text-xs font-mono">A collaboration between Google DeepMind and Google Quantum AI.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                    <AuthorCard name="Johannes Bausch" role="Google DeepMind" delay="0s" />
                    <AuthorCard name="Andrew W. Senior" role="Google DeepMind" delay="0.1s" />
                    <AuthorCard name="Francisco J. H. Heras" role="Google DeepMind" delay="0.2s" />
                    <AuthorCard name="Thomas Edlich" role="Google DeepMind" delay="0.3s" />
                    <AuthorCard name="Alex Davies" role="Google DeepMind" delay="0.4s" />
                    <AuthorCard name="Michael Newman" role="Google Quantum AI" delay="0.5s" />
                </div>
                <div className="text-center mt-12">
                    <p className="text-stone-600 text-[10px] uppercase tracking-widest">Hardware // Theory // Engineering // AI</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-geek-black text-stone-600 py-16 border-t border-geek-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-mono font-bold text-xl mb-2 tracking-tighter uppercase">ALPHA_QUBIT</div>
                <p className="text-[10px] uppercase tracking-widest">Learning high-accuracy error decoding for quantum processors</p>
            </div>
        </div>
        <div className="text-center mt-12 text-[8px] text-stone-700 uppercase tracking-[0.5em]">
            Nature (2024) // DeepMind // Quantum AI // AI_GENERATED_INTERFACE
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default App;
