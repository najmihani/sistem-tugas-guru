/* ============================================================
   DATA SERVICE — Sistem Tugas Guru SMK (P) Jalan Ipoh
   Mock data arrays + localStorage CRUD operations
   All functions synchronous — no API calls
   ============================================================ */

// --- Storage Keys ---
const STORAGE_KEYS = {
  GURU: 'stg_guru',
  TUGAS: 'stg_tugas',
  TUGASAN: 'stg_tugasan',
  TETAPAN: 'stg_tetapan'
};

// --- Mock Data Initialization ---
const MOCK_GURU = [
  { id: 'g1', nama: 'Cikgu Aminah', jawatan: 'Guru Kanan Pentadbiran' },
  { id: 'g2', nama: 'Cikgu Sarah', jawatan: 'Guru Kanan Kurikulum' },
  { id: 'g3', nama: 'Cikgu Zul', jawatan: 'Guru Kanan HEM' },
  { id: 'g4', nama: 'Cikgu Aina', jawatan: 'Guru Kanan Kokurikulum' },
  { id: 'g5', nama: 'Cikgu Rashid', jawatan: 'Guru Bahasa Melayu' },
  { id: 'g6', nama: 'Cikgu Dewi', jawatan: 'Guru Sains' },
  { id: 'g7', nama: 'Puan Fatimah', jawatan: 'Guru Matematik' },
  { id: 'g8', nama: 'En. Kamal', jawatan: 'Guru Pendidikan Islam' }
];

const MOCK_KATEGORI = [
  { id: 'k1', nama: 'Pentadbiran', color: 'pentadbiran' },
  { id: 'k2', nama: 'Kurikulum', color: 'kurikulum' },
  { id: 'k3', nama: 'HEM', color: 'hem' },
  { id: 'k4', nama: 'Kokurikulum', color: 'kokurikulum' }
];

const MOCK_TUGAS = [
  { id: 't1', nama: 'Guru Kelas', point: 5, kategori: 'k2', penerangan: 'Menguruskan kelas dan rekod pelajar' },
  { id: 't2', nama: 'Setiausaha Peperiksaan', point: 8, kategori: 'k2', penerangan: 'Menyelaras jadual dan kertas peperiksaan' },
  { id: 't3', nama: 'Pegawai Disiplin', point: 7, kategori: 'k3', penerangan: 'Menjaga disiplin pelajar sekolah' },
  { id: 't4', nama: 'Penyelaras Kokurikulum', point: 7, kategori: 'k4', penerangan: 'Menyelaras aktiviti kokurikulum sekolah' },
  { id: 't5', nama: 'Setiausaha Mesyuarat', point: 3, kategori: 'k1', penerangan: 'Menyediakan minit mesyuarat' },
  { id: 't6', nama: 'Penolong Kanan 1', point: 10, kategori: 'k1', penerangan: 'Membantu pentadbiran sekolah' },
  { id: 't7', nama: 'Penyelaras Sukan', point: 6, kategori: 'k4', penerangan: 'Menyelaras acara sukan sekolah' },
  { id: 't8', nama: 'Pengawas Pusat Sumber', point: 4, kategori: 'k2', penerangan: 'Mengurus pusat sumber sekolah' },
  { id: 't9', nama: 'Penyelaras Bantuan', point: 5, kategori: 'k3', penerangan: 'Mengurus bantuan pelajar miskin' },
  { id: 't10', nama: 'Setiausaha Kewangan', point: 6, kategori: 'k1', penerangan: 'Mengurus kewangan kelab dan badan' },
  { id: 't11', nama: 'Pegawai Perhubungan Awam', point: 4, kategori: 'k1', penerangan: 'Mengurus hubungan luar sekolah' },
  { id: 't12', nama: 'Penyelaras STEM', point: 5, kategori: 'k2', penerangan: 'Menyelaras program STEM' },
  { id: 't13', nama: 'Guru Ganti', point: 3, kategori: 'k2', penerangan: 'Menggantikan guru tidak hadir' },
  { id: 't14', nama: 'Penyelaras Majlis', point: 4, kategori: 'k4', penerangan: 'Menyelaras majlis dan perhimpunan' },
  { id: 't15', nama: 'Penyelaras Data SQL', point: 6, kategori: 'k1', penerangan: 'Mengurus pangkalan data sekolah' },
  { id: 't16', nama: 'Kaunselor Pelajar', point: 5, kategori: 'k3', penerangan: 'Memberi kaunseling kepada pelajar' }
];

