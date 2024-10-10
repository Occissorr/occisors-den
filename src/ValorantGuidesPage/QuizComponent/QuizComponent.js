import React from 'react';
import '../ValorantGuidesPage.css';
import {quizOptionsData, econPrefData, yesOrNO } from '../../Services/Constants.ts';


const QuizComponent = ({role, onQuizOptionSelect, QuizData, }) =>{


    return (
        <div className="role-section" key={role.name}>
            <h3 className="role-title">{role.name}</h3>
            <div className="role-questions">
                {role.data.map((field) => (
                    <div className="quiz-question" key={field}>
                        <select
                            onChange={(item) => onQuizOptionSelect(item, role.name, field)}
                            value={QuizData[role.name][field]} // Accessing based on role and field
                            className="dropdown"
                        >
                            {(field === 'Life Value' ? yesOrNO : field === 'Weapons' ? econPrefData : quizOptionsData).map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizComponent;