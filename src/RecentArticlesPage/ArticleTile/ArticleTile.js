import React from 'react';
import '../RecentArticlesPage.css';

const ArticleTile = ({key, article, handleImageClick }) =>{

    return(
        <div key={key} className="article-card">
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
    )
}

export default ArticleTile;
