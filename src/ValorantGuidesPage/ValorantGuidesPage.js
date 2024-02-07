import React, { useState } from 'react';
import { VIPER_GUIDE_DATA } from '../Services/Constants.ts';
import './ValorantGuidesPage.css';
import viperIcon from '../SrcImages/valorantSrcFiles/viperIcon.png';

const ValorantGuidesPage = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');
    const [guidesData, setGuidesData] = useState(VIPER_GUIDE_DATA);

    const handleImageClick = (imageSrc) => {
        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };
    
    const expandClick = (SelectedMapName) => {
        if (SelectedMapName) {
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
    

    return (
        <div className="valorant-guides-page">
            {isOverlayVisible && enlargedImageSrc && (
                <div id="imageOverlay" className="overlay">
                    <img className="enlarged-image" alt="enlarged" src={enlargedImageSrc} />
                    <button className="close-overlay" onClick={() => setIsOverlayVisible(false)}>
                        X
                    </button>
                </div>
            )}

            <div className="container desktop-only">
                <div className="displayFlex-row">
                    <img className="topicIcon" src={viperIcon} alt="valorant-viper-icon-green" />
                    <span className="font-fam color-viper">
                        <h1 style={{ fontSize: "xx-large" }}>Viper LineUps Play Book</h1>
                        <a href="https://valoplant.gg" className="color-viper">
                            Create Your Own Play Books...
                        </a>
                    </span>
                    <button className="homeButton" onClick={() => { }} title="Home Page">
                        Back To Home
                    </button>
                </div>

                {guidesData.map((item) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div">
                        <div className="expandable-div-header" onClick={() => expandClick(item.MapName)}>
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
            </div>

            <div className="container mobile-only">
                <div className="displayFlex-column">
                    <img className="topicIcon" alt="" src="srcImages/valorantSrcFiles/viperIcon.png" />
                    <span className="font-fam color-viper">
                        <h1 style={{ fontSize: "xx-large" }}>Viper LineUps Play Book</h1>
                        <a href="https://valoplant.gg" className="color-viper">
                            Create Your Own Play Books...
                        </a>
                        <button className="homeButton" onClick={() => { }} title="Home Page">
                            Back To Home
                        </button>
                    </span>
                </div>

                {guidesData.map((item) => (
                    <div key={`lineup_map_${item.MapName}`} className="expandable-div div-mob">
                        <div className="expandable-div-header" onClick={() => expandClick(item.MapName)}>
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
