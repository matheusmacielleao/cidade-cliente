import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn}
  from 'typeorm';
import {randomUUID} from 'crypto';

import {City} from './City';

@Entity('clients')
class Client {
  @PrimaryColumn()
    id!: string;

  @Column()
    name!: string;

  @Column()
    gender!: string;

  @Column()
    cityId!: string;

  @ManyToOne(() => City)
  @JoinColumn({name: 'cityId'})
    city!: City;

  @CreateDateColumn()
    birthdate!: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export {Client};
