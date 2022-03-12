import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Column()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
