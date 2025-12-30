import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { IngestionSlide, ProcessingSlide, TrainingSlide, InferenceSlide, DictionarySlide, FlowSlide } from './components/Slides';
import { SlideId } from './types';

const SLIDE_COUNT = 6;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Fullscreen toggle logic
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen change events (e.g. user presses ESC)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const nextSlide = () => {
    if (currentSlide < SLIDE_COUNT - 1) setCurrentSlide(c => c + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case SlideId.INGESTION:
        return <IngestionSlide isActive={true} />;
      case SlideId.PROCESSING:
        return <ProcessingSlide isActive={true} />;
      case SlideId.TRAINING:
        return <TrainingSlide isActive={true} />;
      case SlideId.INFERENCE:
        return <InferenceSlide isActive={true} />;
      case SlideId.DICTIONARY:
        return <DictionarySlide isActive={true} />;
      case SlideId.FLOW:
        return <FlowSlide isActive={true} />;
      default:
        return <IngestionSlide isActive={true} />;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <header className="bg-[#232F3E]/95 backdrop-blur-sm px-4 sm:px-6 py-4 flex justify-between items-center shadow-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div className="flex flex-col sm:flex-row sm:items-center">
             <span className="font-bold text-xl tracking-tight text-[#FF9900]">Pipeline ML</span>
             <span className="text-xs sm:text-base text-slate-400 font-light sm:border-l border-slate-600 sm:pl-3 sm:ml-1">AWS SageMaker</span>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2 sm:gap-3">
          {Array.from({ length: SLIDE_COUNT }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300
                ${currentSlide === idx ? 'bg-[#FF9900] scale-125' : 'bg-white/30 hover:bg-white/50'}
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={toggleFullscreen}
          className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#CC7A00] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-semibold shadow-lg"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          <span className="hidden sm:inline">{isFullscreen ? 'Sair' : 'Tela Cheia'}</span>
        </button>
      </header>

      {/* Main Slide Area */}
      <main className="flex-1 relative p-2 sm:p-4 md:p-8 flex items-center justify-center overflow-hidden min-h-0">
        <div className="w-full max-w-[1200px] h-full flex flex-col relative">
          
          {/* Slide Content Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 text-slate-800 flex-1 relative overflow-hidden flex flex-col p-4 sm:p-8 md:p-12 animate-fadeIn transition-all">
             {renderSlide()}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-[#232F3E]/95 backdrop-blur-sm px-4 sm:px-6 py-4 flex justify-between items-center z-10 shrink-0">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`
            flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base
            ${currentSlide === 0 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-[#FF9900] text-white hover:bg-[#CC7A00] shadow-lg hover:shadow-[#FF9900]/20'}
          `}
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <span className="font-mono text-sm sm:text-lg text-slate-300 bg-slate-800/50 px-4 py-1 rounded-full border border-slate-700">
          <span className="text-[#FF9900] font-bold">{currentSlide + 1}</span>
          <span className="mx-2 opacity-50">/</span>
          {SLIDE_COUNT}
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlide === SLIDE_COUNT - 1}
          className={`
            flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base
            ${currentSlide === SLIDE_COUNT - 1 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-[#FF9900] text-white hover:bg-[#CC7A00] shadow-lg hover:shadow-[#FF9900]/20'}
          `}
        >
          <span className="hidden sm:inline">Próximo</span>
          <ChevronRight size={18} />
        </button>
      </footer>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        /* Custom scrollbar for slide content */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;