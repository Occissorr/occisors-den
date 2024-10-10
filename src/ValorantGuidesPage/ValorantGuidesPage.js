import React, { useState } from 'react';
import { PageIds, VIPER_GUIDE_DATA } from '../Services/Constants.ts';
import './ValorantGuidesPage.css';
import viperIcon from '../SrcImages/valorantSrcFiles/viperIcon.png';

const roleValues = [ 'Aim', 'Comms', 'Life Value', 'Preference'];
const roles = [
    { name: 'Controllers', data: roleValues },
    { name: 'Duelists', data: roleValues },
    { name: 'Sentinels', data: roleValues },
    { name: 'Initiators', data: roleValues },
];
const quizOptionsData = ['High', 'Medium', 'Low'];
const econPrefData = ['Gun', 'Utility'];
const yesOrNO = ['Yes', 'No', 'Situational'];
const initializeQuizData = () => {
    const initialData = {};

    roles.forEach((role) => {
        initialData[role.name] = {};
        role.data.forEach((value) => {
            // Assign default values based on the type of the field
            if (value === 'Preference') {
                initialData[role.name][value] = econPrefData[0]; // default to first item of econPrefData
            } else if (value === 'Life Value') {
                initialData[role.name][value] = yesOrNO[0]; // default to first item of yesOrNO
            } else {
                initialData[role.name][value] = quizOptionsData[0]; // default to first item of quizOptionsData
            }
        });
    });

    return initialData;
};

const ValorantGuidesPage = ({ pageCallback }) => {

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');
    const [guidesData, setGuidesData] = useState(VIPER_GUIDE_DATA);
    const [quizShow, setQuizShow] = useState(true);
    const [QuizData, setQuizData] = useState(initializeQuizData());

    const handleImageClick = (imageSrc) => {
        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };

    const expandClick = (SelectedMapName, args) => {
        if (SelectedMapName && !args.target.classList.contains('guideImages')) {
            const updatedGuidesData = guidesData.map((data) => {
                if (data.MapName === SelectedMapName) {
                    return { ...data, isVisible: !data.isVisible };
                }
                return data;
            });
            setGuidesData(updatedGuidesData);
        }
    };

    const handleNavigationClick = (e, sectionId) => {
        e.preventDefault();
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            window.scrollTo({ top: sectionElement.offsetTop, behavior: 'smooth' });
        }
    };

    const onQuizOptionSelect = (item, role, value) => {
        setQuizData((prevData) => ({
            ...prevData,
            [role]: {
                ...prevData[role],
                [value]: item.target.value
            }
        }));
    };

    const quizSubmit = () => {
        setQuizShow(!quizShow);
    };

    const backToHome = () => {
        pageCallback(PageIds.MainPage);
    };

    const LazyLoadImage = (item) => (
        <img onClick={() => handleImageClick(item.ImageURL)}
            alt={`Viper ${item.MapName} lineups`}
            className="guideImages"
            src={item.ImageURL} loading="lazy" />
    );

    return (
        <div className="valorant-guides-page pg-p">
            <button className="backHome" onClick={backToHome}>Back To Home</button>
            {isOverlayVisible && enlargedImageSrc && (
                <div id="imageOverlay" className="overlay">
                    <img className="enlarged-image" alt="enlarged" src={enlargedImageSrc} />
                    <button className="close-overlay" onClick={() => setIsOverlayVisible(false)}>X</button>
                </div>
            )}

            <nav className="navigation-bar">
                <a href="#" onClick={(e) => handleNavigationClick(e, 'map-guides')} className="nav-link">Lineup Guides</a>
                <a href="#" onClick={(e) => handleNavigationClick(e, 'coaching')} className="nav-link">Coaching</a>
            </nav>

            <header className="container">
                <div id="map-guides" className="header-section">
                    <h1 className="title">Viper LineUps Play Book</h1>
                    <img className="topicIcon" src={viperIcon} alt="Viper Icon" />
                    <a href="https://valoplant.gg" className="link">Create Your Own Play Books...</a>
                </div>

                {guidesData.map((item) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div">
                        <div className="expandable-div-header" onClick={(args) => expandClick(item.MapName, args)}>
                            <h2 className="font-fam">{item.MapName}</h2>
                            <span className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}></span>
                        </div>
                        {item.isVisible && (
                            <div className="expandable-div-content">
                                {LazyLoadImage(item)}
                            </div>
                        )}
                    </div>
                ))}
                {quizShow ? (
                    <div id="coaching" className="quiz-section">
                        <h1>Free Coaching</h1>
                        <div className="quiz-titles">
                            <h2>Aim</h2>
                            <h2>Comms</h2>
                            <h2>Economy Preference</h2>
                            <h2>Life Value Importance</h2>
                        </div>
                        {roles.map((role) => (
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
                        ))}
                        <button className="quiz-submit" onClick={quizSubmit}>Submit</button>
                    </div>
                ) : (
                    <div className="results-section">
                        <h1>Coaching Results</h1>
                        {roles.map((role) => (
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
                        ))}
                        <button className="quiz-submit" onClick={quizSubmit}>Retake</button>
                    </div>
                )}
            </header>
        </div>
    );
};

export default ValorantGuidesPage;
