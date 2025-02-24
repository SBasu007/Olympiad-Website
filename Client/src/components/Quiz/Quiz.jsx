import { useState } from "react";
import "./quiz.css"

const quizData = [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Delhi", "Calcutta", "Bangalore", "Hyderabad"],
      attempted: "",
      correct: "Delhi",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      attempted: "",
      correct: "Mars",
    },
    {
      id: 3,
      question: "Who wrote the national anthem of India?",
      options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhash Chandra Bose"],
      attempted: "",
      correct: "Rabindranath Tagore",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      attempted: "",
      correct: "Pacific Ocean",
    },
    {
      id: 5,
      question: "Which is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Ganges River", "Yangtze River"],
      attempted: "",
      correct: "Nile River",
    }
  ];

function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
    <div className="parent">
      <div className="left">
        <div className="question"></div>
        <div className="options"></div>
        <div className="navigate-buttons"></div>
      </div>
      <div className="right"></div>
    </div>
    </>
  );
}

export default QuizPage;