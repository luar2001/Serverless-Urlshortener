import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Url from "../model/urlModel";

export default class UrlService {

    private tableName: string = "UrlShortenerTable";

    constructor(private docClient:DocumentClient) {}

    async createUrl(url:Url): Promise<Url> {
        try{
        await this.docClient.put({
            TableName: this.tableName,
            Item: url
        }).promise()
            console.log("Created Url: " + url)
            return url as Url;
        } catch (e){
            throw new Error("could not save url to the database " + e)
        }
    }


    async getByShortenedUrl(shortenedUrl : String ) : Promise<any> {
        try{
            const url = await this.docClient.get({
                TableName: this.tableName,
                Key: {
                    shortenedUrl
                }
            }).promise()
            return url.Item;
        } catch (e) {
            throw new Error("could not get the url form the database " + e)
        }
    }

    //TODO: add getUrlsByMail

}


