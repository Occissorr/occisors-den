import './RecentArticlesPage.css'
import React, {useState} from 'react';
import { ARTICLES_PREVIEW } from '../Services/Constants.ts';

const RecentArticlesPage = () => {

    const Articles = ARTICLES_PREVIEW;

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const [enlargedImageSrc, setEnlargedImageSrc] = useState('');


    const handleImageClick = (imageSrc) => {

        setEnlargedImageSrc(imageSrc);
        setIsOverlayVisible(true);
    };


    return (
        <div className='recentArticlesPage_container'>
            <div class="mobile-only">
            {Articles && Articles.map((article) => (
                <div class="blog-post">
                <img class="blog-image-mobile" src={article?.PreviewImage} alt=""/>
                    <div class="blog-heading-mobile">{article?.Heading ?? 'Heading'}</div>
                    <div class="blog-description-mobile">{article?.Description ?? 'Description'}
                        <a class="redirectLink" href={article?.ArticleLink}>Continue Reading...</a></div>
                </div>
            ))}
            </div>
            <div className="desktop-only">
               {isOverlayVisible && <div id="imageOverlay" class="overlay">
                    <img className="enlarged-image" alt='after-cick' src={enlargedImageSrc} id="enlargedImage" />
                    <button class="close-overlay" id="hideOverlayBtn"> X </button>
                </div>}
                {Articles && Articles.map((article) => (
                    <div class="blog-post">
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