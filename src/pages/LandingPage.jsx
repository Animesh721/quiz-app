import { useNavigate } from "react-router-dom";
import "../styles/landing.css"; 

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1>Welcome to Quizz</h1>
        <button onClick={() => navigate("/user-details")}>Start Quiz</button>
      </div>
    </div>
  );
}

export default LandingPage;
