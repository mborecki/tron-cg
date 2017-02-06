import GameState from '../game-state.js';
import CONST from '../const.js';
import Utils from '../utils.js';

export default {
    run: (state) => {
        let myID = GameState.getMyID(state);
        let myCords = GameState.getPlayerPosition(state, myID);

        let result = CONST.ORDERS.LIST
            .map((order) => {
                let size = GameState.getEmptyFieldSize(state, Utils.getCordsAfterOrder(myCords, order));
                return {
                    order,
                    size
                }
            })
            .sort((a, b) => {
                return b.size - a.size;
            });

        return result[0].order;
    }
}
