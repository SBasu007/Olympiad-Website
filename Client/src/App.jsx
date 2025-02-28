import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/Start";
import QuizPage from "./components/Quiz/Quiz";
import Result from "./components/Result"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/score" element={<Result/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
