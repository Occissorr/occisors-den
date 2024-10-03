import './RecentArticlesPage.css';
import React, { useState } from 'react';
import { ARTICLES_PREVIEW } from '../Services/Constants.ts';

const RecentArticlesPage = ({ pageCallback }) => {
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
                {Articles && Articles.map((article, index) => (
                    <div key={index} className="article-card">
                        <div className="article-image-wrapper">
                            <img 
                                className="article-image" 
                                src={article?.PreviewImage} 
                                alt="" 
                                onClick={() => handleImageClick(article?.PreviewImage)}
                            />
                        </div>
                        <div className="article-content">
                            <h2 className="article-heading">{article?.Heading ?? 'Heading'}</h2>
                            <p className="article-description">
                                {article?.Description ?? 'Description'}
                            </p>
                            <a className="article-link" href={article?.ArticleLink}>Continue Reading...</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentArticlesPage;
