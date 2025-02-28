import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.css";

const initialQuizData = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Delhi", "Calcutta", "Mumbai", "Chennai"],
    correct: "Delhi",
    attempted: "",
    visited: false, 
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
    attempted: "",
    visited: false,
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
    visited: false,
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: "Pacific Ocean",
    attempted: "",
    visited: false,
  },
  {
    id: 5,
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Ganges River", "Yangtze River"],
    correct: "Nile River",
    attempted: "",
    visited: false,
  },
];

function QuizPage() {
  const [quizData, setQuizData] = useState(initialQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [minutes, setMinutes] = useState(5); // Set the starting minutes
  const [seconds, setSeconds] = useState(0); // Set the starting seconds
  const navigate = useNavigate();
  const buttonRefs = useRef([]);

  const currentQuestion = quizData[currentQuestionIndex];
  
  if (!currentQuestion) return <h2>Quiz Completed!</h2>;

  useEffect(() => {
    setSelectedAnswer(quizData[currentQuestionIndex].attempted || "");
  }, [currentQuestionIndex, quizData]);

  useEffect(() => {
    setQuizData((prevQuizData) =>
      prevQuizData.map((q, index) =>
        index === currentQuestionIndex ? { ...q, visited: true } : q
      )
    );
  }, [currentQuestionIndex]);

  // Timer logic with auto-submit when time runs out
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when the timer reaches 00:00
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]); 

  const handleSubmit = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (q.attempted === q.correct) score++;
    });
    alert("Time's up! Quiz submitted.");
    navigate("/score",{ state: { score } });
  };

  const saveAndNext = () => {
    if (selectedAnswer) {
      setQuizData((prevQuizData) =>
        prevQuizData.map((q, index) =>
          index === currentQuestionIndex
            ? { ...q, attempted: selectedAnswer }
            : q
        )
      );

      if (buttonRefs.current[currentQuestionIndex]) {
        buttonRefs.current[currentQuestionIndex].style.backgroundColor = "green";
      }

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      } else {
        alert("Exam Over");
      }
    } else {
      alert("Please select an answer");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      alert("Quiz Completed!");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer("");
    } else {
      alert("This is the first question");
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="parent">
      <div className="left">
        <div className="time">
          <div className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
        </div>
        <div className="question">
          <h2>{currentQuestion.id}.{currentQuestion.question}</h2>
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => setSelectedAnswer(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="navigate-buttons">
          <button onClick={saveAndNext}>Save and Next</button>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handlePrevious}>Previous</button>
        </div>
      </div>

      <div className="right">
        {quizData.map((question, index) => (
          <button
            key={index}
            className="quiz-box"
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleQuestionClick(index)}
            style={{
              backgroundColor: question.attempted
                ? "green"
                : question.visited
                ? "orange"
                : "grey",
            }}
          >
            {question.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
