import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.css";

const initialQuizData = [
  // General Knowledge
  {
    id: 1,
    question: "Who was the first Prime Minister of India?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Indira Gandhi", "Sardar Patel"],
    correct: "Jawaharlal Nehru",
    attempted: "",
    visited: false,
    img: null,
  },
  {
    id: 2,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correct: "Japan",
    attempted: "",
    visited: false,
    img: null,
  },

  // English
  {
    id: 3,
    question: "What is the synonym of 'Abundant'?",
    options: ["Scarce", "Plentiful", "Rare", "Limited"],
    correct: "Plentiful",
    attempted: "",
    visited: false,
    img: null,
  },
  {
    id: 4,
    question: "Identify the correct spelling:",
    options: ["Recieve", "Receive", "Recieeve", "Receve"],
    correct: "Receive",
    attempted: "",
    visited: false,
    img: null,
  },

  // Mathematics
  {
    id: 5,
    question: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    correct: "12",
    attempted: "",
    visited: false,
    img: null,
  },
  {
    id: 6,
    question: "If a triangle has angles of 50° and 60°, what is the third angle?",
    options: ["70°", "80°", "90°", "60°"],
    correct: "70°",
    attempted: "",
    visited: false,
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVCaULex-nE9COPXFWi3v5mshjGpuPlDH_wkNFMk2KI-uzOTvYVOLYq2l-9rkgkc5L7tKkK-7-6-878dKS2QQbZsZPVCOhY2s-HM6osWlo9AgoOCiMOgxCGhQOtWI_FxRsFN1QtlhEMAE/s1600/tri.JPG",
  },

  // Computer Science
  {
    id: 7,
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Control Processing Unit"],
    correct: "Central Processing Unit",
    attempted: "",
    visited: false,
    img: null,
  },
  {
    id: 8,
    question: "Which of the following is an example of an operating system?",
    options: ["Python", "Windows", "HTML", "Google"],
    correct: "Windows",
    attempted: "",
    visited: false,
    img: null,
  },

  // Science
  {
    id: 9,
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: "Carbon Dioxide",
    attempted: "",
    visited: false,
    img: null,
  },
  {
    id: 10,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    correct: "Au",
    attempted: "",
    visited: false,
    img: null,
  },
];



function QuizPage() {
  const navigate = useNavigate();
  const buttonRefs = useRef([]);

  // Load quiz data from localStorage
  const storedQuizData = localStorage.getItem("quizData");
  const parsedQuizData = storedQuizData ? JSON.parse(storedQuizData) : initialQuizData;
  
  const [quizData, setQuizData] = useState(parsedQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(parsedQuizData[currentQuestionIndex]?.attempted || "");

  // Load the remaining time from localStorage or set to 5 minutes
  const storedTime = localStorage.getItem("remainingTime");
  const initialTime = storedTime ? JSON.parse(storedTime) : 3000; // 300 seconds = 5 minutes

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const currentQuestion = quizData[currentQuestionIndex];

  if (!currentQuestion) return <h2>Quiz Completed!</h2>;

  // Save quiz data to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }, [quizData]);

  // Update selected answer when the question changes
  useEffect(() => {
    setSelectedAnswer(quizData[currentQuestionIndex]?.attempted || "");
  }, [currentQuestionIndex, quizData]);

  // Mark the current question as visited
  useEffect(() => {
    setQuizData((prevQuizData) => {
      const updatedData = prevQuizData.map((q, index) =>
        index === currentQuestionIndex ? { ...q, visited: true } : q
      );
      localStorage.setItem("quizData", JSON.stringify(updatedData));
      return updatedData;
    });
  }, [currentQuestionIndex]);

  // Timer logic with localStorage persistence
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem("remainingTime", JSON.stringify(newTime));
          return newTime;
        } else {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClear = () => {
    setSelectedAnswer(""); // Reset selected answer
  
    setQuizData((prevQuizData) =>
      prevQuizData.map((q, index) =>
        index === currentQuestionIndex ? { ...q, attempted: "" } : q
      )
    );
  
    if (buttonRefs.current[currentQuestionIndex]) {
      buttonRefs.current[currentQuestionIndex].style.backgroundColor = "orange"; // Mark as visited but not answered
    }
  };

  const handleSubmit = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (q.attempted === q.correct) score++;
    });
    alert("Time's up! Quiz submitted.");
    localStorage.removeItem("quizData"); // Clear quiz data
    localStorage.removeItem("remainingTime"); // Clear timer data
    navigate("/score", { state: { score } });
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
    <>
    <div className="ctss-header"><img src="https://www.talentsearcholympiad.com/assets/images/logo.png" height="50px"/></div>
    <div className="ctss-header2">TALENT SEARCH OLYMPIAD</div>
    <div className="parent">
      <div className="left">
        <div className="time">
            <div className="minutes timer">
              <div className="name">Minutes</div>
              <div className="number">
                {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}</div>
            </div>
          <div className="seconds timer">
            <div className="name">Seconds</div>
            <div className="number sec-number">
            {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
           
          </div>
        </div>
        <div className="question">
          <h3>{currentQuestion.id}.{currentQuestion.question}</h3>
        </div>
        <div className="picture">
          {(currentQuestion.img)?<img className="image" src={currentQuestion.img} height="250px" />:null}
        </div>

        <div className="options">
  {currentQuestion.options.map((option, index) => (
    <label key={index} className="custom-radio">
      <input
        type="radio"
        name="answer"
        value={option}
        checked={selectedAnswer === option}
        onChange={() => setSelectedAnswer(option)}
      />
      <span className="radio-btn"></span>
      {option}
    </label>
  ))}
        </div>

        <div className="navigate-buttons">
          <button className="previous abc" onClick={handlePrevious}>Previous</button>
          <button className="savenext abc" onClick={saveAndNext}>Save and Next</button>
          <button className="clear abc" onClick={handleClear}>Clear</button>
        </div>
        <div className="navigate-buttons"><button className="submit" onClick={handleSubmit}>Submit</button></div>
      </div>

      <div className="right">
        <div className="details">
          <div className="ldet">
            <div className="row">Not Visited</div>
            <div className="row">Visited</div>
            <div className="row">Saved</div>
          </div>
          <div className="rdet">
            <div className="color nv"></div>
            <div className="color v"></div>
            <div className="color s"></div>
          </div>
        </div>
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
                fontSize: question.id > 9 ? "13px" : "15px",
                 // Adjust text size here
            }}
          >
            {question.id}
          </button>
        ))}
      </div>
    </div>
    <div className="ctss-footer">© BASU TECH 2025</div>
    </>
  );
}

export default QuizPage;
