import { GoogleGenAI, Type } from "@google/genai";
import { ModuleData } from "../types";

export async function generateModuleContent(data: Partial<ModuleData>) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API Key tidak ditemukan. Silakan masukkan GEMINI_API_KEY di menu Settings.");
  }

  // Debugging (masked)
  console.log(`Using API Key starting with: ${apiKey.substring(0, 4)}...`);

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Anda adalah ahli kurikulum madrasah dan pengembang Kurikulum Berbasis Cinta (KBC).
    Berdasarkan data berikut, buatlah perencanaan pembelajaran Kokurikuler MI yang lengkap.
    
    Data Input:
    - Nama Madrasah: ${data.nama_madrasah}
    - Tema: ${data.nama_kegiatan}
    - Jenis kokurikuler: ${data.jenis_kokurikuler}
    - Bentuk Kegiatan: ${data.bentuk_kegiatan}
    - Lokasi Kegiatan: ${data.lokasi_kegiatan}
    - Dimensi Profil Lulusan: ${data.dimensi}
    - Topik Panca Cinta (KBC): ${data.topik}
    - Mata Pelajaran Terkait: ${data.mata_pelajaran_terkait}
    - Tujuan Pembelajaran: ${data.tujuan}
    - Fase/Kelas: ${data.fase_kelas}
    - Semester: ${data.semester}
    - Alokasi Waktu: ${data.alokasi_jp} JP
    
    Tugas Anda adalah menarasikan bagian-bagian berikut:
    1. refleksi_ai: Narasi refleksi akhir pekan melalui "Lingkaran Cerita" (contoh: perasaan saat merawat tanaman).
    2. lingkungan_belajar_ai: Deskripsi pemanfaatan lingkungan (madrasah, rumah, dll).
    3. kemitraan_satuan_ai: Narasi kolaborasi antar guru (misal: guru Mapel Terkait).
    4. kemitraan_keluarga_ai: Narasi peran orang tua/keluarga.
    5. digital_ai: Pemanfaatan teknologi digital (misal: dokumentasi foto, video tutorial).
    6. asesmen_ai: Narasi ringkas mengenai strategi asesmen yang digunakan. Fokus pada perpaduan asesmen formatif (observasi perilaku, jurnal refleksi) dan asesmen sumatif (produk akhir/unjuk kerja) yang otentik dan relevan dengan kegiatan.
    7. rubrik_ai: Sebuah tabel rubrik penilaian yang sangat ringkas namun esensial dengan indikator DPL & KBC (Sangat Baik, Baik, Cukup, Perlu Bimbingan) dalam format Markdown.
    8. kegiatan_18_pertemuan_ai: Rencana detail 18 pertemuan @ 3 JP.
       Tuntunan Alur (MANDATORY):
       - Pertemuan 1-4: Tahap Pengenalan (Kesadaran & Eksplorasi Konsep).
       - Pertemuan 5-8: Tahap Kontekstualisasi (Masalah Lingkungan Terdekat).
       - Pertemuan 9-14: Tahap Aksi (Praktik Nyata sesuai "${data.bentuk_kegiatan}").
       - Pertemuan 15-18: Tahap Refleksi & Tindak Lanjut (Evaluasi & Aksi Mandiri).

       Format Penulisan (WAJIB):
       - Gunakan heading level 3 (###) untuk setiap judul pertemuan.
       - Gunakan garis pemisah horizontal (---) di AKHIR setiap pertemuan.
       - Struktur per pertemuan:
         1. **Pendahuluan**: Orientasi tema & apersepsi Panca Cinta.
         2. **Inti**: Aktivitas konkret PjBL/metode aktif lainnya.
         3. **Penutup**: Refleksi karakter & penguatan adab.
       - Berikan narasi yang sangat operasional (apa yang dilakukan guru dan murid).
    9. lkpd_ai: Contoh Lembar Kerja Peserta Didik (LKPD) yang menarik dan relevan untuk semua pertemuan (atau perwakilan pertemuan utama) dalam format Markdown.

    Gunakan bahasa yang edukatif, Islami (Panca Cinta), dan sesuai dengan psikologi anak ${data.fase_kelas}.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // More stable and faster
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refleksi_ai: { type: Type.STRING },
          lingkungan_belajar_ai: { type: Type.STRING },
          kemitraan_satuan_ai: { type: Type.STRING },
          kemitraan_keluarga_ai: { type: Type.STRING },
          digital_ai: { type: Type.STRING },
          asesmen_ai: { type: Type.STRING },
          rubrik_ai: { type: Type.STRING },
          kegiatan_18_pertemuan_ai: { type: Type.STRING },
          lkpd_ai: { type: Type.STRING },
        },
        required: [
          "refleksi_ai", 
          "lingkungan_belajar_ai", 
          "kemitraan_satuan_ai", 
          "kemitraan_keluarga_ai", 
          "digital_ai",
          "asesmen_ai",
          "rubrik_ai",
          "kegiatan_18_pertemuan_ai",
          "lkpd_ai"
        ],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("AI returned empty response");
  
  return JSON.parse(text) as {
    refleksi_ai: string;
    lingkungan_belajar_ai: string;
    kemitraan_satuan_ai: string;
    kemitraan_keluarga_ai: string;
    digital_ai: string;
    asesmen_ai: string;
    rubrik_ai: string;
    kegiatan_18_pertemuan_ai: string;
    lkpd_ai: string;
  };
}

export async function generateTujuanAI(data: Partial<ModuleData>) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API Key tidak ditemukan. Silakan masukkan GEMINI_API_KEY di menu Settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Anda adalah ahli kurikulum madrasah. Buatlah daftar bernomor "Tujuan Pembelajaran" untuk kegiatan Kokurikuler berikut:
    - Tema/Nama Kegiatan: ${data.nama_kegiatan}
    - Fase/Kelas: ${data.fase_kelas}
    - Dimensi Profil Lulusan: ${data.dimensi}
    - Topik Panca Cinta (KBC): ${data.topik}
    - Bentuk Kegiatan: ${data.bentuk_kegiatan}

    Ketentuan format (WAJIB):
    1. Gunakan daftar bernomor (Contoh: 1. ..., 2. ..., 3. ...).
    2. Maksimal 3-4 poin saja.
    3. LANGSUNG berikan poin-poinya, TANPA kata pembuka, TANPA kata penutup, dan TANPA judul seperti "Tujuan Pembelajaran".
    4. Setiap poin harus diawali dengan nomor dan kalimatnya harus dimulai dengan kata kerja operasional (Menumbuhkan, Menginternalisasi, dsb).
    
    Contoh Output:
    1. Menumbuhkan rasa syukur melalui praktik nyata...
    2. Menginternalisasi nilai Cinta Allah...
    3. Berkolaborasi secara aktif...
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text.trim();
}
