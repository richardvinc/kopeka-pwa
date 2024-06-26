export class ReportUtils {
  public static translateSubCategory(value: string): string {
    switch (value) {
      case 'ZEBRA_CROSS_FADED':
        return 'Pudar';
      case 'ZEBRA_CROSS_MISSING':
        return 'Tidak ada';
      case 'ZEBRA_CROSS_OBSTRUCTED':
        return 'Terhalang';
      case 'ZEBRA_CROSS_OTHER':
        return 'Lainnya';

      case 'SIDEWALK_BROKEN':
        return 'Rusak';
      case 'SIDEWALK_BROKEN_GUIDING_BLOCK':
        return 'Guiding block rusak';
      case 'SIDEWALK_MISSING':
        return 'Tidak ada';
      case 'SIDEWALK_MISSING_GUIDING_BLOCK':
        return 'Tidak ada guiding block';
      case 'SIDEWALK_OBSTRUCTED_TREE':
        return 'Terhalang pohon';
      case 'SIDEWALK_OBSTRUCTED_MOTORCYCLE':
        return 'Terhalang kendaraan';
      case 'SIDEWALK_OBSTRUCTED_PEDDLERS':
        return 'Terhalang pedagang';
      case 'SIDEWALK_DARK':
        return 'Gelap';
      case 'SIDEWALK_SLIPPERY':
        return 'Licin';
      case 'SIDEWALK_OTHER':
        return 'Lainnya';

      case 'PELICAN_CROSSING_BROKEN':
        return 'Rusak';
      case 'PELICAN_CROSSING_MISSING':
        return 'Tidak ada';
      case 'PELICAN_CROSSING_OTHER':
        return 'Lainnya';
      case 'PEDESTRIAN_BRIDGE_BROKEN':
        return 'Rusak';
      case 'PEDESTRIAN_BRIDGE_OBSTRUCTED':
        return 'Terhalang';
      case 'PEDESTRIAN_BRIDGE_DARK':
        return 'Gelap';
      case 'PEDESTRIAN_BRIDGE_SLIPPERY':
        return 'Licin';
      case 'PELICAN_CROSSING_BROKEN_SOUND':
        return 'Suara rusak';
      case 'PELICAN_CROSSING_BROKEN_LIGHT':
        return 'Lampu rusak';
      case 'PELICAN_CROSSING_TOO_FAST':
        return 'Waktu terlalu cepat';
      case 'PEDESTRIAN_BRIDGE_OTHER':
        return 'Lainnya';

      case 'OTHER_BROKEN':
        return 'Rusak/Hancur';
      case 'OTHER_MISSING':
        return 'Tidak ada';
      case 'OTHER_OTHER':
        return 'Lainnya';

      case 'ZEBRA_CROSS_NO_VEHICLE':
        return 'Steril dari kendaraan';
      case 'ZEBRA_CROSS_CLEAN':
        return 'Bersih';

      case 'SIDEWALK_CLEAN':
        return 'Bersih';
      case 'SIDEWALK_NO_VEHICLE':
        return 'Tidak ada kendaraan';
      case 'SIDEWALK_NO_PEDDLERS':
        return 'Tidak ada pedagang';
      case 'SIDEWALK_BRIGHT':
        return 'Terang';
      case 'SIDEWALK_SPACIOUS':
        return 'Luas';
      case 'SIDEWALK_GUIDING_BLOCK_EXISTS':
        return 'Ada guiding block';
      case 'SIDEWALK_GUIDING_BLOCK_CORRECT':
        return 'Guiding block tepat guna';

      case 'PELICAN_CROSSING_HELPFUL':
        return 'Membantu';
      case 'PELICAN_CROSSING_WORKING':
        return 'Bekerja baik';
      case 'PELICAN_CROSSING_GREAT_DURATION':
        return 'Durasi tepat';

      case 'PEDESTRIAN_BRIDGE_CLEAN':
        return 'Bersih';
      case 'PEDESTRIAN_BRIDGE_BRIGHT':
        return 'Terang';
      case 'PEDESTRIAN_BRIDGE_COMFORTABLE':
        return 'Nyaman';
      case 'PEDESTRIAN_BRIDGE_SAFE':
        return 'Aman';

      case 'OTHER_TIDY':
        return 'Rapi';
      case 'OTHER_CLEAN':
        return 'Bersih';
      default:
        return value;
    }
  }
}
