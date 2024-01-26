import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MagicMover } from './magic-mover.model';
import { MagicItemService } from 'src/magic-item/magic-item.service';
import { Types } from 'mongoose';
import { MissionService } from 'src/mission/mission.service';
import { QuestState } from 'src/common/enums/quest-states.enum';
import { log } from 'console';

@Injectable()
export class MagicMoverService {
  constructor(
    @InjectModel('MagicMover') private readonly magicMoverModel: Model<MagicMover>,
    private readonly magicItemService: MagicItemService,
    private readonly missionService: MissionService
  ) {}

  async create(createMagicMoverDto): Promise<MagicMover> {
    const createdMagicMover = new this.magicMoverModel(createMagicMoverDto);
    return createdMagicMover.save();
  }

  async updateQuestState(mover: MagicMover ,quest_state: QuestState, itemWeight = 0): Promise<MagicMover> {
    mover.quest_state = quest_state;
    if(quest_state == QuestState.LOADING){
        // better to be in the query so it will handle asyn cases 
        mover.currentWeighted += itemWeight;
    }
    if(quest_state == QuestState.DONE){
        mover.missions.done++;
        mover.currentWeighted = 0;
    }
    return mover.save();
  }


  async findAll(): Promise<MagicMover[]> {
    return this.magicMoverModel.find().limit(10).sort({"missions.done": -1}).exec();
  }



  async findById(id:string): Promise<MagicMover> {
    return this.magicMoverModel.findById(id).exec();
  }

  async attachItem(mover_id: string , item_id: string){

    const mover = await this.getMoverById(mover_id);
    const item  = await this.magicItemService.getItemById(item_id);

    if(!this.missionService.canChange(mover.quest_state as keyof typeof QuestState , QuestState.LOADING)){
        throw new HttpException("Magic mover should be on resting or loading state to attach item to him" , HttpStatus.BAD_REQUEST);
    }

    log(mover , item);

    if(mover.currentWeighted + item.weight > mover.weight_limit){
        throw new HttpException("Over weight limited on this magic mover" , HttpStatus.BAD_REQUEST);
    }

    this.updateQuestState(mover , QuestState.LOADING , item.weight);
    this.missionService.create(mover_id , item_id);
    

    return "Attached";
  }


  async startMission(mover_id: string){

    const mover = await this.getMoverById(mover_id);

    if(!this.missionService.canChange(mover.quest_state as keyof typeof QuestState , QuestState.ON_MISSION)){
        throw new HttpException("Magic mover should be on loading state to start mission" , HttpStatus.BAD_REQUEST);
    }

    this.updateQuestState(mover , QuestState.ON_MISSION);
    this.missionService.changeMissionState(mover_id , QuestState.LOADING , QuestState.ON_MISSION);
    
    
    return "Started";
  }


  async endMission(mover_id: string){
  
    const mover = await this.getMoverById(mover_id);

    if(!this.missionService.canChange(mover.quest_state as keyof typeof QuestState , QuestState.DONE)){
        throw new HttpException("Magic mover should be on loading state to start mission" , HttpStatus.BAD_REQUEST);
    }

    await this.updateQuestState(mover , QuestState.DONE);
    this.missionService.changeMissionState(mover_id , QuestState.ON_MISSION , QuestState.DONE);
    this.updateQuestState(mover , QuestState.RESTING);

    return "Ended";
  }

  /**
   * validate moverId as a mongo id and already in the db
   * 
   * @param mover_id 
   * @returns 
   */
  async getMoverById(mover_id): Promise<MagicMover>{
    if (!Types.ObjectId.isValid(mover_id)) {
        throw new HttpException("Invalid mover_id format" , HttpStatus.BAD_REQUEST);
    }
  
    const mover = await this.findById(mover_id);

    if(!mover ) {
        throw new HttpException("You should send valid mover_id " , HttpStatus.BAD_REQUEST);
    }

    return mover;
  }
  
}
