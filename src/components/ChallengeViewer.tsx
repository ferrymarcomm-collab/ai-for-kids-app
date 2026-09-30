import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JILID_LIST } from '../data/curriculum';
import { JilidId } from '../types';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  ArrowRight,
  Plus,
  Trash2,
  Clock,
  UserCheck,
  Palette,
  MessageSquare,
  Eye,
  EyeOff,
  Bot,
  Database,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { playChimeSound, playFanfareSound, playSoftClick } from '../utils/audio';

const CANDIDATE_STEPS_JILID_1 = [
  { id: 'step-sched', text: '1. Cek jadwal pelajaran esok hari di buku penghubung', isValid: true, idealOrder: 1 },
  { id: 'step-books', text: '2. Masukkan buku pelajaran & buku tulis sesuai jadwal', isValid: true, idealOrder: 2 },
  { id: 'step-pencil', text: '3. Masukkan kotak pensil berisi alat tulis lengkap', isValid: true, idealOrder: 3 },
  { id: 'step-bottle', text: '4. Isi botol air minum dan taruh di kantong luar tas', isValid: true, idealOrder: 4 },
  { id: 'step-zip', text: '5. Tarik dan tutup semua ritsleting tas hingga rapat', isValid: true, idealOrder: 5 },
  { id: 'step-door', text: '6. Letakkan tas di dekat pintu agar siap berangkat pagi', isValid: true, idealOrder: 6 },
  // Distractors
  { id: 'dist-floor', text: '❌ Biarkan tas terbuka tergeletak di lantai', isValid: false, bugMsg: 'Bug: Buku bisa tercecer atau kotor jika tas dibiarkan terbuka di lantai!' },
  { id: 'dist-dirty', text: '❌ Masukkan sepatu olahraga kotor ke dalam buku', isValid: false, bugMsg: 'Bug: Buku bisa rusak dan kotor terkena lumpur sepatu!' },
];

const CANDIDATE_STEPS_JILID_2 = [
  { id: 'anim-show', text: '1. [Tampilkan] Munculkan karakter di tengah panggung', stepNum: 1, isValid: true },
  { id: 'anim-move', text: '2. [Gerak] Bergerak maju 15 langkah ke depan', stepNum: 2, isValid: true },
  { id: 'anim-say', text: '3. [Katakan] Tampilkan balon bicara "Halo Dunia! Aku Animator Cilik! 🎨"', stepNum: 3, isValid: true },
  { id: 'anim-hide', text: '4. [Sembunyikan] Karakter menghilang dari panggung', stepNum: 4, isValid: true },
  { id: 'anim-show-again', text: '5. [Tampilkan Kembali] Karakter muncul kembali menyapa penonton', stepNum: 5, isValid: true },
  // Distractor
  { id: 'anim-dist-crash', text: '❌ [Tutup Laptop] Matikan paksa Scratch sebelum animasi selesai', isValid: false, bugMsg: 'Bug: Program terputus sebelum animasi 5 langkah selesai diputar!' },
];

const TRAINING_DATA_JILID_3 = [
  { id: 'tr-1', name: 'Bola Kelereng', emoji: '🔮', category: 'BULAT', feature: 'Kurva bundar melingkar 360°' },
  { id: 'tr-2', name: 'Jeruk Manis', emoji: '🍊', category: 'BULAT', feature: 'Bentuk bundar mulus' },
  { id: 'tr-3', name: 'Koin Emas', emoji: '🪙', category: 'BULAT', feature: 'Piringan bulat tanpa sudut' },
  { id: 'tr-4', name: 'Buku Tulis', emoji: '📚', category: 'TIDAK BULAT', feature: 'Persegi panjang dengan 4 sudut siku' },
  { id: 'tr-5', name: 'Penggaris Siku', emoji: '📐', category: 'TIDAK BULAT', feature: 'Bentuk segitiga bersudut lancip' },
  { id: 'tr-6', name: 'Kotak Pensil', emoji: '📦', category: 'TIDAK BULAT', feature: 'Bentuk balok dengan sisi lurus' },
];

const TEST_DATA_JILID_3 = [
  { id: 'test-1', name: 'Semangka Utuh', emoji: '🍉', expected: 'BULAT', desc: 'Bentuk lonjong bundar melingkar tanpa sudut' },
  { id: 'test-2', name: 'Papan Tulis Mini', emoji: '📋', expected: 'TIDAK BULAT', desc: 'Papan datar persegi panjang dengan sudut' },
  { id: 'test-3', name: 'Donat Cokelat', emoji: '🍩', expected: 'BULAT', desc: 'Kue cincin melingkar bundar tanpa sudut' },
];

const CANDIDATE_STEPS_JILID_4 = [
  { id: 'step-v1', text: '1. [Pra-Produksi] Susun Storyboard 4 Panel: Awal, Masalah, Aksi, dan Akhir', stepNum: 1, isValid: true },
  { id: 'step-v2', text: '2. [Pemicu/Event] Pasang trigger tombol untuk perpindahan adegan cerita', stepNum: 2, isValid: true },
  { id: 'step-v3', text: '3. [Produksi] Rekam video 45 detik dengan framing stabil dan pencahayaan depan', stepNum: 3, isValid: true },
  { id: 'step-v4', text: '4. [Editing] Potong klip canggung (trimming) dan pasang teks judul pembuka', stepNum: 4, isValid: true },
  { id: 'step-v5', text: '5. [Safety Check] Pastikan bebas data pribadi, alamat, dan nomor kontak keluarga', stepNum: 5, isValid: true },
  // Distractors
  { id: 'dist-v-leak', text: '❌ [Bocorkan Data] Cantumkan alamat rumah lengkap dan nomor telepon orang tua di video', isValid: false, bugMsg: 'Bug Privasi: Alamat rumah dan nomor kontak keluarga DILARANG dicantumkan dalam video!' },
  { id: 'dist-v-dark', text: '❌ [Kamera Gelap Gulita] Rekam video di tempat gelap tanpa cahaya sambil diayun-ayun kencang', isValid: false, bugMsg: 'Bug Kualitas Visual: Video gelap gulita dan bergoyang ekstrem membuat penonton tidak dapat menikmati pesanmu!' },
];

const CANDIDATE_STEPS_JILID_5 = [
  { id: 'step-m1', text: '1. [Tentukan Masalah] Rumuskan masalah mekanik: membuat dispenser/peluncur benda kardus', stepNum: 1, isValid: true },
  { id: 'step-m2', text: '2. [Buat Desain] Gambar sketsa cetak biru (blueprint) mekanisme tuas, jalur luncur, dan penyangga', stepNum: 2, isValid: true },
  { id: 'step-m3', text: '3. [Rakit Prototype V1] Susun kardus bekas, sedotan kertas, stik es krim, dan selotip aman', stepNum: 3, isValid: true },
  { id: 'step-m4', text: '4. [Uji Coba 3 Kali] Uji dorong/luncur bola kertas ringan melintasi meja belajar', stepNum: 4, isValid: true },
  { id: 'step-m5', text: '5. [Temukan Masalah] Identifikasi kelemahan: tiang penyangga goyang atau jalur luncur kurang curam', stepNum: 5, isValid: true },
  { id: 'step-m6', text: '6. [Perbaiki Desain] Pasang penopang segitiga ganda dari stik es krim hingga Prototype V2 kokoh', stepNum: 6, isValid: true },
  { id: 'step-m7', text: '7. [Demonstrasi Aman] Peragakan hasil karya mekanik bebas listrik, tanpa api, dan ramah anak', stepNum: 7, isValid: true },
  // Distractors
  { id: 'dist-m-elec', text: '❌ [Listrik Tegangan Tinggi] Colokkan kabel telanjang ke stopkontak listrik PLN tanpa adaptor', isValid: false, bugMsg: 'Bug Keselamatan: DILARANG menggunakan listrik AC atau kabel terbuka! Utamakan Paper & Cardboard Engineering.' },
  { id: 'dist-m-heat', text: '❌ [Alat Panas Berbahaya] Gunakan solder panas atau api lilin tanpa izin dan pendampingan orang dewasa', isValid: false, bugMsg: 'Bug Keselamatan: DILARANG menggunakan solder atau api! Utamakan selotip, lem kertas tumpul, dan bahan aman.' },
];

const CANDIDATE_STEPS_JILID_6 = [
  { id: 'step-mz-1', text: '1. [Event Pemicu] Ketika Tombol "Jalankan Robot" Ditekan ▶️', stepNum: 1, isValid: true },
  { id: 'step-mz-2', text: '2. [WAJIB 1 - Repeat Until] Ulangi Sampai: Robot Menyentuh Bendera Finis 🚩', stepNum: 2, isValid: true, isRepeatUntil: true },
  { id: 'step-mz-3', text: '3. [Sensor Logika] Cek Sensor Laser Depan: Apakah Ada Dinding di Depan? ⚡', stepNum: 3, isValid: true },
  { id: 'step-mz-4', text: '4. [WAJIB 2 - If / Else] JIKA Ada Dinding: Belok Kanan 90°, JIKA TIDAK: Maju 1 Langkah 🤖', stepNum: 4, isValid: true, isIfElse: true },
  { id: 'step-mz-5', text: '5. [Kondisi Menang] Tampilkan "Hore, Robot Berhasil Keluar Labirin! 🏆"', stepNum: 5, isValid: true },
  // Distractors
  { id: 'dist-mz-inf', text: '❌ [Loop Tanpa Henti] Ulangi Selamanya Tanpa Kondisi Berhenti (Robot Menabrak Tembok Berulang Kali)', isValid: false, bugMsg: 'Bug Algoritma: Robot terjebak infinite loop tanpa kondisi Repeat Until! Wajib gunakan balok "Repeat Until <Menyentuh Bendera Finis>".' },
  { id: 'dist-mz-blind', text: '❌ [Gerak Buta] Selalu Maju Mengabaikan Tembok Tanpa Menggunakan If/Else', isValid: false, bugMsg: 'Bug Tabrakan: Robot menabrak dinding karena tidak menggunakan percabangan If/Else untuk memeriksa rintangan!' },
];

const CANDIDATE_STEPS_JILID_7 = [
  { id: 'step-cs-1', text: '1. [TUGAS 1 - Data Pribadi] Kunci Rahasia: Sembunyikan alamat rumah, telepon & password; hanya bagikan hobi umum 🔒', stepNum: 1, isValid: true },
  { id: 'step-cs-2', text: '2. [TUGAS 2 - Password Baja Dummy] Rancang Password Fiktif Kuat: >8 Karakter dengan huruf besar, angka & simbol (!#?) 🔑', stepNum: 2, isValid: true },
  { id: 'step-cs-3', text: '3. [TUGAS 3 - Detektif Phishing] Deteksi Red Flags: Tandai iming-iming hadiah mencurigakan & nada mendesak palsu 🕵️', stepNum: 3, isValid: true },
  { id: 'step-cs-4', text: '4. [TUGAS 4 - Poster Visual] Desain Poster Edukasi: Kontras tinggi, judul mencolok "Lindungi Passwordmu!" & tata letak rapi 🎨', stepNum: 4, isValid: true },
  { id: 'step-cs-5', text: '5. [TUGAS 5 - Protokol Aman] Tindakan Darurat: Berhenti sejenak, Jangan Klik, Jangan Kirim Data, dan Laporkan ke Orang Dewasa 🛡️', stepNum: 5, isValid: true },
  // Distractors
  { id: 'dist-cs-leak', text: '❌ [Bocorkan Password Asli] Ketikkan password akun pribadi atau kartu identitas keluarga di internet', isValid: false, bugMsg: 'Bug Keamanan Fatal: DILARANG menggunakan password asli atau mengunggah data identitas keluarga! Gunakan contoh fiktif/dummy saja.' },
  { id: 'dist-cs-click', text: '❌ [Klik Link Sembarangan] Terburu-buru mengklik tautan hadiah gratis misterius dari orang asing', isValid: false, bugMsg: 'Bug Phishing: Mengklik tautan mencurigakan dapat membahayakan privasimu! Terapkan protokol Berhenti dan Jangan Klik.' },
];

