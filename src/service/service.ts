import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Url from "../model/urlModel";

export default class UrlService {

    private tableName: string = "";

    constructor(private docClient:DocumentClient) {}

    async createUrl(url:Url): Promise<Url> {

        await this.docClient.put({
            TableName: this.tableName,
            Item: url
        }).promise()
        return url as Url
    }


    async getByShortenedUrl(shortenedUrl : String ) : Promise<any> {

        const url = await this.docClient.get({
            TableName: this.tableName,
            Key: {
                shortenedUrl: shortenedUrl
            }
        }).promise()
        if(!url.Item){
            throw new Error("shortenedUrl does not exist!");
        }
        return url.Item as Url;
    }

}


