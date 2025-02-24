import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
      <button 
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartPage;