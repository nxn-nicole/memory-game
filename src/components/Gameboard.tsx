import Card from "./Card";
import apple from "../assets/images/food/apple.png";
import icecream from "../assets/images/food/icecream.png";
import mochi from "../assets/images/food/mochi.png";
import melon from "../assets/images/food/melon.png";
import burger from "../assets/images/food/burger.png";
import donut from "../assets/images/food/donut.png";
import smile from "../assets/images/smile.png";

import { useEffect, useState } from "react";

const foodImages = [apple, icecream, melon, mochi, burger, donut];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Gameboard = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [isMatched, setIsMatched] = useState<boolean[]>(
    new Array(12).fill(false)
  );
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(12).fill(false)
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // 初始化游戏
  const restartGame = () => {
    const duplicatedImages = [...foodImages, ...foodImages];
    const shuffledCards = shuffleArray(duplicatedImages);
    setCards(shuffledCards);
    setFlippedCards(new Array(12).fill(false));
    setIsMatched(new Array(12).fill(false));
    setSelectedCards([]);
    setClickCount(0);
    setGameOver(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards[index] || isMatched[index] || selectedCards.length === 2)
      return;

    setClickCount((prevCount) => prevCount + 1);

    // 翻开卡片
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = true;
    setFlippedCards(newFlippedCards);

    // 记录已翻开的卡片索引
    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    // 当翻开两张卡片时，检查是否匹配
    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;

      if (cards[firstIndex] === cards[secondIndex]) {
        setTimeout(() => {
          console.log("Picuture matched successfully!");
        }, 2000);
        // 匹配成功，更新 isMatched
        const newMatched = [...isMatched];
        newMatched[firstIndex] = true;
        newMatched[secondIndex] = true;
        setIsMatched(newMatched);
        setSelectedCards([]); // 清空选中的卡片
      } else {
        // 匹配失败，短暂延迟后翻回去
        setTimeout(() => {
          const newFlipped = [...flippedCards];
          newFlipped[firstIndex] = false;
          newFlipped[secondIndex] = false;
          setFlippedCards(newFlipped);
          setSelectedCards([]); // 清空选中的卡片
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (isMatched.every((match) => match === true)) {
      setGameOver(true);
    }
  }, [isMatched]);

  return (
    <div className="flex flex-col min-h-screen items-center bg-blue-200">
      <button
        onClick={restartGame}
        className="mt-15 mb-10 px-4 py-2 bg-green-400 text-white rounded"
      >
        Start Game
      </button>

      {gameOver && (
        <div className="flex flex-col w-70 h-60 bg-green-400 text-white rounded">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl mt-15 font-bold">Congratulations!</p>
            <p className="text-lg">Your Total Attemps: {clickCount}</p>
            <img src={smile} alt="smile" className="w-8 h-8 m-4" />
            <p>Click start to play again.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6">
        {cards.map((foodImage, index) => (
          <Card
            key={index}
            image={foodImage}
            matched={isMatched[index]}
            isFlipped={flippedCards[index]}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
