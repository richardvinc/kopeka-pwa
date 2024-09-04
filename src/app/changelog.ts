const appChangelog = [
  {
    version: '1.4.1',
    changes: ['Menyalakan sub kategori otomatis saat memilih kategori'],
  },
  {
    version: '1.4.0',
    changes: ['Menonaktifkan fitur mengirim lokasi pengguna secara otomatis'],
  },
  {
    version: '1.3.0',
    changes: [
      'Penambahan fitur detail laporan',
      'Penambahan fallback sat gambar tidak tersedia',
      'Penambahan fitur hapus laporan pada halaman detail laporan',
    ],
  },
  {
    version: '1.2.6',
    changes: [
      'Perbaikan bug like tidak tersimpan',
      'Perbaikan bug lokasi tidak terdeteksi',
    ],
  },
  {
    version: '1.2.5',
    changes: [
      'Penambahan keterangan pada kampanye',
      'Perbaikan bahasa pada halaman onboarding kampanye',
    ],
  },
  {
    version: '1.2.4',
    changes: ['Perbaikan fitur like/unlike laporan'],
  },
  {
    version: '1.2.3',
    changes: [
      'Penambahan fitur lihat tamasya trotoar yang pernah diikuti',
      'Fitur unduh gambar rute perjalanan selama kampanye',
    ],
  },
  {
    version: '1.2.2',
    changes: ['Penambahan fitur hapus laporan'],
  },
  {
    version: '1.2.1',
    changes: [
      'Perbaikan tampilan halaman kampanye',
      'Perbaikan bug minor saat membuat kampanye baru',
    ],
  },
  {
    version: '1.2.0',
    changes: ['Menambahkan fitur kampanye'],
  },
  {
    version: '1.1.1',
    changes: [
      'Marker pada peta dapat diklik untuk melihat detail laporan',
      'Navigasi peta pada halaman laporan dapat dilakukan dengan satu jari',
    ],
  },
  {
    version: '1.1.0',
    changes: ['Penambahan fitur peta'],
  },
  {
    version: '1.0.0',
    changes: ['Rilis awal'],
  },
];

export const app = {
  version: appChangelog[0].version,
  changelog: appChangelog,
};
