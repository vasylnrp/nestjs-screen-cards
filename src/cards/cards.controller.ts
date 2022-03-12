import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Card } from './card.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getCards(@Body() cardsFilter: GetCardsFilterDto): Promise<Card[]> {
    return await this.cardsService.getCards(cardsFilter);
  }

  @Get(':id')
  getCard(@Param('id') cardId: string): Promise<Card> {
    return this.cardsService.getCard(cardId);
  }

  @Patch('/:id/increase-view')
  async increaseView(
    @Param('id', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return await this.cardsService.increaseView(cardId);
  }

  @Delete(':id')
  async deleteCard(@Param('id') cardId: string): Promise<void> {
    await this.cardsService.deleteCard(cardId);
  }

  @Post()
  crateCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(createCardDto);
  }
}
