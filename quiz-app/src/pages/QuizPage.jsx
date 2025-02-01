
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizQuestions } from "../api";
import '../styles/quiz.css';

const QuizPage = () => {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(0);
    
    const navigate = useNavigate(); 

    useEffect(() => {
        const getQuestions = async () => {
            const data = await fetchQuizQuestions();
            if (data) {
                setQuizData(data);
            } else {
                alert("Failed to fetch questions!");
            }
            setLoading(false);
        };
        getQuestions();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (option) => {
        setSelectedAnswer(option);
        if (option.is_correct) {
            setScore(prevScore => prevScore + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            if (currentQuestionIndex < quizData.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setQuizFinished(true);
            }
        }, 1000);
    };

    const handleRetakeTest = () => {
        navigate("/user-details"); 
    };

    if (loading || !quizData) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Loading Quiz...</p>
        </div>
    );

    if (quizFinished) {
        const percentage = (score / quizData.questions.length) * 100;
        return (
            <div className="quiz-finished">
                <div className="result-card">
                    <h2>Quiz Completed! 🎉</h2>
                    <div className="score-circle">
                        <span>{percentage.toFixed(0)}%</span>
                    </div>
                    <p className="final-score">Score: {score} out of {quizData.questions.length}</p>
                    <p className="time-taken">Time taken: {formatTime(timer)}</p>
                    <div className="feedback">
                        {percentage === 100 ? "Perfect Score! 🌟" : 
                         percentage >= 70 ? "Great Job! 👏" : 
                         percentage >= 50 ? "Good Effort! 💪" : 
                         "Keep Practicing! 📚"}
                    </div>

                    {/* Retake Test Button */}
                    <button className="retake-button" onClick={handleRetakeTest}>
                        Retake Test
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    return (
        <div className="quiz-container">
            <div className="quiz-content">
                <div className="quiz-header">
                    <h2>{quizData.title}</h2>
                    <div className="timer">{formatTime(timer)}</div>
                    <div className="quiz-info">
                        <span>Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="question-card">
                    <p className="question">{currentQuestion.description}</p>
                    <div className="options">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            let optionClass = "option";
                            if (isSelected) {
                                optionClass += option.is_correct ? " correct" : " incorrect";
                            }

                            return (
                                <button 
                                    key={index} 
                                    onClick={() => !selectedAnswer && handleAnswer(option)}
                                    className={optionClass}
                                    disabled={selectedAnswer !== null}
                                >
                                    <span className="option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option.description}
                                    {isSelected && (
                                        <span className="result-icon">
                                            {option.is_correct ? '✓' : '✗'}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
