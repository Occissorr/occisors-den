import './RecentArticlesPage.css'
import React, {useState} from 'react';
import { ARTICLES_PREVIEW } from '../Services/Constants.ts';

const RecentArticlesPage = ({pageCallback}) => {

    const Articles = ARTICLES_PREVIEW;

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');


    const handleImageClick = (imageSrc) => {
        console.log('Inside')
        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };


    return (
        <div className='recentArticlesPage_container'>
            <div className="mobile-only">
            {Articles && Articles.map((article, index) => (
                <div key={index} className="blog-post">
                    <button className='backHome-recentArticles' onClick={pageCallback}>Back Home</button>
                    <img className="blog-image-mobile" src={article?.PreviewImage} alt=""/>
                        <div className="blog-heading-mobile">{article?.Heading ?? 'Heading'}</div>
                        <div className="blog-description-mobile">{article?.Description ?? 'Description'}
                            <a className="redirectLink" href={article?.ArticleLink}>Continue Reading...</a></div>
                </div>
            ))}
            </div>
            <div className="desktop-only">
               {isOverlayVisible && <div id="imageOverlay" className="overlay">
                    <img className="enlarged-image" alt='after-cick' src={enlargedImageSrc} id="enlargedImage" />
                    <button onClick={setIsOverlayVisible(false)} className="close-overlay" id="hideOverlayBtn"> X </button>
                </div>}
                {Articles && Articles.map((article, index) => (
                    <div key={index} className="blog-post">
                        <button className='backHome-recentArticles' onClick={pageCallback}>Back Home</button>
                        <img className="blog-image image" onClick={handleImageClick} src={article?.PreviewImage} alt="" />
                        <div className="blog-heading">{article?.Heading ?? 'Heading'}</div>
                        <div className="blog-description"> {article?.Description ?? 'Description'}
                            <a className="redirectLink" href={article?.ArticleLink}>Continue Reading...</a></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default RecentArticlesPage;