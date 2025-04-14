import React, { useContext } from 'react';
import { ThemeContext } from './App';

function Question({ question, options, selectedAnswer, onAnswerSelect, timeLeft, currentQuestion, totalQuestions, onNextQuestion }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="timer">
          {timeLeft}s
          <div className="timer-progress">
            <div 
              className="timer-progress-bar" 
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="question-count">
          Question {currentQuestion} of {totalQuestions}
        </div>
      </div>
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(option)}
            disabled={timeLeft === 0}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      <button 
        className="next-button" 
        onClick={onNextQuestion}
        disabled={!selectedAnswer && timeLeft > 0}
      >
        {currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}

export default Question;