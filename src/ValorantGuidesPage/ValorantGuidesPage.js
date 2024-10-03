import React, { useState } from 'react';
import { PageIds, VIPER_GUIDE_DATA } from '../Services/Constants.ts';
import './ValorantGuidesPage.css';
import viperIcon from '../SrcImages/valorantSrcFiles/viperIcon.png';

const ValorantGuidesPage = ({ pageCallback }) => {
    const roles = [
        { name: 'Controllers', data: ['controllerAim', 'controllerComms', 'controllerLifeVal', 'controllerWeapons'] },
        { name: 'Duelists', data: ['duelistAim', 'duelistComms', 'duelistLifeVal', 'duelistWeapons'] },
        { name: 'Sentinels', data: ['sentinelAim', 'sentinelComms', 'sentinelLifeVal', 'sentinelWeapons'] },
        { name: 'Initiators', data: ['initiatorAim', 'initiatorComms', 'initiatorLifeVal', 'initiatorWeapons'] },
    ];

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');
    const [guidesData, setGuidesData] = useState(VIPER_GUIDE_DATA);
    const quizOptionsData = ['High', 'Medium', 'Low'];
    const econPrefData = ['Gun', 'Utility'];
    const yesOrNO = ['Yes', 'No', 'Situational'];
    const [quizShow, setQuizShow] = useState(true);
    const [QuizData, setQuizData] = useState({
        controllerAim: quizOptionsData[0],
        controllerComms: quizOptionsData[0],
        controllerWeapons: econPrefData[0],
        controllerLifeVal: yesOrNO[0],
        duelistAim: quizOptionsData[0],
        duelistComms: quizOptionsData[0],
        duelistWeapons: econPrefData[0],
        duelistLifeVal: yesOrNO[0],
        sentinelAim: quizOptionsData[0],
        sentinelComms: quizOptionsData[0],
        sentinelWeapons: econPrefData[0],
        sentinelLifeVal: yesOrNO[0],
        initiatorAim: quizOptionsData[0],
        initiatorComms: quizOptionsData[0],
        initiatorWeapons: econPrefData[0],
        initiatorLifeVal: yesOrNO[0],
    });
    const quizAnswer = {
        controllerAim: quizOptionsData[0],
        controllerComms: quizOptionsData[2],
        controllerWeapons: econPrefData[1],
        controllerLifeVal: yesOrNO[2],
        duelistAim: quizOptionsData[2],
        duelistComms: quizOptionsData[1],
        duelistWeapons: econPrefData[0],
        duelistLifeVal: yesOrNO[0],
        sentinelAim: quizOptionsData[1],
        sentinelComms: quizOptionsData[1],
        sentinelWeapons: econPrefData[1],
        sentinelLifeVal: yesOrNO[2],
        initiatorAim: quizOptionsData[1],
        initiatorComms: quizOptionsData[0],
        initiatorWeapons: econPrefData[1],
        initiatorLifeVal: yesOrNO[1],
    };

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

    const onQuizOptionSelect = (item, name) => {
        if (item?.target?.value && name !== '') {
            setQuizData({ ...QuizData, [name]: item.target.value });
        }
    };

    const quizSubmit = () => {
        setQuizShow(false);
        console.log(QuizData);
    };
    const backToHome = () =>{
        pageCallback(PageIds.MainPage)
    }

    return (
        <div className="valorant-guides-page pg-p">
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

            <header className="container desktop-only">
                <div id='map-guides' className="header-section">
                    <img className="topicIcon" src={viperIcon} alt="Viper Icon" />
                    <h1 className="title">Viper LineUps Play Book</h1>
                    <a href="https://valoplant.gg" className="link">Create Your Own Play Books...</a>
                    <button className="homeButton" onClick={backToHome}>Back To Home</button>
                </div>

                {guidesData.map((item) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div">
                        <div className="expandable-div-header" onClick={(args) => expandClick(item.MapName, args)}>
                            <h2 className="font-fam">{item.MapName}</h2>
                            <span className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}></span>
                        </div>
                        {item.isVisible && (
                            <div className="expandable-div-content">
                                <img
                                    onClick={() => handleImageClick(item.ImageURL)}
                                    alt={`Viper ${item.MapName} lineups`}
                                    className="guideImages"
                                    src={item.ImageURL}
                                />
                            </div>
                        )}
                    </div>
                ))}
                
                {quizShow ? (
                    <div id='coaching' className="quiz-section">
                        <h1>Free Coaching</h1>
                        <div className='quiz-titles'>
                            <h2>Aim</h2>
                            <h2>Comms</h2>
                            <h2>Economy Preference</h2>
                            <h2>Importance</h2>
                        </div>
                        {roles.map((role) => (
                            <div className={`${role.name.toLowerCase()} displayFlex-row`} key={role.name}>
                                <h3>{role.name}</h3>
                                {role.data.map((field) => (
                                    <div className='quiz-question' key={field}>
                                        <label>{field.replace(/([A-Z])/g, ' $1')}: </label>
                                        <select onChange={(item) => onQuizOptionSelect(item, field)} value={QuizData[field]} className="dropdown">
                                            {field.includes('LifeVal') ? yesOrNO : field.includes('Weapons') ? econPrefData : quizOptionsData}
                                            {quizOptionsData.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button className='quiz-submit' onClick={quizSubmit}>Submit</button>
                    </div>
                ) : (
                    <div className="results-section">
                        {roles.map((role) => (
                            <div className='color-viper font-fam' key={role.name}>
                                <strong>{role.name.toUpperCase()}:</strong>
                                <table>
                                    <tbody>
                                        <tr>
                                            {role.data.map((field) => (
                                                <td key={field}>
                                                    <span>
                                                        <strong className='color-viper'>{field.replace(/([A-Z])/g, ' $1')}</strong> - {QuizData[field]};
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </header>

            <div className="container mobile-only">
                <div className="displayFlex-column">
                    <img className="topicIcon" alt="" src={viperIcon} />
                    <span className="font-fam color-viper">
                        <h1 style={{ fontSize: "xx-large" }}>Viper LineUps Play Book</h1>
                        <a href="https://valoplant.gg" className="color-viper">
                            Create Your Own Play Books...
                        </a>
                        <button className="homeButton" onClick={pageCallback} title="Home Page">
                            Back To Home
                        </button>
                    </span>
                </div>

                {guidesData.map((item) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div div-mob">
                        <div className="expandable-div-header" onClick={(args) => expandClick(item.MapName, args)}>
                            <button className="expandable-div-button button-width-mob">
                                <span className='flex-align-center'>
                                    <h2 className="font-fam">{item.MapName}</h2>
                                    <span className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}></span>
                                </span>
                                {item?.isVisible && <div className={`expandable-div-content ${item.isVisible ? "expanded" : ""}`}>
                                    <img
                                        onClick={() => handleImageClick(item.ImageURL)}
                                        alt={`valorant-viper-${item.MapName}-lineups`}
                                        className="guideImages-mob image"
                                        src={item.ImageURL}
                                    />
                                </div>}
                            </button>
                        </div>
                    </div>
                ))}

                {quizShow ? (
                    <div id='coaching' className="font-fam color-viper coaching">
                        <span className="font-fam color-viper">
                            <h1 style={{ fontSize: "xx-large" }}>Free coaching</h1>
                        </span>
                        <div className="roles-display">
                            {['Controller', 'Duelist', 'Sentinel', 'Initiator'].map((role, index) => (
                                <div className={`${role.toLowerCase()} displayFlex-row`} key={role}>
                                    <span className="agent-role"><img src={''} alt={`${role.toLowerCase()}-icon`} /></span>
                                    <h2>{role}</h2>
                                    {['Aim', 'Comms', 'Economy Preference', 'Importance'].map((question, qIndex) => (
                                        <div className='quiz-question' key={question}>
                                            <p>{role}s should have {question.toLowerCase()}?</p>
                                            <select onChange={(item) => onQuizOptionSelect(item, `${role.toLowerCase()}${question}`)} value={QuizData[`${role.toLowerCase()}${question}`]} className="dropdown">
                                                {(question === 'Economy Preference' ? econPrefData : (question === 'Importance' ? yesOrNO : quizOptionsData)).map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div>
                            <button className='quiz-submit color-viper coaching' onClick={quizSubmit}>Submit</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='color-viper font-fam'>
                            <h2>Quiz Results:</h2>
                            <table>
                                <tbody>
                                    {Object.keys(QuizData).map((field) => (
                                        <tr key={field}>
                                            <td>
                                                <span style={{ color: "white" }}><b className='color-viper'>{field.split(/(?=[A-Z])/).join(' ')}</b> - {QuizData[field]};</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ValorantGuidesPage;
