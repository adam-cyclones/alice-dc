import { Injectable, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from "./utils.service";
import * as anime from "animejs";


interface Coordinate{
  top:number,
  left:number
}

@Injectable()
export class MovementService {
  size:number;
  target:Element;
  cdr:ChangeDetectorRef

  position:Coordinate={left:Infinity,top:Infinity};
  moveTo(cords?:Coordinate){
    let top = cords && cords.top ? cords.top : this.getCentre.top; 
    let left = cords && cords.left ? cords.left : this.getCentre.left;
    this.cdr.detach()
    this.position = {
      left:left||0,
      top:top||0
    }
    this.cdr.reattach()
    // *** ANIM HERE
    return this.position;
  }

  get getCentre(){
    let top = (window.innerHeight / 2) - (this.size / 2); 
    let left = (window.innerWidth / 2) - (this.size / 2);
    return{top,left}
  }

  /**
   * Accessor for motion path singleton class.
  */
  get motionPath(){
    return UtilsService.motionPath
  }

}
