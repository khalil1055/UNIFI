import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { CreateMagicMoverDto } from './dto/magic-mover.dto';

@Controller('magic-mover')
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  @Post()
  create(@Body() createMagicMoverDto: CreateMagicMoverDto) {
    return this.magicMoverService.create(createMagicMoverDto);
  }

  @Post('/:mover_id/:item_id')
  attachItem(
    @Param('mover_id') mover_id: string,
    @Param('item_id') item_id: string,
  ) {
    
    return this.magicMoverService.attachItem(mover_id , item_id);
    }

  @Put('/:mover_id/start-mission')
  startMission(
    @Param('mover_id') mover_id: string,
  ) {
  
    return this.magicMoverService.startMission(mover_id );
  }

  @Put('/:mover_id/end-mission')
  endMission(
    @Param('mover_id') mover_id: string,
  ) {
  
    return this.magicMoverService.endMission(mover_id );
  }

  @Get()
  findAll() {
    return this.magicMoverService.findAll();
  }
}
