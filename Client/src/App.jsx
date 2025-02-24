import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/Start";
import QuizPage from "./components/Quiz/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
