import { Injectable, NotFoundException } from '@nestjs/common';
import { CardStatus } from './card-status.enum';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';
import { CardsRepository } from './cards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  private cards: Card[] = [];

  constructor(
    @InjectRepository(CardsRepository)
    private cardsRepository: CardsRepository,
  ) {}

  public async getCard(cardId: string): Promise<Card> {
    return await this.findCard(cardId);
  }

  public async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const card = {
      ...createCardDto,
      viewCount: 0,
      status: CardStatus.NEW,
    };
    return await this.cardsRepository.createCard(card);
  }

  public async getCards(cardsFilter: GetCardsFilterDto): Promise<Card[]> {
    return await this.cardsRepository.getCards(cardsFilter);
  }

  public async increaseView(id: string): Promise<Card> {
    const card = await this.findCard(id);

    card.viewCount += 1;
    if (card.status == CardStatus.NEW) card.status = CardStatus.IN_PROGRESS;
    await this.cardsRepository.save(card);

    return card;
  }

  public async deleteCard(id: string): Promise<void> {
    const card = await this.findCard(id);
    this.cardsRepository.remove(card);
  }

  private findCardIndex(id: string): number {
    const result = this.cards.findIndex((c) => c.id == id);

    if (result < 0) throw new NotFoundException();

    return result;
  }

  private async findCard(id: string): Promise<Card> {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException();
    }
    return card;
  }
}
