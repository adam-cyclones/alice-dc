import * as anime from "animejs";

function moveEyesSequence(x,y,speed:number = 500){
    const timeline = anime.timeline();

    console.log("USING",speed)
    return new Promise(resolve=>{
        timeline
            .add({
                targets:this.eyes[1],
                translateX:x,
                translateY:y,
                duration:speed,
            })
            .add({
                targets:this.eyes[0],
                translateX:x,
                translateY:y,
                duration:speed,
                offset:"-="+speed
            });
        
        timeline.finished.then(function(){
            resolve();
        })
    })
}

export function moveEyesLeft(speed){
    return moveEyesSequence.bind(this)(-40,0,speed);
}
export function moveEyesRight(speed){
    return moveEyesSequence.bind(this)(40,0,speed);
}
export function moveEyesTopRight(speed){
    return moveEyesSequence.bind(this)(20,-20,speed);
}
export function moveEyesTopLeft(speed){
    return moveEyesSequence.bind(this)(-20,-20,speed);
}
export function moveEyesTopCenter(speed){
    return moveEyesSequence.bind(this)(0,-20,speed);
}
export async function moveEyesResetClosed(speed = 1000){
    const timeline = anime.timeline();
    timeline
        .add({
            targets:this.eyes[1],
            translateX:0,
            translateY:0,
            scaleY:0,
            scaleX:1,
            rotate:"0deg",
            duration:speed,
            easing:"easeInOutQuad"
        })
        .add({
            targets:this.eyes[0],
            translateX:0,
            translateY:0,
            scaleY:0,
            scaleX:1,
            rotate:"0deg",
            duration:speed,
            easing:"easeInOutQuad",
            offset:"-="+speed
        });

    await timeline.finished;

    return await new Promise(resolve=>resolve());
}
export async function moveEyesReset(speed = 1000){
    const timeline = anime.timeline();
    timeline
        .add({ 
            targets:this.eyes[1],
            translateX:0,
            translateY:0,
            scaleY:1,
            scaleX:1,
            rotate:"0deg",
            duration:speed,
            easing:"easeInOutQuad"
        })
        .add({
            targets:this.eyes[0],
            translateX:0,
            translateY:0,
            scaleY:1,
            scaleX:1,
            rotate:"0deg",
            duration:speed,
            easing:"easeInOutQuad",
            offset:"-="+speed
        });

    await timeline.finished;

    return await new Promise(resolve=>resolve());
}