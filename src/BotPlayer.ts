import Player from './Player';
import Board from './Board';

class BotPlayer extends Player {
    constructor(color: string) {
        super(color);
    }

    // Choose a random valid move
    chooseMove(board: Board): [number, number] | null {
        const validMoves = board.getValidMoves(this.color);
        if (validMoves.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * validMoves.length);
        return validMoves[randomIndex];
    }
}

export default BotPlayer;
