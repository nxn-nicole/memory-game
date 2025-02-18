import questionImg from "../assets/images/question.png";

interface CardProps {
  image: string;
  isFlipped: boolean;
  matched: boolean;
  onClick: () => void;
}

const Card = ({ image, isFlipped, matched, onClick }: CardProps) => {
  return (
    <>
      {matched && <div className="flex w-20 h-20 bg-transparent"></div>}
      {!matched && (
        <div
          className={`flex w-30 h-30 items-center justify-center rounded-lg transition-colors duration-300 cursor-pointer ${
            isFlipped ? "bg-white border-blue-400 border-3" : "bg-blue-400"
          }`}
          onClick={onClick}
        >
          {!isFlipped && <img src={questionImg} alt="Question mark" />}
          {isFlipped && <img src={image} className="w-20 h-20"></img>}
        </div>
      )}
    </>
  );
};

export default Card;
