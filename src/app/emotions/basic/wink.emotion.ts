import { UtilsService } from '../../utils.service';
import * as anime from "animejs";

const utils = new UtilsService();

export function winkSoft(){
    this.blinkSoft(true);
}

export function winkHard(){
    this.blinkHard(true);
}