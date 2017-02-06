import GameState from './game-state.js';

class Input {

    constructor() {
        this.playersCount = null;
        this.playersStatus = null;
    }

    read(state) {
        let playersInfo = readline();
        let firstRead = false

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
                    GameState.setPlayerPosition(state, i, [x1, y1]);
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

export default new Input();
