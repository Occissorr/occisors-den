import React from 'react';
import '../ValorantPage.css';

const LazyLoadImage = ({ item, handleImageClick }) => (
    <img 
        onClick={() => handleImageClick(item.ImageURL)}
        alt={`Occisor's Den Viper ${item.MapName} lineups and strategies`} 
        className="guideImages" 
        src={item.ImageURL} 
        loading="lazy" 
        width="100%" // Ensures responsive image loading
        height="auto" 
    />
);

const MapComponent = ({ expandClick, item, handleImageClick }) => { 
    return (
        <div key={`lineup_map_${item.MapName}`} className="expandable-div">
            <div 
                className="expandable-div-header" 
                onClick={(args) => expandClick(item.MapName, args)} 
                tabIndex={0} // Makes it keyboard accessible
                role="button" // Indicates it's clickable
                aria-expanded={item.isVisible} // Improves screen reader accessibility
            >
                <h2 className="font-fam">{item.MapName} - Viper Lineups</h2>
                <span className={`arrow-icon ${item.isVisible ? 'arrow-up' : 'arrow-down'}`}></span>
            </div>
            {item.isVisible && (
                <div className="expandable-div-content">
                    <LazyLoadImage item={item} handleImageClick={handleImageClick} />
                </div>
            )}
        </div>
    );
}

export default MapComponent;
