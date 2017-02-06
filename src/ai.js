
import simpleAI from './ai/simple.js';
import emptyFieldAI from './ai/empty-field.js';

class AI {
    constructor() {
        this.aiStrategy = emptyFieldAI;
    }

    run(state) {
        return this.aiStrategy.run(state);
    }
}

export default new AI();
