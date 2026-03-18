import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260318_150727 from './20260318_150727';
import * as migration_20260318_151705 from './20260318_151705';
import * as migration_20260318_155540 from './20260318_155540';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260318_150727.up,
    down: migration_20260318_150727.down,
    name: '20260318_150727',
  },
  {
    up: migration_20260318_151705.up,
    down: migration_20260318_151705.down,
    name: '20260318_151705',
  },
  {
    up: migration_20260318_155540.up,
    down: migration_20260318_155540.down,
    name: '20260318_155540'
  },
];
