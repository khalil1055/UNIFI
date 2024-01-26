import * as mongoose from 'mongoose';
import { QuestState } from 'src/common/enums/quest-states.enum';

export const MagicMoverSchema = new mongoose.Schema({
  name: String,
  weight_limit: Number,
  energy: Number,
  currentWeighted: {type:Number, default: 0},
  quest_state: {
    type: String,
    enum: QuestState,
    default: 'resting',
  },
  missions:{
    done : {type:Number, default: 0},
  }
});

export interface MagicMover extends mongoose.Document {
  name: string,
  weight_limit: number;
  energy: number;
  currentWeighted: number,
  quest_state: string;
  missions:{
    done: number,
  }

};


/** 
 * 
 * mover : name - weight_limit - energy - quest_state - current_items [] - missions { completed - failed - on_progress}
 * item : name - weight 
 * state-logs : mover_id , item_id , trip_number , state_machine { state , time }  
 *
 * 
 * state machine :  
*/