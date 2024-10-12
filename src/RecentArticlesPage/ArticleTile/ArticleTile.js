import React from 'react';
import '../RecentArticlesPage.css';

const ArticleTile = ({key, article, handleImageClick }) =>{

    return(
        <div key={key} className="article-card">
            <div className="article-image-wrapper">
                <img 
                    className="article-image" 
                    src={article?.PreviewImage} 
                    alt={article?.Heading ? `Preview image for article: ${article.Heading}` : 'Article preview'} 
                    onClick={() => handleImageClick(article?.PreviewImage)}
                />
            </div>
            <div className="article-content">
                <h2 className="article-heading">
                    {article?.Heading ?? 'No Heading Available'}
                </h2>
                <p className="article-description">
                    {article?.Description ?? 'No description available for this article.'}
                </p>
                <a 
                    className="article-link" 
                    href={article?.ArticleLink}
                    aria-label={`Continue reading: ${article?.Heading ?? 'this article'}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Continue Reading...
                </a>
            </div>
        </div>
    )
}

export default ArticleTile;
