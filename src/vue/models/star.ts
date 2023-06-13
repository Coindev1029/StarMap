import { RaceType } from '@/types';
import { RACES } from '@/constants';

export class Star {
  description = '';
  level = 1;
  name = 'noname';
  owner = '0x000000000000000000';
  pos2d: {
    x: number;
    y: number;
    z: number;
  } = { x: 0, y: 0, z: 0 };
  race: RaceType = 'Humans';
  scale = 1;
  starId = 1;

  constructor(data: Omit<Star, 'preview' | 'position' | 'croppedOwner' | 'coords'>) {
    Object.assign(this, data);
  }

  get preview() {
    return `./gui/images/tooltip/race-${RACES[this.race]}.png`;
  }

  get position() {
    return this.pos2d;
  }

  get coords() {
    return {
      X: this.pos2d.x,
      Y: this.pos2d.y,
      Z: this.pos2d.z ?? 0
    };
  }

  get croppedOwner() {
    return `...${this.owner.slice(-5)}`;
  }
}
