import './ArticlesPage.css';
import React, { useState } from 'react';
import { ARTICLES_PREVIEW } from '../Services/Constants.ts';
import ArticleTile from './ArticleTile/ArticleTile.js';

const ArticlesPage = ({ pageCallback }) => {
    const Articles = ARTICLES_PREVIEW;

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');

    const handleImageClick = (imageSrc) => {
        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    return (
        <div className='recentArticlesPage_container'>
            <button className='backHome' onClick={pageCallback}>Home</button>
            {isOverlayVisible && (
                <div id="imageOverlay" className="overlay">
                    <img className="enlarged-image" alt='Enlarged' src={enlargedImageSrc} />
                    <button onClick={closeOverlay} className="close-overlay">X</button>
                </div>
            )}
            <div className="articles-grid">
                {Articles && Articles.map((article) => (
                    <ArticleTile 
                        key={article.id}
                        article={article}
                        handleImageClick={handleImageClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;
