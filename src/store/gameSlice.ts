import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  score: number;
  level: number;
  highScore: number;
  gameEnded: boolean;
}

const initialState: GameState = {
  score: 0,
  level: 1,
  highScore:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("highScore")) || 0
      : 0,
  gameEnded: false
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    nextLevel: (state) => {
      state.level += 1;
      if (state.level > 10) {
        state.gameEnded = true;
        state.highScore = Math.max(state.score, state.highScore);
      }
    },
    resetGame: (state) => {
      state.score = 0;
      state.level = 1;
      state.gameEnded = false;
    }
  }
});

export const { incrementScore, nextLevel, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