const CANDIDATE_STEPS_JILID_8 = [
  { id: 'step-ia-1', text: '1. [Definisi Fungsi] Definisikan balok modular: Function "Tanya_Soal(nomor_soal)" 📦', stepNum: 1, isValid: true },
  { id: 'step-ia-2', text: '2. [Input Pengguna] Tangkap masukan jawaban anak melalui klik tombol opsi pilihan (A, B, atau C) ⌨️', stepNum: 2, isValid: true },
  { id: 'step-ia-3', text: '3. [Proses Logika] Cek kebenaran: JIKA Jawaban Benar MAKA Tambah Skor +10, ELSE Kurangi Skor -5 ⚙️', stepNum: 3, isValid: true },
  { id: 'step-ia-4', text: '4. [Output Hasil] Perbarui angka skor di layar monitor dan bunyikan suara umpan balik ceria 📊', stepNum: 4, isValid: true },
  { id: 'step-ia-5', text: '5. [Panggil Berulang] Panggil Tanya_Soal(1) untuk Pertanyaan 1, lalu panggil Tanya_Soal(2) untuk Pertanyaan 2 🔄', stepNum: 5, isValid: true },
  // Distractors
  { id: 'dist-ia-inf', text: '❌ [Loop Tanpa Henti] Tanya soal 1 terus-menerus tanpa pernah beralih ke soal nomor 2', isValid: false, bugMsg: 'Bug Algoritma: Pemain terjebak loop selamanya di soal 1! Pastikan fungsi dipanggil berurutan untuk soal 1 dan soal 2.' },
  { id: 'dist-ia-nofunc', text: '❌ [Tanpa Fungsi] Salin-tempel kode logika yang sama puluhan kali tanpa membuat fungsi Tanya_Soal', isValid: false, bugMsg: 'Bug Arsitektur: Kode berantakan dan rawan salah ketik! Bungkus alur pertanyaan ke dalam Function Tanya_Soal() agar modular dan reusable.' },
];

