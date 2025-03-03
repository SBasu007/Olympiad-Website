import { useLocation } from "react-router-dom";

function Result() {
    const location = useLocation();
    const score = location.state?.score ?? 0; // Default to 0 if no score is passed

    return (
        <>
            <h2 style={{color:"black"}}>Your Score: {score}/5</h2>
            <p style={{color:"black"}}>This is a demo quiz and certificate will be generated for actual exams</p>
        </>
    );
}

export default Result;