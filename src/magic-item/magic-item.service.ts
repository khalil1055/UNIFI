import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MagicItem } from './magic-item.model';

@Injectable()
export class MagicItemService {
  constructor(
    @InjectModel('MagicItem') private readonly magicItemModel: Model<MagicItem>,
  ) {}

  async create(createMagicItemDto): Promise<MagicItem> {
    const createdMagicItem = new this.magicItemModel(createMagicItemDto);
    return createdMagicItem.save();
  }

  async findAll(): Promise<MagicItem[]> {
    return this.magicItemModel.find().exec();
  }


  async findById(id: string): Promise<MagicItem> {
    return this.magicItemModel.findById(id).exec();
  }

  async getItemById(item_id: string){

    if (!Types.ObjectId.isValid(item_id)) {
        throw new HttpException("Invalid mover_id or item_id format" , HttpStatus.BAD_REQUEST);
    }

    const item  = await this.findById(item_id);

    if(!item ) {
        throw new HttpException("You should send valid mover_id and item_id" , HttpStatus.BAD_REQUEST);
    }

    return item;
  }
}
