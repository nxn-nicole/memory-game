import Card from "./Card";
import smile from "../assets/images/smile.png";
import { useEffect, useState } from "react";
import Topic from "./Topic";
import ChooseImages from "./ChooseImages";

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
  const [selectedTopic, setSelectedTopic] = useState("");

  const Images = ChooseImages(selectedTopic);

  // 初始化游戏
  const restartGame = () => {
    if (selectedTopic == "Topic") {
      setSelectedTopic("Food");
    }
    const duplicatedImages = [...Images, ...Images];
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
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#E3FFFF]">
      <div className="flex flex-row w-140 items-center justify-between mt-15 mb-10">
        <Topic onSelect={setSelectedTopic}></Topic>
        <button
          onClick={restartGame}
          className="w-40 py-2 bg-[#0ED5AD] text-white rounded-lg text-lg"
        >
          Start Game9
        </button>
      </div>

      {gameOver && (
        <div className="flex flex-col items-center w-70 h-70 bg-[#0ED5AD] text-white rounded">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl mt-15 mb-3 font-bold">Congratulations!</p>
            <p className="text-lg">Your Total Attemps: </p>
            <p className="text-lg">{clickCount}</p>
            <img src={smile} alt="smile" className="w-8 h-8 m-4" />
            <p className="text-xs">
              Select a topic and click start to play again.
            </p>
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
