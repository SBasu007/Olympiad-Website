import { useLocation } from "react-router-dom";

function Result() {
    const location = useLocation();
    const score = location.state?.score ?? 0; // Default to 0 if no score is passed

    return (
        <>
            <h2>Your Score: {score}/5</h2>
        </>
    );
}

export default Result;