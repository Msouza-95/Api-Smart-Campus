import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Rooms from '../../../../rooms/infra/typeorm/entities/Rooms';

@Entity('building')
class Building {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => Rooms, rooms => rooms.building)
  rooms: Rooms[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Building;
