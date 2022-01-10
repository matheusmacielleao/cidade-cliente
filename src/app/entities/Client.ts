import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn}
  from 'typeorm';
import {v4 as uuid} from 'uuid';
import {City} from './City';

@Entity('clients')
class Client {
  @PrimaryColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    sex: string;

  @Column()
    cityId: string;

  @ManyToOne(() => City)
  @JoinColumn({name: 'cityId'})
    city: City;

  @CreateDateColumn()
    birthdate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export {Client};
