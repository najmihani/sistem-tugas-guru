/* ============================================================
   DATA SERVICE — Sistem Tugas Guru SMK (P) Jalan Ipoh
   Google Sheets API + localStorage fallback
   ============================================================ */

// --- API Configuration ---
const API_URL = 'https://script.google.com/macros/s/AKfycbyy8nhXODk9IjlgmKcYLETu-iozNa4JxoekvCUEeShqzY_mNg-iQf5YcXSMoG-Vrb7MCg/exec';

// --- Storage Keys ---
const STORAGE_KEYS = {
  GURU: 'stg_guru',
  TUGAS: 'stg_tugas',
  TUGASAN: 'stg_tugasan',
  TETAPAN: 'stg_tetapan',
  KATEGORI: 'stg_kategori',
  LAST_SYNC: 'stg_last_sync'
};

// ============================================================
// MOCK DATA (fallback if API & localStorage both empty)
// ============================================================

const MOCK_GURU = [
  { id: 'g001', nama: 'Cikgu Aminah Binti Abdullah', jawatan: 'Guru Akademik' },
  { id: 'g002', nama: 'Cikgu Sarah Binti Mohd', jawatan: 'Guru Akademik' },
  { id: 'g003', nama: 'Cikgu Zul Fadli Bin Ali', jawatan: 'Guru Akademik' },
  { id: 'g004', nama: 'Cikgu Aina Binti Hassan', jawatan: 'Guru Perpustakaan' },
  { id: 'g005', nama: 'Cikgu Rashid Bin Omar', jawatan: 'Guru ICT' },
  { id: 'g006', nama: 'Cikgu Dewi Binti Rajan', jawatan: 'Guru Akademik' },
  { id: 'g007', nama: 'Puan Hajah Fatimah Binti Yusof', jawatan: 'Pengetua' },
  { id: 'g008', nama: 'En. Kamal Bin Aziz', jawatan: 'GPK' }
];

const MOCK_KATEGORI = [
  { id: 'kat01', nama: 'Pentadbiran' },
  { id: 'kat02', nama: 'Kurikulum' },
  { id: 'kat03', nama: 'HEM' },
  { id: 'kat04', nama: 'Kokurikulum' }
];

const MOCK_TUGAS = [
  { id: 't001', nama: 'Guru Kelas Tingkatan 3A', point: 5, kategori: 'kat02', penerangan: 'Mengurus hal ehwal kelas' },
  { id: 't002', nama: 'Guru Kelas Tingkatan 2B', point: 5, kategori: 'kat02', penerangan: 'Mengurus hal ehwal kelas' },
  { id: 't003', nama: 'Setiausaha Peperiksaan', point: 8, kategori: 'kat02', penerangan: 'Mengurus jadual & kertas peperiksaan' },
  { id: 't004', nama: 'Pegawai Disiplin', point: 7, kategori: 'kat03', penerangan: 'Mengurus disiplin murid' },
  { id: 't005', nama: 'Guru Warden Asrama', point: 6, kategori: 'kat03', penerangan: 'Mengawas asrama' },
  { id: 't006', nama: 'Penasihat Kelab STEM', point: 4, kategori: 'kat04', penerangan: 'Membimbing kelab STEM' },
  { id: 't007', nama: 'Penasihat Kelab Pidato', point: 3, kategori: 'kat04', penerangan: 'Membimbing kelab pidato' },
  { id: 't008', nama: 'Setiausaha Mesyuarat', point: 3, kategori: 'kat01', penerangan: 'Mencatat minit mesyuarat' },
  { id: 't009', nama: 'Penyelaras ICT', point: 6, kategori: 'kat01', penerangan: 'Mengurus sistem ICT sekolah' },
  { id: 't010', nama: 'Ketua Panitia Matematik', point: 6, kategori: 'kat01', penerangan: 'Ketua panitia Matematik' },
  { id: 't011', nama: 'Guru Pengawas', point: 7, kategori: 'kat01', penerangan: 'Mengurus pengawas sekolah' },
  { id: 't012', nama: 'Penolong Warden', point: 4, kategori: 'kat03', penerangan: 'Membantu warden' },
  { id: 't013', nama: 'Penasihat Kelab Rukun Negara', point: 3, kategori: 'kat04', penerangan: 'Membimbing kelab' },
  { id: 't014', nama: 'Jurulatih Sukan', point: 5, kategori: 'kat04', penerangan: 'Melatih pasukan sukan' },
  { id: 't015', nama: 'Penyelaras Program Nilam', point: 4, kategori: 'kat02', penerangan: 'Program bacaan nilam' },
  { id: 't016', nama: 'Penyelaras BKK', point: 5, kategori: 'kat03', penerangan: 'Mengurus bantuan kebajikan' }
];

