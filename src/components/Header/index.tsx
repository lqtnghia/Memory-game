import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface IProps {
  timeLeft: number;
}

const Header = (props: IProps) => {
  const { timeLeft } = props;
  const { score, level } = useSelector((state: RootState) => state.game);
  return (
    <div className="title flex flex-col gap-1 items-center">
      <p className="text-[30px] font-semibold text-white">
        Memory Game - Level {level}
      </p>
      <span className="text-[20px] text-white">
        Score: {score} | Time Left: {timeLeft}s
      </span>
    </div>
  );
};

export default Header;
