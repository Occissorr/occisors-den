export interface MapElement {
    MapName : string;
    ImageURL : string | any;
    isVisible : boolean;
}

export interface Article {
    id: number;
    PreviewImage : string | any;
    ArticleLink : string;
    Heading : string;
    Description : string;
}