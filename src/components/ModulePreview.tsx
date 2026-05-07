import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ModuleData } from '../types';

interface PreviewProps {
  data: ModuleData;
  onEdit: (sectionIndex: number) => void;
  pdfSections?: { id: string; label: string; enabled: boolean }[];
  showPageNumbers?: boolean;
}

export const ModulePreview: React.FC<PreviewProps> = ({ data, onEdit, pdfSections, showPageNumbers }) => {
  const pedagogisDesc = {
    PjBL: "Project Based Learning: Murid terlibat dalam proyek nyata yang menghasilkan produk cinta lingkungan.",
    PBL: "Problem Based Learning: Murid memecahkan masalah lingkungan di madrasah dengan solusi berbasis kasih sayang.",
    Discovery: "Discovery Learning: Murid menemukan sendiri keajaiban ciptaan Allah melalui eksplorasi terbimbing.",
    Experiential: "Experiential Learning: Murid belajar langsung dari pengalaman emosional dan fisik di lapangan."
  };

  const totalJP = parseInt(data.alokasi_jp || '0', 10);
  const jp1 = Math.floor(totalJP * 0.3);
  const jp2 = Math.floor(totalJP * 0.5);
  const jp3 = totalJP - jp1 - jp2;

  const rubricContent: Record<string, { aspect: string; prompt: string }> = {
    // Dimensi
    "Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa": { aspect: "Iman, Takwa, & Adab", prompt: "penerapan adab kasih sayang dan kesadaran spiritual dalam aktivitas." },
    "Kewargaan": { aspect: "Kewargaan", prompt: "sikap tanggung jawab sosial dan kepedulian terhadap lingkungan sekitar." },
    "Penalaran kritis": { aspect: "Penalaran Kritis", prompt: "kemampuan menganalisis hubungan antar komponen dalam proyek." },
    "Kreativitas": { aspect: "Kreativitas & Produk", prompt: "orisinalitas ide dan keunikan hasil karya yang dihasilkan." },
    "Kolaborasi": { aspect: "Kolaborasi & Kerjasama", prompt: "kontribusi aktif dan kemampuan berbagi peran dalam tim." },
    "Kemandirian": { aspect: "Kemandirian", prompt: "tingkat inisiatif dan tanggung jawab terhadap tugas pribadi." },
    "Kesehatan": { aspect: "Kesehatan & Higienitas", prompt: "kesadaran menjaga kesehatan fisik dan kebersihan lingkungan." },
    "Komunikasi": { aspect: "Komunikasi", prompt: "kemampuan menyampaikan gagasan dengan santun dan efektif." },
    // Topik KBC
    "1. Cinta Allah Swt. dan Rasul-Nya": { aspect: "Cinta Allah & Rasul", prompt: "pengenalan kebesaran Allah melalui obyek pembelajaran." },
    "2. Cinta Ilmu": { aspect: "Cinta Ilmu", prompt: "antusiasme dalam menemukan hal baru dan ketekunan belajar." },
    "3. Cinta Lingkungan": { aspect: "Cinta Lingkungan", prompt: "kepedulian nyata terhadap kelestarian alam dan makhluk hidup." },
    "4. Cinta Diri dan Sesama Manusia": { aspect: "Cinta Diri & Sesama", prompt: "apresiasi terhadap bakat diri dan sikap menolong sesama teman." },
    "5. Cinta Tanah Air": { aspect: "Cinta Tanah Air", prompt: "rasa memiliki dan bangga terhadap identitas bangsa dan madrasah." }
  };

  const kbcTopicDescriptions: Record<string, string> = {
    "1. Cinta Allah Swt. and Rasul-Nya": "Menanamkan rasa syukur dan ketaatan kepada Sang Pencipta melalui kekaguman akan keteraturan alam semesta. Murid diajak mengenal sifat-sifat Allah melalui ciptaan-Nya, serta meneladani kemuliaan akhlak Rasulullah SAW dalam berinteraksi dengan sesama dan alam, menjadikan setiap aktivitas belajar sebagai bentuk ibadah.",
    "2. Cinta Ilmu": "Mendorong keingintahuan yang tinggi (curiosity) sebagai bekal pembelajar sepanjang hayat. Topik ini menekankan kegemaran membaca, semangat bereksperimen, dan ketekunan dalam menggali pengetahuan baru, meyakini bahwa menuntut ilmu adalah kewajiban yang meninggikan derajat manusia di hadapan Allah.",
    "3. Cinta Lingkungan": "Mengajak murid untuk memiliki kesadaran ekologis sebagai khalifah di bumi. Murid didorong untuk menyayangi alam sekitarnya, menjaga kebersihan, memelihara tanaman, menghemat energi, dan melestarikan makhluk hidup sebagai wujud cinta kepada Sang Pencipta yang telah memberikan alam sebagai amanah.",
    "4. Cinta Diri dan Sesama Manusia": "Membangun harga diri yang positif dan kesehatan jiwa raga. Murid diajarkan untuk menghargai potensi diri, menjaga kesehatan fisik, serta memupuk empati, kasih sayang, dan sikap toleran terhadap perbedaan. Fokusnya adalah menciptakan harmoni sosial melalui tutur kata yang santun dan tindakan saling menolong.",
    "5. Cinta Tanah Air": "Menumbuhkan rasa bangga dan cinta terhadap identitas bangsa serta kekayaan budaya Indonesia. Murid diajak untuk menjaga keutuhan sosial, menghormati simbol-simbol negara, dan berkontribusi aktif dalam memajukan lingkungan terdekatnya (madrasah dan masyarakat) sebagai wujud patriotisme yang beradab."
  };

  const selectedDimensions = (data.dimensi ? data.dimensi.split(', ').map(s => s.trim()) : []).filter(item => rubricContent[item]);
  const selectedKBC = (data.topik ? data.topik.split(', ').map(s => s.trim()) : []).filter(item => rubricContent[item]);
  const selectedItems = [...selectedDimensions, ...selectedKBC];
  
  const getIntegrationNarrative = () => {
    if (data.materi_integrasi) return data.materi_integrasi;
    if (selectedItems.length === 0) return `Kegiatan ini mengintegrasikan penguatan iman melalui rasa syukur atas ciptaan Allah, kepedulian terhadap lingkungan sekitar, dan pencapaian TP: ${data.tujuan}.`;
    
    const kbcPart = selectedKBC.length > 0 
      ? `penginternalisasian nilai ${selectedKBC.map(t => t.includes('. ') ? t.split('. ')[1] : t).join(", ")} (${selectedKBC.map(t => rubricContent[t]?.aspect).join(", ")})`
      : "";
    
    const dplPart = selectedDimensions.length > 0
      ? `penguatan dimensi ${selectedDimensions.join(", ")} yang menitikberatkan pada aspek ${selectedDimensions.map(d => rubricContent[d]?.aspect).join(" serta ")}`
      : "";
      
    return `Materi ini disusun dengan mengintegrasikan ${kbcPart}${kbcPart && dplPart ? " serta " : ""}${dplPart}. Pendekatan Kurikulum Berbasis Cinta (KBC) ini memastikan bahwa setiap aktivitas dalam proyek "${data.nama_kegiatan}" tidak hanya memenuhi capaian kognitif, tetapi juga membentuk karakter murid yang beradab dan penuh kasih sayang sesuai target: ${data.tujuan}.`;
  };

  const getLearningObjectives = () => {
    if (!data.tujuan) return ["Menentukan target pencapaian sesuai tema kegiatan."];
    
    // Split by common delimiters if the user already provided multiple
    const userObjectives = data.tujuan.split(/[;\n]/).map(o => o.trim()).filter(o => o.length > 5);
    
    // If only one objective, augment it contextually
    const rawObjectives = userObjectives.length > 0 ? [...userObjectives] : [data.tujuan];
    const objectives = rawObjectives.map(obj => obj.replace(/^(\d+[\.\)\s]+)+/, '').trim());
    
    if (objectives.length === 1) {
      // Add an objective related to Nilai Panca Cinta (KBC) if applicable
      if (selectedKBC.length > 0) {
        const kbcName = selectedKBC[0].includes(". ") ? selectedKBC[0].split(". ")[1] : selectedKBC[0];
        objectives.push(`Menginternalisasi nilai ${kbcName} melalui praktik nyata selama tahapan proyek.`);
      } else {
        objectives.push("Menguatkan karakter adab dan kasih sayang dalam interaksi selama kegiatan.");
      }

      // Add an objective related to the duration/complexity
      const jp = parseInt(data.alokasi_jp || "0", 10);
      if (jp > 4) {
        objectives.push(`Berkolaborasi secara aktif dalam kelompok untuk menyelesaikan tantangan proyek "${data.nama_kegiatan}".`);
      }
    }

    return objectives;
  };

  const letteredSectionIds = [
    'dimensiProfil', 'kbcSection', 'tujuanBesar', 'praktekPedagogis', 
    'lingkunganBelajar', 'kemitraanBelajar', 'mapelTerkait', 'pemanfaatanDigital', 
    'kegiatan18', 'asesmenSection', 'catatanAktivitas', 'rubrikPenilaian',
    'daftarPustaka', 'referensi', 'jurnalRefleksi'
  ];

  const getSectionLetterIndex = (id: string): number => {
    const currentSections = pdfSections 
      ? pdfSections.filter(s => s.enabled).map(s => s.id)
      : [
          'informasiUmum', 'dimensiProfil', 'kbcSection', 'tujuanBesar', 
          'praktekPedagogis', 'lingkunganBelajar', 'kemitraanBelajar', 'mapelTerkait',
          'pemanfaatanDigital', 'kegiatan18', 'asesmenSection', 'catatanAktivitas',
          'rubrikPenilaian', 'pengesahan', 'lkpdAppendix', 'glosarium', 'daftarPustaka', 'referensi', 'jurnalRefleksi'
        ];
    
    const letteredEnabled = currentSections.filter(sid => letteredSectionIds.includes(sid));
    return letteredEnabled.indexOf(id);
  };

  const integrationText = getIntegrationNarrative();
  const learningObjectives = getLearningObjectives();

  const renderSection = (id: string, index: number) => {
    switch(id) {
      case 'informasiUmum':
        return (
          <section key={id} id="section-info" className="mb-8">
            <h2 className="text-center text-lg font-bold uppercase mb-4 border-y-2 border-black py-2">
              Perencanaan Pembelajaran Kokurikuler
            </h2>
            <div className="pl-4">
              <table className="w-full border-none text-sm border-separate border-spacing-y-1">
                <tbody>
                  {[
                    { label: "Nama Madrasah", value: data.nama_madrasah },
                    { label: "Kelas/Semester", value: `${data.fase_kelas} / ${data.semester}` },
                    { label: "Tema", value: data.nama_kegiatan, bold: true },
                    { label: "Alokasi Waktu", value: `${data.alokasi_jp} JP (18 Pertemuan)` },
                    { label: "Jenis kokurikuler", value: data.jenis_kokurikuler },
                    { label: "Bentuk Kegiatan", value: data.bentuk_kegiatan },
                    { label: "Lokasi Kegiatan", value: data.lokasi_kegiatan },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="w-48 font-semibold text-gray-800 dark:text-gray-200 py-0.5">{row.label}</td>
                      <td className="w-4 py-0.5 text-center">:</td>
                      <td className={`py-0.5 ${row.bold ? 'font-bold text-primary-800 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {row.value || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );

      case 'dimensiProfil':
        return (
          <section key={id} id="section-A" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Dimensi Profil Lulusan")}
            <div className="pl-4 text-sm">
              <p className="text-gray-700 dark:text-gray-300 font-medium">{data.dimensi || "-"}</p>
            </div>
          </section>
        );

      case 'kbcSection':
        return (
          <section key={id} id="section-B" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Kurikulum Berbasis Cinta (KBC)")}
            <div className="pl-4 text-sm italic text-primary-800 dark:text-primary-400">
              {data.topik || "-"}
            </div>
          </section>
        );

      case 'tujuanBesar':
        return (
          <section key={id} id="section-C" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Tujuan Pembelajaran")}
            <div className="pl-4 text-sm">
              <ul className="list-decimal pl-5 space-y-1">
                {learningObjectives.map((tp, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{tp}</li>
                ))}
              </ul>
            </div>
          </section>
        );

      case 'praktekPedagogis':
        return (
          <section key={id} id="section-D" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Praktek Pedagogis")}
            <div className="pl-4 text-sm space-y-2">
              <p>• <strong>Model Pembelajaran:</strong> {pedagogisDesc[data.praktik_pedagogis || 'PjBL']}</p>
              <div className="mt-2">
                <p>• <strong>Refleksi:</strong></p>
                <div className="pl-4 text-xs italic text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.refleksi_ai || "Dilakukan setiap akhir pekan melalui \"Lingkaran Cerita\" di mana murid menceritakan perasaan saat merawat tanaman atau melakukan aktivitas."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </section>
        );

      case 'lingkunganBelajar':
        return (
          <section key={id} id="section-E" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Lingkungan Pembelajaran")}
            <div className="pl-4 text-sm text-justify leading-relaxed markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.lingkungan_belajar_ai || "• Lingkungan madrasah sebagai area eksplorasi utama.\n• Lingkungan rumah sebagai tempat praktik pembiasaan mandiri."}
              </ReactMarkdown>
            </div>
          </section>
        );

      case 'kemitraanBelajar':
        return (
          <section key={id} id="section-F" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Kemitraan Pembelajaran")}
            <div className="pl-4 text-sm space-y-3">
              <div>
                <p className="font-bold text-xs uppercase text-gray-500 mb-1">1. Satuan Pendidikan:</p>
                <div className="pl-2 border-l-2 border-primary-200 text-gray-700 dark:text-gray-300 italic">
                  {data.kemitraan_satuan_ai || "Kolaborasi guru mata pelajaran terkait dalam pendampingan kegiatan."}
                </div>
              </div>
              <div>
                <p className="font-bold text-xs uppercase text-gray-500 mb-1">2. Keluarga:</p>
                <div className="pl-2 border-l-2 border-primary-200 text-gray-700 dark:text-gray-300 italic">
                  {data.kemitraan_keluarga_ai || "Orang tua berperan sebagai pendamping saat murid melakukan perawatan di rumah."}
                </div>
              </div>
            </div>
          </section>
        );

      case 'mapelTerkait':
        return (
          <section key={id} id="section-G" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Mata Pelajaran yang Terkait")}
            <div className="pl-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              {data.mata_pelajaran_terkait || "-"}
            </div>
          </section>
        );

      case 'pemanfaatanDigital':
        return (
          <section key={id} id="section-H" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Pemanfaatan Digital")}
            <div className="pl-4 text-sm text-justify leading-relaxed italic">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.digital_ai || "Penggunaan aplikasi kamera untuk dokumentasi pertumbuhan tanaman dan video tutorial."}
              </ReactMarkdown>
            </div>
          </section>
        );

      case 'kegiatan18':
        return (
          <section key={id} id="section-I" className="mb-6 page-break-before">
            {getSectionHeader(getSectionLetterIndex(id), "Kegiatan (18 Pertemuan)")}
            <div className="pl-0 mt-2 text-sm">
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h3: ({node, ...props}) => {
                      const text = String(props.children);
                      if (text.toLowerCase().includes('pertemuan')) {
                        return (
                          <div className="flex items-center gap-3 mt-8 mb-4 bg-primary-100/50 dark:bg-primary-900/30 p-3 rounded-lg border-l-4 border-primary-600 shadow-sm print:shadow-none print:bg-gray-100 print:border-black">
                             <div className="flex-1">
                               <h3 className="text-primary-900 dark:text-primary-200 font-bold uppercase tracking-wider text-sm" {...props} />
                             </div>
                          </div>
                        );
                      }
                      return <h3 className="font-bold mt-6 mb-3 text-base text-gray-800 dark:text-gray-200" {...props} />;
                    },
                    hr: () => <hr className="my-10 border-t-2 border-dashed border-primary-200 dark:border-neutral-800 print:border-gray-300" />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-6" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-3 mb-6" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-primary-700 dark:text-primary-400 font-semibold" {...props} />
                  }}
                >
                  {(() => {
                    if (!data.kegiatan_18_pertemuan_ai) return "*Generate AI untuk melihat rencana detail 18 pertemuan.*";
                    let count = 1;
                    // Fix sequential numbering and ensure separators
                    const fixedText = data.kegiatan_18_pertemuan_ai
                      .replace(/^---\n/gm, '') // Remove existing separators to prevent duplicates
                      .replace(/### Pertemuan\s*\d*/gi, () => `### Pertemuan ${count++}`)
                      .replace(/### Pertemuan/g, '---\n### Pertemuan')
                      .replace(/^---\n/, ''); // Remove the very first separator if it's at the top
                    return fixedText;
                  })()}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        );

      case 'asesmenSection':
        return (
          <section key={id} id="section-J" className="mb-4">
            {getSectionHeader(getSectionLetterIndex(id), "Asesmen")}
            <div className="pl-4 text-sm text-justify leading-relaxed markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.asesmen_ai || "• LKPD (Lembar Kerja Peserta Didik): Terlampir\n• Observasi: Lembar ceklis perilaku mandiri."}
              </ReactMarkdown>
            </div>
          </section>
        );

      case 'catatanAktivitas':
        return (
          <section key={id} id="section-K" className="mb-10 page-break-before">
            {getSectionHeader(getSectionLetterIndex(id), "Catatan Hasil Aktivitas")}
            <div className="pl-4">
              <table className="w-full border-2 border-black text-xs">
                <tbody>
                  <tr className="h-8">
                    <td className="border border-black p-2 w-32 font-bold bg-gray-100">Nama Siswa</td>
                    <td className="border border-black p-2 text-gray-300 italic">..................................................................................</td>
                  </tr>
                  <tr className="h-8">
                    <td className="border border-black p-2 font-bold bg-gray-100">Aktivitas</td>
                    <td className="border border-black p-2 text-gray-300 italic">..................................................................................</td>
                  </tr>
                  <tr className="h-16">
                    <td className="border border-black p-2 font-bold bg-gray-100">Catatan Guru</td>
                    <td className="border border-black p-2 text-gray-300 italic">..................................................................................</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );

      case 'rubrikPenilaian':
        return (
          <section key={id} id="section-L" className="mb-6 page-break-before">
            {getSectionHeader(getSectionLetterIndex(id), "Rubrik Penilaian")}
            <div className="pl-4 text-sm overflow-x-auto overflow-hidden">
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {data.rubrik_ai || "*Generate AI untuk melihat rubrik penilaian.*"}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        );

      case 'lkpdAppendix':
        return (
          <div key={id} className="page-break-before mt-10 border-t-4 border-double border-gray-300 pt-10">
            <h2 className="bg-black text-white px-4 py-2 font-bold text-lg mb-6 text-center">
              LAMPIRAN: LEMBAR KERJA PESERTA DIDIK (LKPD)
            </h2>
            <div className="markdown-content bg-white dark:bg-neutral-900 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.lkpd_ai || "*Generate AI untuk melihat isi lampiran LKPD lengkap.*"}
              </ReactMarkdown>
            </div>
          </div>
        );

      case 'glosarium':
        return (
          <section key={id} id="section-glosarium" className="mb-6">
            <h3 className="font-bold border-b border-black mb-2 text-sm">GLOSARIUM</h3>
            <div className="text-xs italic text-gray-600 dark:text-neutral-400 space-y-1">
              <p>• <strong>KBC:</strong> Kurikulum Berbasis Cinta, pendekatan pendidikan yang mengedepankan adab dan kasih sayang.</p>
              <p>• <strong>PjBL:</strong> Project Based Learning, model pembelajaran berbasis proyek nyata.</p>
              <p>• <strong>DPL:</strong> Dimensi Profil Lulusan, standar kompetensi lulusan madrasah.</p>
            </div>
          </section>
        );

      case 'daftarPustaka':
        return (
          <section key={id} id="section-10" className="mb-6">
            {getSectionHeader(getSectionLetterIndex(id), "DAFTAR PUSTAKA")}
            <div className="pl-4 text-sm text-gray-700 dark:text-neutral-300">
              <p>1. Panduan Implementasi Kurikulum Merdeka di Madrasah - Kemenag RI.</p>
              <p>2. Pedoman Kurikulum Berbasis Cinta (KBC) - Ahli Kurikulum Madrasah.</p>
              <p>3. Standar Perkembangan Murid Madrasah Ibtidaiyah.</p>
            </div>
          </section>
        );

      case 'referensi':
        return (
          <section key={id} id="section-11" className="mb-6">
            {getSectionHeader(getSectionLetterIndex(id), "REFERENSI")}
            <div className="pl-4 text-sm text-gray-700 dark:text-neutral-300">
              <p>Kegiatan ini merujuk pada praktik baik dari berbagai Madrasah Ibtidaiyah unggulan yang telah menerapkan integrasi nilai-nilai lokal dan spilliritual.</p>
            </div>
          </section>
        );

      case 'jurnalRefleksi':
        return (
          <section key={id} id="section-12" className="mb-6 page-break-before">
            {getSectionHeader(getSectionLetterIndex(id), "JURNAL REFLEKSI GURU")}
            <div className="pl-4">
              <table className="w-full border-2 border-black text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-black p-2 w-10">No</th>
                    <th className="border border-black p-2">Pertanyaan Refleksi</th>
                    <th className="border border-black p-2">Jawaban / Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Apakah murid merasa gembira hari ini?",
                    "Nilai cinta apa yang paling menonjol dipraktikkan murid?",
                    "Apa kendala terbesar dalam pertemuan ini?",
                    "Apa hal menarik yang perlu dipertahankan?"
                  ].map((q, i) => (
                    <tr key={i} className="h-16">
                      <td className="border border-black p-2 text-center">{i+1}</td>
                      <td className="border border-black p-2">{q}</td>
                      <td className="border border-black p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case 'pengesahan':
        return (
          <div key={id} className="mt-16 text-sm break-inside-avoid print:mt-12 mb-10">
            <table className="w-full border-none">
              <tbody>
                <tr>
                  <td colSpan={2} className="text-right py-4 dark:text-neutral-400 pr-4">
                    {data.titimangsa || "...................., ...................."}
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="w-1/2 py-2 px-8 dark:text-neutral-300">
                    <p>Mengetahui,</p>
                    <p className="mb-24">Kepala Madrasah,</p>
                    <p className="font-bold underline uppercase dark:text-white">{data.nama_kepala || "........................................."}</p>
                    <p className="text-xs">NIP. {data.nip_kepala || "........................................."}</p>
                  </td>
                  <td className="w-1/2 py-2 px-8 dark:text-neutral-300">
                    <p className="invisible">Guru,</p>
                    <p className="mb-24">Guru/ Fasilitator,</p>
                    <p className="font-bold underline uppercase dark:text-white">{data.nama_guru || "........................................."}</p>
                    <p className="text-xs">NIP. {data.nip_guru || "........................................."}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const getSectionHeader = (index: number, title: string) => {
    const letter = String.fromCharCode(65 + index);
    return (
      <h2 className="bg-primary-600 print:bg-primary-700 text-white px-3 py-2 font-bold text-base mb-4 flex justify-between items-center group transition-colors rounded">
        <span>{letter}. {title}</span>
        <button 
          onClick={() => onEdit(index)}
          className="bg-white/20 hover:bg-white/40 text-[10px] px-2 py-0.5 rounded transition-colors flex items-center gap-1 print:hidden opacity-0 group-hover:opacity-100"
        >
          <span className="font-normal text-[8px] uppercase tracking-wider text-white">Edit</span>
        </button>
      </h2>
    );
  };

  return (
    <div id="printable-module" className="bg-card-bg p-8 md:p-12 shadow-lg border border-card-border text-app-text formal-document font-sans leading-relaxed max-w-[21cm] mx-auto mb-10 overflow-hidden transition-colors duration-300 print:shadow-none print:border-none print:p-0 relative">
      {showPageNumbers && <div className="print-page-number" />}
      
      {/* Header with Logo and Madrasah Name */}
      <div className="flex items-center gap-6 border-b-4 border-double border-black dark:border-app-text pb-4 mb-6">
        {data.logo_url && (
          <img src={data.logo_url} alt="Logo" className="w-20 h-20 object-contain print:brightness-0" />
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold uppercase dark:text-white text-black">Rencana Kegiatan Kokurikuler</h1>
          <p className="text-lg font-bold uppercase tracking-wider dark:text-neutral-400 text-gray-900">
            {data.nama_madrasah || "MADRASAH IBTIDAIYAH NEGERI 1 CIAMIS"}
          </p>
          <p className="text-base font-bold dark:text-primary-400 text-primary-800">
            Tahun Pelajaran {data.tahun_pelajaran || "2026/2027"}
          </p>
        </div>
      </div>

      {pdfSections 
        ? pdfSections.filter(s => s.enabled).map((section, idx) => (
            <React.Fragment key={section.id}>
              {renderSection(section.id, idx)}
            </React.Fragment>
          ))
        : [
            'informasiUmum', 'dimensiProfil', 'kbcSection', 'tujuanBesar', 
            'praktekPedagogis', 'lingkunganBelajar', 'kemitraanBelajar', 'mapelTerkait',
            'pemanfaatanDigital', 'kegiatan18', 'asesmenSection', 'catatanAktivitas',
            'rubrikPenilaian', 'pengesahan', 'lkpdAppendix', 'glosarium', 'daftarPustaka', 'referensi', 'jurnalRefleksi'
          ].map((id, idx) => (
            <React.Fragment key={id}>
              {renderSection(id, idx)}
            </React.Fragment>
          ))
      }
    </div>
  );
};
