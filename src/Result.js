import React, { useContext } from 'react';
import { ThemeContext } from './App';

function Result({ score, totalQuestions, onRestart, selectedAnswers, correctAnswers }) {
  const { theme } = useContext(ThemeContext);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <div className="score">
        Your Score: {score} / {totalQuestions}
      </div>
      <div className="percentage">
        {percentage >= 70 ? '🎉 Excellent! ' : 
         percentage >= 50 ? '👍 Good job! ' : 
         '😟 Keep practicing! '}
        ({percentage}%)
      </div>
      
      <div className="answers-review">
        <h3>Review Answers:</h3>
        {selectedAnswers.map((selected, index) => (
          <div key={index} className={`answer ${selected === correctAnswers[index] ? 'correct' : 'incorrect'}`}>
            <p><strong>Q{index + 1}:</strong> Your answer: {selected || 'Not answered'} 
              {selected === correctAnswers[index] ? 
                <span className="result-icon"> ✓</span> : 
                <span className="result-icon"> ✗</span>}
            </p>
            {selected !== correctAnswers[index] && 
              <p><strong>Correct answer:</strong> {correctAnswers[index]}</p>}
          </div>
        ))}
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
}

export default Result;