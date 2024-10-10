import React from 'react';
import '../ValorantGuidesPage.css';

const LazyLoadImage = (item, handleImageClick) => (
    <img onClick={() => handleImageClick(item.ImageURL)}
        alt={`Viper ${item.MapName} lineups`}
        className="guideImages"
        src={item.ImageURL} loading="lazy" />
);

const MapComponent = ({ expandClick, item, handleImageClick }) => { 

    return (
        <div key={`lineup_map_${item.MapName}`} className="expandable-div">
            <div className="expandable-div-header" onClick={(args) => expandClick(item.MapName, args)}>
                <h2 className="font-fam">{item.MapName}</h2>
                <span className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}></span>
            </div>
            {item.isVisible && (
                <div className="expandable-div-content">
                    {LazyLoadImage(item, handleImageClick)}
                </div>
            )}
        </div>
    )
    
}

export default MapComponent;