import React from 'react';
import { ExternalLink, Award, Users, Share2 } from 'lucide-react';

export const InnerBuildMentions: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] border border-[#C89B6B]/20 rounded-3xl p-6 md:p-8 shadow-sm my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C89B6B]/20 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#4B7F52]/10 flex items-center justify-center text-[#4B7F52]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#4B7F52]">
              The InnerBuild — Saison 02
            </span>
            <h3 className="text-xl font-bold font-heading text-[#1F2421]">
              Sprint de Création & Communication Digitale
            </h3>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C89B6B]/15 text-[#3D271D] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#4B7F52] animate-pulse"></span>
          Projet Officiel BenDjo 2025
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        Ce site web d'exception est conçu dans le cadre du challenge national <strong>The InnerBuild</strong> (Saison 02), visant à propulser la visibilité digitale de la marque béninoise <strong>BenDjo</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BenDjo Company */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#C89B6B]/15 hover:border-[#4B7F52] transition-colors">
          <div className="text-xs text-[#4B7F52] font-bold uppercase tracking-wider mb-1">
            Entreprise Officielle
          </div>
          <div className="font-bold text-[#1F2421] text-base mb-2">BenDjo Bénin</div>
          <div className="flex flex-col gap-1 text-xs">
            <a
              href="https://linkedin.com/company/bendjo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#4B7F52] hover:underline"
            >
              <span>LinkedIn BenDjo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://facebook.com/BenDjoBenin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#4B7F52] hover:underline"
            >
              <span>Facebook BenDjo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Co-fondatrice Bénédite Lovi */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#C89B6B]/15 hover:border-[#D64545] transition-colors">
          <div className="text-xs text-[#D64545] font-bold uppercase tracking-wider mb-1">
            Co-fondatrice
          </div>
          <div className="font-bold text-[#1F2421] text-base mb-2">Bénédite Lovi</div>
          <div className="flex flex-col gap-1 text-xs">
            <a
              href="https://linkedin.com/in/b%C3%A9n%C3%A9dite-lovi-5bb16b22a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#D64545] hover:underline"
            >
              <span>LinkedIn Bénédite Lovi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://facebook.com/profile.php?id=100071926549471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#D64545] hover:underline"
            >
              <span>Facebook Bénédite Lovi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Fondateur The InnerBuild Elton Hounnou */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#C89B6B]/15 hover:border-[#E08A2E] transition-colors">
          <div className="text-xs text-[#E08A2E] font-bold uppercase tracking-wider mb-1">
            Fondateur The InnerBuild
          </div>
          <div className="font-bold text-[#1F2421] text-base mb-2">Elton Hounnou</div>
          <div className="flex flex-col gap-1 text-xs">
            <a
              href="https://linkedin.com/in/elton27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E08A2E] hover:underline"
            >
              <span>LinkedIn Elton Hounnou</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://facebook.com/eltonhounnou"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E08A2E] hover:underline"
            >
              <span>Facebook Elton Hounnou</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Challenge The InnerBuild */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#C89B6B]/15 hover:border-[#C89B6B] transition-colors">
          <div className="text-xs text-[#C89B6B] font-bold uppercase tracking-wider mb-1">
            Page Officielle
          </div>
          <div className="font-bold text-[#1F2421] text-base mb-2">The InnerBuild</div>
          <div className="flex flex-col gap-1 text-xs">
            <a
              href="https://linkedin.com/company/the-innerbuild"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#C89B6B] hover:underline"
            >
              <span>LinkedIn The InnerBuild</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://facebook.com/theinnerbuild1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#C89B6B] hover:underline"
            >
              <span>Facebook The InnerBuild</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
