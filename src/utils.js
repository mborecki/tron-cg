import CONST from './const.js';

export default {
    getCordsAfterOrder: ([x, y], order) => {
        let [mx, my] = CONST.MOVES[order];
        return [x+mx, y+my];
    }
}
