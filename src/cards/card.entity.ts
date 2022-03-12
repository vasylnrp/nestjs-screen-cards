import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CardStatus } from './card-status.enum';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  text: string;

  @Column()
  filePath: string;

  @Column()
  viewCount: number;

  @Column()
  status: CardStatus;
}
