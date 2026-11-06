import * as migration_20260329_211327 from './20260329_211327';
import * as migration_20260820_151415_carnet_url from './20260820_151415_carnet_url';
import * as migration_20261106_111407_payload_3_93_upgrade from './20261106_111407_payload_3_93_upgrade';

export const migrations = [
  {
    up: migration_20260329_211327.up,
    down: migration_20260329_211327.down,
    name: '20260329_211327',
  },
  {
    up: migration_20260820_151415_carnet_url.up,
    down: migration_20260820_151415_carnet_url.down,
    name: '20260820_151415_carnet_url',
  },
  {
    up: migration_20261106_111407_payload_3_93_upgrade.up,
    down: migration_20261106_111407_payload_3_93_upgrade.down,
    name: '20261106_111407_payload_3_93_upgrade'
  },
];
