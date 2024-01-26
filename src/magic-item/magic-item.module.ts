import { Module } from '@nestjs/common';
import { MagicItemController } from './magic-item.controller';
import { MagicItemService } from './magic-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicItemSchema } from './magic-item.model';

@Module({ 
    controllers: [MagicItemController], 
    providers: [MagicItemService], 
    imports: [MongooseModule.forFeature([{ name: "MagicItem", schema: MagicItemSchema }])],
    exports:[MagicItemService]
})
export class MagicItemModule { }
