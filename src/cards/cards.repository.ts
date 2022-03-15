import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Card } from './card.entity';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {
  public async createCard(card: Card) {
    const result = this.create(card);
    await this.save(result);
    return result;
  }

  public async getCards(
    cardsFilter: GetCardsFilterDto,
    user: User,
  ): Promise<Card[]> {
    const query = this.createQueryBuilder('card');

    query.andWhere({ user });

    const { text, status } = cardsFilter;
    if (status) query.andWhere('card.status = :status', { status });
    if (text)
      query.andWhere('LOWER(card.text) LIKE :text', {
        text: `%${text.toLowerCase()}%`,
      });

    return await query.getMany();
  }
}
