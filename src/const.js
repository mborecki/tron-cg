

export default {
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
}
