import { useState } from "react";

const Topic = ({ onSelect }: { onSelect: (topic: string) => void }) => {
  const [openTopics, setOpenTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Topics");
  const onClick = () => {
    setOpenTopics(!openTopics);
  };

  const handleTopicChoice = (topic: string) => {
    setSelectedTopic(topic);
    setOpenTopics(false);
    onSelect(topic);
  };

  return (
    <div className="relative inline-block">
      <button
        className="w-40 py-2 bg-[#0ED5AD] rounded-lg text-white text-lg"
        onClick={onClick}
      >
        {selectedTopic}
      </button>
      {openTopics && (
        <div className="absolute flex flex-col bg-white border-2 border-[#0ED5AD] rounded-lg text-[#076350]">
          <button
            className="border-b-2 border-[#0ED5AD] px-15 py-2"
            onClick={() => handleTopicChoice("Food")}
          >
            Food
          </button>
          <button
            className="border-b-2 border-[#0ED5AD] px-15 py-2"
            onClick={() => handleTopicChoice("Space")}
          >
            Space
          </button>
          <button
            className="border-b-2 border-[#0ED5AD] px-15 py-2"
            onClick={() => handleTopicChoice("Plant")}
          >
            Plant
          </button>
          <button
            className="px-5 py-2"
            onClick={() => handleTopicChoice("Toy")}
          >
            Toy
          </button>
        </div>
      )}
    </div>
  );
};

export default Topic;
