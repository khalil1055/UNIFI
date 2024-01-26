import { Module } from '@nestjs/common';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionSchema } from './mission.model';

@Module({
    controllers:[MissionController],
    providers:[MissionService] , 
    imports:[MongooseModule.forFeature([{name:"Mission",schema:MissionSchema}])],
    exports: [MissionService]
})
export class MissionModule {}
