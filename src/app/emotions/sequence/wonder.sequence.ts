import { MovementService } from "../../movement.service";
import { UtilsService } from '../../utils.service';
import * as anime from "animejs";

const moves = new MovementService();
const utils = new UtilsService();
const duration = 2000;
const repeat = utils.randomIntClamp(1,10);
const speedMap = {
    "v-slow": 3000,
    "slow": 2800,
    "medium": 2500,
    "fast": 2400,
    "v-fast": 2300
}


export async function wonderLoop() {
    let ran = 0;

    return new Promise(resolve=>{
        const randomWonderLoop = setInterval(() => {
            const box = document.querySelector("#face").getBoundingClientRect()
            moves.motionPath.draw({
                start: {
                    top: box.top,
                    left: box.left
                },
                end: {
                    top: utils.randomIntClamp(0, innerHeight - box.width),
                    left: utils.randomIntClamp(0, innerHeight - box.width)
                }
            })
            moves.motionPath.heading.duration = duration;

            const headingInfo = moves.motionPath.heading;
            if (headingInfo.vertical === "up" && headingInfo.horizontal === "left") {
                this.moveEyesTopLeft(speedMap[headingInfo.speedRating]);
            }
            if (headingInfo.vertical === "up" && headingInfo.horizontal === "right") {
                this.moveEyesTopRight(speedMap[headingInfo.speedRating]);
            }
            if (headingInfo.vertical === "down" && headingInfo.horizontal === "left") {
                this.moveEyesLeft(speedMap[headingInfo.speedRating]);
            }
            if (headingInfo.vertical === "down" && headingInfo.horizontal === "right") {
                this.moveEyesRight(speedMap[headingInfo.speedRating]);
            }

            var path = anime.path('#generated path');
            var motionPath = anime({
                targets: '#avatar svg #face',
                translateX: path('x'),
                translateY: path('y'),
                easing: 'easeInOutQuad',
                duration: duration,
                complete() {
                    ran++
                    if(ran === repeat){
                        clearInterval(randomWonderLoop);
                        console.log("wonder loop ended after: ",ran+"/"+repeat);
                        resolve();
                    }
                    //self.emotion.moveEyesReset(500)
                }
            });
        }, utils.randomIntClamp(2000, 10000))
    });

}