import { Person } from "@/data/people";
import Image from "next/image";
import React, { useState } from "react";
interface IProps {
  person: Person;
  selectedName: number | null;
  setSelectedName: (v: number) => void;
  selectedImage: number | null;
  handleMatch: (v1: number, v2: number) => void;
  isMatched: boolean;
}

const ImageCard = (props: IProps) => {
  const {
    person,
    selectedName,
    setSelectedName,
    selectedImage,
    handleMatch,
    isMatched
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div
      key={person.id}
      className={`bg-white flex items-center justify-center w-[180px] h-[180px] cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl rounded-xl ${
        selectedName === person.id
          ? "border-4 border-yellow-400 shadow-yellow-400/50"
          : "border-2 border-transparent"
      } ${isMatched ? "opacity-50 pointer-events-none" : ""}`}
      onClick={() => {
        setSelectedName(person.id);
        if (selectedImage) {
          handleMatch(selectedImage, person.id);
        }
      }}
    >
      <div className="relative w-[150px] h-[180px]">
        {isLoading && (
          <Image
            src="/images/placeholder.png"
            alt="loading..."
            fill
            className="object-contain p-2 absolute inset-0 z-10 "
          />
        )}

        <Image
          src={person.image}
          alt={person.name}
          fill
          className={`object-contain p-2 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default ImageCard;
