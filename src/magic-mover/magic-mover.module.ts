import { Module } from '@nestjs/common';
import { MagicMoverController } from './magic-mover.controller';
import { MagicMoverService } from './magic-mover.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicMoverSchema } from './magic-mover.model';
import { MagicItemModule } from 'src/magic-item/magic-item.module';
import { MissionModule } from 'src/mission/mission.module';

@Module({
    controllers:[MagicMoverController],
    providers:[MagicMoverService] , 
    imports:[MongooseModule.forFeature([{name:"MagicMover",schema:MagicMoverSchema}]) , MagicItemModule,MissionModule]
})
export class MagicMoverModule {}