const MOCK_TUGASAN = [
  { id: 'tg001', guruId: 'g001', tugasId: 't001', status: 'Aktif', tarikh: '2026-01-10' },
  { id: 'tg002', guruId: 'g002', tugasId: 't002', status: 'Aktif', tarikh: '2026-01-10' },
  { id: 'tg003', guruId: 'g003', tugasId: 't015', status: 'Aktif', tarikh: '2026-01-15' },
  { id: 'tg004', guruId: 'g004', tugasId: 't003', status: 'Aktif', tarikh: '2026-02-01' },
  { id: 'tg005', guruId: 'g005', tugasId: 't009', status: 'Aktif', tarikh: '2026-01-10' },
  { id: 'tg006', guruId: 'g006', tugasId: 't007', status: 'Aktif', tarikh: '2026-02-01' },
  { id: 'tg007', guruId: 'g007', tugasId: 't008', status: 'Aktif', tarikh: '2026-01-10' },
  { id: 'tg008', guruId: 'g008', tugasId: 't011', status: 'Aktif', tarikh: '2026-01-10' },
  { id: 'tg009', guruId: 'g001', tugasId: 't010', status: 'Aktif', tarikh: '2026-02-01' },
  { id: 'tg010', guruId: 'g002', tugasId: 't006', status: 'Aktif', tarikh: '2026-02-15' },
  { id: 'tg011', guruId: 'g003', tugasId: 't005', status: 'Aktif', tarikh: '2026-03-01' },
  { id: 'tg012', guruId: 'g004', tugasId: 't003', status: 'Aktif', tarikh: '2026-03-01' },
  { id: 'tg013', guruId: 'g005', tugasId: 't004', status: 'Aktif', tarikh: '2026-03-01' },
  { id: 'tg014', guruId: 'g006', tugasId: 't014', status: 'Aktif', tarikh: '2026-03-15' },
  { id: 'tg015', guruId: 'g001', tugasId: 't012', status: 'Aktif', tarikh: '2026-04-01' },
  { id: 'tg016', guruId: 'g008', tugasId: 't013', status: 'Aktif', tarikh: '2026-04-01' },
  { id: 'tg017', guruId: 'g002', tugasId: 't016', status: 'Aktif', tarikh: '2026-04-15' },
  { id: 'tg018', guruId: 'g003', tugasId: 't011', status: 'Aktif', tarikh: '2026-05-01' }
];

const DEFAULT_TETAPAN = {
  namaSekolah: 'SMK (P) Jalan Ipoh',
  logoUrl: '',
  warnaTema: '#1e40af',
  namaSistem: 'Sistem Pengurusan Tugas Guru'
};

// ============================================================
// API — Fetch Data from Google Sheets
// ============================================================

async function apiFetch(action) {
  try {
    const url = API_URL + '?action=' + action;
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return json.success ? json : null;
  } catch (e) {
    console.warn('API fetch error for ' + action + ':', e.message);
    return null;
  }
}

async function apiPost(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (e) {
    console.warn('API post error:', e.message);
    return { success: false, error: e.message };
  }
}

// ============================================================
// MAP API FORMAT → APP FORMAT
// ============================================================

function mapGuruFromApi(apiRow) {
  return {
    id: (apiRow.ID || '').toString().toLowerCase(),
    nama: apiRow.Nama || '',
    jawatan: apiRow.Jawatan || ''
  };
}

