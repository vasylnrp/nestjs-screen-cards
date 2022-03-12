import { IsEnum } from 'class-validator';
import { CardStatus } from '../card-status.enum';

export class GetCardsFilterDto {
  text?: string;
  @IsEnum(CardStatus)
  status: CardStatus;
}
