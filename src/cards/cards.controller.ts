import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Card } from './card.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';

@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async getCards(
    @Body() cardsFilter: GetCardsFilterDto,
    @GetUser() user: User,
  ): Promise<Card[]> {
    // this.logger.verbose()
    // console.log(user);
    return await this.cardsService.getCards(cardsFilter, user);
  }

  @Get(':id')
  getCard(@Param('id') cardId: string, @GetUser() user: User): Promise<Card> {
    return this.cardsService.getCard(cardId, user);
  }

  @Patch('/:id/increase-view')
  async increaseView(
    @Param('id', ParseUUIDPipe) cardId: string,
    @GetUser() user: User,
  ): Promise<Card> {
    return await this.cardsService.increaseView(cardId, user);
  }

  @Delete(':id')
  async deleteCard(
    @Param('id') cardId: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.cardsService.deleteCard(cardId, user);
  }

  @Post()
  crateCard(
    @Body() createCardDto: CreateCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.createCard(createCardDto, user);
  }
}
