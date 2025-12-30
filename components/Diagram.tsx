import React from 'react';
import { DiagramNodeProps } from '../types';

export const DiagramNode: React.FC<DiagramNodeProps> = ({ title, subtitle, icon, variant }) => {
  const getStyles = () => {
    switch (variant) {
      case 'sagemaker': // Amarelo Amazon
        return 'bg-gradient-to-br from-[#FF9900] to-[#F38B00] text-white border-[#232F3E] border-[3px]';
      case 'external': // Mantenha (Blueish from previous)
        return 'bg-gradient-to-br from-[#5294CF] to-[#3F7CB0] text-white border-[#3F7CB0]';
      case 's3': // Azul Escuro
        return 'bg-gradient-to-br from-[#1e3a8a] to-[#172554] text-white border-transparent';
      case 'athena': // Verde (Tableau/Athena)
        return 'bg-gradient-to-br from-[#059669] to-[#047857] text-white border-transparent';
      case 'dms': // Preto (DMS/Glue)
        return 'bg-gradient-to-br from-[#334155] to-[#0f172a] text-white border-transparent';
      case 'aws': // Fallback/Generic AWS (Orange-ish)
        return 'bg-gradient-to-br from-[#FF9900] to-[#FF7700] text-white border-transparent';
      default:
        return 'bg-white text-slate-800 border-slate-200';
    }
  };

  return (
    <div 
      className={`
        relative flex flex-col items-center justify-center p-6 
        rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1
        min-w-[200px] text-center ${getStyles()}
      `}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-bold text-base mb-1 leading-tight">{title}</div>
      <div className="text-xs opacity-90 font-medium">{subtitle}</div>
    </div>
  );
};

export const Arrow: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center my-4 opacity-80">
    <div className="text-[#FF9900] text-3xl font-bold animate-pulse">↓</div>
    {label && <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">{label}</span>}
  </div>
);

export const Layer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
    {children}
  </div>
);

export const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-[#FF9900] shadow-sm hover:shadow-md transition-shadow">
    <div className="text-2xl mb-3 text-[#FF9900]">{icon}</div>
    <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
  </div>
);