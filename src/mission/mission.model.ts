import * as mongoose from 'mongoose';
import { QuestState } from 'src/common/enums/quest-states.enum';

export const MissionSchema = new mongoose.Schema({
  mover_id : String,
  item_id : String,
  trip_number : String,
  state: String,
  quest_states : [
    {
      state : {
        type: String ,
        enum: QuestState
      },
      time : {
        type: Date,
        default: Date.now
      }
    }
  ],
} , {timestamps: true});

MissionSchema.index({mover_id: -1 , item_id: -1, trip_number: -1} , {unique: true});

export interface Mission extends mongoose.Document {
  mover_id : string,
  item_id : string ,
  trip_number : string,
  state: string,
  quest_states : [{state : string, time: Date}],
};

