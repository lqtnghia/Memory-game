import { Person } from "@/data/people";
import React from "react";

interface IProps {
  person: Person;
  selectedName: number | null;
  setSelectedImage: (v: number) => void;
  selectedImage: number | null;
  handleMatch: (v1: number, v2: number) => void;
  isMatched: boolean;
}
const NameCard = (props: IProps) => {
  const {
    person,
    selectedName,
    setSelectedImage,
    selectedImage,
    handleMatch,
    isMatched
  } = props;
  return (
    <div
      key={person.id}
      className={`bg-white flex items-center justify-center text-[25px] w-[200px] h-[100px] cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl rounded-xl ${
        selectedImage === person.id
          ? "border-4 border-yellow-400 shadow-yellow-400/50"
          : "border-2 border-transparent"
      } ${isMatched ? "opacity-50 pointer-events-none" : ""}`}
      onClick={() => {
        setSelectedImage(person.id);
        if (selectedName) {
          handleMatch(person.id, selectedName!);
        }
      }}
    >
      {person.name}
    </div>
  );
};

export default NameCard;
