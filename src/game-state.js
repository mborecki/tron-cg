import CONST from './const.js';

const TILE_DATA_SIZE = 1;
const PLAYERS_DATA_SIZE = 2;

/**
 * state = [(tile_owner)*MAP_SIZE, playerCount, myId, (px, py) * PLAYER_COUNT]
 */

let factory = () => {

    let isInMap = ([x ,y]) => {
        if (x > -1 && x < CONST.MAP.W && y > -1 && y < CONST.MAP.H) {
            return true;
        }

        return false;
    }

    let GameState = {
        init: () => {
            let a = new Array(CONST.MAP.SIZE * TILE_DATA_SIZE);
            return a.fill(null);
        },

        clone: (state) => {
            return state.slice();
        },

        getPlayerPosition: (state, id) => {
            let index = GameState.getPlayerIndex(id);
            return state.slice(index, index + 2);
        },

        setPlayersCount: (state, value) => {
            let index = CONST.MAP.SIZE * TILE_DATA_SIZE;
            state[index] = value;
            return state;
        },

        getPlayersCount: (state) => {
            return state[CONST.MAP.SIZE * TILE_DATA_SIZE];
        },

        setMyID: (state, id) => {
            let index = CONST.MAP.SIZE * TILE_DATA_SIZE + 1;
            state[index] = id;
            return state;
        },

        getMyID: (state) => {
            return state[CONST.MAP.SIZE * TILE_DATA_SIZE + 1]
        },

        setPlayerPosition: (state, id, cords) => {
            let [x, y] = cords;
            let index = GameState.getPlayerIndex(id);
            GameState.setTileOwner(state, cords, id)
            state[index] = x;
            state[index+1] = y;
            return state;
        },

        setTileOwner: (state, cords, id) => {
            let index = GameState.getTileOwnerIndex(cords);
            state[index] = id;
            return state;
        },

        getTileOwner: (state, cords) => {
            let index = GameState.getTileOwnerIndex(cords);
            return state[index];
        },

        isTileEmpty: (state, cords) => {
            if (!isInMap(cords)) {
                return false;
            }

            let owner = GameState.getTileOwner(state, cords);
            return (owner === null) || !GameState.isPlayerLive(state, owner);
        },

        isPlayerLive: (state, id) => {
            return GameState.getPlayerIndex(id) > -1;
        },

        getEmptyFieldSize: (state, cords) => {
            let list = [cords];
            let checked = new Set();
            let size = 0;

            function add(tile) {
                let hash = String(tile[0]) + String(tile[1]);
                if (!checked.has(hash)) {
                    checked.add(hash);
                    list.push(tile);
                }
            }

            while (list.length) {

                // printErr('LOOP', list.length)
                let tile = list.shift();

                if (GameState.isTileEmpty(state, tile)) {
                    size++;

                    add([tile[0] + 1, tile[1]]);
                    add([tile[0] - 1, tile[1]]);
                    add([tile[0], tile[1] + 1]);
                    add([tile[0], tile[1] - 1]);
                }
            }


            return size;
        },

        //===========================

        getPlayerIndex: (id) => {
            return (CONST.MAP.SIZE * TILE_DATA_SIZE) + PLAYERS_DATA_SIZE + (2 * id);
        },

        getTileIndex: ([x, y]) => {
            return (y * CONST.MAP.W + x) * TILE_DATA_SIZE;
        },

        getTileOwnerIndex: (cords) => {
            let index = GameState.getTileIndex(cords);
            return index;
        }
    }

    return GameState;
}

export default factory();
