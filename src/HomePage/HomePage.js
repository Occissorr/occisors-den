import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { PageIds } from '../Services/Constants.ts';

const MainPage = () => {
    const MediumUrl = 'https://natmotgobin.medium.com/';
    const InstagramUrl = 'https://www.instagram.com/occisorr/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==';

    /**
     * Opens a page in a new tab with the given URL.
     * @param {*} url -> Page URL to open in a new tab
     */
    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="mainPage-container pg-p">
            {/* Mobile Layout */}
            <div className="mobile-only">
                <div style={{ fontFamily: "copper plate", color: "orange" }}>
                    <h1 style={{ color: "White" }}>Occisor's Den</h1>
                    <br /><br /><br />
                    <p style={{ marginLeft: "20px", color: "orange" }}>
                        <b>WELCOME TO THE DEN EVERYONE,</b> Feel free to check out my work from the buttons below.
                    </p>
                    <br /><br /><br />
                    <div className="button-container-mobile">
                        {/* Using Link for internal navigation */}
                        <Link to={`/${PageIds.RecentArticlesPage}`} className="mobile-button" title="Recent Articles">Recent Articles</Link>
                        <button className="mobile-button" onClick={() => { openLink(MediumUrl); }} title="Medium">Medium</button>
                        <button className="mobile-button" onClick={() => { openLink(InstagramUrl); }} title="Instagram">Instagram</button>
                        <Link to={`/${PageIds.ValorantPage}`} className="mobile-button" title="Valorant Guides">Valorant</Link>
                    </div>
                    <br /><br /><br />
                </div>
                <hr />
                <br /><br /><br />
                <div>
                    <h1 style={{ color: "orange" }}>About Me</h1>
                    <p style={{ color: "white" }}>
                        A Curious post-teen aged guy with a lot of rage, trying to reduce them in the form of words.
                        I'm an author; my books are listed below.
                        <br />
                        Anto Gibson, A working software developer with 2 years of experience and 23 years young.
                        <br /><br />
                        <b>Books:</b>
                        <br />
                        1. No Time To Beseech Volume-1 (Crime Thriller Novel) <a className="BooksName" href="https://www.amazon.in/NO-TIME-BESEECH-Occupation-decadence/dp/1637450249">Interested? Click here to take a look</a>
                        <br />
                        2. Rhymes Of Teens (A poem Anthology) <a className="BooksName" href="https://www.amazon.in/Rhymes-Teens-X-Anto-Gibson-ebook/dp/B09BG1L8DK">E-Book Available, Check Now</a>
                        <br />
                        3. The Imbalance (Sci-fi Novel) <span className="BooksName">Yet to be out</span>
                    </p>
                </div>
                <br /><br /><br />
                <hr />
                <br /><br /><br />
                <b style={{ marginLeft: "20px", color: "orange", marginBottom: "20px" }}>
                    Thanks for taking the time to visit my website, and yes, I designed it! Have a good time y'all, Occisor, peace out...
                </b>
                <br /><br /><br />
            </div>

            {/* Desktop Layout */}
            <div className="desktop-only">
                <div style={{ fontFamily: 'copper plate', color: 'orange' }}>
                    <h1 style={{ color: 'white' }}>Occisor's Den</h1>
                    <br /><br /><br />
                    <p style={{ marginLeft: '200px', color: "orange" }}>
                        <b>WELCOME TO THE DEN EVERYONE,</b> Feel free to check out my work from the buttons below.
                    </p>
                    <br /><br /><br />
                    <div className="button-container">
                        {/* Using Link for internal navigation */}
                        <Link to={`/${PageIds.RecentArticlesPage}`} className="button" title="Recent Articles">Recent Articles</Link>
                        <button className="button" onClick={() => { openLink(MediumUrl); }} title="Medium">Medium</button>
                        <button className="button" onClick={() => { openLink(InstagramUrl); }} title="Instagram">Instagram</button>
                        <Link to={`/${PageIds.ValorantPage}`} className="button" title="Valorant Guides">Valorant</Link>
                    </div>
                    <br /><br /><br />
                </div>
                <hr />
                <br /><br /><br />
                <div className="about-me-division">
                <h1 style={{ color: 'orange' }}>About Me</h1>
                <p style={{ color: 'white' }}>
                    I’m Anto Gibson, a software engineer with over three years of industry experience 
                    and a passion for creative writing. Alongside my career in software development, 
                    I’m an established author with two published books and more than 15 articles to my name. 
                    Writing has become an outlet for my curiosity and drive, allowing me to channel my thoughts 
                    and experiences into stories and words.
                    <br /><br />
                    <b>Books:</b>
                    <br />
                    1. <i>No Time To Beseech, Volume 1</i> (Crime Thriller) – 
                    <a className="BooksName" href="https://www.amazon.in/NO-TIME-BESEECH-Occupation-decadence/dp/1637450249">
                    Interested? Check it out here</a>
                    <br />
                    2. <i>Rhymes of Teens</i> (Poetry Anthology) – 
                    <a className="BooksName" href="https://www.amazon.in/Rhymes-Teens-X-Anto-Gibson-ebook/dp/B09BG1L8DK">
                    E-book available, check it out here</a>
                    <br />
                    3. <i>The Imbalance</i> (Sci-Fi Novel) – <span className="BooksName">Coming soon</span>
                </p>
                </div>

                <br /><br /><br />
                <hr />
                <br /><br /><br />
                <b style={{ marginLeft: '200px', color: 'orange' }}>
                Thank you for visiting my website. Fun fact: I designed it myself! Enjoy your stay, 
                and feel free to explore. — Occisor, signing off...
                </b>
                <br /><br /><br />
            </div>
        </div>
    );
}

export default MainPage;
