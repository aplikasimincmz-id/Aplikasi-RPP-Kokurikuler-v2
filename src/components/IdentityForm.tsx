import React from 'react';
import { ModuleData } from '../types';
import { School, User, Upload, ArrowRight, Save, CheckCircle2, Printer, RotateCcw, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IdentityFormProps {
  data: ModuleData;
  onChange: (data: ModuleData) => void;
  onNext: () => void;
  onPrint: () => void;
  onReset?: () => void;
  onLogout?: () => void;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({ data, onChange, onNext, onPrint, onReset, onLogout }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl border border-primary-100 dark:border-neutral-800 max-w-2xl mx-auto transition-colors">
      <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-400 mb-6 flex items-center gap-2 border-b dark:border-neutral-800 pb-4">
        <School className="text-primary-600 dark:text-primary-400" /> Identitas Madrasah & Guru
      </h2>

      <div className="space-y-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border-2 border-dashed border-primary-200 dark:border-primary-800">
          <div className="w-24 h-24 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-primary-100 dark:border-neutral-700 overflow-hidden relative group">
            {data.logo_url ? (
              <img src={data.logo_url} alt="Logo Madrasah" className="w-full h-full object-contain p-2" />
            ) : (
              <School className="w-12 h-12 text-primary-200 dark:text-primary-700" />
            )}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Upload className="text-white" />
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
          <p className="text-sm font-medium text-primary-700 dark:text-primary-300">Klik untuk unggah logo Madrasah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase flex items-center gap-1">
              <School size={14} /> Nama Madrasah
            </label>
            <input 
              name="nama_madrasah" value={data.nama_madrasah || ''} onChange={handleChange}
              placeholder="Contoh: MIN 1 Ciamis"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Tahun Pelajaran</label>
            <input 
              name="tahun_pelajaran" value={data.tahun_pelajaran || ''} onChange={handleChange}
              placeholder="Contoh: 2025/2026"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Fase / Kelas</label>
            <select 
              name="fase_kelas" value={data.fase_kelas || ''} onChange={handleChange as any}
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="">Pilih Fase/Kelas</option>
              <option value="Fase A Kelas 1">Fase A Kelas 1</option>
              <option value="Fase A Kelas 2">Fase A Kelas 2</option>
              <option value="Fase B Kelas 3">Fase B Kelas 3</option>
              <option value="Fase B Kelas 4">Fase B Kelas 4</option>
              <option value="Fase C Kelas 5">Fase C Kelas 5</option>
              <option value="Fase C Kelas 6">Fase C Kelas 6</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Semester</label>
            <select 
              name="semester" value={data.semester || ''} onChange={handleChange as any}
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="">Pilih Semester</option>
              <option value="I (Ganjil)">I (Ganjil)</option>
              <option value="II (Genap)">II (Genap)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Alokasi Waktu (JP)</label>
            <input 
              type="number"
              name="alokasi_jp" value={data.alokasi_jp || ''} onChange={handleChange}
              placeholder="54"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Titimangsa (Tempat, Tanggal)</label>
            <input 
              name="titimangsa" value={data.titimangsa || ''} onChange={handleChange}
              placeholder="Contoh: Ciamis, 4 Mei 2026"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase flex items-center gap-1">
              <User size={14} /> Nama Kepala Madrasah
            </label>
            <input 
              name="nama_kepala" value={data.nama_kepala || ''} onChange={handleChange}
              placeholder="Nama Lengkap & Gelar"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">NIP Kepala</label>
            <input 
              name="nip_kepala" value={data.nip_kepala || ''} onChange={handleChange}
              placeholder="NIP / NUPTK"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase flex items-center gap-1">
              <User size={14} /> Nama Guru Kelas
            </label>
            <input 
              name="nama_guru" value={data.nama_guru || ''} onChange={handleChange}
              placeholder="Nama Lengkap & Gelar"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">NIP Guru</label>
            <input 
              name="nip_guru" value={data.nip_guru || ''} onChange={handleChange}
              placeholder="NIP / NUPTK"
              className="w-full p-3 border border-gray-300 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t dark:border-neutral-800 items-center text-sm">
          {saved && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-900/20 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800"
            >
              <CheckCircle2 size={16} className="animate-bounce" />
              <span>Berhasil Disimpan!</span>
            </motion.div>
          )}
          
          <button 
            type="button"
            onClick={onPrint}
            className="px-3 py-1.5 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center gap-1.5"
          >
            <Printer size={14} /> Cetak
          </button>
          <button 
            type="button"
            onClick={onLogout}
            className="px-3 py-1.5 border border-red-200 text-red-600 rounded-full text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-1.5"
            title="Keluar dari Aplikasi"
          >
            <LogOut size={14} /> Keluar
          </button>

          {onReset && (
            <button 
              type="button"
              onClick={onReset}
              className="px-3 py-1.5 border border-red-200 text-red-600 rounded-full text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-1.5"
              title="Reset Semua Data"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}

          <motion.button 
            whileHover={!saved ? { scale: 1.02 } : {}}
            whileTap={!saved ? { scale: 0.98 } : {}}
            type="button"
            onClick={handleSave}
            disabled={saved}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 relative overflow-hidden ${
              saved 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-400 border border-primary-200 dark:border-primary-800 cursor-not-allowed' 
                : 'border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={16} /> Tersimpan
              </>
            ) : (
              <>
                <Save size={16} /> Simpan Identitas
              </>
            )}
          </motion.button>

          <button 
            type="button"
            onClick={onNext}
            className="px-5 py-1.5 bg-primary-600 text-white rounded-full text-xs font-bold hover:bg-primary-700 transition-all flex items-center gap-1.5 shadow-md shadow-primary-100 dark:shadow-none active:scale-95"
          >
            Lanjut <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
