"use client";

import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import NameCard from "@/components/NameCard";
import Result from "@/components/Result";
import { people, Person } from "@/data/people";
import { incrementScore, nextLevel } from "@/store/gameSlice";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Game = () => {
  const dispatch = useDispatch();
  const { level, gameEnded } = useSelector((state: RootState) => state.game);
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [shuffledImage, setShuffledImage] = useState<Person[]>([]);
  const [shuffledName, setShuffledName] = useState<Person[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [matchIds, setMatchIds] = useState<number[]>([]);

  useEffect(() => {
    if (gameEnded) return;
    const remain = people.filter((p) => !usedIds.includes(p.id));
    if (remain.length < 3) return;
    const selected = [...remain].sort(() => Math.random() - 0.5).slice(0, 3);
    setShuffledImage([...selected].sort(() => Math.random() - 0.5));
    setShuffledName([...selected].sort(() => Math.random() - 0.5));
    setUsedIds((prev) => [...prev, ...selected.map((p) => p.id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (gameEnded) return;
    if (timeLeft < 0) {
      dispatch(nextLevel());
      setTimeLeft(30);
      setSelectedImage(null);
      setSelectedName(null);
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch, gameEnded, timeLeft]);

  useEffect(() => {
    if (matchIds.length === 3) {
      setTimeout(() => {
        dispatch(nextLevel());
        setTimeLeft(30);
        setSelectedImage(null);
        setSelectedName(null);
        setMatchIds([]);
      }, 1000);
    }
  }, [matchIds, dispatch]);

  const handleNextLevel = () => {
    dispatch(nextLevel());
    setTimeLeft(30);
    setSelectedImage(null);
    setSelectedName(null);
  };

  const handleMatch = (imageId: number, nameId: number) => {
    if (imageId === nameId) {
      toast.success("Correct", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });
      dispatch(incrementScore());
      setMatchIds((prev) => [...prev, imageId]);
    } else {
      toast.error("Incorrect", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });
    }
    setSelectedImage(null);
    setSelectedName(null);
  };

  if (gameEnded) {
    return <Result setUsedIds={setUsedIds} setTimeLeft={setTimeLeft} />;
  }

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-br from-blue-500 to-green-500 h-screen p-5">
      <Header timeLeft={timeLeft} />
      <div className="content flex items-center">
        <div className="left-content w-1/2 flex flex-col gap-3 items-center">
          {shuffledImage.map((person) => {
            const isMatched = matchIds.includes(person.id);
            return (
              <ImageCard
                key={person.id}
                person={person}
                selectedName={selectedName}
                setSelectedName={setSelectedName}
                selectedImage={selectedImage}
                handleMatch={handleMatch}
                isMatched={isMatched}
              />
            );
          })}
        </div>
        <div className="right-content w-1/2 flex flex-col gap-10 items-center">
          {shuffledName.map((person) => {
            const isMatched = matchIds.includes(person.id);
            return (
              <NameCard
                key={person.id}
                person={person}
                selectedName={selectedName}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                handleMatch={handleMatch}
                isMatched={isMatched}
              />
            );
          })}
        </div>
      </div>
      <div className="m-auto w-[100px]">
        <Button
          variant="contained"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transform transition-all hover:scale-110"
          onClick={handleNextLevel}
        >
          Next
        </Button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Game;
