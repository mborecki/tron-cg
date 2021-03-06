import Input from './input.js';
import GameState from './game-state.js';
import AI from './ai.js';

let mainGameState = GameState.init();

while (true) {
    Input.read(mainGameState);

    printErr('My id:', GameState.getMyID(mainGameState));

    print(AI.run(mainGameState));
}