const MOCK_TUGASAN = [
  { id: 'a1', guruId: 'g1', tugasId: 't6', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a2', guruId: 'g1', tugasId: 't5', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a3', guruId: 'g2', tugasId: 't2', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a4', guruId: 'g2', tugasId: 't12', status: 'Aktif', tarikh: '2026-01-20' },
  { id: 'a5', guruId: 'g3', tugasId: 't3', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a6', guruId: 'g3', tugasId: 't9', status: 'Aktif', tarikh: '2026-01-18' },
  { id: 'a7', guruId: 'g4', tugasId: 't4', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a8', guruId: 'g4', tugasId: 't7', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a9', guruId: 'g4', tugasId: 't14', status: 'Aktif', tarikh: '2026-02-01' },
  { id: 'a10', guruId: 'g5', tugasId: 't1', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a11', guruId: 'g5', tugasId: 't13', status: 'Aktif', tarikh: '2026-01-22' },
  { id: 'a12', guruId: 'g6', tugasId: 't1', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a13', guruId: 'g6', tugasId: 't8', status: 'Aktif', tarikh: '2026-01-20' },
  { id: 'a14', guruId: 'g7', tugasId: 't1', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a15', guruId: 'g7', tugasId: 't11', status: 'Aktif', tarikh: '2026-01-25' },
  { id: 'a16', guruId: 'g8', tugasId: 't10', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'a17', guruId: 'g8', tugasId: 't16', status: 'Aktif', tarikh: '2026-01-20' },
  { id: 'a18', guruId: 'g5', tugasId: 't15', status: 'Aktif', tarikh: '2026-02-01' }
];

const DEFAULT_TETAPAN = {
  namaSekolah: 'SMK (P) Jalan Ipoh',
  logoUrl: '',
  warnaTema: '#1e40af',
  namaSistem: 'Sistem Pengurusan Tugas Guru'
};

// --- Initialize localStorage with mock data if empty ---
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.GURU)) {
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(MOCK_GURU));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TUGAS)) {
    localStorage.setItem(STORAGE_KEYS.TUGAS, JSON.stringify(MOCK_TUGAS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TUGASAN)) {
    localStorage.setItem(STORAGE_KEYS.TUGASAN, JSON.stringify(MOCK_TUGASAN));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TETAPAN)) {
    localStorage.setItem(STORAGE_KEYS.TETAPAN, JSON.stringify(DEFAULT_TETAPAN));
  }
}

// --- UUID Generator (simple) ---
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// --- Helper: get from localStorage ---
function getData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ============================================================
// GURU (Teachers)
// ============================================================

function getGuru() {
  return getData(STORAGE_KEYS.GURU);
}

function getGuruById(id) {
  return getGuru().find(g => g.id === id) || null;
}

function addGuru(nama, jawatan) {
  const list = getGuru();
  const newGuru = {
    id: generateId(),
    nama: nama.trim(),
    jawatan: jawatan.trim()
  };
  list.push(newGuru);
  setData(STORAGE_KEYS.GURU, list);
  return newGuru;
}

function deleteGuru(id) {
  let list = getGuru();
  list = list.filter(g => g.id !== id);
  setData(STORAGE_KEYS.GURU, list);
  // Also remove assignments for this teacher
  let tugasan = getTugasan();
  tugasan = tugasan.filter(a => a.guruId !== id);
  setData(STORAGE_KEYS.TUGASAN, tugasan);
  return true;
}

function updateGuru(id, nama, jawatan) {
  const list = getGuru();
  const idx = list.findIndex(g => g.id === id);
  if (idx === -1) return false;
  list[idx].nama = nama.trim();
  list[idx].jawatan = jawatan.trim();
  setData(STORAGE_KEYS.GURU, list);
  return true;
}

// ============================================================
// KATEGORI (Categories)
// ============================================================

function getKategori() {
  return [...MOCK_KATEGORI];
}

function getKategoriById(id) {
  return MOCK_KATEGORI.find(k => k.id === id) || null;
}

function getKategoriNama(id) {
  const k = getKategoriById(id);
  return k ? k.nama : '—';
}

// ============================================================
// TUGAS (Tasks)
// ============================================================

function getTugas() {
  return getData(STORAGE_KEYS.TUGAS);
}

function getTugasById(id) {
  return getTugas().find(t => t.id === id) || null;
}

function getTugasByKategori(kategoriId) {
  return getTugas().filter(t => t.kategori === kategoriId);
}

function addTugas(nama, point, kategori, penerangan) {
  const list = getTugas();
  const newTugas = {
    id: generateId(),
    nama: nama.trim(),
    point: parseInt(point) || 0,
    kategori: kategori,
    penerangan: (penerangan || '').trim()
  };
  list.push(newTugas);
  setData(STORAGE_KEYS.TUGAS, list);
  return newTugas;
}

