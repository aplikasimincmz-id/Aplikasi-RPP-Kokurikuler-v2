export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  primaryColor: 'teal' | 'blue' | 'indigo' | 'purple' | 'emerald';
}

export interface ModuleData {
  // Identity
  nama_madrasah: string;
  nama_kepala: string;
  nip_kepala: string;
  nama_guru: string;
  nip_guru: string;
  tahun_pelajaran: string;
  logo_url: string;
  titimangsa: string;

  // Module Content
  fase_kelas: string;
  semester: string;
  alokasi_jp: string;
  nama_kegiatan: string;
  jenis_kokurikuler: string;
  bentuk_kegiatan: string;
  lokasi_kegiatan: string;
  dimensi: string;
  topik: string;
  tujuan: string;
  harian: string;
  mingguan: string;
  bulanan: string;
  tahunan: string;
  praktik_pedagogis: "PjBL" | "PBL" | "Discovery" | "Experiential";
  mata_pelajaran_terkait: string;

  // AI Generated Sections
  deskripsi_kegiatan_ai?: string;
  langkah_tahap_1?: string;
  langkah_tahap_2?: string;
  langkah_tahap_3?: string;
  materi_integrasi?: string;
  
  // New detailed AI sections
  refleksi_ai?: string;
  lingkungan_belajar_ai?: string;
  kemitraan_satuan_ai?: string;
  kemitraan_keluarga_ai?: string;
  digital_ai?: string;
  kegiatan_18_pertemuan_ai?: string;
  asesmen_ai?: string;
  rubrik_ai?: string;
  lkpd_ai?: string;
}
