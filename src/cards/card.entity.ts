import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.cards, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
