import React from 'react';
import '../ValorantGuidesPage.css';

const QuizResultComponent = ({ role, QuizData }) =>{

    return(
        <div className="result-role-section" key={role.name}>
            <h3>{role.name.toUpperCase()}</h3>
            <div className='results-table-wrapper'>
                <table className="results-table">
                    <tbody>
                        {role.data.map((field) => (
                            <tr key={field}>
                            <td className="result-label">
                                <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                            </td>
                            <td className="result-value">{QuizData[role.name][field]}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuizResultComponent;

