import { UtilsService } from '../../utils.service';
import * as anime from "animejs";

const utils = new UtilsService();

export async function blinkSoft(){


    const a = anime({
        targets:"#eyes > path",
        scaleY:[
            {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
            {value:.1, duration:300, elasticity:500, easing:"easeInOutQuad"},
            {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
        ]
    });

    await a.finished;
    
    return await new Promise(resolve=>resolve());
}

export async function blinkHard(oneEye){
    await this.moveEyesReset(300);
    const timeline = anime.timeline();

    timeline
        .add({
            targets:this.eyes[0],
            scaleY:[
                {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
                {value:.1, duration:300, elasticity:500, easing:"easeInOutQuad"},
                {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
            ]
        })
        .add({
            targets:this.eyes[1],
            scaleY:[
                {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
                {value:.1, duration:300, elasticity:500, easing:"easeInOutQuad"},
                {value:1, duration:500, elasticity:500, easing:"easeInOutQuad"},
            ],
            offset:"-=1300"
        })
    
    await timeline.finished;

    return;

}