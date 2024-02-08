import React from 'react';
import './MainPage.css';

const MainPage = () => {
    const MediumUrl = 'https://natmotgobin.medium.com/';
    const InstagramUrl = 'https://www.instagram.com/occisorr/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==';
    const valorantGuidesPage = 'src/ValorantGuidesPage/ValorantGuidesPage.js';
    const recentArticlesPage = 'src/RecentArticlesPage/RecentArticlesPage.js'
    const openPage = (pageURL) => {
        window.location.href = pageURL;
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="mainPage-container">
            <div className="mobile-only">
                <div style={{ fontFamily: "copper plate", color: "orange" }}>
                    <h1 style={{ color: "White" }}>Occisor's Den</h1><br /><br /><br />
                    <p style={{ marginLeft: "20px" }}><b>WELCOME TO THE DEN EVERYONE,</b> Feel free to check out my work from the below buttons. </p><br /><br /><br />
                    <div className="button-container-mobile">
                        <button className="mobile-button" onClick={()=>{openPage(recentArticlesPage)}} title="Recent Articles">Recent Articles</button><br />
                        <button className="mobile-button" onClick={()=>{openLink(MediumUrl)}} title="Medium" >Medium</button><br />
                        <button className="mobile-button" onClick={()=>{openLink(InstagramUrl)}} title="Instagram " >Instagram</button><br />
                        <button className="mobile-button" onClick={()=>{openPage(valorantGuidesPage)}} title="Valorant Guides " >Valorant</button>
                    </div><br /><br /><br />
                </div>
                <hr />
                <br /><br /><br />
                <div>
                    <h1 style={{ color: "orange" }}>About Me</h1>
                    <p style={{ color: "white" }}>               A Curious post-teen aged guy with a lot of rage and trying to reduce them in the form of words.<br />
                        I'm an author; my books are out and listed below.<br />
                        Anto Gibson, A working software developer with 2 year experience and 23 years young<br /><br />
                        <b>Books : </b><br />
                        1. No Time To Beseech Volume-1  (Crime Thriller Novel) <a className="BooksName" href="https://www.amazon.in/NO-TIME-BESEECH-Occupation-decadence/dp/1637450249/ref=sr_1_1?crid=3RPAN7M05TZFZ&keywords=no+time+to+beseech&qid=1690016015&s=books&sprefix=no+time+to+beseech%2Cstripbooks%2C229&sr=1-1">Interested? Click here to take a look</a><br />
                        2. Rhymes Of Teens (A poem Anthology) <a className="BooksName" href="https://www.amazon.in/Rhymes-Teens-X-Anto-Gibson-ebook/dp/B09BG1L8DK">E-Book Available Check Now</a><br />
                        3. The Imbalance (Sci-fi Novel) <span className="BooksName">Yet to be out</span><br />
                    </p>
                </div>
                <br /><br /><br />
                <hr />
                <br /><br /><br />
                <b style={{ marginLeft: "20px", color: "orange", marginBottom: "20px" }}>Thanks For the time taken on reading my website, And yes I designed this website. Have a good time y'all Occisor peace out...</b><br /><br /><br />
            </div>
            <div className="desktop-only">
                <div style={{ fontFamily: 'copper plate', color: 'orange' }}>
                    <h1 style={{ color: 'white' }}>Occisor's Den</h1>
                    <br /><br /><br />
                    <p style={{ marginLeft: '200px' }}>
                        <b>WELCOME TO THE DEN EVERYONE,</b> Feel free to check out my work from the below buttons.
                    </p>
                    <br /><br /><br />
                    <div className="button-container">
                        <button className="button" onClick={() => {openPage(recentArticlesPage)}} title="Recent Articles">Recent Articles</button>
                        <br />
                        <button className="button" onClick={() => {openLink(MediumUrl)}} title="Medium">Medium</button>
                        <br />
                        <button className="button" onClick={() => {openLink(InstagramUrl)}} title="Instagram">Instagram</button>
                        <br />
                        <button className="button" onClick={() => {openPage(valorantGuidesPage)}} title="Valorant Guides">Valorant</button>
                    </div>
                    <br /><br /><br />
                </div>
                <hr />
                <br /><br /><br />
                <div className="about-me-division">
                    <h1 style={{ color: 'orange' }}>About Me</h1>
                    <p style={{ color: 'white' }}>
                        A Curious post-teen aged guy with a lot of rage and trying to reduce them in the form of words.
                        <br />
                        I'm an author; my books are out and listed below.
                        <br />
                        Anto Gibson, A working software developer with 1+ year experience and 23 years young
                        <br /><br />
                        <b>Books : </b><br />
                        1. No Time To Beseech Volume-1  (Crime Thriller Novel) <a className="BooksName" href="https://www.amazon.in/NO-TIME-BESEECH-Occupation-decadence/dp/1637450249/ref=sr_1_1?crid=3RPAN7M05TZFZ&keywords=no+time+to+beseech&qid=1690016015&s=books&sprefix=no+time+to+beseech%2Cstripbooks%2C229&sr=1-1">Interested? Click here to take a look</a>
                        <br />
                        2. Rhymes Of Teens (A poem Anthology) <a className="BooksName" href="https://www.amazon.in/Rhymes-Teens-X-Anto-Gibson-ebook/dp/B09BG1L8DK">E-Book Available Check Now</a>
                        <br />
                        3. The Imbalance (Sci-fi Novel) <span className="BooksName">Yet to be out</span>
                    </p>
                </div>
                <br /><br /><br />
                <hr />
                <br /><br /><br />
                <b style={{ marginLeft: '200px', color: 'orange' }}>Thanks For the time taken on reading my website, And yes I designed this website. Have a good time y'all Occisor peace out...</b>
                <br /><br /><br />
            </div>
        </div>
    )
}
export default MainPage;