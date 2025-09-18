import * as migration_20250918_010223 from './20250918_010223';

export const migrations = [
  {
    up: migration_20250918_010223.up,
    down: migration_20250918_010223.down,
    name: '20250918_010223'
  },
];
