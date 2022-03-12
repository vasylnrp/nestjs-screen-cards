import { IsNotEmpty } from 'class-validator';

// export class Card {
//   public id: string;
//   @IsNotEmpty()
//   public text: string;
//   public filePath: string;
//   public viewCount: number;
//   public status: CardStatus;
// }

export enum CardStatus {
  NEW = 'New',
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
}
