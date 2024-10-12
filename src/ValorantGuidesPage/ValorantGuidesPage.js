import React, { useState } from 'react';
import { PageIds, VIPER_GUIDE_DATA, roles, quizOptionsData,
    econPrefData, yesOrNO
 } from '../Services/Constants.ts';
import './ValorantGuidesPage.css';
import viperIcon from '../SrcImages/valorantSrcFiles/viperIcon.png';
import MapComponent from './MapComponent/MapComponent.js';
import QuizComponent from './QuizComponent/QuizComponent.js';
import QuizResultComponent from './QuizResultComponent/QuizResultComponent.js';

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
                <img 
                    className="topicIcon" 
                    src={viperIcon} 
                    alt="Viper lineup strategies and guides at Occisor's Den - free Valorant coaching" 
                />
                <a 
                    href="https://valoplant.gg" 
                    className="link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Create your own playbooks on Valoplant.gg"
                >
                    Create Your Own Play Books...
                </a>
            </div>

            {guidesData.map((item) => (
                <MapComponent
                        key={item.MapName}
                        expandClick={expandClick}
                        item={item}
                        handleImageClick={handleImageClick}
                />
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
                        <QuizComponent
                            key={role.name}
                            role={role}
                            onQuizOptionSelect={onQuizOptionSelect}
                            QuizData={QuizData}
                        />
                    ))}
                    <button className="quiz-submit" onClick={quizSubmit}>Submit</button>
                </div>
            ) : (
                <div id="coaching" className="results-section">
                    <h1>Coaching Results</h1>
                    {roles.map((role) => (
                        <QuizResultComponent
                            key={role.name}
                            role={role}
                            QuizData={QuizData}
                        />
                    ))}
                    <button className="quiz-submit" onClick={quizSubmit}>Retake</button>
                </div>
            )}
        </header>
    </div>
    );
};

export default ValorantGuidesPage;
