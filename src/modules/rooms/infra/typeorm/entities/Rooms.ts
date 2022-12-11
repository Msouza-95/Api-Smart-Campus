import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Building from '../../../../building/infra/typeorm/entities/Building';

@Entity('rooms')
class Rooms {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  building_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
  @ManyToMany(() => Building, building => building.rooms)
  @JoinColumn({ name: 'building_id' })
  building: Building;
}

export default Rooms;