function mapKategoriFromApi(apiRow) {
  return {
    id: (apiRow.ID || '').toString().toLowerCase(),
    nama: apiRow.Kategori || ''
  };
}

function mapTugasFromApi(apiRow) {
  const katId = (apiRow.Kategori || '').toLowerCase();
  // Cari mapping kategori
  const katMap = { pentadbiran: 'kat01', kurikulum: 'kat02', hem: 'kat03', kokurikulum: 'kat04' };
  const mappedKat = katMap[katId] || katId;
  return {
    id: (apiRow.ID || '').toString().toLowerCase(),
    nama: apiRow.Tugas || '',
    point: parseInt(apiRow.Point) || 0,
    kategori: mappedKat,
    penerangan: apiRow.Penerangan || ''
  };
}

function mapTugasanFromApi(apiRow) {
  return {
    id: (apiRow.ID || '').toString().toLowerCase(),
    guruId: (apiRow.GuruID || '').toString().toLowerCase(),
    tugasId: (apiRow.TugasID || '').toString().toLowerCase(),
    status: apiRow.Status || 'Aktif',
    tarikh: apiRow.TarikhAssign || ''
  };
}

function mapTetapanFromApi(apiRows) {
  if (!apiRows || !Array.isArray(apiRows)) return { ...DEFAULT_TETAPAN };
  const result = { ...DEFAULT_TETAPAN };
  apiRows.forEach(row => {
    if (row.Kunci === 'NamaSekolah') result.namaSekolah = row.Nilai || result.namaSekolah;
    if (row.Kunci === 'LogoURL') result.logoUrl = row.Nilai || '';
    if (row.Kunci === 'WarnaUtama') result.warnaTema = row.Nilai || result.warnaTema;
  });
  return result;
}

// ============================================================
// SYNC — Fetch All Data from API → localStorage
// ============================================================

let syncPromise = null;

async function syncDataFromApi() {
  // Prevent multiple simultaneous syncs
  if (syncPromise) return syncPromise;
  
  syncPromise = (async () => {
    const result = await apiFetch('getAll');
    if (!result || !result.guru) return false;

    // Map & save Guru
    const guru = (result.guru || []).map(mapGuruFromApi);
    if (guru.length > 0) localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(guru));

    // Map & save Kategori
    const kategori = (result.kategori || []).map(mapKategoriFromApi);
    if (kategori.length > 0) localStorage.setItem(STORAGE_KEYS.KATEGORI, JSON.stringify(kategori));

    // Map & save Tugas
    const tugas = (result.tugas || []).map(mapTugasFromApi);
    if (tugas.length > 0) localStorage.setItem(STORAGE_KEYS.TUGAS, JSON.stringify(tugas));

    // Map & save Tugasan
    const tugasan = (result.tugasan || []).map(mapTugasanFromApi);
    if (tugasan.length > 0) localStorage.setItem(STORAGE_KEYS.TUGASAN, JSON.stringify(tugasan));

    // Map & save Tetapan
    const tetapan = mapTetapanFromApi(result.tetapan || []);
    localStorage.setItem(STORAGE_KEYS.TETAPAN, JSON.stringify(tetapan));

    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    return true;
  })();

  const ok = await syncPromise;
  syncPromise = null;
  return ok;
}

// ============================================================
// HELPERS — localStorage
// ============================================================

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

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

function initData() {
  // Only init if localStorage is empty
  if (!localStorage.getItem(STORAGE_KEYS.GURU)) {
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(MOCK_GURU));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TUGAS)) {
    localStorage.setItem(STORAGE_KEYS.TUGAS, JSON.stringify(MOCK_TUGAS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TUGASAN)) {
    localStorage.setItem(STORAGE_KEYS.TUGASAN, JSON.stringify(MOCK_TUGASAN));
  }
  if (!localStorage.getItem(STORAGE_KEYS.KATEGORI)) {
    localStorage.setItem(STORAGE_KEYS.KATEGORI, JSON.stringify(MOCK_KATEGORI));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TETAPAN)) {
    localStorage.setItem(STORAGE_KEYS.TETAPAN, JSON.stringify(DEFAULT_TETAPAN));
  }
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
  const newGuru = { id: generateId(), nama: nama.trim(), jawatan: jawatan.trim() };
  list.push(newGuru);
  setData(STORAGE_KEYS.GURU, list);
  // Try API sync (async, don't wait)
  apiPost({ action: 'addGuru', fields: { ID: newGuru.id, Nama: newGuru.nama, Jawatan: newGuru.jawatan, KataLaluan: 'guru123', Panitia: '' } });
  return newGuru;
}

