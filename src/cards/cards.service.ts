import { Injectable, NotFoundException } from '@nestjs/common';
import { CardStatus } from './card-status.enum';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';
import { CardsRepository } from './cards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CardsService {
  private cards: Card[] = [];

  constructor(
    @InjectRepository(CardsRepository)
    private cardsRepository: CardsRepository,
  ) {}

  public async getCard(cardId: string, user: User): Promise<Card> {
    return await this.findCard(cardId, user);
  }

  public async createCard(
    createCardDto: CreateCardDto,
    user: User,
  ): Promise<Card> {
    const card = {
      ...createCardDto,
      viewCount: 0,
      status: CardStatus.NEW,
      user,
    };
    return await this.cardsRepository.createCard(card);
  }

  public async getCards(
    cardsFilter: GetCardsFilterDto,
    user: User,
  ): Promise<Card[]> {
    return await this.cardsRepository.getCards(cardsFilter, user);
  }

  public async increaseView(id: string, user: User): Promise<Card> {
    const card = await this.findCard(id, user);
    card.viewCount += 1;
    if (card.status == CardStatus.NEW) card.status = CardStatus.IN_PROGRESS;
    await this.cardsRepository.save(card);

    return card;
  }

  public async deleteCard(id: string, user: User): Promise<void> {
    const card = await this.findCard(id, user);
    this.cardsRepository.remove(card);
  }

  private async findCard(id: string, user: User): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id, user } });
    if (!card) throw new NotFoundException();
    return card;
  }
}