function deleteTugas(id) {
  let list = getTugas();
  list = list.filter(t => t.id !== id);
  setData(STORAGE_KEYS.TUGAS, list);
  // Also remove assignments for this task
  let tugasan = getTugasan();
  tugasan = tugasan.filter(a => a.tugasId !== id);
  setData(STORAGE_KEYS.TUGASAN, tugasan);
  return true;
}

function updateTugas(id, nama, point, kategori, penerangan) {
  const list = getTugas();
  const idx = list.findIndex(t => t.id === id);
  if (idx === -1) return false;
  list[idx].nama = nama.trim();
  list[idx].point = parseInt(point) || 0;
  list[idx].kategori = kategori;
  list[idx].penerangan = (penerangan || '').trim();
  setData(STORAGE_KEYS.TUGAS, list);
  return true;
}

// ============================================================
// TUGASAN (Assignments)
// ============================================================

function getTugasan() {
  return getData(STORAGE_KEYS.TUGASAN);
}

function getTugasanByGuru(guruId) {
  return getTugasan().filter(a => a.guruId === guruId);
}

function getTugasanByTugas(tugasId) {
  return getTugasan().filter(a => a.tugasId === tugasId);
}

function assignTugas(guruId, tugasId, tarikh) {
  // Check if already assigned
  const existing = getTugasan();
  const dup = existing.find(a => a.guruId === guruId && a.tugasId === tugasId);
  if (dup) {
    return { error: 'Tugas ini sudah diberikan kepada guru tersebut.' };
  }

  const newAssign = {
    id: generateId(),
    guruId: guruId,
    tugasId: tugasId,
    status: 'Aktif',
    tarikh: tarikh || new Date().toISOString().split('T')[0]
  };
  existing.push(newAssign);
  setData(STORAGE_KEYS.TUGASAN, existing);
  return { success: true, data: newAssign };
}

function deleteTugasan(id) {
  let list = getTugasan();
  list = list.filter(a => a.id !== id);
  setData(STORAGE_KEYS.TUGASAN, list);
  return true;
}

function updateTugasanStatus(id, status) {
  const list = getTugasan();
  const idx = list.findIndex(a => a.id === id);
  if (idx === -1) return false;
  list[idx].status = status;
  setData(STORAGE_KEYS.TUGASAN, list);
  return true;
}

// ============================================================
// TETAPAN (Settings)
// ============================================================

function getTetapan() {
  const raw = localStorage.getItem(STORAGE_KEYS.TETAPAN);
  if (!raw) {
    setData(STORAGE_KEYS.TETAPAN, DEFAULT_TETAPAN);
    return { ...DEFAULT_TETAPAN };
  }
  try {
    return { ...DEFAULT_TETAPAN, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_TETAPAN };
  }
}

function saveTetapan(data) {
  const current = getTetapan();
  const updated = { ...current, ...data };
  setData(STORAGE_KEYS.TETAPAN, updated);
  return updated;
}

// ============================================================
// LAPORAN (Reports)
// ============================================================

function getLaporanGuru() {
  const guru = getGuru();
  const tugas = getTugas();
  const tugasan = getTugasan();
  const kategori = getKategori();

  return guru.map(g => {
    const guruTugasan = tugasan.filter(a => a.guruId === g.id);
    let totalPoint = 0;
    const tugasList = guruTugasan.map(a => {
      const t = tugas.find(tk => tk.id === a.tugasId);
      if (t) totalPoint += t.point;
      return {
        id: a.id,
        tugasanId: a.tugasId,
        nama: t ? t.nama : 'Tidak diketahui',
        point: t ? t.point : 0,
        kategori: t ? getKategoriNama(t.kategori) : '—',
        kategoriId: t ? t.kategori : null,
        status: a.status,
        tarikh: a.tarikh
      };
    });

    return {
      guruId: g.id,
      nama: g.nama,
      jawatan: g.jawatan,
      totalPoint: totalPoint,
      jumlahTugas: tugasList.length,
      tugasList: tugasList
    };
  }).sort((a, b) => b.totalPoint - a.totalPoint);
}

function getStatKeseluruhan() {
  const guru = getGuru();
  const tugas = getTugas();
  const tugasan = getTugasan();

  return {
    totalGuru: guru.length,
    totalTugas: tugas.length,
    totalTugasan: tugasan.length,
    totalTugasanAktif: tugasan.filter(a => a.status === 'Aktif').length
  };
}

// ============================================================
// PENCARIAN (Search / Filter)
// ============================================================

function cariGuru(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getGuru();
  return getGuru().filter(g =>
    g.nama.toLowerCase().includes(q) ||
    g.jawatan.toLowerCase().includes(q)
  );
}

function cariTugas(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getTugas();
  return getTugas().filter(t =>
    t.nama.toLowerCase().includes(q) ||
    t.penerangan.toLowerCase().includes(q)
  );
}

// ============================================================
// Initialize on load
// ============================================================
initData();
