import GameState from '../game-state.js';
import CONST from '../const.js';
import Utils from '../utils.js';

export default {
    run: (state) => {
        let myID = GameState.getMyID(state);
        let myCords = GameState.getPlayerPosition(state, myID);

        for (let i = 0; i < 4; i++) {
            let order = CONST.ORDERS.LIST[i];
            if (GameState.isTileEmpty(state, Utils.getCordsAfterOrder(myCords, order))) {
                return order;
            }
        }

        return 'LEFT';
    }
}
