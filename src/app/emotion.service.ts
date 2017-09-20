import { Injectable, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from './utils.service';
import * as anime from "animejs";

const utils = new UtilsService();

import { awakeSequence } from "./emotions/sequence/awake.sequence";
import { wonderLoop } from "./emotions/sequence/wonder.sequence";
import { sleepSequence } from "./emotions/sequence/sleep.sequence";
import { 
  moveEyesLeft, 
  moveEyesRight, 
  moveEyesTopCenter, 
  moveEyesTopLeft,
  moveEyesTopRight,
  moveEyesReset,
  moveEyesResetClosed
} from "./emotions/sequence/moveEyes.sequence";

import { resetEmotion } from "./emotions/basic/reset.emotion";
import { blinkHard, blinkSoft } from "./emotions/basic/blink.emotion";
import { winkHard, winkSoft } from "./emotions/basic/wink.emotion";
import { determined } from "./emotions/basic/determined.emotion";
import { happy } from "./emotions/basic/happy.emotion";
import { sad } from "./emotions/basic/sad.emotion";


interface Emotions{
  happy();
  sad();
  awake();
  sleep();
}

@Injectable()
export class EmotionService implements Emotions{

  public eyeGroupClass = "closed o-center";
  private current = "sleep";
  private origin(el:HTMLElement,o:string){
    el.style.transformOrigin = o;
  }

  animationInProgress = false;
  set animating(bool:boolean){
    console.log("animating",bool);
    this.animationInProgress = bool;
  }

  get eyes(){
    return [
      document.querySelector("#eyes > path:first-child"),
      document.querySelector("#eyes > path:last-child"),
      document.querySelectorAll("#eyes > path")
    ]
  }
  get randomEye(){
    let firstEye = utils.randomIntClamp(0,1);
    let self = this;
    return {
      first:self.eyes[firstEye],
      get last(){
        return self.eyes[firstEye === 0?1:0]
      }
    }
  }

  happy(){  }
  sad(){  }
  awake(){ return awakeSequence.call(this); }
  sleep(){ return sleepSequence.call(this); }
  wonderLoop(){ return wonderLoop.call(this); }

  //Blinks and winks
  blinkHard(){ return blinkHard.call(this); }
  blinkSoft(){ return blinkSoft.call(this); }
  winkHard(){ return winkHard.call(this); }
  winkSoft(){ return winkSoft.call(this); }
  //Move eyes
  moveEyesReset(speed:number){ return moveEyesReset.bind(this)(speed); }
  moveEyesResetClosed(speed:number){ return moveEyesResetClosed.bind(this)(speed); }
  moveEyesLeft(speed?:number){ return moveEyesLeft.bind(this)(speed); }
  moveEyesRight(speed?:number){ return moveEyesRight.bind(this)(speed); }
  moveEyesTopRight(speed?:number){ return moveEyesTopRight.bind(this)(speed); }
  moveEyesTopLeft(speed?:number){ return moveEyesTopLeft.bind(this)(speed); }
  moveEyesTopCenter(speed?:number){ return moveEyesTopCenter.bind(this)(speed); }
  
}
