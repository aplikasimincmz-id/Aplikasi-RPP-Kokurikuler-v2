import React, { useState } from 'react';
import { ModuleData } from '../types';
import { generateModuleContent } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface FormProps {
  data: ModuleData;
  onChange: (data: ModuleData) => void;
}

export const ModuleForm: React.FC<FormProps> = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleGenerateAI = async () => {
    setLoading(true);
    try {
      const generated = await generateModuleContent(data);
      onChange({
        ...data,
        ...generated
      });
    } catch (error) {
      console.error("AI Generation failed", error);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui";
      alert(`Gagal membuat konten AI: ${errorMessage}\n\nPastikan API Key sudah benar di menu Settings.`);
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset: any) => {
    onChange({
      ...data,
      fase_kelas: `Fase ${preset.kelas <= 2 ? 'A' : preset.kelas <= 4 ? 'B' : 'C'} Kelas ${preset.kelas}`,
      semester: preset.semester === 'S1' ? 'I (Ganjil)' : 'II (Genap)',
      dimensi: preset.dpl,
      topik: preset.kbc,
      nama_kegiatan: preset.tema,
      jenis_kokurikuler: preset.jenis,
      bentuk_kegiatan: preset.kegiatan,
      mata_pelajaran_terkait: preset.mapel,
      alokasi_jp: preset.jp.toString()
    });
  };

  const presets = [
    { kelas: 1, semester: 'S1', dpl: 'Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa', kbc: '1. Cinta Allah Swt. dan Rasul-Nya', tema: 'Keagungan Ciptaan Allah di Desaku', jenis: 'Nilai-nilai Madrasah', kegiatan: 'Praktik adab makan & bersyukur atas hasil tani lokal (padi/buah)', mapel: 'Al Qur’an Hadis', jp: 54 },
    { kelas: 1, semester: 'S2', dpl: 'Kemandirian', kbc: '4. Cinta Diri dan Sesama Manusia', tema: 'Kebun Kecil di Halaman Sekolah', jenis: 'Gerakan 7KAIH', kegiatan: 'Menanam sayuran media polybag secara mandiri', mapel: 'Bahasa Indonesia, Pend. Pancasila', jp: 54 },
    { kelas: 2, semester: 'S1', dpl: 'Kewargaan', kbc: '5. Cinta Tanah Air', tema: 'Pahlawan Pangan Desa Kami', jenis: 'Ciri Khas Madrasah Konteks Lokal', kegiatan: 'Kunjungan ke tokoh petani sukses dan membantu menyemai benih', mapel: 'Bahasa Indonesia, Pend. Pancasila', jp: 54 },
    { kelas: 2, semester: 'S2', dpl: 'Komunikasi', kbc: '2. Cinta Ilmu', tema: 'Pasar Rakyat Cilik', jenis: 'Kolaboratif Berbasis Cinta (KKBC)', kegiatan: 'Bermain peran jual beli hasil kebun dengan bahasa yang santun', mapel: 'Bahasa Indonesia, Al Qur’an Hadis', jp: 54 },
    { kelas: 3, semester: 'S1', dpl: 'Kreativitas', kbc: '3. Cinta Lingkungan', tema: 'Olahan Limbah Pertanian', jenis: 'Pembelajaran Kolaboratif Lintas Disiplin', kegiatan: 'Membuat pupuk kompos dari dedaunan dan limbah jerami', mapel: 'IPAS, Bahasa Indonesia', jp: 54 },
    { kelas: 3, semester: 'S2', dpl: 'Kolaborasi', kbc: '4. Cinta Diri dan Sesama Manusia', tema: 'Zakat Hasil Bumi', jenis: 'Satu Disiplin Ilmu Kolaboratif', kegiatan: 'Simulasi perhitungan dan penyaluran zakat pertanian (gabah)', mapel: 'Fikih, IPAS', jp: 54 },
    { kelas: 4, semester: 'S1', dpl: 'Penalaran kritis', kbc: '2. Cinta Ilmu', tema: 'Siklus Air di Sawah', jenis: 'Pembelajaran Kolaboratif Lintas Disiplin', kegiatan: 'Observasi sistem irigasi lokal dan dampak sampah pada air', mapel: 'IPAS, Fikih', jp: 54 },
    { kelas: 4, semester: 'S2', dpl: 'Kesehatan', kbc: '3. Cinta Lingkungan', tema: 'Tanaman Obat Keluarga (TOGA)', jenis: 'Gerakan 7KAIH', kegiatan: 'Eksplorasi tanaman herbal pedesaan untuk kesehatan tubuh', mapel: 'IPAS, Bahasa Indonesia', jp: 54 },
    { kelas: 5, semester: 'S1', dpl: 'Kreativitas', kbc: '5. Cinta Tanah Air', tema: 'Kriya Desa Mandiri', jenis: 'Ciri Khas Madrasah Konteks Lokal', kegiatan: 'Membuat kerajinan tangan dari anyaman bambu/daun pandan', mapel: 'Seni Budaya, Bahasa Indonesia', jp: 54 },
    { kelas: 5, semester: 'S2', dpl: 'Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa', kbc: '1. Cinta Allah Swt. dan Rasul-Nya', tema: 'Etika Bisnis Islami', jenis: 'Nilai-nilai Madrasah', kegiatan: 'Magang sehari di toko kelontong dengan prinsip kejujuran', mapel: 'Akidah Akhlak, Seni Budaya', jp: 54 },
    { kelas: 6, semester: 'S1', dpl: 'Kolaborasi', kbc: '4. Cinta Diri dan Sesama Manusia', tema: 'Sportivitas dan Kerjasama', jenis: 'Gerakan 7KAIH', kegiatan: 'Turnamen olahraga tradisional antar kelas (Bakiak/Engklek)', mapel: 'PJOK, Bahasa Indonesia', jp: 48 },
    { kelas: 6, semester: 'S2', dpl: 'Kemandirian', kbc: '5. Cinta Tanah Air', tema: 'Pesta Panen Perpisahan', jenis: 'Kolaboratif Berbasis Cinta (KKBC)', kegiatan: 'Mengelola bazar hasil karya sendiri sebagai bekal kemandirian', mapel: 'Akidah Akhlak, PJOK', jp: 48 },
  ];

  const handleCheckboxChange = (name: 'dimensi' | 'topik', value: string) => {
    const currentValues = data[name] ? data[name]!.split(', ').filter(v => v !== '') : [];
    let newValues: string[];
    
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    onChange({ ...data, [name]: newValues.join(', ') });
  };

  const dimensiOptions = [
    "Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa",
    "Kewargaan",
    "Penalaran kritis",
    "Kreativitas",
    "Kolaborasi",
    "Kemandirian",
    "Kesehatan",
    "Komunikasi"
  ];

  const topikOptions = [
    "1. Cinta Allah Swt. dan Rasul-Nya",
    "2. Cinta Ilmu",
    "3. Cinta Lingkungan",
    "4. Cinta Diri dan Sesama Manusia",
    "5. Cinta Tanah Air"
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md space-y-4 border border-primary-100 dark:border-neutral-800 transition-colors">
      <div className="flex justify-between items-center border-b dark:border-neutral-800 pb-2 mb-4">
        <h2 className="text-xl font-bold text-primary-800 dark:text-primary-400 flex items-center gap-2">
          <span className="bg-primary-600 text-white p-1 rounded">📝</span> Input Data Modul
        </h2>
        <div className="flex gap-2">
          <select 
            onChange={(e) => {
              const val = e.target.value;
              if (val) applyPreset(presets[parseInt(val)]);
            }}
            className="text-[10px] p-1.5 border border-purple-300 rounded-full dark:bg-neutral-800 dark:text-white outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Pilih Preset Rencana</option>
            {presets.map((p, idx) => (
              <option key={idx} value={idx}>Kelas {p.kelas} - {p.tema}</option>
            ))}
          </select>
          <button
            onClick={handleGenerateAI}
            disabled={loading}
            className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-purple-700 transition-all disabled:opacity-50 shadow-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
            Generate Konten AI
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Tema Kegiatan</label>
          <select 
            name="nama_kegiatan" value={data.nama_kegiatan || ''} onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Pilih Tema</option>
            <option value="Keagungan Ciptaan Allah di Desaku">Keagungan Ciptaan Allah di Desaku</option>
            <option value="Kebun Kecil di Halaman Sekolah">Kebun Kecil di Halaman Sekolah</option>
            <option value="Pahlawan Pangan Desa Kami">Pahlawan Pangan Desa Kami</option>
            <option value="Pasar Rakyat Cilik">Pasar Rakyat Cilik</option>
            <option value="Olahan Limbah Pertanian">Olahan Limbah Pertanian</option>
            <option value="Zakat Hasil Bumi">Zakat Hasil Bumi</option>
            <option value="Siklus Air di Sawah">Siklus Air di Sawah</option>
            <option value="Tanaman Obat Keluarga (TOGA)">Tanaman Obat Keluarga (TOGA)</option>
            <option value="Kriya Desa Mandiri">Kriya Desa Mandiri</option>
            <option value="Etika Bisnis Islami">Etika Bisnis Islami</option>
            <option value="Sportivitas dan Kerjasama">Sportivitas dan Kerjasama</option>
            <option value="Pesta Panen Perpisahan">Pesta Panen Perpisahan</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Jenis kokurikuler</label>
          <select 
            name="jenis_kokurikuler" value={data.jenis_kokurikuler || ''} onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Pilih Jenis kokurikuler</option>
            <option value="Nilai-nilai Madrasah">Nilai-nilai Madrasah</option>
            <option value="Gerakan 7KAIH">Gerakan 7KAIH</option>
            <option value="Ciri Khas Madrasah Konteks Lokal">Ciri Khas Madrasah Konteks Lokal</option>
            <option value="Kolaboratif Berbasis Cinta (KKBC)">Kolaboratif Berbasis Cinta (KKBC)</option>
            <option value="Pembelajaran Kolaboratif Lintas Disiplin">Pembelajaran Kolaboratif Lintas Disiplin</option>
            <option value="Satu Disiplin Ilmu Kolaboratif">Satu Disiplin Ilmu Kolaboratif</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Bentuk Kegiatan</label>
          <select 
            name="bentuk_kegiatan" value={data.bentuk_kegiatan || ''} onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Pilih Bentuk Kegiatan</option>
            <option value="Praktik adab makan & bersyukur atas hasil tani lokal (padi/buah)">Praktik adab makan & bersyukur atas hasil tani lokal (padi/buah)</option>
            <option value="Menanam sayuran media polybag secara mandiri">Menanam sayuran media polybag secara mandiri</option>
            <option value="Kunjungan ke tokoh petani sukses dan membantu menyemai benih">Kunjungan ke tokoh petani sukses dan membantu menyemai benih</option>
            <option value="Bermain peran jual beli hasil kebun dengan bahasa yang santun">Bermain peran jual beli hasil kebun dengan bahasa yang santun</option>
            <option value="Membuat pupuk kompos dari dedaunan dan limbah jerami">Membuat pupuk kompos dari dedaunan dan limbah jerami</option>
            <option value="Simulasi perhitungan dan penyaluran zakat pertanian (gabah)">Simulasi perhitungan dan penyaluran zakat pertanian (gabah)</option>
            <option value="Observasi sistem irigasi lokal dan dampak sampah pada air">Observasi sistem irigasi lokal dan dampak sampah pada air</option>
            <option value="Eksplorasi tanaman herbal pedesaan untuk kesehatan tubuh">Eksplorasi tanaman herbal pedesaan untuk kesehatan tubuh</option>
            <option value="Membuat kerajinan tangan dari anyaman bambu/daun pandan">Membuat kerajinan tangan dari anyaman bambu/daun pandan</option>
            <option value="Magang sehari di toko kelontong dengan prinsip kejujuran">Magang sehari di toko kelontong dengan prinsip kejujuran</option>
            <option value="Turnamen olahraga tradisional antar kelas (Bakiak/Engklek)">Turnamen olahraga tradisional antar kelas (Bakiak/Engklek)</option>
            <option value="Mengelola bazar hasil karya sendiri sebagai bekal kemandirian">Mengelola bazar hasil karya sendiri sebagai bekal kemandirian</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Mata Pelajaran Terkait</label>
          <input 
            name="mata_pelajaran_terkait" value={data.mata_pelajaran_terkait || ''} onChange={handleChange}
            placeholder="Contoh: IPAS, Bahasa Indonesia, dll"
            className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Lokasi Kegiatan</label>
          <input 
            name="lokasi_kegiatan" value={data.lokasi_kegiatan || ''} onChange={handleChange}
            placeholder="Contoh: Lingkungan Madrasah, Desa, dll"
            className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase block">Dimensi Profil Lulusan (Boleh Pilih Lebih dari Satu)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-800">
            {dimensiOptions.map(option => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary-700 dark:hover:text-primary-400 group">
                <input 
                  type="checkbox"
                  checked={(data.dimensi || '').split(', ').includes(option)}
                  onChange={() => handleCheckboxChange('dimensi', option)}
                  className="rounded border-gray-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span className="group-hover:translate-x-1 transition-transform dark:text-neutral-300">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase block">Topik Panca Cinta (Boleh Pilih Lebih dari Satu)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-800">
            {topikOptions.map(option => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary-700 dark:hover:text-primary-400 group">
                <input 
                  type="checkbox"
                  checked={(data.topik || '').split(', ').includes(option)}
                  onChange={() => handleCheckboxChange('topik', option)}
                  className="rounded border-gray-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span className="group-hover:translate-x-1 transition-transform dark:text-neutral-300">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Tujuan Pembelajaran</label>
        <textarea 
          name="tujuan" value={data.tujuan || ''} onChange={handleChange}
          rows={2}
          placeholder="Gunakan kata kerja operasional..."
          className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase">Praktik Pedagogis</label>
        <select 
          name="praktik_pedagogis" value={data.praktik_pedagogis || 'PjBL'} onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="PjBL">PjBL (Project Based Learning)</option>
          <option value="PBL">PBL (Problem Based Learning)</option>
          <option value="Discovery">Discovery Learning</option>
          <option value="Experiential">Experiential Learning</option>
        </select>
      </div>

      {data.kegiatan_18_pertemuan_ai !== undefined && (
        <div className="border-t border-gray-200 dark:border-neutral-800 pt-4 space-y-4">
          <h3 className="text-sm font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <Sparkles size={14} /> Konten AI Tergenerasi (Silakan Edit Jika Perlu)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Refleksi AI</label>
              <textarea name="refleksi_ai" value={data.refleksi_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Lingkungan Belajar AI</label>
              <textarea name="lingkungan_belajar_ai" value={data.lingkungan_belajar_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Kemitraan Satuan AI</label>
              <textarea name="kemitraan_satuan_ai" value={data.kemitraan_satuan_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Kemitraan Keluarga AI</label>
              <textarea name="kemitraan_keluarga_ai" value={data.kemitraan_keluarga_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Pemanfaatan Digital AI</label>
            <textarea name="digital_ai" value={data.digital_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Kegiatan 18 Pertemuan AI</label>
            <textarea name="kegiatan_18_pertemuan_ai" value={data.kegiatan_18_pertemuan_ai || ''} onChange={handleChange} rows={10} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm font-mono" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Asesmen AI</label>
              <textarea name="asesmen_ai" value={data.asesmen_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Rubrik Penilaian AI</label>
              <textarea name="rubrik_ai" value={data.rubrik_ai || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm font-mono" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase">Lampiran LKPD AI</label>
            <textarea name="lkpd_ai" value={data.lkpd_ai || ''} onChange={handleChange} rows={6} className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded dark:bg-neutral-800 dark:text-white text-sm font-mono" />
          </div>
        </div>
      )}
    </div>
  );
};