function deleteGuru(id) {
  let list = getGuru();
  list = list.filter(g => g.id !== id);
  setData(STORAGE_KEYS.GURU, list);
  let tugasan = getTugasan();
  tugasan = tugasan.filter(a => a.guruId !== id);
  setData(STORAGE_KEYS.TUGASAN, tugasan);
  apiPost({ action: 'deleteGuru', id: id.toUpperCase() });
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
  return getData(STORAGE_KEYS.KATEGORI);
}

function getKategoriById(id) {
  return getKategori().find(k => k.id === id) || null;
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
  // Map kategori ID → Nama for API
  const katNama = getKategoriNama(kategori);
  apiPost({ action: 'addTugas', fields: { ID: newTugas.id.toUpperCase(), Tugas: newTugas.nama, Point: newTugas.point, Kategori: katNama, Penerangan: newTugas.penerangan } });
  return newTugas;
}

function deleteTugas(id) {
  let list = getTugas();
  list = list.filter(t => t.id !== id);
  setData(STORAGE_KEYS.TUGAS, list);
  let tugasan = getTugasan();
  tugasan = tugasan.filter(a => a.tugasId !== id);
  setData(STORAGE_KEYS.TUGASAN, tugasan);
  apiPost({ action: 'deleteTugas', id: id.toUpperCase() });
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
  const existing = getTugasan();
  const dup = existing.find(a => a.guruId === guruId && a.tugasId === tugasId);
  if (dup) return { error: 'Tugas ini sudah diberikan kepada guru tersebut.' };

  const newAssign = {
    id: generateId(),
    guruId: guruId,
    tugasId: tugasId,
    status: 'Aktif',
    tarikh: tarikh || new Date().toISOString().split('T')[0]
  };
  existing.push(newAssign);
  setData(STORAGE_KEYS.TUGASAN, existing);
  apiPost({ action: 'assignTugas', guruId: guruId.toUpperCase(), tugasId: tugasId.toUpperCase() });
  return { success: true, data: newAssign };
}

function deleteTugasan(id) {
  let list = getTugasan();
  list = list.filter(a => a.id !== id);
  setData(STORAGE_KEYS.TUGASAN, list);
  apiPost({ action: 'deleteTugasan', id: id.toUpperCase() });
  return true;
}

function updateTugasanStatus(id, status) {
  const list = getTugasan();
  const idx = list.findIndex(a => a.id === id);
  if (idx === -1) return false;
  list[idx].status = status;
  setData(STORAGE_KEYS.TUGASAN, list);
  apiPost({ action: 'updateTugasanStatus', id: id.toUpperCase(), status: status });
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
  // Sync specific keys to API
  if (data.namaSekolah !== undefined) apiPost({ action: 'updateTetapan', kunci: 'NamaSekolah', nilai: data.namaSekolah });
  if (data.warnaTema !== undefined) apiPost({ action: 'updateTetapan', kunci: 'WarnaUtama', nilai: data.warnaTema });
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
// INIT — Run on page load
// ============================================================

// Step 1: Init localStorage with mock data if empty
initData();

// Step 2: Try to sync from API (async)
syncDataFromApi().then(ok => {
  if (ok) {
    console.log('✅ Data synced from Google Sheets');
    // Refresh halaman jika ada data baru
    const event = new CustomEvent('dataSynced');
    window.dispatchEvent(event);
  } else {
    console.log('ℹ️ Using local data (API unavailable)');
  }
});
