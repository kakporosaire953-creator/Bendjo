import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer, Flame, BellRing, Sparkles } from 'lucide-react';

interface BrewTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrewTimerModal: React.FC<BrewTimerModalProps> = ({ isOpen, onClose }) => {
  const presets = [
    { name: 'Infusion Hibiscus', durationSec: 360, temp: '95°C', color: '#D64545' },
    { name: 'Infusion Basilic', durationSec: 300, temp: '90°C', color: '#E895A3' },
    { name: 'Citronnelle & Girofle', durationSec: 420, temp: '95°C', color: '#E08A2E' },
  ];

  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [secondsLeft, setSecondsLeft] = useState(presets[0].durationSec);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  if (!isOpen) return null;

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p);
    setSecondsLeft(p.durationSec);
    setIsActive(false);
    setIsFinished(false);
  };

  const handleTogglePlay = () => {
    if (isFinished) {
      setSecondsLeft(selectedPreset.durationSec);
      setIsFinished(false);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsFinished(false);
    setSecondsLeft(selectedPreset.durationSec);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = Math.round(
    ((selectedPreset.durationSec - secondsLeft) / selectedPreset.durationSec) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C89B6B]/30 z-10 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-gray-600 hover:text-black flex items-center justify-center shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-xs font-bold uppercase tracking-wider">
            <Timer className="w-3.5 h-3.5" />
            <span>Rituel d'Infusion Béninois</span>
          </div>
          <h3 className="text-xl font-extrabold font-heading text-[#1F2421]">
            Mon Infusion Parfaite
          </h3>
          <p className="text-xs text-gray-600">
            Sélectionnez votre tisane BenDjo et laissez frémir les saveurs du terroir.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p) => {
            const isSelected = selectedPreset.name === p.name;
            return (
              <button
                key={p.name}
                onClick={() => handleSelectPreset(p)}
                className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-white border-[#4B7F52] shadow-sm ring-2 ring-[#4B7F52]/20'
                    : 'bg-white/60 border-gray-200 text-gray-700 hover:bg-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: p.color }} />
                <div className="truncate text-[#1F2421]">{p.name}</div>
                <div className="text-[10px] text-gray-400 font-normal">{p.temp}</div>
              </button>
            );
          })}
        </div>

        {/* Timer Display */}
        <div className="relative py-8 flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-full border-8 border-white bg-gradient-to-b from-white to-[#F5EFE6] shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
            {/* Liquid Fill Animation */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-1000 opacity-20"
              style={{
                height: `${progressPercent}%`,
                backgroundColor: selectedPreset.color,
              }}
            />

            <div className="relative z-10 text-center">
              <span className="text-4xl font-extrabold font-heading tracking-tight text-[#1F2421]">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="block text-[11px] font-semibold text-[#C89B6B] mt-1">
                Eau à {selectedPreset.temp}
              </span>
            </div>
          </div>

          {isFinished && (
            <div className="mt-4 p-3 rounded-2xl bg-[#25D366]/10 text-[#25D366] text-xs font-bold flex items-center gap-2 animate-bounce">
              <BellRing className="w-4 h-4" />
              <span>Votre infusion est prête à être dégustée !</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:text-black transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`px-8 py-3.5 rounded-2xl font-bold text-xs text-white shadow-md flex items-center gap-2 transition-all ${
              isActive
                ? 'bg-[#E08A2E] hover:bg-[#c97822]'
                : 'bg-[#2D5A36] hover:bg-[#1f3f26]'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isFinished ? 'Recommencer' : 'Démarrer'}</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center space-y-1 pt-3 border-t border-[#C89B6B]/20">
          <p className="font-brittany text-2xl text-[#D96123] font-normal leading-none">
            Bonne dégustation avec BenDjo
          </p>
          <p className="text-[10px] text-stone-500">
            💡 Conseil : Laissez infuser à couvert pour conserver toutes les huiles essentielles.
          </p>
        </div>
      </div>
    </div>
  );
};
