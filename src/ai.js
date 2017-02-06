
import simpleAI from './ai/simple.js';

class AI {
    constructor() {
        this.aiStrategy = simpleAI;
    }

    run(state) {
        return this.aiStrategy.run(state);
    }
}

export default new AI();
