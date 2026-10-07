import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculum';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  X,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import aibaRobot from '../assets/aiba-robot.svg';
import {
  playChimeSound,
  playEncouragingSound,
  playFanfareSound,
  playSoftClick,
} from '../utils/audio';

interface QuizRunnerProps {
  moduleId: number;
  onFinish?: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ moduleId, onFinish }) => {
  const { saveQuizScore, openModule, setActiveTab } = useApp();
  const mod = MODULES_DATA[moduleId];
  const questions = mod.quizQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answersState, setAnswersState] = useState<{ [qIndex: number]: { selected: number; isCorrect: boolean } }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answersState[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return; // cannot change after submitting this question
    playSoftClick();
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      playChimeSound();
    } else {
      playEncouragingSound();
    }
    setIsAnswerChecked(true);
    setAnswersState(prev => ({
      ...prev,
      [currentIndex]: {
        selected: selectedOption,
        isCorrect,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answersState[i]?.isCorrect) {
          correctCount++;
        }
      }
      // include the current question if just answered
      const calculateScore = (correct: number, total: number) => {
        if (correct === total) return 100;
        if (correct === 2 && total === 3) return 70;
        if (correct === 1 && total === 3) return 35;
        return Math.round((correct / total) * 100);
      };

      const finalScore = calculateScore(correctCount, questions.length);
      saveQuizScore(moduleId, finalScore, correctCount, questions.length);
      setIsCompleted(true);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setAnswersState({});
    setIsCompleted(false);
  };

  // If completed, render the required Result Screen
  if (isCompleted) {
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answersState[i]?.isCorrect) correctCount++;
    }
    const wrongCount = questions.length - correctCount;
    const calculateScore = (correct: number, total: number) => {
      if (correct === total) return 100;
      if (correct === 2 && total === 3) return 70;
      if (correct === 1 && total === 3) return 35;
      return Math.round((correct / total) * 100);
    };
    const score = calculateScore(correctCount, questions.length);
    const isPassed = score >= 70;

    return (
      <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-10 shadow-lg text-center max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-4xl shadow-md">
          {isPassed ? '🏆' : '💪'}
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
            Hasil Kuis — Modul {mod.id}: {mod.title}
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-heading">
            {isPassed ? 'Luar Biasa, Kamu Hebat!' : 'Semangat Belajar!'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isPassed
              ? 'Selamat! Kamu telah menguasai konsep penting pada modul ini dengan gemilang!'
              : 'Bagus sekali usahamu! Coba ulangi kuis untuk mempertajam pemahamanmu.'}
          </p>
        </div>

        {/* Score & Breakdown Cards */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Skor Akhir</span>
            <span className={`text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {score}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Benar</span>
            <span className="text-2xl font-black text-emerald-600">
              {correctCount}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Salah</span>
            <span className="text-2xl font-black text-rose-500">
              {wrongCount}
            </span>
          </div>
        </div>

        {/* Feedback message */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
          {score === 100
            ? '🌟 Sempurna 100%! Logika dan pemahamanmu benar-benar tajam seperti coder pro!'
            : score >= 70
            ? '🎉 Hebat! Kamu sudah lulus kuis modul ini dan siap melanjutkan ke materi berikutnya.'
            : '💡 Jangan berkecil hati, coder sejati selalu belajar dari kesalahan. Yuk klik Ulangi Kuis!'}
        </div>

        {/* Buttons: Ulangi & Lanjut */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleRetryQuiz}
            className="flex-1 py-3 px-5 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis</span>
          </button>

          <button
            onClick={() => {
              if (onFinish) {
                onFinish();
              } else {
                openModule(moduleId);
              }
            }}
            className="flex-1 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer transition-all"
          >
            <span>Lanjut Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View: One question per screen
  return (
    <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Quiz Top Header & Progress (Per Requirement #11) */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            🎯
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
              🎯 SIAP MENJAWAB?
            </div>
            <span className="text-xs font-bold text-slate-700">
              Soal {currentIndex + 1} dari {questions.length} · Modul {mod.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-indigo-600 w-8'
                    : i < currentIndex
                    ? answersState[i]?.isCorrect
                      ? 'bg-emerald-500 w-3'
                      : 'bg-amber-400 w-3'
                    : 'bg-slate-200 w-3'
                }`}
              />
            ))}
          </div>

          {onFinish && (
            <button
              type="button"
              onClick={onFinish}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Keluar dari Kuis"
              aria-label="Tutup Kuis"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading leading-snug">
          {currentQuestion.question}
        </h3>
        {currentQuestion.hint && !isAnswerChecked && (
          <p className="text-xs text-slate-500 mt-2 italic flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span>💡 Petunjuk:</span>
            <span>{currentQuestion.hint}</span>
          </p>
        )}
      </div>

      {/* Options List (Big touch-friendly cards) */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === currentQuestion.correctIndex;

          let optionStyle = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800 hover:bg-slate-50/50';

          if (isAnswerChecked) {
            if (isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-amber-400 bg-amber-50 text-amber-950 ring-2 ring-amber-400/20';
            } else {
              optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            optionStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs';
          }

          return (
            <button
              key={index}
              disabled={isAnswerChecked}
              onClick={() => handleSelectOption(index)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold cursor-pointer disabled:cursor-default ${optionStyle}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
                    isSelected
                      ? 'bg-indigo-600 text-white scale-105'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="leading-snug">{option}</span>
              </div>

              {isAnswerChecked && isCorrect && (
                <div className="flex items-center gap-1 text-emerald-600 font-bold shrink-0 animate-in zoom-in-75 duration-150">
                  <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                </div>
              )}
              {isAnswerChecked && isSelected && !isCorrect && (
                <div className="flex items-center gap-1 text-amber-600 font-bold shrink-0 animate-in zoom-in-75 duration-150">
                  <XCircle className="w-5 h-5 fill-amber-100" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Banner (Per Requirement #10 & #11: Growth mindset, never harsh) */}
      {isAnswerChecked && (
        <div
          className={`p-5 rounded-3xl border-2 animate-in fade-in duration-150 space-y-2.5 ${
            currentAnswer?.isCorrect
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
              : 'bg-amber-50/80 border-amber-300 text-amber-950 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-sm sm:text-base">
            {currentAnswer?.isCorrect ? (
              <>
                <span className="text-xl">🎉</span>
                <span className="text-emerald-800">Mantap! Jawabanmu Tepat Sekali!</span>
              </>
            ) : (
              <>
                <span className="text-xl">💡</span>
                <span className="text-amber-900">Belum tepat. Yuk coba pahami penjelasannya!</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {currentQuestion.explanation}
          </p>
          {currentQuestion.kidTip && (
            <div className="text-xs font-semibold text-amber-900 bg-white/80 p-3 rounded-2xl border border-amber-200 flex items-start gap-2">
              <span className="shrink-0 text-base">🤖</span>
              <div>
                <strong className="block text-[11px] uppercase tracking-wider text-amber-800">Tips dari Kiko:</strong>
                <span>{currentQuestion.kidTip}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end pt-2">
        {!isAnswerChecked ? (
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheckAnswer}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              selectedOption !== null
                ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Kunci Jawaban & Periksa
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer transition-all"
          >
            <span>{currentIndex < questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Kuis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
