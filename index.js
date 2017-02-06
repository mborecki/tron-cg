'use strict';

var CONST = {
    MAP: {
        W: 30,
        H: 20,
        SIZE: 30*20
    },
    ORDERS: {
        U: 'UP',
        D: 'DOWN',
        L: 'LEFT',
        R: 'RIGHT',
        LIST: ['UP', 'DOWN', 'LEFT', 'RIGHT']
    },
    MOVES: {
        UP: [0, -1],
        DOWN: [0, 1],
        LEFT: [-1, 0],
        RIGHT: [1, 0],
        LIST: [[0, -1], [0, 1], [-1, 0], [1, 0]]
    }
};

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
    };

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
            GameState.setTileOwner(state, cords, id);
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
    };

    return GameState;
};

var GameState = factory();

class Input {

    constructor() {
        this.playersCount = null;
        this.playersStatus = null;
    }

    read(state) {
        let playersInfo = readline();
        let firstRead = false;

        if (!this.playersCount) {
            firstRead = true;
            playersInfo = playersInfo.split(' ');

            this.playersCount = parseInt(playersInfo[0]);
            this.playersStatus = new Array(this.playersCount);
            this.playersStatus.fill(true);

            let myId = parseInt(playersInfo[1]);
            GameState.setMyID(state, myId);
        }

        for (let i = 0; i < this.playersCount; i++ ) {
            let [x0, y0, x1, y1] = readline().split(' ').map(Number);

            if (this.playersStatus[i]) {
                if (x0 === -1) {
                    this.playersStatus = false;
                    GameState.killPlayer(id);
                } else {
                    if (firstRead) {
                        GameState.setTileOwner(state, [x0, y0], i);
                    }

                    GameState.setPlayerPosition(state, i, [x1, y1]);
                }
            }
        }
    }
}

var Input$1 = new Input();

var Utils = {
    getCordsAfterOrder: ([x, y], order) => {
        let [mx, my] = CONST.MOVES[order];
        return [x+mx, y+my];
    }
};

var emptyFieldAI = {
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
};

class AI {
    constructor() {
        this.aiStrategy = emptyFieldAI;
    }

    run(state) {
        return this.aiStrategy.run(state);
    }
}

var AI$1 = new AI();

let mainGameState = GameState.init();

while (true) {
    Input$1.read(mainGameState);

    print(AI$1.run(mainGameState));
}
