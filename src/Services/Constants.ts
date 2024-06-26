import { ArticlePreview, MapElement } from "./Interface";
import ascentLineUpImage from '../SrcImages/valorantSrcFiles/ascentViperLineupGuide.png';
import bindLineUpImage from '../SrcImages/valorantSrcFiles/BindViperLineupGuide.png'
import breezeLineupImage from '../SrcImages/valorantSrcFiles/BreezeViperLineupGuide.png';
import havenLineUpImage from '../SrcImages/valorantSrcFiles/HeavenViperLineupGuide.png';
import splitLineUpImage from '../SrcImages/valorantSrcFiles/SplitViperLineupGuide.png';
import sunsetLineUpImage from '../SrcImages/valorantSrcFiles/SunsetViperLineupGuide.png';
import askYourselfImage from '../SrcImages/ArticleSrcFiles/askyourself.jpg';
import createsalesforceaccount from '../SrcImages/ArticleSrcFiles/createsalesforceaccount.jpg';
import salesforceVisualForcePage from '../SrcImages/ArticleSrcFiles/createsalesforceaccount.jpg';
import salesforceGuide1 from '../SrcImages/ArticleSrcFiles/salesforceGuide1.png';



export const VIPER_GUIDE_DATA : MapElement[] = [
    { MapName: 'Ascent', ImageURL: await loadImageAsBase64(ascentLineUpImage), isVisible : false },
    { MapName: 'Bind', ImageURL: await loadImageAsBase64(bindLineUpImage), isVisible : false },
    { MapName: 'Breeze', ImageURL: await loadImageAsBase64(breezeLineupImage), isVisible : false },
    { MapName: 'Haven', ImageURL: await loadImageAsBase64(havenLineUpImage), isVisible : false },
    { MapName: 'Split', ImageURL: await loadImageAsBase64(splitLineUpImage), isVisible : false },
    { MapName: 'SunSet', ImageURL: await loadImageAsBase64(sunsetLineUpImage), isVisible : false },
];

export const ARTICLES_PREVIEW: ArticlePreview[] = [
    {
        PreviewImage: await loadImageAsBase64(salesforceGuide1),
        ArticleLink: 'https://medium.com/@natmotgobin/getting-started-with-salesforce-a-brief-walkthrough-f7c2bb6073ca',
        Heading: 'Getting Started With Salesforce: A Brief Walkthrough',
        Description: `The developer console will redirect you to the CLI where you can start \n
         coding and explore the class files in Salesforce whereas, the setup will take \n
          you to the page where you can change the settings for your entire Salesforce....`
    },
    {
        PreviewImage: await loadImageAsBase64(salesforceVisualForcePage),
        ArticleLink: 'https://natmotgobin.medium.com/visual-force-pages-in-salesforce-94149a4fd9be',
        Heading: 'What is a VisualForce page',
        Description: `Visualforce is a web development framework that allows developers to build custom user interfaces for Salesforce applications.
         It is a part of the Salesforce platform and enables developers to create pages using a markup language similar to HTML,
         combined with a set of tags and controllers to access data and perform actions.... `
    },
    {
        PreviewImage: await loadImageAsBase64(createsalesforceaccount),
        ArticleLink: 'https://natmotgobin.medium.com/how-to-create-a-salesforce-account-686c3ab0a7a2',
        Heading: 'How to create a Salesforce account',
        Description: `We need a sales force account to use the developer console to work
        with Salesforce programming. So to create your salesforce developer account, follow the below steps 
        Step 1 :
        Follow this link that redirects you to the official Salesforce site, Salesforce Developer Community...`
    },
    {
        PreviewImage: await loadImageAsBase64(askYourselfImage),
        ArticleLink: 'https://natmotgobin.medium.com/3-things-you-need-to-ask-yourself-to-judge-your-personality-efa4b905bddb',
        Heading: '3 Things You Need To Ask Yourself To Judge Your Personality',
        Description: `You may ask, “Are you saying that I should be hating myself for being
         so and so?” definitely not. All I am saying is, you are free to judge yourself as much as you can so
         that you can use that judgment in a better way by finding what is wrong with you and taking measures to fix it...`,
    }
];

export const PageIds = {
    RecentArticlesPage : 'recent-articles-page',
    ValorantPage : 'valorant-page',
}
async function loadImageAsBase64(url: string | URL | Request) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error loading image:', error);
        return null;
    }
}