export const ChallengeViewer: React.FC = () => {
  const {
    submitJilidChallenge,
    simulateTeacherValidation,
    progress,
    setActiveTab,
    isJilid2Unlocked,
    isJilid3Unlocked,
    isJilid4Unlocked,
    isJilid5Unlocked,
    isJilid6Unlocked,
    isJilid7Unlocked,
    isJilid8Unlocked,
  } = useApp();

  const [activeChallengeJilid, setActiveChallengeJilid] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);

  // ==================== JILID 1 STATE ====================
  const jilid1Submission = progress.challengeSubmissions[1];
  const isJ1Submitted = !!jilid1Submission?.completed;
  const isJ1Validated = jilid1Submission?.status === 'Divalidasi';
  const isJ1Waiting = jilid1Submission?.status === 'Menunggu Validasi';
  const isJ1BadgeEarned = progress.earnedBadges.includes(1);

  const [selectedStepsJ1, setSelectedStepsJ1] = useState<string[]>(
    jilid1Submission?.steps || []
  );
  const [testResultJ1, setTestResultJ1] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleAddStepJ1 = (text: string) => {
    if (selectedStepsJ1.length >= 6) {
      setTestResultJ1({
        success: false,
        message: 'Maksimal 6 langkah algoritma ya, Coder! Hapus atau ganti salah satu langkah jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ1.includes(text)) {
      playSoftClick();
      setSelectedStepsJ1([...selectedStepsJ1, text]);
      setTestResultJ1(null);
    }
  };

  const handleRemoveStepJ1 = (index: number) => {
    setSelectedStepsJ1(selectedStepsJ1.filter((_, i) => i !== index));
    setTestResultJ1(null);
  };

  const handleResetJ1 = () => {
    setSelectedStepsJ1([]);
    setTestResultJ1(null);
  };

  const handleTestAlgorithmJ1 = () => {
    if (selectedStepsJ1.length < 4) {
      setTestResultJ1({
        success: false,
        message: 'Algoritmamu masih terlalu singkat! Tambahkan setidaknya 4–6 langkah persiapan yang lengkap.',
      });
      return;
    }

    const hasDistractor = selectedStepsJ1.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_1.find(c => selectedStepsJ1.includes(c.text) && !c.isValid);
      setTestResultJ1({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada langkah berbahaya/kurang tepat dalam urutan tas sekolahmu. Coba perbaiki!',
      });
      return;
    }

    setTestResultJ1({
      success: true,
      message: 'Challenge berhasil dikirim! 🎉 Algoritma 6 langkahmu teruji bebas bug. Sekarang berstatus: MENUNGGU VALIDASI.',
    });

    submitJilidChallenge(1, selectedStepsJ1, 'Algoritma persiapan tas sekolah 6 langkah.');
  };

  // ==================== JILID 2 STATE ====================
  const jilid2Submission = progress.challengeSubmissions[2];
  const isJ2Submitted = !!jilid2Submission?.completed;
  const isJ2Validated = jilid2Submission?.status === 'Divalidasi';
  const isJ2Waiting = jilid2Submission?.status === 'Menunggu Validasi';
  const isJ2BadgeEarned = progress.earnedBadges.includes(2);

  const [selectedStepsJ2, setSelectedStepsJ2] = useState<string[]>(
    jilid2Submission?.steps || []
  );
  const [testResultJ2, setTestResultJ2] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Animation preview stage state
  const [animStageState, setAnimStageState] = useState<'idle' | 'showing' | 'moving' | 'talking' | 'hidden' | 'showing_again'>('idle');
  const [isPlayingAnim, setIsPlayingAnim] = useState(false);

  const handleAddStepJ2 = (text: string) => {
    if (selectedStepsJ2.length >= 5) {
      setTestResultJ2({
        success: false,
        message: 'Maksimal 5 langkah animasi ya, Coder! Hapus atau ganti salah satu langkah jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ2.includes(text)) {
      playSoftClick();
      setSelectedStepsJ2([...selectedStepsJ2, text]);
      setTestResultJ2(null);
    }
  };

  const handleRemoveStepJ2 = (index: number) => {
    setSelectedStepsJ2(selectedStepsJ2.filter((_, i) => i !== index));
    setTestResultJ2(null);
  };

  const handleResetJ2 = () => {
    setSelectedStepsJ2([]);
    setTestResultJ2(null);
    setAnimStageState('idle');
  };

  const handlePlayAndSubmitJ2 = () => {
    if (selectedStepsJ2.length < 5) {
      setTestResultJ2({
        success: false,
        message: 'Animasi harus memuat lengkap 5 langkah: 1. Muncul, 2. Bergerak, 3. Berbicara, 4. Menghilang, 5. Muncul kembali!',
      });
      return;
    }

    const hasDistractor = selectedStepsJ2.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      setTestResultJ2({
        success: false,
        message: 'Ada langkah keliru yang merusak alur animasi. Hapus balok bertanda ❌!',
      });
      return;
    }

    // Play stage animation
    setIsPlayingAnim(true);
    setAnimStageState('showing');

    setTimeout(() => {
      setAnimStageState('moving');
    }, 700);

    setTimeout(() => {
      setAnimStageState('talking');
    }, 1500);

    setTimeout(() => {
      setAnimStageState('hidden');
    }, 2500);

    setTimeout(() => {
      setAnimStageState('showing_again');
      setIsPlayingAnim(false);

      setTestResultJ2({
        success: true,
        message: 'Challenge Animator Pertama berhasil dikirim! 🎉 Karakter berhasil muncul, bergerak, bicara, sembunyi, dan muncul kembali. Sekarang berstatus: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(2, selectedStepsJ2, 'Karya animasi Scratch 5 langkah karakter hidup.');
    }, 3500);
  };

  // ==================== JILID 3 STATE ====================
  const jilid3Submission = progress.challengeSubmissions[3];
  const isJ3Submitted = !!jilid3Submission?.completed;
  const isJ3Validated = jilid3Submission?.status === 'Divalidasi';
  const isJ3Waiting = jilid3Submission?.status === 'Menunggu Validasi';
  const isJ3BadgeEarned = progress.earnedBadges.includes(3);

  const [isJ3ModelTrained, setIsJ3ModelTrained] = useState<boolean>(isJ3Submitted || false);
  const [isTrainingAnim, setIsTrainingAnim] = useState<boolean>(false);
  const [testGuessesJ3, setTestGuessesJ3] = useState<Record<string, 'BULAT' | 'TIDAK BULAT'>>({});
  const [testResultJ3, setTestResultJ3] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTrainModelJ3 = () => {
    setIsTrainingAnim(true);
    setTimeout(() => {
      setIsTrainingAnim(false);
      setIsJ3ModelTrained(true);
    }, 1000);
  };

  const handleSelectGuessJ3 = (testId: string, guess: 'BULAT' | 'TIDAK BULAT') => {
    setTestGuessesJ3(prev => ({
      ...prev,
      [testId]: guess,
    }));
    setTestResultJ3(null);
  };

  const handleResetJ3 = () => {
    setIsJ3ModelTrained(false);
    setTestGuessesJ3({});
    setTestResultJ3(null);
  };

  const handleTestAndSubmitJ3 = () => {
    if (!isJ3ModelTrained) {
      setTestResultJ3({
        success: false,
        message: 'Latih model AI terlebih dahulu sebelum menguji data baru!',
      });
      return;
    }

    if (Object.keys(testGuessesJ3).length < 3) {
      setTestResultJ3({
        success: false,
        message: 'Ujilah semua 3 objek baru (Semangka, Papan Tulis, Donat) terlebih dahulu!',
      });
      return;
    }

    let correctCount = 0;
    TEST_DATA_JILID_3.forEach(item => {
      if (testGuessesJ3[item.id] === item.expected) {
        correctCount++;
      }
    });

    if (correctCount < 3) {
      setTestResultJ3({
        success: false,
        message: `Akurasi modelmu masih ${correctCount}/3. Periksa kembali ciri visual objek: apakah benda tersebut memiliki kurva melingkar bundar atau sisi bersudut?`,
      });
      return;
    }

    setTestResultJ3({
      success: true,
      message: 'Challenge berhasil dikirim! 🎉 Model AI klasifikasi 2 kategorimu mencapai akurasi 100% (3/3 benar). Status: MENUNGGU VALIDASI dari Guru/Tutor.',
    });

    submitJilidChallenge(
      3,
      [
        'Data Latihan: 6 Objek Bulat & Tidak Bulat',
        'Pola Ciri: Kurva Melingkar vs Sisi Bersudut',
        'Training Model AI Klasifikasi',
        'Pengujian 3 Data Baru (Akurasi 100%)',
        'Evaluasi Hasil Klasifikasi',
      ],
      'Simulasi training AI klasifikasi objek 2 kategori dengan 100% akurasi.'
    );
  };

  // ==================== JILID 4 STATE ====================
  const jilid4Submission = progress.challengeSubmissions[4];
  const isJ4Submitted = !!jilid4Submission?.completed;
  const isJ4Validated = jilid4Submission?.status === 'Divalidasi';
  const isJ4Waiting = jilid4Submission?.status === 'Menunggu Validasi';
  const isJ4BadgeEarned = progress.earnedBadges.includes(4);

  const [selectedStepsJ4, setSelectedStepsJ4] = useState<string[]>(
    jilid4Submission?.steps || []
  );
  const [testResultJ4, setTestResultJ4] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Video preview stage state
  const [isPlayingVideoPreview, setIsPlayingVideoPreview] = useState(false);
  const [videoPreviewPhase, setVideoPreviewPhase] = useState<'idle' | 'storyboard' | 'recording' | 'editing' | 'finished'>('idle');

  const handleAddStepJ4 = (text: string) => {
    if (selectedStepsJ4.length >= 5) {
      setTestResultJ4({
        success: false,
        message: 'Maksimal 5 tahapan produksi video ya, Coder! Hapus atau ganti salah satu tahapan jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ4.includes(text)) {
      playSoftClick();
      setSelectedStepsJ4([...selectedStepsJ4, text]);
      setTestResultJ4(null);
    }
  };

  const handleRemoveStepJ4 = (index: number) => {
    setSelectedStepsJ4(selectedStepsJ4.filter((_, i) => i !== index));
    setTestResultJ4(null);
  };

  const handleResetJ4 = () => {
    setSelectedStepsJ4([]);
    setTestResultJ4(null);
    setVideoPreviewPhase('idle');
  };

  const handlePlayAndSubmitJ4 = () => {
    if (selectedStepsJ4.length < 5) {
      setTestResultJ4({
        success: false,
        message: 'Rantai produksi video harus memuat lengkap 5 tahapan: 1. Storyboard, 2. Event Trigger, 3. Produksi Kamera, 4. Editing & Trimming, 5. Safety Check!',
      });
      return;
    }

    const hasDistractor = selectedStepsJ4.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_4.find(c => selectedStepsJ4.includes(c.text) && !c.isValid);
      setTestResultJ4({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada langkah keliru atau berbahaya dalam alur produksi video. Hapus balok bertanda ❌!',
      });
      return;
    }

    // Play production simulation
    setIsPlayingVideoPreview(true);
    setVideoPreviewPhase('storyboard');

    setTimeout(() => {
      setVideoPreviewPhase('recording');
    }, 900);

    setTimeout(() => {
      setVideoPreviewPhase('editing');
    }, 1900);

    setTimeout(() => {
      setVideoPreviewPhase('finished');
      setIsPlayingVideoPreview(false);

      setTestResultJ4({
        success: true,
        message: 'Challenge Sutradara Cilik berhasil dikirim! 🎉 Alur produksi dan editing video edukasi 5 tahapmu terbukti runtut, kreatif, dan terjaga keamanannya. Status: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(
        4,
        selectedStepsJ4,
        'Karya produksi video edukasi 5 langkah terarah dan aman.'
      );
    }, 3000);
  };

  // ==================== JILID 5 STATE ====================
  const jilid5Submission = progress.challengeSubmissions[5];
  const isJ5Submitted = !!jilid5Submission?.completed;
  const isJ5Validated = jilid5Submission?.status === 'Divalidasi';
  const isJ5Waiting = jilid5Submission?.status === 'Menunggu Validasi';
  const isJ5BadgeEarned = progress.earnedBadges.includes(5);

  const [selectedStepsJ5, setSelectedStepsJ5] = useState<string[]>(
    jilid5Submission?.steps || []
  );
  const [testResultJ5, setTestResultJ5] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Maker workbench preview state
  const [isPlayingMakerPreview, setIsPlayingMakerPreview] = useState(false);
  const [makerPreviewPhase, setMakerPreviewPhase] = useState<'idle' | 'blueprint' | 'crafting' | 'testing' | 'finished'>('idle');

  const handleAddStepJ5 = (text: string) => {
    if (selectedStepsJ5.length >= 7) {
      setTestResultJ5({
        success: false,
        message: 'Maksimal 7 tahapan rekayasa maker ya, Coder! Hapus atau ganti salah satu tahapan jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ5.includes(text)) {
      playSoftClick();
      setSelectedStepsJ5([...selectedStepsJ5, text]);
      setTestResultJ5(null);
    }
  };

  const handleRemoveStepJ5 = (index: number) => {
    setSelectedStepsJ5(selectedStepsJ5.filter((_, i) => i !== index));
    setTestResultJ5(null);
  };

  const handleResetJ5 = () => {
    setSelectedStepsJ5([]);
    setTestResultJ5(null);
    setMakerPreviewPhase('idle');
  };

  const handlePlayAndSubmitJ5 = () => {
    if (selectedStepsJ5.length < 7) {
      setTestResultJ5({
        success: false,
        message: 'Siklus rekayasa Insinyur Maker harus memuat lengkap 7 tahapan: 1. Masalah, 2. Desain Blueprint, 3. Prototype V1, 4. Uji Coba, 5. Temukan Masalah, 6. Perbaiki V2, 7. Demonstrasi Aman!',
      });
      return;
    }

    const hasDistractor = selectedStepsJ5.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_5.find(c => selectedStepsJ5.includes(c.text) && !c.isValid);
      setTestResultJ5({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada langkah berbahaya dalam alur perakitan maker. Hapus balok bertanda ❌!',
      });
      return;
    }

    // Play maker simulation
    setIsPlayingMakerPreview(true);
    setMakerPreviewPhase('blueprint');

    setTimeout(() => {
      setMakerPreviewPhase('crafting');
    }, 900);

    setTimeout(() => {
      setMakerPreviewPhase('testing');
    }, 1900);

    setTimeout(() => {
      setMakerPreviewPhase('finished');
      setIsPlayingMakerPreview(false);

      setTestResultJ5({
        success: true,
        message: 'Challenge Insinyur Maker berhasil dikirim! 🎉 Siklus rekayasa 7 tahap dan purwarupa kardus V2 teruji kokoh, kreatif, dan mengutamakan keselamatan kerja. Status: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(
        5,
        selectedStepsJ5,
        'Purwarupa rekayasa kardus V2 teruji kokoh dan aman.'
      );
    }, 3000);
  };

  // ==================== JILID 6 STATE ====================
  const jilid6Submission = progress.challengeSubmissions[6];
  const isJ6Submitted = !!jilid6Submission?.completed;
  const isJ6Validated = jilid6Submission?.status === 'Divalidasi';
  const isJ6Waiting = jilid6Submission?.status === 'Menunggu Validasi';
  const isJ6BadgeEarned = progress.earnedBadges.includes(6);

  const [selectedStepsJ6, setSelectedStepsJ6] = useState<string[]>(
    jilid6Submission?.steps || []
  );
  const [testResultJ6, setTestResultJ6] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Maze runner preview state
  const [isPlayingMazePreview, setIsPlayingMazePreview] = useState(false);
  const [mazePhase, setMazePhase] = useState<'idle' | 'scanning' | 'looping' | 'turning' | 'finished'>('idle');
  const [robotGridStep, setRobotGridStep] = useState(0);

  const handleAddStepJ6 = (text: string) => {
    if (selectedStepsJ6.length >= 5) {
      setTestResultJ6({
        success: false,
        message: 'Maksimal 5 balok logika labirin ya, Coder! Hapus atau ganti salah satu balok jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ6.includes(text)) {
      playSoftClick();
      setSelectedStepsJ6([...selectedStepsJ6, text]);
      setTestResultJ6(null);
    }
  };

  const handleRemoveStepJ6 = (index: number) => {
    setSelectedStepsJ6(selectedStepsJ6.filter((_, i) => i !== index));
    setTestResultJ6(null);
  };

  const handleResetJ6 = () => {
    setSelectedStepsJ6([]);
    setTestResultJ6(null);
    setMazePhase('idle');
    setRobotGridStep(0);
  };

  const handlePlayAndSubmitJ6 = () => {
    if (selectedStepsJ6.length < 4) {
      setTestResultJ6({
        success: false,
        message: 'Algoritma Labirin Master harus memuat minimal 4 balok logika terstruktur.',
      });
      return;
    }

    const hasDistractor = selectedStepsJ6.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_6.find(c => selectedStepsJ6.includes(c.text) && !c.isValid);
      setTestResultJ6({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada balok keliru atau berbahaya dalam logika labirin. Hapus balok bertanda ❌!',
      });
      return;
    }

    // WAJIB 1: Repeat Until
    const hasRepeatUntil = selectedStepsJ6.some(s => s.includes('Repeat Until') || s.includes('Ulangi Sampai'));
    if (!hasRepeatUntil) {
      setTestResultJ6({
        success: false,
        message: 'WAJIB 1 Belum Terpenuhi: Masukkan balok loop "Repeat Until" (Ulangi Sampai: Robot Menyentuh Bendera Finis) agar robot tidak berhenti sebelum mencapai target!',
      });
      return;
    }

    // WAJIB 2: If / Else
    const hasIfElse = selectedStepsJ6.some(s => s.includes('If / Else') || (s.includes('JIKA') && s.includes('JIKA TIDAK')));
    if (!hasIfElse) {
      setTestResultJ6({
        success: false,
        message: 'WAJIB 2 Belum Terpenuhi: Masukkan balok percabangan "If / Else" (JIKA Ada Dinding Belok Kanan, JIKA TIDAK Maju 1 Langkah) agar robot cerdas mengenali rintangan!',
      });
      return;
    }

    // Run interactive maze simulation
    setIsPlayingMazePreview(true);
    setMazePhase('scanning');
    setRobotGridStep(1);

    setTimeout(() => {
      setMazePhase('looping');
      setRobotGridStep(2);
    }, 800);

    setTimeout(() => {
      setMazePhase('turning');
      setRobotGridStep(3);
    }, 1800);

    setTimeout(() => {
      setMazePhase('finished');
      setRobotGridStep(4);
      setIsPlayingMazePreview(false);

      setTestResultJ6({
        success: true,
        message: 'Challenge Labirin Master berhasil dikirim! 🧩 Robot sukses menavigasi maze dengan perpaduan Repeat Until & If/Else yang solid. Status: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(
        6,
        selectedStepsJ6,
        'Robot sukses menavigasi maze labirin dengan blok Repeat Until dan percabangan If/Else.'
      );
    }, 2900);
  };

  // ==================== JILID 7 STATE ====================
  const jilid7Submission = progress.challengeSubmissions[7];
  const isJ7Submitted = !!jilid7Submission?.completed;
  const isJ7Validated = jilid7Submission?.status === 'Divalidasi';
  const isJ7Waiting = jilid7Submission?.status === 'Menunggu Validasi';
  const isJ7BadgeEarned = progress.earnedBadges.includes(7);

  const [selectedStepsJ7, setSelectedStepsJ7] = useState<string[]>(
    jilid7Submission?.steps || []
  );
  const [testResultJ7, setTestResultJ7] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Interactive 5-Mission Cyber Safety Lab States
  const [isPlayingCyberPreview, setIsPlayingCyberPreview] = useState(false);
  const [cyberPhase, setCyberPhase] = useState<'idle' | 'privacy' | 'password' | 'phishing' | 'poster' | 'protocol' | 'finished'>('idle');

  // Mini-lab helper interactive states
  const [activeLabTab, setActiveLabTab] = useState<'t1' | 't2' | 't3' | 't4' | 't5'>('t1');
  const [dummyPasswordInput, setDummyPasswordInput] = useState('Bintang#Lari88!');
  const [phishingFlagsFound, setPhishingFlagsFound] = useState<number[]>([1, 2, 3]);
  const [posterTheme, setPosterTheme] = useState<'Aman di Internet' | 'Lindungi Password' | 'Bersikap Baik'>('Lindungi Password');
  const [protocolChecked, setProtocolChecked] = useState<number[]>([1, 2, 3, 4]);

  const handleAddStepJ7 = (text: string) => {
    if (selectedStepsJ7.length >= 5) {
      setTestResultJ7({
        success: false,
        message: 'Maksimal 5 langkah misi Cyber Safety Hero ya, Coder! Hapus atau ganti salah satu langkah jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ7.includes(text)) {
      playSoftClick();
      setSelectedStepsJ7([...selectedStepsJ7, text]);
      setTestResultJ7(null);
    }
  };

  const handleRemoveStepJ7 = (index: number) => {
    setSelectedStepsJ7(selectedStepsJ7.filter((_, i) => i !== index));
    setTestResultJ7(null);
  };

  const handleResetJ7 = () => {
    setSelectedStepsJ7([]);
    setTestResultJ7(null);
    setCyberPhase('idle');
  };

  const handlePlayAndSubmitJ7 = () => {
    if (selectedStepsJ7.length < 5) {
      setTestResultJ7({
        success: false,
        message: 'Tantangan Cyber Safety Hero wajib menyelesaikan kelima misi: (1) Privasi Data, (2) Password Baja Dummy, (3) Detektif Phishing, (4) Desain Poster Edukasi, dan (5) Protokol Darurat!',
      });
      return;
    }

    const hasDistractor = selectedStepsJ7.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_7.find(c => selectedStepsJ7.includes(c.text) && !c.isValid);
      setTestResultJ7({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada langkah berbahaya bagi keselamatan siber dalam susunan misimu. Hapus balok bertanda ❌!',
      });
      return;
    }

    // Verify all 5 tasks are covered
    const hasT1 = selectedStepsJ7.some(s => s.includes('TUGAS 1') || s.includes('Data Pribadi'));
    const hasT2 = selectedStepsJ7.some(s => s.includes('TUGAS 2') || s.includes('Password Baja'));
    const hasT3 = selectedStepsJ7.some(s => s.includes('TUGAS 3') || s.includes('Detektif Phishing'));
    const hasT4 = selectedStepsJ7.some(s => s.includes('TUGAS 4') || s.includes('Poster Visual'));
    const hasT5 = selectedStepsJ7.some(s => s.includes('TUGAS 5') || s.includes('Protokol Aman'));

    if (!hasT1 || !hasT2 || !hasT3 || !hasT4 || !hasT5) {
      setTestResultJ7({
        success: false,
        message: 'Pastikan seluruh kelima tugas (Tugas 1 s.d. Tugas 5) telah dimasukkan ke dalam rangkaian misi keselamatanmu!',
      });
      return;
    }

    // Run interactive cyber safety simulation
    setIsPlayingCyberPreview(true);
    setCyberPhase('privacy');

    setTimeout(() => {
      setCyberPhase('password');
    }, 600);

    setTimeout(() => {
      setCyberPhase('phishing');
    }, 1200);

    setTimeout(() => {
      setCyberPhase('poster');
    }, 1800);

    setTimeout(() => {
      setCyberPhase('protocol');
    }, 2400);

    setTimeout(() => {
      setCyberPhase('finished');
      setIsPlayingCyberPreview(false);

      setTestResultJ7({
        success: true,
        message: 'Challenge Cyber Safety Hero berhasil dikirim! 🛡️ Kelima misi keamanan digitalmu teruji bebas bahaya dan menerapkan prinsip privasi ketat. Status: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(
        7,
        selectedStepsJ7,
        '5 Misi Keamanan Digital: Deteksi data pribadi, formula password baja fiktif, detektif phishing, poster edukasi, dan protokol aman.'
      );
    }, 3000);
  };

  // ==================== JILID 8 STATE ====================
  const jilid8Submission = progress.challengeSubmissions[8];
  const isJ8Submitted = !!jilid8Submission?.completed;
  const isJ8Validated = jilid8Submission?.status === 'Divalidasi';
  const isJ8Waiting = jilid8Submission?.status === 'Menunggu Validasi';
  const isJ8BadgeEarned = progress.earnedBadges.includes(8);

  const [selectedStepsJ8, setSelectedStepsJ8] = useState<string[]>(
    jilid8Submission?.steps || []
  );
  const [testResultJ8, setTestResultJ8] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Interactive App Creator Quiz Sandbox state
  const [appQuestionIndex, setAppQuestionIndex] = useState<1 | 2>(1);
  const [appScore, setAppScore] = useState<number>(0);
  const [appFeedback, setAppFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [appSelectedOption, setAppSelectedOption] = useState<number | null>(null);
  const [appSimCompleted, setAppSimCompleted] = useState<boolean>(false);
  const [isPlayingAppPreview, setIsPlayingAppPreview] = useState<boolean>(false);

  // Interactive Quiz Questions in Sandbox
  const sandboxQuestions = [
    {
      number: 1,
      funcName: 'Tanya_Soal(1)',
      prompt: 'Apa fungsi utama dari "Otak" prosesor (CPU) pada komputer?',
      options: [
        { text: 'A. Memproses data instruksi dan menjalankan perhitungan logis', isCorrect: true },
        { text: 'B. Menjadi kaca cermin agar pengguna bisa berkaca', isCorrect: false },
        { text: 'C. Mengeluarkan air saat komputer terasa haus', isCorrect: false },
      ],
      correctExplanation: 'Benar! CPU memproses input dan menghasilkan output yang tepat.',
      wrongExplanation: 'Kurang tepat! CPU adalah unit pemroses logika, bukan cermin atau dispenser air.',
    },
    {
      number: 2,
      funcName: 'Tanya_Soal(2)',
      prompt: 'Mengapa programmer membungkus instruksi ke dalam sebuah "Function" (Fungsi)?',
      options: [
        { text: 'A. Agar instruksi bisa dipanggil berulang kali tanpa mengetik ulang (Reusable)', isCorrect: true },
        { text: 'B. Agar komputer langsung mati saat tombol ditekan', isCorrect: false },
        { text: 'C. Karena fungsi hanya boleh dijalankan tepat 1 kali seumur hidup', isCorrect: false },
      ],
      correctExplanation: 'Tepat sekali! Fungsi membuat kode rapi, modular, dan dapat dipanggil berkali-kali.',
      wrongExplanation: 'Kurang tepat! Salah satu keunggulan terbesar fungsi adalah reusable (bisa dipakai berulang).',
    },
  ];

  const currentSandboxQ = sandboxQuestions[appQuestionIndex - 1];

  const handleSelectAppOption = (index: number) => {
    if (appSelectedOption !== null) return;
    setAppSelectedOption(index);
    const chosen = currentSandboxQ.options[index];
    if (chosen.isCorrect) {
      setAppScore(prev => prev + 10);
      setAppFeedback({
        isCorrect: true,
        text: `Jawaban BENAR! (+10 Poin) 🎉 ${currentSandboxQ.correctExplanation}`,
      });
    } else {
      setAppScore(prev => Math.max(0, prev - 5));
      setAppFeedback({
        isCorrect: false,
        text: `Jawaban SALAH! (-5 Poin) ❌ ${currentSandboxQ.wrongExplanation}`,
      });
    }
  };

  const handleNextQuestion = () => {
    if (appQuestionIndex === 1) {
      setAppQuestionIndex(2);
      setAppSelectedOption(null);
      setAppFeedback(null);
    } else {
      setAppSimCompleted(true);
    }
  };

  const handleResetSandbox = () => {
    setAppQuestionIndex(1);
    setAppScore(0);
    setAppSelectedOption(null);
    setAppFeedback(null);
    setAppSimCompleted(false);
  };

  const handleAddStepJ8 = (text: string) => {
    if (selectedStepsJ8.length >= 5) {
      setTestResultJ8({
        success: false,
        message: 'Maksimal 5 balok arsitektur Interactive App Creator ya, Coder! Hapus atau ganti salah satu balok jika ingin mencoba yang lain.',
      });
      return;
    }
    if (!selectedStepsJ8.includes(text)) {
      playSoftClick();
      setSelectedStepsJ8([...selectedStepsJ8, text]);
      setTestResultJ8(null);
    }
  };

  const handleRemoveStepJ8 = (index: number) => {
    setSelectedStepsJ8(selectedStepsJ8.filter((_, i) => i !== index));
    setTestResultJ8(null);
  };

  const handleResetJ8 = () => {
    setSelectedStepsJ8([]);
    setTestResultJ8(null);
    handleResetSandbox();
  };

  const handlePlayAndSubmitJ8 = () => {
    if (selectedStepsJ8.length < 5) {
      setTestResultJ8({
        success: false,
        message: 'Tantangan Interactive App Creator wajib menyusun 5 komponen lengkap: (1) Definisi Fungsi, (2) Input Pengguna, (3) Proses & Aturan (+10/-5), (4) Output Hasil, dan (5) Panggil Berulang!',
      });
      return;
    }

    const hasDistractor = selectedStepsJ8.some(s => s.startsWith('❌'));
    if (hasDistractor) {
      const bugCandidate = CANDIDATE_STEPS_JILID_8.find(c => selectedStepsJ8.includes(c.text) && !c.isValid);
      setTestResultJ8({
        success: false,
        message: bugCandidate?.bugMsg || 'Ada balok keliru atau bug arsitektur dalam rancangan aplikasimu. Hapus balok bertanda ❌!',
      });
      return;
    }

    const hasDef = selectedStepsJ8.some(s => s.includes('Definisi Fungsi') || s.includes('Tanya_Soal'));
    const hasInput = selectedStepsJ8.some(s => s.includes('Input Pengguna') || s.includes('tombol'));
    const hasProcess = selectedStepsJ8.some(s => s.includes('Proses & Aturan') || s.includes('+10'));
    const hasOutput = selectedStepsJ8.some(s => s.includes('Output Hasil') || s.includes('skor'));
    const hasReuse = selectedStepsJ8.some(s => s.includes('Panggil Berulang') || s.includes('reuse'));

    if (!hasDef || !hasInput || !hasProcess || !hasOutput || !hasReuse) {
      setTestResultJ8({
        success: false,
        message: 'Pastikan seluruh 5 balok esensial (Fungsi, Input, Proses, Output, dan Panggilan Berulang) telah terpasang rapi!',
      });
      return;
    }

    setIsPlayingAppPreview(true);

    setTimeout(() => {
      setIsPlayingAppPreview(false);
      setTestResultJ8({
        success: true,
        message: 'Challenge Interactive App Creator berhasil dikirim! 🚀 Aplikasi kuis interaktif dengan fungsi modular Tanya_Soal, input pilihan anak, kalkulasi skor (+10/-5), dan evaluasi instan telah tersimpan. Status: MENUNGGU VALIDASI.',
      });

      submitJilidChallenge(
        8,
        selectedStepsJ8,
        'Aplikasi Kuis Interaktif dengan fungsi modular Tanya_Soal, penanganan input-output, kalkulasi skor otomatis (+10/-5), dan pemanggilan fungsi berulang.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header with MISSION START callout (Per Requirement #12) */}
      <div className="border-b border-slate-200 pb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
              <span>🧩</span>
              <span>MISSION START</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Bisakah kamu menyelesaikan tantangan ini?
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Setiap Jilid memiliki misi proyek nyata. Susun langkah logis, hindari bug jebakan, dan kirim karyamu untuk validasi Guru/Tutor!
            </p>
          </div>
        </div>

        {/* Tab switch between Challenge 1, 2, and 3 */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setActiveChallengeJilid(1)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 1
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🎒 Challenge Jilid 1: Master of Routine</span>
            {isJ1Validated ? (
              <span className="text-[10px] bg-emerald-800 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ1Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(2)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 2
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🎨 Challenge Jilid 2: Animator Pertama</span>
            {!isJilid2Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ2Validated ? (
              <span className="text-[10px] bg-blue-800 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ2Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(3)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 3
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🤖 Challenge Jilid 3: AI Trainer Pemula</span>
            {!isJilid3Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ3Validated ? (
              <span className="text-[10px] bg-purple-900 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ3Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(4)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 4
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🎬 Challenge Jilid 4: Sutradara Cilik</span>
            {!isJilid4Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ4Validated ? (
              <span className="text-[10px] bg-amber-900 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ4Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(5)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 5
                ? 'bg-orange-500 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🛠️ Challenge Jilid 5: Insinyur Maker</span>
            {!isJilid5Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ5Validated ? (
              <span className="text-[10px] bg-orange-900 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ5Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(6)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 6
                ? 'bg-teal-600 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🧭 Challenge Jilid 6: Labirin Master</span>
            {!isJilid6Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ6Validated ? (
              <span className="text-[10px] bg-teal-900 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ6Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(7)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 7
                ? 'bg-rose-600 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🛡️ Challenge Jilid 7: Cyber Safety Hero</span>
            {!isJilid7Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ7Validated ? (
              <span className="text-[10px] bg-rose-950 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ7Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveChallengeJilid(8)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChallengeJilid === 8
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🚀 Challenge Jilid 8: Interactive App Creator</span>
            {!isJilid8Unlocked && <Lock className="w-3 h-3 text-slate-400" />}
            {isJ8Validated ? (
              <span className="text-[10px] bg-indigo-950 text-white px-1.5 py-0.5 rounded-md font-black">
                Divalidasi ✓
              </span>
            ) : isJ8Waiting ? (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold">
                Menunggu
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ===================== JILID 1 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 1 && (
        <div className="rounded-3xl bg-white border-2 border-emerald-500 p-6 sm:p-8 shadow-md ring-4 ring-emerald-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🎒
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                    CHALLENGE JILID 1
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    Badge: Master of Routine
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Master of Routine
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ1Validated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Divalidasi Guru · Badge Terbuka 🏆</span>
                </span>
              ) : isJ1Waiting ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Belum Disubmit</span>
                </span>
              )}
            </div>
          </div>

          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <strong className="font-bold text-emerald-900 block">Tugas Tantangan Jilid 1:</strong>
            <p>
              Rancanglah sebuah <strong>algoritma persiapan tas sekolah</strong> maksimal <strong>6 langkah</strong>.
              Pilihlah langkah-langkah yang logis dan runtut agar esok pagi tidak ada buku atau perlengkapan yang tertinggal!
            </p>
          </div>

          {/* Interactive Steps Arranger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Target Slots */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Urutan Algoritma Tas Sekolah ({selectedStepsJ1.length}/6 Langkah)
                </span>
                {selectedStepsJ1.length > 0 && !isJ1Validated && (
                  <button
                    onClick={handleResetJ1}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Langkah</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 min-h-[240px] p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
                {selectedStepsJ1.length === 0 ? (
                  <div className="h-full py-12 flex flex-col items-center justify-center text-center text-slate-400">
                    <Plus className="w-8 h-8 mb-2 stroke-1" />
                    <p className="text-xs font-medium max-w-xs">
                      Pilih kartu aksi di sebelah kanan untuk menyusun algoritma 6 langkah terurut.
                    </p>
                  </div>
                ) : (
                  selectedStepsJ1.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>

                      {!isJ1Validated && (
                        <button
                          onClick={() => handleRemoveStepJ1(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                          title="Hapus langkah"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Submit Button */}
              {!isJ1Validated && (
                <button
                  type="button"
                  onClick={handleTestAlgorithmJ1}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>KIRIM UNTUK VALIDASI 🚀</span>
                </button>
              )}

              {/* Feedback Alert */}
              {testResultJ1 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ1.success
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ1.success ? (
                      <>
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>🎉 MISI SELESAI! MENUNGGU VALIDASI</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ1.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 1 */}
              {isJ1Waiting && !isJ1Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian dan persetujuan dari Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(1)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 1)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Kartu Aksi Jilid 1
              </span>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_1.map(card => {
                  const isPicked = selectedStepsJ1.includes(card.text);
                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ1Validated}
                      onClick={() => handleAddStepJ1(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 2 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 2 && (
        <div className="rounded-3xl bg-white border-2 border-blue-500 p-6 sm:p-8 shadow-md ring-4 ring-blue-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🎨
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                    CHALLENGE JILID 2
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    Badge: Animator Pertama
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Animator Pertama
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ2Validated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Divalidasi Guru · Badge Terbuka 🏆</span>
                </span>
              ) : isJ2Waiting ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Belum Disubmit</span>
                </span>
              )}
            </div>
          </div>

          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <strong className="font-bold text-blue-900 block">Tugas Tantangan Jilid 2 (Animator Pertama):</strong>
            <p>
              Anak membuat karakter visual interaktif yang menjalankan 5 langkah berurutan:
              <strong> 1. Muncul (Show)</strong> → <strong> 2. Bergerak (Move)</strong> → <strong> 3. Berbicara (Say)</strong> → <strong> 4. Menghilang (Hide)</strong> → <strong> 5. Muncul kembali!</strong>
            </p>
          </div>

          {/* Interactive Animation Studio Stage */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-300">Panggung Animasi Karakter Scratch</span>
              <span>Status Panggung: {animStageState === 'idle' ? 'Siap' : animStageState}</span>
            </div>

            {/* Stage Canvas */}
            <div className="h-44 bg-gradient-to-b from-sky-400/20 to-emerald-400/20 rounded-xl relative border border-slate-700 flex items-center justify-center overflow-hidden">
              {/* Background scenery clouds */}
              <div className="absolute top-2 left-6 text-xl opacity-60">☁️</div>
              <div className="absolute top-3 right-10 text-xl opacity-60">☁️</div>

              {/* Character Cat / Sprite */}
              <div
                className={`transition-all duration-700 flex flex-col items-center ${
                  animStageState === 'hidden'
                    ? 'opacity-0 scale-50'
                    : animStageState === 'moving'
                    ? 'translate-x-12 scale-105'
                    : animStageState === 'talking'
                    ? 'translate-x-12 scale-110'
                    : animStageState === 'showing_again'
                    ? 'translate-x-0 scale-125'
                    : 'opacity-100 scale-100'
                }`}
              >
                {/* Speech Bubble */}
                {(animStageState === 'talking' || animStageState === 'showing_again') && (
                  <div className="mb-2 px-3 py-1 rounded-xl bg-white text-slate-950 text-xs font-bold shadow-lg animate-bounce flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>Halo Dunia! Aku Animator Cilik! 🎨</span>
                  </div>
                )}

                <div className="text-5xl drop-shadow-md select-none">
                  🐱
                </div>
              </div>

              {animStageState === 'showing_again' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-3xl">
                  ✨🌟✨
                </div>
              )}
            </div>
          </div>

          {/* Interactive Steps Arranger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Target Slots */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Rangkaian 5 Langkah Animasi ({selectedStepsJ2.length}/5)
                </span>
                {selectedStepsJ2.length > 0 && !isJ2Validated && (
                  <button
                    onClick={handleResetJ2}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Balok</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 min-h-[220px] p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
                {selectedStepsJ2.length === 0 ? (
                  <div className="h-full py-10 flex flex-col items-center justify-center text-center text-slate-400">
                    <Plus className="w-8 h-8 mb-2 stroke-1" />
                    <p className="text-xs font-medium max-w-xs">
                      Pilih balok aksi animasi di sebelah kanan sesuai urutan 1 s/d 5.
                    </p>
                  </div>
                ) : (
                  selectedStepsJ2.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>

                      {!isJ2Validated && (
                        <button
                          onClick={() => handleRemoveStepJ2(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                          title="Hapus balok"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Submit Button */}
              {!isJ2Validated && (
                <button
                  type="button"
                  disabled={isPlayingAnim}
                  onClick={handlePlayAndSubmitJ2}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPlayingAnim ? 'Memutar Animasi...' : 'Jalankan Animasi & Kirim Challenge Jilid 2'}</span>
                </button>
              )}

              {/* Feedback Alert */}
              {testResultJ2 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ2.success
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ2.success ? (
                      <>
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Challenge Terkirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ2.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 2 */}
              {isJ2Waiting && !isJ2Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya animasi siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(2)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 2)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Aksi Animasi Jilid 2
              </span>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_2.map(card => {
                  const isPicked = selectedStepsJ2.includes(card.text);
                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ2Validated}
                      onClick={() => handleAddStepJ2(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-blue-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 3 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 3 && (
        <div className="rounded-3xl bg-white border-2 border-purple-500 p-6 sm:p-8 shadow-md ring-4 ring-purple-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                    CHALLENGE JILID 3
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    Badge: AI Trainer Pemula
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  AI Trainer Pemula
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ3Validated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Divalidasi Guru · Badge Terbuka 🏆</span>
                </span>
              ) : isJ3Waiting ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Belum Disubmit</span>
                </span>
              )}
            </div>
          </div>

          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <strong className="font-bold text-purple-900 block">Tugas Tantangan Jilid 3 (AI Trainer Pemula):</strong>
            <p>
              Anak membuat simulasi AI klasifikasi dua kategori (<strong>BULAT</strong> vs <strong>TIDAK BULAT</strong>) melalui 5 tahapan:
              1. Kumpulkan contoh data → 2. Kelompokkan data → 3. Latih model AI → 4. Uji 3 data baru → 5. Evaluasi akurasi hasil!
            </p>
          </div>

          {/* Safety Reminder Card */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p>"AI belajar dari contoh dan data. AI bisa salah. Selalu periksa hasilnya."</p>
              <p className="mt-0.5 font-normal text-amber-800">"Gunakan AI bersama guru, tutor, atau orang tua tanpa memasukkan data pribadi."</p>
            </div>
          </div>

          {/* TAHAP 1 & 2: TRAINING DATA */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Tahap 1 & 2: Kumpulan Data Contoh (Training Data)
              </span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                {TRAINING_DATA_JILID_3.length} Contoh Objek Terlabel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Wadah BULAT */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    🟢 Kategori A: BULAT
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">Pola: Melingkar tanpa sudut</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TRAINING_DATA_JILID_3.filter(d => d.category === 'BULAT').map(item => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center shadow-2xs">
                      <span className="text-3xl block mb-1">{item.emoji}</span>
                      <span className="text-[11px] font-bold text-slate-800 block truncate">{item.name}</span>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">{item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wadah TIDAK BULAT */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                    ⏹️ Kategori B: TIDAK BULAT
                  </span>
                  <span className="text-[11px] font-bold text-blue-700">Pola: Sisi lurus & bersudut</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TRAINING_DATA_JILID_3.filter(d => d.category === 'TIDAK BULAT').map(item => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-white border border-blue-200 text-center shadow-2xs">
                      <span className="text-3xl block mb-1">{item.emoji}</span>
                      <span className="text-[11px] font-bold text-slate-800 block truncate">{item.name}</span>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">{item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Train Model Action */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bot className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-purple-950">
                    Tahap 3: Latih Model AI Klasifikasi
                  </h4>
                  <p className="text-xs text-purple-700">
                    {isJ3ModelTrained
                      ? '✓ Model AI berhasil dilatih! Pola ciri visual telah dipelajari.'
                      : 'AI akan membaca pola lengkungan vs sudut dari data latihan di atas.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isTrainingAnim || isJ3ModelTrained}
                onClick={handleTrainModelJ3}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                  isJ3ModelTrained
                    ? 'bg-emerald-600 text-white shadow-xs cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-95'
                }`}
              >
                {isTrainingAnim ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Menganalisis Pola Ciri...</span>
                  </>
                ) : isJ3ModelTrained ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Model Telah Dilatih ✓</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Latih Model AI Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* TAHAP 4: TESTING DATA */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Tahap 4 & 5: Uji 3 Data Baru & Prediksi Kategori
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Pilih prediksi untuk setiap objek uji
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TEST_DATA_JILID_3.map(item => {
                const currentGuess = testGuessesJ3[item.id];
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                      currentGuess
                        ? 'bg-white border-purple-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-4xl block mb-2">{item.emoji}</span>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block text-center">
                        Prediksi Kategori:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          disabled={!isJ3ModelTrained || isJ3Validated}
                          onClick={() => handleSelectGuessJ3(item.id, 'BULAT')}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentGuess === 'BULAT'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          } disabled:opacity-50`}
                        >
                          🟢 Bulat
                        </button>

                        <button
                          type="button"
                          disabled={!isJ3ModelTrained || isJ3Validated}
                          onClick={() => handleSelectGuessJ3(item.id, 'TIDAK BULAT')}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentGuess === 'TIDAK BULAT'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          } disabled:opacity-50`}
                        >
                          ⏹️ Tidak Bulat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Challenge Button */}
            {!isJ3Validated && (
              <button
                type="button"
                onClick={handleTestAndSubmitJ3}
                className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-black text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Periksa Akurasi & Kirim Challenge Jilid 3</span>
              </button>
            )}

            {/* Test Result Alert */}
            {testResultJ3 && (
              <div
                className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                  testResultJ3.success
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {testResultJ3.success ? (
                    <>
                      <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Challenge Terkirim!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Perhatian:</span>
                    </>
                  )}
                </div>
                <p>{testResultJ3.message}</p>
              </div>
            )}

            {/* TEACHER VALIDATION SIMULATION FOR JILID 3 */}
            {isJ3Waiting && !isJ3Validated && (
              <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <span>Validasi Guru / Tutor</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                    MODE DEMO
                  </span>
                </div>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Hasil pelatihan dan pengujian model AI siswa tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                </p>
                <button
                  type="button"
                  onClick={() => simulateTeacherValidation(3)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Simulasikan Validasi Guru (Jilid 3)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 4 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 4 && (
        <div className="rounded-3xl bg-white border-2 border-amber-500 p-6 sm:p-8 shadow-md ring-4 ring-amber-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl font-bold shadow-xs">
                🎬
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                    CHALLENGE JILID 4
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    Badge: Sutradara Cilik
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Sutradara Cilik
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ4Validated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Divalidasi Guru · Badge Terbuka 🏆</span>
                </span>
              ) : isJ4Waiting ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Belum Disubmit</span>
                </span>
              )}
            </div>
          </div>

          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <strong className="font-bold text-amber-900 block">Tugas Tantangan Jilid 4 (Sutradara Cilik):</strong>
            <p>
              Susun rantai alur produksi dan editing video edukasi pendek 5 tahapan:
              1. Storyboard 4 Panel → 2. Event Trigger Adegan → 3. Rekaman Kamera Stabil & Audio Bersih → 4. Editing Trimming & Teks Judul → 5. Safety Check Privasi (Bebas Data Pribadi).
            </p>
          </div>

          {/* Safety Reminder Card */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p>"Dilarang menampilkan alamat rumah, nomor telepon orang tua, atau seragam sekolah beridentitas privat dalam video!"</p>
              <p className="mt-0.5 font-normal text-rose-800">"Penayangan karya dilakukan secara aman dan privat di hadapan keluarga atau kelas."</p>
            </div>
          </div>

          {/* Interactive Video Studio Stage Preview */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
                  Monitor Studio Sutradara Cilik
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {videoPreviewPhase === 'storyboard'
                  ? 'Tahap 1: Membaca Storyboard 4 Panel...'
                  : videoPreviewPhase === 'recording'
                  ? 'Tahap 2: Merekam Kamera 1080p Stabil...'
                  : videoPreviewPhase === 'editing'
                  ? 'Tahap 3: Pemotongan Klip & Teks Judul...'
                  : videoPreviewPhase === 'finished'
                  ? 'Tahap 4: Video Siap Ditayangkan! ✓'
                  : 'Siap untuk Preview Produksi'}
              </span>
            </div>

            {/* Virtual Screen */}
            <div className="h-48 sm:h-56 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              {videoPreviewPhase === 'idle' && (
                <div className="space-y-2">
                  <span className="text-4xl block">🎬</span>
                  <h4 className="text-sm font-bold text-slate-200">
                    Studio Video Kreator Anak
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Susun 5 langkah produksi video di bawah, lalu klik tombol preview untuk memutar alur video edukasi karyamu!
                  </p>
                </div>
              )}

              {videoPreviewPhase === 'storyboard' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">📋</span>
                  <div className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                    Panel 1: Awal → Panel 2: Masalah → Panel 3: Aksi → Panel 4: Akhir
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Storyboard 4 panel selesai diverifikasi tanpa kebocoran data pribadi.
                  </p>
                </div>
              )}

              {videoPreviewPhase === 'recording' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400">REC 00:45</span>
                  </div>
                  <span className="text-4xl block">🎥</span>
                  <p className="text-xs text-slate-300 font-medium">
                    Framing stabil, cahaya terang dari arah depan, dan audio suara jernih!
                  </p>
                </div>
              )}

              {videoPreviewPhase === 'editing' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">✂️</span>
                  <h4 className="text-sm font-bold text-amber-300">
                    "TIPS BELAJAR CERDAS & AMAN"
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Trimming bagian awal/akhir selesai dipangkas & teks judul terpasang rapi.
                  </p>
                </div>
              )}

              {videoPreviewPhase === 'finished' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">🏆</span>
                  <h4 className="text-sm font-bold text-emerald-400">
                    Karya Video Edukasi Sutradara Cilik Siap!
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Lolos Quality Control: Bebas nama lengkap, seragam sekolah, dan alamat rumah.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Steps Arranger for Jilid 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Selected Sequence Slots */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Alur Produksi Video Karyamu ({selectedStepsJ4.length}/5 Langkah)
                </span>
                {selectedStepsJ4.length > 0 && !isJ4Validated && (
                  <button
                    type="button"
                    onClick={handleResetJ4}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Slots List */}
              <div className="space-y-2 min-h-[220px]">
                {selectedStepsJ4.length === 0 ? (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center text-slate-400 text-xs">
                    Klik balok-balok di sebelah kanan untuk menyusun alur produksi video dari tahap pra-produksi hingga safety check!
                  </div>
                ) : (
                  selectedStepsJ4.map((stepText, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 flex items-center justify-between gap-3 text-xs font-bold text-slate-900 shadow-2xs animate-in slide-in-from-left-2 duration-150"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{stepText}</span>
                      </div>
                      {!isJ4Validated && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStepJ4(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                          title="Hapus langkah"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Action Preview and Submit */}
              {!isJ4Validated && (
                <button
                  type="button"
                  disabled={isPlayingVideoPreview}
                  onClick={handlePlayAndSubmitJ4}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isPlayingVideoPreview ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Sedang Memproses Preview Video...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>🎬 Preview & Kirim Challenge Jilid 4</span>
                    </>
                  )}
                </button>
              )}

              {/* Test Result Message */}
              {testResultJ4 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ4.success
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ4.success ? (
                      <>
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Challenge Berhasil Dikirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ4.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 4 */}
              {isJ4Waiting && !isJ4Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya produksi video siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(4)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 4)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Tahapan Produksi Jilid 4
              </span>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_4.map(card => {
                  const isPicked = selectedStepsJ4.includes(card.text);
                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ4Validated}
                      onClick={() => handleAddStepJ4(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-amber-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 5 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 5 && (
        <div className="rounded-3xl bg-white border-2 border-orange-500 p-6 sm:p-8 shadow-md ring-4 ring-orange-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🛠️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-700">
                    CHALLENGE JILID 5
                  </span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full border border-orange-200">
                    Cardboard & Paper Maker
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Insinyur Maker
                </h3>
              </div>
            </div>

            {/* Validation & Badge Status */}
            <div>
              {isJ5Validated ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-2xs">
                  <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Lencana Insinyur Maker Terbuka! 🏆</span>
                </div>
              ) : isJ5Waiting ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Menunggu Validasi Guru / Tutor</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Lencana Terkunci (Selesaikan & Validasi)</span>
                </div>
              )}
            </div>
          </div>

          {/* Mission Briefing & Maker Safety Banner */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-orange-950 font-bold block mb-1">
                Tantangan Misi Insinyur Maker:
              </strong>
              Rancang purwarupa (prototype) mekanik sederhana dari bahan ramah anak (kardus bekas, sedotan kertas, stik es krim, dan selotip). Terapkan siklus rekayasa 7 tahap: Masalah → Desain Blueprint → Prototype V1 → Uji Coba → Temukan Masalah → Perbaiki V2 → Demonstrasi Aman!
            </div>

            {/* MAKER SAFETY NOTICE */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-amber-900 block">
                  Prinsip Keselamatan Maker Ramah Anak (Safety First):
                </strong>
                Gunakan kardus, kertas, perekat tumpul, dan selotip. DILARANG menggunakan listrik AC/kabel terbuka, api lilin, solder panas, atau bahan kimia! Lakukan perakitan selalu bersama dampingan orang tua atau guru.
              </div>
            </div>

            {/* Virtual Cardboard Workbench Simulator */}
            <div className="h-48 sm:h-56 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              {makerPreviewPhase === 'idle' && (
                <div className="space-y-2">
                  <span className="text-4xl block">📦</span>
                  <h4 className="text-sm font-bold text-slate-200">
                    Meja Kerja Insinyur Kardus (Maker Workbench)
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Susun 7 balok siklus rekayasa di bawah, lalu klik tombol uji coba untuk mensimulasikan perakitan Prototype V1 hingga Prototype V2 yang kokoh!
                  </p>
                </div>
              )}

              {makerPreviewPhase === 'blueprint' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">📐</span>
                  <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
                    Blueprint Sketsa Mekanik Tuas & Jalur Luncur
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Masalah terdefinisi dan cetak biru kardus selesai dirancang di atas kertas.
                  </p>
                </div>
              )}

              {makerPreviewPhase === 'crafting' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-orange-400">MERAKIT KARDUS & SELOTIP</span>
                  </div>
                  <span className="text-4xl block">✂️</span>
                  <p className="text-xs text-slate-300 font-medium">
                    Merakit kardus bekas, sedotan kertas, dan stik es krim menjadi Prototype V1 aman.
                  </p>
                </div>
              )}

              {makerPreviewPhase === 'testing' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">⚙️</span>
                  <h4 className="text-sm font-bold text-amber-300">
                    Uji Coba 3 Kali & Analisis Kelemahan
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Tiang penyangga V1 sedikit miring → Diperkuat dengan penopang segitiga stik es krim!
                  </p>
                </div>
              )}

              {makerPreviewPhase === 'finished' && (
                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                  <span className="text-4xl block">🏆</span>
                  <h4 className="text-sm font-bold text-emerald-400">
                    Prototype V2 Insinyur Maker Kokoh & Berhasil!
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Uji kelancaran 100% lulus, stabil menyeberangkan benda ringan, dan bebas bahaya!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Steps Arranger for Jilid 5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Selected Sequence Slots */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Tahapan Siklus Rekayasa Karyamu ({selectedStepsJ5.length}/7 Langkah)
                </span>
                {selectedStepsJ5.length > 0 && !isJ5Validated && (
                  <button
                    type="button"
                    onClick={handleResetJ5}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Slots List */}
              <div className="space-y-2 min-h-[260px]">
                {selectedStepsJ5.length === 0 ? (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center text-slate-400 text-xs">
                    Klik balok-balok di sebelah kanan untuk menyusun alur rekayasa dari Identifikasi Masalah hingga Demonstrasi Aman!
                  </div>
                ) : (
                  selectedStepsJ5.map((stepText, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-orange-300 bg-orange-50/50 flex items-center justify-between gap-3 text-xs font-bold text-slate-900 shadow-2xs animate-in slide-in-from-left-2 duration-150"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-orange-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{stepText}</span>
                      </div>
                      {!isJ5Validated && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStepJ5(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                          title="Hapus langkah"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Action Preview and Submit */}
              {!isJ5Validated && (
                <button
                  type="button"
                  disabled={isPlayingMakerPreview}
                  onClick={handlePlayAndSubmitJ5}
                  className="w-full py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-black text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isPlayingMakerPreview ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Sedang Menguji Coba Mekanik Maker...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>🛠️ Uji Coba & Kirim Challenge Jilid 5</span>
                    </>
                  )}
                </button>
              )}

              {/* Test Result Message */}
              {testResultJ5 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ5.success
                      ? 'bg-orange-50 border-orange-300 text-orange-950'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ5.success ? (
                      <>
                        <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                        <span>Challenge Berhasil Dikirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ5.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 5 */}
              {isJ5Waiting && !isJ5Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya purwarupa mekanik siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(5)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 5)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Rekayasa Maker Jilid 5
              </span>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_5.map(card => {
                  const isPicked = selectedStepsJ5.includes(card.text);
                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ5Validated}
                      onClick={() => handleAddStepJ5(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-orange-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 6 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 6 && (
        <div className="rounded-3xl bg-white border-2 border-teal-500 p-6 sm:p-8 shadow-md ring-4 ring-teal-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🧭
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 block">
                  CHALLENGE JILID 6
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Labirin Master 🧩
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ6Validated ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Status: Divalidasi Guru / Tutor 🏆</span>
                </span>
              ) : isJ6Waiting ? (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1.5 animate-pulse">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru / Tutor</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                  Target: Badge "Labirin Master"
                </span>
              )}
            </div>
          </div>

          {/* Educational Instructions & Rules */}
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950 space-y-2">
            <h3 className="font-black text-sm flex items-center gap-2 text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Instruksi Misi Robot Labirin:</span>
            </h3>
            <p className="leading-relaxed">
              Program robot penjelajah agar mampu keluar dari labirin berliku hingga menyentuh bendera finis 🚩. Susun balok logika dengan <strong>DUA SYARAT WAJIB</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-teal-300 font-semibold flex items-center gap-2 text-teal-900">
                <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-black text-[10px]">WAJIB 1</span>
                <span>Minimal 1 blok <strong>REPEAT UNTIL</strong> (Ulangi sampai finis)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-teal-300 font-semibold flex items-center gap-2 text-teal-900">
                <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-black text-[10px]">WAJIB 2</span>
                <span>Minimal 1 blok <strong>IF / ELSE</strong> (Deteksi dinding & belok)</span>
              </div>
            </div>
          </div>

          {/* Interactive Maze Simulation Arena */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white space-y-4 border-2 border-teal-500/40 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-extrabold tracking-wider uppercase text-teal-300">
                  Simulasi Arena Robot Labirin 5x5
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Status Robot: <strong className="text-amber-300">{
                  mazePhase === 'scanning' ? 'Memeriksa Sensor Laser...' :
                  mazePhase === 'looping' ? 'Mengeksekusi Repeat Until...' :
                  mazePhase === 'turning' ? 'Dinding Terdeteksi: Belok Kanan (If/Else)!' :
                  mazePhase === 'finished' ? 'Bendera Tercapai! Misi Sukses 🎉' :
                  'Siap Dijalankan'
                }</strong>
              </div>
            </div>

            {/* 5x5 Grid Maze Map */}
            <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              {/* Row 0 */}
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-teal-500/20 border border-teal-500/40 text-teal-300 relative">
                {robotGridStep === 0 && <span className="text-2xl animate-bounce">🤖</span>}
                <span className="text-[10px] absolute bottom-1 text-slate-400">Start</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                {robotGridStep === 1 && <span className="text-2xl animate-bounce">🤖</span>}
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                {robotGridStep === 2 && <span className="text-2xl animate-bounce">🤖</span>}
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>

              {/* Row 1 */}
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>

              {/* Row 2 */}
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                {robotGridStep === 3 && <span className="text-2xl animate-bounce">🤖</span>}
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>

              {/* Row 3 */}
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>

              {/* Row 4 */}
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-rose-950/40 border border-rose-800/50 text-rose-400" title="Dinding">
                🧱
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-600 text-xs">·</span>
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center text-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 relative">
                {robotGridStep === 4 ? <span className="text-2xl animate-bounce">🤖</span> : <span className="text-2xl">🚩</span>}
                <span className="text-[10px] absolute bottom-1 text-emerald-300">Finis</span>
              </div>
            </div>

            <p className="text-xs text-center text-slate-400">
              Robot membaca kondisi sensor: Jika depan kosong → Maju; Jika ada dinding 🧱 → Belok Kanan. Siklus terus diulang dengan Repeat Until sampai menyentuh bendera 🚩!
            </p>
          </div>

          {/* Arranger section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Selected sequence slots */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Susunan Balok Kode Labirin Karyamu ({selectedStepsJ6.length}/5 Balok)
                </span>
                {selectedStepsJ6.length > 0 && !isJ6Validated && (
                  <button
                    type="button"
                    onClick={handleResetJ6}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Slots List */}
              <div className="space-y-2 min-h-[220px]">
                {selectedStepsJ6.length === 0 ? (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center text-slate-400 text-xs">
                    Klik balok-balok di sebelah kanan untuk menyusun algoritma navigasi labirin robot dengan Repeat Until dan If/Else!
                  </div>
                ) : (
                  selectedStepsJ6.map((stepText, idx) => {
                    const isRepeatUntil = stepText.includes('Repeat Until');
                    const isIfElse = stepText.includes('If / Else');

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold shadow-2xs animate-in slide-in-from-left-2 duration-150 ${
                          isRepeatUntil
                            ? 'border-indigo-400 bg-indigo-50/70 text-indigo-950'
                            : isIfElse
                            ? 'border-teal-400 bg-teal-50/70 text-teal-950'
                            : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                            isRepeatUntil ? 'bg-indigo-600 text-white' : isIfElse ? 'bg-teal-600 text-white' : 'bg-slate-800 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{stepText}</span>
                        </div>
                        {!isJ6Validated && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStepJ6(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Hapus balok"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Action Preview and Submit */}
              {!isJ6Validated && (
                <button
                  type="button"
                  disabled={isPlayingMazePreview}
                  onClick={handlePlayAndSubmitJ6}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-black text-sm shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isPlayingMazePreview ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Robot Sedang Menavigasi Labirin...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>🧭 Jalankan Robot & Kirim Challenge Jilid 6</span>
                    </>
                  )}
                </button>
              )}

              {/* Test Result Message */}
              {testResultJ6 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ6.success
                      ? 'bg-teal-50 border-teal-300 text-teal-950'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ6.success ? (
                      <>
                        <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                        <span>Challenge Berhasil Dikirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ6.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 6 */}
              {isJ6Waiting && !isJ6Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya algoritma robot labirin siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan persetujuan Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(6)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 6)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Logika Labirin Jilid 6
              </span>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_6.map(card => {
                  const isPicked = selectedStepsJ6.includes(card.text);
                  const isRepeat = card.text.includes('Repeat Until');
                  const isIf = card.text.includes('If / Else');

                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ6Validated}
                      onClick={() => handleAddStepJ6(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : isRepeat
                          ? 'bg-indigo-50/50 hover:bg-indigo-50 border-indigo-200 text-indigo-950 shadow-2xs'
                          : isIf
                          ? 'bg-teal-50/50 hover:bg-teal-50 border-teal-200 text-teal-950 shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-teal-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 7 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 7 && (
        <div className="rounded-3xl bg-white border-2 border-rose-500 p-6 sm:p-8 shadow-md ring-4 ring-rose-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🛡️
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 block">
                  CHALLENGE JILID 7
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Cyber Safety Hero 🛡️
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ7Validated ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Status: Divalidasi Guru / Tutor 🏆</span>
                </span>
              ) : isJ7Waiting ? (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1.5 animate-pulse">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru / Tutor</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
                  Target: Badge "Cyber Safety Hero"
                </span>
              )}
            </div>
          </div>

          {/* Strict Safety Rules Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border-2 border-rose-300 text-xs sm:text-sm text-rose-950 space-y-2">
            <div className="flex items-center gap-2 font-black text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>ATURAN KESELAMATAN & PRIVASI CYBER SAFETY (WAJIB):</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-rose-900 leading-relaxed font-medium">
              <li><strong>DILARANG</strong> menggunakan password asli, nama lengkap asli, alamat rumah, nomor telepon, atau data keluarga.</li>
              <li>Aplikasi ini <strong>TIDAK PERNAH</strong> menyimpan atau mengirim password ke server manapun (berjalan 100% lokal di browsermu).</li>
              <li>Seluruh contoh pesan phishing dan kata sandi dalam latihan ini adalah <strong>CONTOH FIKTIF / DUMMY</strong> yang aman.</li>
            </ul>
          </div>

          {/* Interactive 5-Mission Cyber Safety Lab */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white space-y-5 border-2 border-rose-500/40 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Laboratorium Interaktif: 5 Misi Cyber Safety
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {isPlayingCyberPreview
                  ? `Menguji: ${cyberPhase.toUpperCase()}...`
                  : cyberPhase === 'finished'
                  ? 'Verifikasi 5 Misi Sukses! ✓'
                  : 'Eksplorasi 5 Tugas Misi di Bawah'}
              </span>
            </div>

            {/* Mission Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveLabTab('t1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLabTab === 't1' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                1. Data Pribadi 🔒
              </button>
              <button
                type="button"
                onClick={() => setActiveLabTab('t2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLabTab === 't2' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                2. Password Dummy 🔑
              </button>
              <button
                type="button"
                onClick={() => setActiveLabTab('t3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLabTab === 't3' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                3. Detektif Phishing 🕵️
              </button>
              <button
                type="button"
                onClick={() => setActiveLabTab('t4')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLabTab === 't4' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                4. Desain Poster 🎨
              </button>
              <button
                type="button"
                onClick={() => setActiveLabTab('t5')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLabTab === 't5' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                5. Protokol Darurat 🛡️
              </button>
            </div>

            {/* Tab 1: Data Pribadi */}
            {activeLabTab === 't1' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
                  <span>Misi 1: Klasifikasi Informasi Publik vs Rahasia</span>
                  <span className="text-[10px] bg-rose-950 text-rose-200 px-2 py-0.5 rounded border border-rose-800">
                    Aturan Privasi
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/50 space-y-1.5">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BOLEH DIBAGIKAN (AMAN)</span>
                    </span>
                    <ul className="text-emerald-100/80 space-y-1 pl-4 list-disc">
                      <li>Warna & Makanan Favorit</li>
                      <li>Hobi Umum (Menggambar, Sepeda)</li>
                      <li>Kartun & Game Favorit</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-700/50 space-y-1.5">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>HARUS DIRAHASIAKAN (KUNCI!)</span>
                    </span>
                    <ul className="text-rose-100/80 space-y-1 pl-4 list-disc">
                      <li>Nama Lengkap & Alamat Rumah</li>
                      <li>Nomor Telepon & Kontak Keluarga</li>
                      <li>Password Akun Apapun</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Password Dummy Checker */}
            {activeLabTab === 't2' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">
                    Misi 2: Penguji Password Baja (CONTOH DUMMY SAJA)
                  </span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-bold">
                    HANYA LATIHAN CLIENT-SIDE
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>PERINGATAN: Gunakan password DUMMY. Jangan masukkan password asli akun pribadimu!</span>
                  </div>
                  <label className="text-[11px] text-slate-400 block font-medium">
                    Ketik contoh password latihan (misal: Bintang#Lari88!):
                  </label>
                  <input
                    type="text"
                    value={dummyPasswordInput}
                    onChange={e => setDummyPasswordInput(e.target.value)}
                    placeholder="Contoh: Kucing#Keren99!"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-hidden focus:border-amber-400"
                  />
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="text-slate-400">Status Kekuatan:</span>
                    {dummyPasswordInput.length >= 8 && /[A-Z]/.test(dummyPasswordInput) && /[0-9]/.test(dummyPasswordInput) && /[^A-Za-z0-9]/.test(dummyPasswordInput) ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                        🛡️ KUAT (Password Baja: Panjang + Huruf Besar/Kecil + Angka + Simbol)
                      </span>
                    ) : dummyPasswordInput.length >= 6 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        ⚠️ SEDANG (Tambahkan simbol unik atau angka agar makin kuat)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                        ❌ LEMAH (Terlalu pendek, mudah ditebak!)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Phishing Detective */}
            {activeLabTab === 't3' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-300">
                    Misi 3: Detektif Phishing (Temukan 3 Tanda Bahaya Palsu)
                  </span>
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    Simulasi Pesan Fiktif
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-rose-900/60 space-y-2 text-xs">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Pengirim: Akun_Misterius_99 (Tidak Dikenal)
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 text-rose-200 border border-rose-500/30 leading-relaxed font-sans">
                    "SELAMAT! Kamu memenangkan <span className="underline decoration-rose-500 font-bold text-amber-300">Hadiah 10 Juta Koin & Laptop</span>! Akunmu akan hangus dalam <span className="underline decoration-rose-500 font-bold text-rose-400">5 MENIT</span> jika tidak <span className="underline decoration-rose-500 font-bold text-rose-400">KLIK LINK INI & KIRIM PASSWORD</span> sekarang!"
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-200 font-medium">
                      🚩 Tanda 1: Hadiah Fantastis Tak Masuk Akal
                    </div>
                    <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-200 font-medium">
                      🚩 Tanda 2: Mendesak & Menakut-nakuti (5 Menit)
                    </div>
                    <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-200 font-medium">
                      🚩 Tanda 3: Meminta Password / Klik Tautan Aneh
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Poster Design */}
            {activeLabTab === 't4' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-300">
                    Misi 4: Desain Poster Edukasi Visual & Kontras Tinggi
                  </span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                    Kaidah Grafis
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Poster Preview */}
                  <div className="w-full sm:w-64 h-36 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-2 border-indigo-400 p-4 flex flex-col justify-between text-center shadow-lg">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <h4 className="text-sm font-black text-amber-300 tracking-wide uppercase">
                        {posterTheme === 'Lindungi Password' ? 'LINDUNGI PASSWORDMU!' : posterTheme === 'Aman di Internet' ? 'AMAN BERMAIN INTERNET!' : 'BERSIKAP BAIK DI DUNIA MAYA!'}
                      </h4>
                      <p className="text-[10px] text-white/90 font-medium mt-0.5">
                        Kontras Tinggi · Pesan Jelas · Aman Privasi
                      </p>
                    </div>
                    <span className="text-[9px] text-indigo-300 font-mono">
                      Kampanye Ramah Anak © AI For Kids
                    </span>
                  </div>

                  {/* Theme Switcher */}
                  <div className="space-y-2 flex-1 text-xs">
                    <label className="text-slate-400 block font-semibold">Pilih Slogan Tema Poster:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Lindungi Password', 'Aman di Internet', 'Bersikap Baik'] as const).map(theme => (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setPosterTheme(theme)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-all ${
                            posterTheme === theme ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      Kombinasi warna gelap dan teks cerah (kontras tinggi) membuat pesan kampanye langsung dibaca dan diingat teman-temanmu!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Protokol Darurat */}
            {activeLabTab === 't5' && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-300">
                    Misi 5: Protokol 4 Langkah Tindakan Aman Menghadapi Bahaya
                  </span>
                  <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                    Tindakan Darurat
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xl block">🛑</span>
                    <strong className="text-white block text-[11px]">1. Berhenti</strong>
                    <span className="text-[10px] text-slate-400">Tarik napas & jangan panik</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xl block">🚫</span>
                    <strong className="text-white block text-[11px]">2. Jangan Klik</strong>
                    <span className="text-[10px] text-slate-400">Abaikan tautan asing</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xl block">🔒</span>
                    <strong className="text-white block text-[11px]">3. Jangan Beri Data</strong>
                    <span className="text-[10px] text-slate-400">Kunci password & kontak</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xl block">👨‍🏫</span>
                    <strong className="text-white block text-[11px]">4. Lapor Orang Dewasa</strong>
                    <span className="text-[10px] text-slate-400">Beri tahu ortu atau guru</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Builder Workspace: Arrange the 5 Missions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                    Rangkaian 5 Misi Cyber Safety Hero
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Susun 5 misi lengkap untuk menyelesaikan tantangan Jilid 7
                  </span>
                </div>
                {!isJ7Validated && selectedStepsJ7.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetJ7}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Slot Area */}
              <div className="space-y-2 min-h-[220px] p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300">
                {selectedStepsJ7.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                    <ShieldCheck className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-medium max-w-sm">
                      Pilih balok misi di panel sebelah kanan untuk menyusun 5 pilar keselamatan siber cilik.
                    </p>
                  </div>
                ) : (
                  selectedStepsJ7.map((stepText, idx) => {
                    const isBug = stepText.startsWith('❌');

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-semibold animate-in slide-in-from-left-2 duration-150 ${
                          isBug
                            ? 'border-rose-400 bg-rose-50 text-rose-950'
                            : 'border-rose-200 bg-white text-slate-900 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                            isBug ? 'bg-rose-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{stepText}</span>
                        </div>
                        {!isJ7Validated && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStepJ7(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Hapus misi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Action Preview and Submit */}
              {!isJ7Validated && (
                <button
                  type="button"
                  disabled={isPlayingCyberPreview}
                  onClick={handlePlayAndSubmitJ7}
                  className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-sm shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isPlayingCyberPreview ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Sedang Memverifikasi Protokol Cyber Safety...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>🛡️ Uji & Kirim Challenge Jilid 7</span>
                    </>
                  )}
                </button>
              )}

              {/* Test Result Message */}
              {testResultJ7 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ7.success
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ7.success ? (
                      <>
                        <Clock className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Challenge Berhasil Dikirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ7.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 7 */}
              {isJ7Waiting && !isJ7Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya 5 misi keamanan siber siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(7)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 7)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Misi Cyber Safety Jilid 7
              </span>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_7.map(card => {
                  const isPicked = selectedStepsJ7.includes(card.text);
                  const isBug = card.text.startsWith('❌');

                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ7Validated}
                      onClick={() => handleAddStepJ7(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : isBug
                          ? 'bg-rose-50/50 hover:bg-rose-50 border-rose-200 text-rose-950 shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-rose-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ===================== JILID 8 CHALLENGE ====================== */}
      {/* ============================================================== */}
      {activeChallengeJilid === 8 && (
        <div className="rounded-3xl bg-white border-2 border-indigo-500 p-6 sm:p-8 shadow-md ring-4 ring-indigo-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-3xl font-bold shadow-xs">
                🚀
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                    CHALLENGE JILID 8 (PAMUNGKAS)
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    Badge: Interactive App Creator
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Interactive App Creator
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJ8Validated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Divalidasi Guru · Badge Terbuka 🏆</span>
                </span>
              ) : isJ8Waiting ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Status: Menunggu Validasi Guru</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Belum Disubmit</span>
                </span>
              )}
            </div>
          </div>

          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <strong className="font-bold text-indigo-900 block">Tugas Tantangan Jilid 8 (Interactive App Creator):</strong>
            <p>
              Rakit aplikasi game kuis interaktif dengan 5 syarat wajib kurikulum:
              1. Menentukan nama fungsi (<strong>Function Tanya_Soal</strong>) →
              2. Menerima input dari pengguna (klik tombol opsi) →
              3. Menentukan proses logika pemeriksaan jawaban →
              4. Menghitung skor otomatis (<strong>+10 Benar, -5 Salah</strong>) dan menampilkan output skor →
              5. Memanggil fungsi minimal 2 kali untuk 2 pertanyaan berbeda (Create → Call → Reuse)!
            </p>
          </div>

          {/* 2-Column workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left column: Assembled blocks & Live Simulator Sandbox */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Rangkaian Arsitektur Aplikasi ({selectedStepsJ8.length}/5 Balok)
                </span>
                {selectedStepsJ8.length > 0 && !isJ8Validated && (
                  <button
                    type="button"
                    onClick={handleResetJ8}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Assembled steps box */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 min-h-[160px] space-y-2">
                {selectedStepsJ8.length === 0 ? (
                  <div className="h-28 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4">
                    <span>Belum ada balok arsitektur yang dipilih.</span>
                    <span className="text-[11px] mt-1 text-slate-500">
                      Pilih balok dari kolom sebelah kanan untuk merakit aplikasi kuis interaktifmu!
                    </span>
                  </div>
                ) : (
                  selectedStepsJ8.map((stepText, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{stepText}</span>
                      </div>
                      {!isJ8Validated && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStepJ8(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                          title="Hapus balok"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* LIVE SIMULATOR: Interactive Quiz App Sandbox */}
              <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                      🎮
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 font-heading">
                        Simulasi Langsung: Aplikasi Kuis Interaktif
                      </h4>
                      <p className="text-[11px] text-indigo-700 font-semibold">
                        Mesin Logika: {currentSandboxQ.funcName} · Sistem Skor: +10 Benar, -5 Salah
                      </p>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-xl bg-white border border-indigo-200 text-indigo-900 font-black text-xs shadow-2xs">
                    Skor: <span className="text-indigo-600 text-sm">{appScore}</span> Poin
                  </div>
                </div>

                {!appSimCompleted ? (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                        <span>Pemanggilan Fungsi: {currentSandboxQ.funcName}</span>
                        <span>Pertanyaan {appQuestionIndex} dari 2</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">
                        {currentSandboxQ.prompt}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {currentSandboxQ.options.map((opt, oIdx) => {
                        const isChosen = appSelectedOption === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={appSelectedOption !== null}
                            onClick={() => handleSelectAppOption(oIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isChosen
                                ? opt.isCorrect
                                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs'
                                  : 'bg-rose-100 border-rose-400 text-rose-950 shadow-xs'
                                : appSelectedOption !== null
                                ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                                : 'bg-white hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-300 text-slate-700 shadow-2xs'
                            }`}
                          >
                            <span>{opt.text}</span>
                            {isChosen && (
                              <span>{opt.isCorrect ? '✅ (+10)' : '❌ (-5)'}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback message */}
                    {appFeedback && (
                      <div
                        className={`p-3 rounded-xl border text-xs font-semibold leading-relaxed animate-in fade-in duration-150 ${
                          appFeedback.isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}
                      >
                        {appFeedback.text}
                      </div>
                    )}

                    {/* Next question / finish button */}
                    {appSelectedOption !== null && (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                      >
                        <span>
                          {appQuestionIndex === 1
                            ? 'Panggil Tanya_Soal(2) untuk Soal Berikutnya →'
                            : 'Lihat Hasil Akhir Kuis →'}
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white border border-indigo-200 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner border border-amber-200">
                      🏆
                    </div>
                    <div>
                      <h5 className="text-base font-black text-slate-900 font-heading">
                        Kuis Selesai Dijalankan!
                      </h5>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Total Skor Akhir yang diraih: <strong className="text-indigo-600 text-sm">{appScore} Poin</strong>.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900 font-medium">
                      ✨ Fungsi <code>Tanya_Soal()</code> berhasil dipanggil 2 kali secara reusable dengan kalkulasi skor otomatis!
                    </div>
                    <button
                      type="button"
                      onClick={handleResetSandbox}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Uji Ulang Simulasi Kuis</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {!isJ8Validated && (
                <button
                  type="button"
                  disabled={isPlayingAppPreview}
                  onClick={handlePlayAndSubmitJ8}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-black text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {isPlayingAppPreview
                      ? 'Memvalidasi Aplikasi Kuis...'
                      : 'Uji & Kirim Proyek Kuis Cerdas Jilid 8'}
                  </span>
                </button>
              )}

              {/* Feedback Alert */}
              {testResultJ8 && (
                <div
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                    testResultJ8.success
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {testResultJ8.success ? (
                      <>
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Challenge Terkirim!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Perhatian:</span>
                      </>
                    )}
                  </div>
                  <p>{testResultJ8.message}</p>
                </div>
              )}

              {/* TEACHER VALIDATION SIMULATION FOR JILID 8 */}
              {isJ8Waiting && !isJ8Validated && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Validasi Guru / Tutor</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                      MODE DEMO
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Karya aplikasi kuis interaktif siswa telah tersimpan dengan status <strong>Menunggu Validasi</strong>. Klik tombol berikut untuk mensimulasikan penilaian Guru/Tutor:
                  </p>
                  <button
                    type="button"
                    onClick={() => simulateTeacherValidation(8)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Simulasikan Validasi Guru (Jilid 8)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate steps pool */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Pilihan Balok Interactive App Creator Jilid 8
              </span>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {CANDIDATE_STEPS_JILID_8.map(card => {
                  const isPicked = selectedStepsJ8.includes(card.text);
                  const isBug = card.text.startsWith('❌');

                  return (
                    <button
                      key={card.id}
                      disabled={isPicked || isJ8Validated}
                      onClick={() => handleAddStepJ8(card.text)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 cursor-pointer ${
                        isPicked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : isBug
                          ? 'bg-rose-50/50 hover:bg-rose-50 border-rose-200 text-rose-950 shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{card.text}</span>
                      <Plus className="w-4 h-4 text-indigo-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Road to Challenge 8 Overview */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading">
          Peta Seluruh 8 Tantangan Kurikulum
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {JILID_LIST.map(j => {
            const isDone = !!progress.challengeSubmissions[j.id]?.completed && progress.challengeSubmissions[j.id]?.status === 'Divalidasi';
            const isWaiting = progress.challengeSubmissions[j.id]?.status === 'Menunggu Validasi';
            const isJ1 = j.id === 1;
            const isJ2 = j.id === 2;
            const isJ3 = j.id === 3;
            const isJ4 = j.id === 4;
            const isJ5 = j.id === 5;
            const isJ6 = j.id === 6;
            const isJ7 = j.id === 7;
            const isJ8 = j.id === 8;
            const isClickable = isJ1 || isJ2 || isJ3 || isJ4 || isJ5 || isJ6 || isJ7 || isJ8;

            return (
              <div
                key={j.id}
                onClick={() => {
                  if (isClickable) {
                    setActiveChallengeJilid(j.id as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
                  }
                }}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isClickable ? 'cursor-pointer hover:shadow-md' : 'opacity-70'
                } ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : isWaiting
                    ? 'bg-amber-50/60 border-amber-300'
                    : isClickable
                    ? 'bg-white border-indigo-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{j.badgeIcon}</span>
                  {isDone ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Divalidasi ✓
                    </span>
                  ) : isWaiting ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Menunggu
                    </span>
                  ) : isClickable ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      Segera Hadir
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Jilid {j.id} Challenge
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {j.challengeTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {j.challengeDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
