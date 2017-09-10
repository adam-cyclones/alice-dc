import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MovementService } from "../movement.service";
import { UtilsService } from "../utils.service";
import { EmotionService } from "../emotion.service";
import * as anime from "animejs";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers:[
    MovementService,
    UtilsService,
    EmotionService
  ]
})
export class AvatarComponent implements OnInit, AfterViewInit {

  private eyeColor:string = "#389ED6";
  private faceColor:"#000"|"#fff" = "#000";
  private size = 150;
  constructor(
    private moves:MovementService,
    private utils:UtilsService,
    private cdr: ChangeDetectorRef,
    private emotion:EmotionService
  ) {
    moves.cdr = this.cdr;
  }

  innerWidth:number;
  innerHeight:number;
  ngOnInit(){
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.moves.size = this.size;
  }

  //move to emotion service
  // bubble = {
  //   emotion:"heart",
  //   height:70
  // }
  
  async test(){
    const emo = this.emotion;
    //await emo.awake()
    //await emo.awake()
  }

  ngAfterViewInit(){
    const self = this;
    this.moves.target = document.querySelector("#avatar svg");
    this.moves.moveTo();//center
    this.test();
    
    const speedMap = {
      "v-slow":3000,
      "slow":2800,
      "medium":2500,
      "fast":2400,
      "v-fast":2300
    }


    let duration = 2000;
    setInterval(()=>{
      this.moves.motionPath.draw({
        start:{
          top:-100,
          left:this.utils.randomIntClamp(0,innerHeight - this.size)
        },
        end:{
          top:this.utils.randomIntClamp(0,innerHeight - this.size),
          left:this.utils.randomIntClamp(0,innerHeight - this.size)
        }
      })
      this.moves.motionPath.heading.duration = duration;
      console.log( this.moves.motionPath.heading.speedRating ); 

      const headingInfo = this.moves.motionPath.heading;

      console.log(speedMap[headingInfo.speedRating])

      if(headingInfo.vertical === "up" && headingInfo.horizontal === "left"){
        this.emotion.moveEyesTopLeft( speedMap[headingInfo.speedRating] );
      }
      if(headingInfo.vertical === "up" && headingInfo.horizontal === "right"){
        this.emotion.moveEyesTopRight( speedMap[headingInfo.speedRating] );
      }
      if(headingInfo.vertical === "down" && headingInfo.horizontal === "left"){
        this.emotion.moveEyesLeft( speedMap[headingInfo.speedRating] );
      }
      if(headingInfo.vertical === "down" && headingInfo.horizontal === "right"){
        this.emotion.moveEyesRight( speedMap[headingInfo.speedRating] );
      }

      var path = anime.path('#generated path');
      var motionPath = anime({
        targets: '#avatar svg #face',
        translateX: path('x'),
        translateY: path('y'),
        //rotate: path('angle'),
        //direction: 'alternate',
        easing: 'easeInOutQuad',
        duration: duration,
        complete(){
          //self.emotion.moveEyesReset(500)
        }
      });
    },this.utils.randomIntClamp( 2000, 10000 ))

  }


}
