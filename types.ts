export interface ResponseType {
    Type: number;
    Message: string;
    Promoted: [];
    Data: NewsData[];
}
interface NewsData {
    id: string,
    guid: string,
    published_on: number,
    imageurl: string,
    title: string,
    url: string,
    source:string,
    tags: string,
    categories: string,
    upvotes: string,
    downvotes : string,
    lang : string,
    source_info : {
    name : string,
    lang : string,
    img : string
}}