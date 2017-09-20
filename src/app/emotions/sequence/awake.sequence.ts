import { UtilsService } from '../../utils.service';
import * as anime from "animejs";

const utils = new UtilsService();

export async function awakeSequence(){

  console.log("resetting")
  await this.moveEyesResetClosed();
  console.log("reset")

  const self = this;
  const randomEye = this.randomEye;
  let scaleY = [
    {value:0, delay:0, duration:0},
    {value:.2, delay:500, duration:2000},
    {value:.1, delay:0, duration:1000},
    {value:.5, delay:0, duration:2000},
    {value:1, delay:0, duration:1000},
  ];
    
  const timeline = anime.timeline();

  timeline
    .add({
      targets:randomEye.first,
      scaleY:scaleY
    })
    .add({
      targets:randomEye.last,
      scaleY:scaleY,
      offset: '-=5900'
    })

  await timeline.finished;
  await self.moveEyesReset(300);
  utils.playSound("chirp-2");
  await self.blinkSoft();

  return;
}