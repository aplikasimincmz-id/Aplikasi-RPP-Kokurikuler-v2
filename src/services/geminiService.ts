import { GoogleGenAI, Type } from "@google/genai";
import { ModuleData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateModuleContent(data: Partial<ModuleData>) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

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
    6. asesmen_ai: Deskripsi instrumen asesmen (LKPD, Observasi mandiri).
    7. rubrik_ai: Sebuah tabel rubrik penilaian dengan indikator DPL & KBC (Sangat Baik, Baik, Cukup, Kurang) dalam format Markdown.
    8. kegiatan_18_pertemuan_ai: Rencana detail 18 pertemuan. Setiap pertemuan berdurasi 3 JP.
       Format per pertemuan harus sangat terstruktur dan menarasikan langkah operasional yang spesifik:
       • Pertemuan X - [Judul yang Menarik] (3 JP)
       1. Pendahuluan: Orientasi tema dan apersepsi yang menghubungkan nilai Panca Cinta dengan pengalaman santri.
       2. Inti: Langkah-langkah konkret sesuai "Bentuk Kegiatan" dan "Jenis Kokurikuler", menggunakan metode aktif (PjBL/Discovery/dll).
       3. Penutup: Refleksi mendalam menggunakan "Topik Panca Cinta (KBC)" dan penguatan karakter Profil Lulusan.
       Pastikan narasi Inti benar-benar mencerminkan praktik nyata dari "${data.bentuk_kegiatan}".
    9. lkpd_ai: Contoh Lembar Kerja Peserta Didik (LKPD) yang menarik dan relevan untuk semua pertemuan (atau perwakilan pertemuan utama) dalam format Markdown.

    Gunakan bahasa yang edukatif, Islami (Panca Cinta), dan sesuai dengan psikologi anak ${data.fase_kelas}.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview", // Use Pro for complex long content
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
