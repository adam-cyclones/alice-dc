import { Injectable } from '@angular/core';
import * as anime from "animejs";

interface MotionPath{
  /**
   * Defines the start of your motion path.
  */
  start:{
    /**
     * The top most starting point of this coordinate.
    */
    top:number,
    /**
     * The left most starting point of this coordinate.
    */
    left:number
  },
  /**
   * Defines the end of your motion path.
  */
  end:{
    /**
     * The top most ending point of this coordinate.
    */
    top:number,
    /**
     * The end most ending point of this coordinate.
    */
    left:number
  }
}
//singletons
/**
 * Caches the coordinates for tracking
*/
var cache = [];
class Bezier{
  /**
   * SVG element
  */
  target;
  /**
   * SVG string selector
  */
  selector:string;
  /**
   * SVG namespace
  */
  ns:string;
  /**
   * Caches the coordinates for tracking
  */
  heading:{
    vertical:string,
    horizontal:string,
    mostly?:string,
    distance:number,
    duration:number,
    _duration:number,
    speed:number,
    speedRating:string
  }
  cache = cache;
	constructor(){
		let ns = "http://www.w3.org/2000/svg"; 
		this.ns = ns;
		this.selector = "generated"
		let svg = document.createElementNS (ns, "svg");
		svg.setAttribute("id",this.selector);
		this.selector = "#"+this.selector;
		svg.setAttribute("height", window.innerHeight+"");
		svg.setAttribute("width", window.innerWidth+"");
		document.body.appendChild(svg);
		this.target = document.querySelector(this.selector);
	}
  
	draw(draw:MotionPath){
		let oldPath = this.target.querySelector("path");
		if(oldPath){
			//start at the end of the last
			let d = oldPath.getAttribute("d").split(" ").pop().split(",")
			cache.shift()
			let followOn:MotionPath = {
				start:{
					top:parseInt(d[1]),
					left:parseInt(d[0])
				},
				end:draw.end
			} 
			cache.push(followOn);
			this.perfectCurve(followOn);
		}
		else{//first run
			cache.push(draw);
			this.perfectCurve(draw);
		}
		
	}
	perfectCurve(draw:MotionPath){
    const self = this;
		let oldPath = this.target.querySelector("path");
    if(oldPath){
			 this.target.removeChild(oldPath)
		}
		let path = document.createElementNS(this.ns, "path");
		let threshold = draw.end.top > (innerHeight / 2);
    
    let headingV = draw.start.top < draw.end.top? "down":"up";
    let headingH = draw.start.left < draw.end.left? "right":"left";
    


		let dir:"up"|"down" = threshold? "up":"down";
		let ctrl2 = dir === "up"? `${draw.start.left},${draw.end.top}`:`${draw.end.left},${draw.start.top}`;

    
    

		path.setAttributeNS(null, "d", `M${draw.start.left},${draw.start.top} Q${ctrl2} ${draw.end.left},${draw.end.top}`);
		path.setAttributeNS(null, "id", this.selector.replace("#","")+"-path");
    this.target.appendChild( path );
    
    var createdPath = <SVGPathElement>document.querySelector("#generated path");
    this.heading = {
      vertical:headingV,
      horizontal:headingH,
      distance:Math.floor(createdPath.getTotalLength()),
      duration:0,
      set _duration(d){
        this.duration = d;
      },
      get speed(){
        return Math.round((this.distance / this.duration) * 100);
      },
      get speedRating(){
        let speed;
        if(this.speed <= 5){
          speed = "v-slow"
        }
        else if(this.speed <= 10){
          speed = "slow"
        }
        else if(this.speed <= 15){
          speed = "medium"
        }
        else if(this.speed < 20){
          speed = "fast"
        }
        else if(this.speed >= 20){
          speed = "v-fast"
        }
        return speed;
      }
    }
	}
}
let b = new Bezier()


@Injectable()
export class UtilsService {

  static get motionPath(){
    return b;
  }

  //Math
  randomIntClamp(min:number, max:number){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  //Timing
  /**
   * converts a number into milliseconds, eg, * 1000
  */
  seconds(n:number|string){
    if(typeof n === "string"){ return parseInt(n) }
    return n * 1000;
  }
  
  /**
   * Set a Timeout between n and n
  */
  sporadicTimeout(waitMin:number = 3, waitMax:number = 10){
    const randomTime = this.seconds( this.randomIntClamp(waitMin,waitMax));
    return new Promise((resolve, reject)=>{
      let timeout = setTimeout(async ()=>{
        resolve({
          waited:randomTime,
          get clear(){
            clearInterval(timeout)
            return false;
          }
        });
      }, randomTime)
    });
  }

  /**
   * Set a Interval between n and n
  */
  sporadicInterval(waitMin:number = 3, waitMax:number = 10){
    const randomTime = this.seconds( this.randomIntClamp(waitMin,waitMax));
    return new Promise((resolve, reject)=>{
      let interval = setInterval(async ()=>{
        resolve({
          waited:randomTime,
          get clear(){
            clearInterval(interval)
            return false;
          }
        });
      }, randomTime)
    });
  }
}

