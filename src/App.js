import React, { useState, useEffect, createContext } from 'react';
import Question from './Question';
import Result from './Result';
import './App.css';

export const ThemeContext = createContext(null);

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborghinis"
    ],
    correctAnswer: "Hypertext Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1993"],
    correctAnswer: "1995"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    
    if (!quizCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestion] === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(20);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(20);
    setQuizCompleted(false);
    setSelectedAnswers(Array(quizData.length).fill(null));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <h1 className="app-title">
          Quiz Master
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </h1>


        {!quizCompleted ? (
          <Question
            question={quizData[currentQuestion].question}
            options={quizData[currentQuestion].options}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            timeLeft={timeLeft}
            currentQuestion={currentQuestion + 1}
            totalQuestions={quizData.length}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <Result 
            score={score} 
            totalQuestions={quizData.length} 
            onRestart={restartQuiz}
            selectedAnswers={selectedAnswers}
            correctAnswers={quizData.map(q => q.correctAnswer)}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;