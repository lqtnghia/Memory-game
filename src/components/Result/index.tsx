import { resetGame } from "@/store/gameSlice";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  setUsedIds: (v: number[]) => void;
  setTimeLeft: (timeLeft: number) => void;
}
const Result = (props: IProps) => {
  const { setUsedIds, setTimeLeft } = props;
  const { score, highScore } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleReset = () => {
    dispatch(resetGame());
    setTimeLeft(30);
    setUsedIds([]);
    router.refresh();
  };
  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-500 h-screen p-5 flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center w-[300px] h-[300px] bg-white shadow-md rounded-md">
        <span className="text-[30px] text-gray-800">Good Game</span>
        <span className="mb-2 text-gray-800">Total Score: {score}</span>
        <span className="mb-6 text-gray-800">High Score: {highScore}</span>
        <Button
          variant="contained"
          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transform transition-all hover:scale-110"
          onClick={handleReset}
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default Result;
