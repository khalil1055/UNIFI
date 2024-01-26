import * as mongoose from 'mongoose';

export const MagicItemSchema = new mongoose.Schema({
  name: String,
  weight: Number,
});

export interface MagicItem extends mongoose.Document {
  name: string;
  weight: number;
}
