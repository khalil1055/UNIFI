import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoConfig from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicItemModule } from './magic-item/magic-item.module';
import { MagicMoverModule } from './magic-mover/magic-mover.module';
import {MissionModule} from './mission/mission.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
    MagicItemModule,
    MagicMoverModule,
    MissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
