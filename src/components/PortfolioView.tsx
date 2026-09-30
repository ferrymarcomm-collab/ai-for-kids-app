import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JILID_LIST, MODULES_DATA } from '../data/curriculum';
import { JilidId } from '../types';
import {
  FolderHeart,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Send,
  X,
  FileText,
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { progress, addPortfolioItem, simulateTeacherValidation } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilterJilid, setActiveFilterJilid] = useState<number | 'all'>('all');
  const [title, setTitle] = useState('');
  const [jilidId, setJilidId] = useState<JilidId>(1);
  const [moduleId, setModuleId] = useState<number>(1);
  const [workType, setWorkType] = useState('Flowchart / Diagram Alur');
  const [description, setDescription] = useState('');

  const filteredPortfolios =
    activeFilterJilid === 'all'
      ? progress.portfolios
      : progress.portfolios.filter(p => p.jilidId === activeFilterJilid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const selectedMod = MODULES_DATA[moduleId];
      addPortfolioItem({
        title: title.trim(),
        jilidId,
        moduleId,
        moduleTitle: selectedMod ? selectedMod.title : `Modul ${moduleId}`,
        workType,
        description: description.trim(),
      });
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header (Per Requirement #14: GALERI KARYAKU) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Galeri Kreasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Galeri Karyaku 🎨
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Pameran karya, flowchart, proyek coding, dan media buatanmu sendiri yang dapat dibanggakan ke orang tua dan guru!
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya Baru 🚀</span>
        </button>
      </div>

      {/* Jilid Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 mr-1">Filter:</span>
        <button
          type="button"
          onClick={() => setActiveFilterJilid('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilterJilid === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Semua ({progress.portfolios.length})
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(jId => {
          const count = progress.portfolios.filter(p => p.jilidId === jId).length;
          return (
            <button
              key={jId}
              type="button"
              onClick={() => setActiveFilterJilid(jId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilterJilid === jId
                  ? jId === 1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : jId === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : jId === 3
                    ? 'bg-purple-600 text-white shadow-xs'
                    : jId === 4
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : jId === 5
                    ? 'bg-orange-500 text-white font-black shadow-xs'
                    : jId === 6
                    ? 'bg-teal-600 text-white font-black shadow-xs'
                    : jId === 7
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'bg-indigo-600 text-white font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Jilid {jId} ({count})
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid & Empty State (Per Requirement #14 & #17) */}
      {filteredPortfolios.length === 0 ? (
        <div className="p-10 sm:p-14 rounded-3xl bg-white border-2 border-dashed border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center text-3xl shadow-inner">
            🎨
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 font-heading">
              Belum ada karya di sini.
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Yuk buat karya pertamamu!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>MULAI BERKARYA 🚀</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map(item => {
            const isApproved = item.status === 'Divalidasi';

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-3xl p-2 rounded-2xl bg-indigo-50 border border-indigo-100">
                      {item.thumbnailEmoji || '🎨'}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Divalidasi</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Menunggu Validasi</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Jilid {item.jilidId} · {item.moduleTitle}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                    {item.workType}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-400 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Dibuat: {item.date}</span>
                    {item.notes && (
                      <span className="text-emerald-700 font-semibold" title={item.notes}>
                        Ada Catatan Guru ✓
                      </span>
                    )}
                  </div>

                  {!isApproved && (
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                        MODE DEMO
                      </span>
                      <button
                        type="button"
                        onClick={() => simulateTeacherValidation(item.jilidId)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                      >
                        Simulasikan Validasi Guru →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Tambah Karya Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
                🎨
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Tambah Karya ke Portofolio
                </h3>
                <p className="text-xs text-slate-500">
                  Simpan bukti kreasi dan pemikiranmu untuk dilihat orang tua & tutor
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Karya
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Algoritma Sarapan Sehat / Poster Keamanan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Terkait Jilid
                  </label>
                  <select
                    value={jilidId}
                    onChange={e => {
                      const id = Number(e.target.value) as JilidId;
                      setJilidId(id);
                      setModuleId(JILID_LIST.find(j => j.id === id)?.moduleIds[0] || 1);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {JILID_LIST.map(j => (
                      <option key={j.id} value={j.id}>
                        Jilid {j.id}: {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Modul
                  </label>
                  <select
                    value={moduleId}
                    onChange={e => setModuleId(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {JILID_LIST.find(j => j.id === jilidId)?.moduleIds.map(mId => (
                      <option key={mId} value={mId}>
                        Modul {mId}: {MODULES_DATA[mId]?.title || `Modul ${mId}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Jenis Karya
                </label>
                <select
                  value={workType}
                  onChange={e => setWorkType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Flowchart / Diagram Alur">Flowchart / Diagram Alur</option>
                  <option value="Algoritma Rutinitas">Algoritma Rutinitas</option>
                  <option value="Proyek Scratch / Visual Code">Proyek Scratch / Visual Code</option>
                  <option value="Desain Poster Edukasi">Desain Poster Edukasi</option>
                  <option value="Model Rekayasa Kardus / Fisik">Model Rekayasa Kardus / Fisik</option>
                  <option value="Ringkasan Ide Asisten Cerdas">Ringkasan Ide Asisten Cerdas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deskripsi / Refleksi Pembuatan
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ceritakan proses pembuatan karyamu dan apa yang paling kamu banggakan..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan Karya</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
