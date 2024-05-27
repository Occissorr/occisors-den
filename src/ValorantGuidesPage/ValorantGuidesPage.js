import React, { useState } from 'react';
import { VIPER_GUIDE_DATA } from '../Services/Constants.ts';
import './ValorantGuidesPage.css';
import viperIcon from '../SrcImages/valorantSrcFiles/viperIcon.png';

const ValorantGuidesPage = ({pageCallback}) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');
    const [guidesData, setGuidesData] = useState(VIPER_GUIDE_DATA);
    const quizOptionsData = ['High', 'Medium', 'Low'];
    const econPrefData = ['Gun', 'Utility'];
    const yesOrNO = ['Yes', 'No', 'Situational'];
    const [QuizData, setQuizData] = useState({
        controllerAim : quizOptionsData[0],
        controllerComms : quizOptionsData[0],
        controllerWeapons: econPrefData[0],
        controllerLifeVal: yesOrNO[0],
        duelistAim : quizOptionsData[0],
        duelistComms : quizOptionsData[0],
        duelistWeapons: econPrefData[0],
        duelistLifeVal: yesOrNO[0],
        sentinelAim : quizOptionsData[0],
        sentinelComms : quizOptionsData[0],
        sentinelWeapons: econPrefData[0],
        sentinelLifeVal: yesOrNO[0],
        initiatorAim : quizOptionsData[0],
        initiatorComms : quizOptionsData[0],
        initiatorWeapons: econPrefData[0],
        initiatorLifeVal: yesOrNO[0],
    });

    const handleImageClick = (imageSrc) => {
        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };

    const expandClick = (SelectedMapName, args) => {
        if (SelectedMapName && !args.target.classList.contains('guideImages')) {
            const updatedGuidesData = guidesData.map((data) => {
                if (data.MapName === SelectedMapName) {
                    return {
                        ...data,
                        isVisible: !data.isVisible
                    };
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
            window.scrollTo({
            top: sectionElement.offsetTop,
            behavior: 'smooth'
            });
        }
    };
    
    const onQuizOptionSelect = (item, name) =>{
        if (item?.target?.value && name !== '') {
            QuizData[name] = item.target.value;
            setQuizData({ ...QuizData });
        }
    };
    const quizSubmit = () =>{
        console.log(QuizData);
    };

    return (
        <div className="valorant-guides-page pg-p">
            {isOverlayVisible && enlargedImageSrc && (
                <div id="imageOverlay" className="overlay">
                    <img className="enlarged-image" alt="enlarged" src={enlargedImageSrc} />
                    <button className="close-overlay" onClick={() => setIsOverlayVisible(false)}>
                        X
                    </button>
                </div>
            )}
            <div className="navigation-bar">
            <a href={`${window.href}`} onClick={(e) => handleNavigationClick(e, 'map-guides')} className="nav-link color-viper">Lineup Guides</a>
            <a href={`${window.href}`} onClick={(e) => handleNavigationClick(e, 'coaching')} className="nav-link color-viper">Coaching</a>
            </div>

            <div className="container desktop-only">
                <div id='map-guides' className="displayFlex-row">
                    <img className="topicIcon" src={viperIcon} alt="valorant-viper-icon-green" />
                    <span className="font-fam color-viper">
                        <h1 style={{ fontSize: "xx-large" }}>Viper LineUps Play Book</h1>
                        <a href="https://valoplant.gg" className="color-viper">
                            Create Your Own Play Books...
                        </a>
                    </span>
                    <button className="homeButton" onClick={pageCallback} title="Home Page">
                        Back To Home
                    </button>
                </div>

                {guidesData.map((item, index) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div">
                        <div className="expandable-div-header" onClick={(args) => expandClick(item.MapName, args)}>
                            <button className="width-button-desktop expandable-div-button">
                                <span className='flex-align-center'>
                                    <h2 className="font-fam">{item.MapName}</h2>
                                    <span
                                        className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}
                                    >
                                    </span>
                                </span>
                                {item?.isVisible && <div className={`expandable-div-content ${item.isVisible ? "expanded" : ""}`}>
                                <img
                                    onClick={() => handleImageClick(item.ImageURL)}
                                    alt={`valorant-viper-${item.MapName}-lineups`}
                                    className="guideImages image"
                                    src={item.ImageURL}
                                />
                            </div>}
                            </button>
                        </div>
                    </div>
                ))}
                <div id='coaching' style={{marginBottom:"50px"}} className="font-fam color-viper coaching">
                    <span className="font-fam color-viper">
                        <h1 style={{ fontSize: "xx-large" }}>Free coaching</h1>
                    </span>
                    <div className='quiz-titles displayFlex-row'>
                        <h2>Aim</h2>
                        <h2>Comms</h2>
                        <h2>Economy Preference</h2>
                        <h2>Importance</h2>
                    </div>
                    <div className="controller displayFlex-row">
                        <span className="agent-role"><img src={''} alt="controller-icon" /></span>
                        <div className='quiz-question'>
                            <span>
                                <p>Controllers should have </p>
                                <select onChange={(item) =>onQuizOptionSelect(item,'controllerAim')} value={QuizData.controllerAim} className="dropdown">
                                    {quizOptionsData.map((item)=>(
                                        <option key={item[0]}value={item}>{item}</option>
                                    ))}
                                </select> <p>aim?</p>
                            </span>
                        </div>
                        <div className='quiz-question'>
                            <span>
                                <p>Controllers should have </p>
                                <select onChange={(item) =>onQuizOptionSelect(item,'controllerComms')} value={QuizData.controllerComms} className="dropdown">
                                    {quizOptionsData.map((item)=>(
                                        <option key={item[0]}value={item}>{item}</option>
                                    ))}
                                </select> <p>voice communication *Talking*?</p>
                            </span>
                        </div>
                        <div className='quiz-question'>
                            <span>
                                <p>Controllers should prefer buying </p>
                                <select onChange={(item) =>onQuizOptionSelect(item,'controllerWeapons')} value={QuizData.controllerWeapons} className="dropdown">
                                    {econPrefData.map((item)=>(
                                        <option key={item[0]}value={item}>{item}</option>
                                    ))}
                                </select> <p>more?</p>
                            </span>
                        </div>
                        <div className='quiz-question'>
                            <span>
                                <p>It is ok for a controller to die sooner</p>
                                <select onChange={(item) =>onQuizOptionSelect(item,'controllerLifeVal')} value={QuizData.controllerLifeVal} className="dropdown">
                                    {yesOrNO.map((item)=>(
                                        <option key={item[0]}value={item}>{item}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="duelist displayFlex-row">
                        <span className="agent-role"><img src={''} alt="duelist-icon" /></span>
                        <div className='quiz-question'>
                            <h2>Aim</h2>
                            <p>Duelists should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'duelistAim')} value={QuizData.duelistAim} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>aim?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Comms</h2>
                            <p>Duelists should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'duelistComms')} value={QuizData.duelistComms} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>voice communication *Talking*?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Economy Preference</h2>
                            <p>Duelists should prefer buying </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'duelistWeapons')} value={QuizData.duelistWeapons} className="dropdown">
                                {econPrefData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>more?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Importance</h2>
                            <p>It is ok for a <b>duelist</b> to die sooner</p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'duelistLifeVal')} value={QuizData.duelistLifeVal} className="dropdown">
                                {yesOrNO.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sentinel displayFlex-row">
                        <span className="agent-role"><img src={''} alt="sentinel-icon" /></span>
                        <div className='quiz-question'>
                            <h2>Aim</h2>
                            <p>Sentinels should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'sentinelAim')} value={QuizData.sentinelAim} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>aim?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Comms</h2>
                            <p>Sentinels should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'sentinelComms')} value={QuizData.sentinelComms} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>voice communication *Talking*?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Economy Preference</h2>
                            <p>Sentinels should prefer buying </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'sentinelWeapons')} value={QuizData.sentinelWeapons} className="dropdown">
                                {econPrefData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>more?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Importance</h2>
                            <p>It is ok for a <b>sentinel</b> to die sooner</p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'sentinelLifeVal')} value={QuizData.sentinelLifeVal} className="dropdown">
                                {yesOrNO.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="initiator displayFlex-row">
                        <span className="agent-role"><img src={''} alt="initiator-icon" /></span>
                        <div className='quiz-question'>
                            <h2>Aim</h2>
                            <p>Initiators should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'initiatorAim')} value={QuizData.initiatorAim} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>aim?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Comms</h2>
                            <p>Initiators should have </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'initiatorComms')} value={QuizData.initiatorComms} className="dropdown">
                                {quizOptionsData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>voice communication *Talking*?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Economy Preference</h2>
                            <p>Initiators should prefer buying </p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'initiatorWeapons')} value={QuizData.initiatorWeapons} className="dropdown">
                                {econPrefData.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select> <p>more?</p>
                        </div>
                        <div className='quiz-question'>
                            <h2>Importance</h2>
                            <p>It is ok for an <b>initiator</b> to die sooner</p>
                            <select onChange={(item) =>onQuizOptionSelect(item,'initiatorLifeVal')} value={QuizData.initiatorLifeVal} className="dropdown">
                                {yesOrNO.map((item)=>(
                                    <option key={item[0]}value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className='quiz-submit color-viper coaching' onClick={quizSubmit}>Submit</button>
                    </div>
                </div>
            </div>

            <div className="container mobile-only">
                <div className="displayFlex-column">
                    <img className="topicIcon" alt="" src="srcImages/valorantSrcFiles/viperIcon.png" />
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
                                    <span
                                        className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}
                                    >
                                    </span>
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
            </div>
        </div>
    );
};

export default ValorantGuidesPage;
