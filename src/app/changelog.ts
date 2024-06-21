const appVersion = '1.2.1';
const appChangelog = [
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
  version: appVersion,
  changelog: appChangelog,
};
