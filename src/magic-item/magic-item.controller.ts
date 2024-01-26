import { Controller, Post, Get, Body } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { CreateMagicItemDto } from './dto/magic-item.dto';

@Controller('magic-item')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post()
  create(@Body() createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemService.create(createMagicItemDto);
  }

  @Get()
  findAll() {
    return this.magicItemService.findAll();
  }
}
