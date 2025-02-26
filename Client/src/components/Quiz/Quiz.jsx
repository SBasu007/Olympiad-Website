import { useEffect, useState } from "react";
import "./quiz.css";

const initialQuizData = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Delhi", "Calcutta", "Mumbai", "Chennai"],
    correct: "Delhi",
    attempted: "",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
    attempted: "",
  },
  {
    id: 3,
    question: "Who wrote the national anthem of India?",
    options: [
      "Rabindranath Tagore",
      "Bankim Chandra Chatterjee",
      "Sarojini Naidu",
      "Subhash Chandra Bose",
    ],
    correct: "Rabindranath Tagore",
    attempted: "",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: "Pacific Ocean",
    attempted: "",
  },
  {
    id: 5,
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Ganges River", "Yangtze River"],
    correct: "Nile River",
    attempted: "",
  },
];

function QuizPage() {
  const [quizData, setQuizData] = useState(initialQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  if (!currentQuestion) return <h2>Quiz Completed!</h2>;

  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);

    // Correctly updating the attempted answer in state
    setQuizData((prevQuizData) =>
      prevQuizData.map((q, index) =>
        index === currentQuestionIndex ? { ...q, attempted: option } : q
      )
    );
  };

  // Logs updated quizData whenever it changes
  useEffect(() => {
    console.log("Updated quizData:", quizData);
  }, [quizData]); // Runs whenever quizData updates

  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  const saveAndNext = () => {
    if (selectedAnswer){
      if (currentQuestionIndex < quizData.length - 1 ){
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      }else{
        alert("Exam Over")
      }
    }else{
      alert("Please select an answer")
    }
  }
  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setIsSubmitted(false);
    } else {
      alert("Quiz Completed!");
    }
  };

  return (
    <div className="parent">
      <div className="left">
        <div className="question">
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerChange(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="navigate-buttons">
          <button onClick={saveAndNext}>Save and Next</button>
          <button onClick={handleNext}>Next</button>
          <button>Submit</button>
        </div>
      </div>

      <div className="right">
        <h3>
          Progress: {currentQuestionIndex + 1} / {quizData.length}
        </h3>
      </div>
    </div>
  );
}

export default QuizPage;
