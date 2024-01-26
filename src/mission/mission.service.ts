import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mission } from './mission.model';
import { QuestState } from 'src/common/enums/quest-states.enum';
import { log } from 'console';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel('Mission') private readonly MissionModel: Model<Mission>,
  ) {}
  

  async create(mover_id:string,item_id:string): Promise<Mission | void>{

    const lastMoverMission = await this.findLoadingMissionsByMoverId(mover_id);
    const trip_number = (lastMoverMission) ? lastMoverMission.trip_number : this.createTripId();
  
    return this.MissionModel.create({
      mover_id,
      item_id, 
      trip_number,
      state: QuestState.LOADING,
      quest_states:{
        state: QuestState.LOADING
    }});
  }
  

  async changeMissionState(mover_id: string , oldState: QuestState , newState:QuestState):Promise<void>{
    this.MissionModel.updateMany(
      {mover_id , state: oldState } ,
      {
        state: newState, 
        $push:{quest_states:{state: newState}} 
      }
      ).exec();
  }

  async findLoadingMissionsByMoverId(mover_id: string) :Promise<Mission>{
    return this.MissionModel.findOne({mover_id, state: QuestState.LOADING}).sort({_id:-1}).exec();
  }

  createTripId(): string {
    return uuidv4();
  }



  
  stateMachine  = {
    [QuestState.RESTING] : [QuestState.LOADING],
    [QuestState.LOADING] : [QuestState.RESTING, QuestState.LOADING , QuestState.ON_MISSION],
    [QuestState.ON_MISSION] : [QuestState.DONE, QuestState.FAILED],
    [QuestState.DONE] : [QuestState.RESTING],
  };
  
  canChange(currentState : keyof typeof QuestState , newState: QuestState){
    return !!(this.stateMachine[currentState].includes(newState))
  }
}
