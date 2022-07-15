import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { nanoid } from "nanoid";
import urlService from "../../service";
import UrlModel from "../../model/urlModel";
import sendMail from "../sendMailService";


/**
 * endpoint for the shortening of the urls
 * @param event should include a body with the array of urls which are Strings and the email that is also a String
 */
const getShortenedUrls: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const urls: string[] = event.body.urls;
  const mail = event.body.mail;

  if(mail != null && mail.length > 0) {   //TODO: add filters to remove bad characters and check if the "email" is a real email

    const body = {
      longUrls: urls,
      shortenedUrls: createShortenedUrl(urls),
      mail,
    }

    if(await storeUrlsInDB(body)){
      sendMail({body})
      return formatJSONResponse(200,{
        message: `Success! the shortened urls of ${body.longUrls.toString()}, which are ${body.shortenedUrls.toString()} will be sent to ${body.mail}`,
      });
    }

  }
    return formatJSONResponse(500, { //TODO: add more clear error responses
      message: `Failure! the shortened urls will not be sent! please try again!`,
    });
};

const createShortenedUrl = (urls: string[]) => {
  const shortUrls: string[] = [];
  for (let i = 0; i < urls.length; i++){
    shortUrls.push(nanoid(5));
  }
  return shortUrls;
}

const storeUrlsInDB = async (body) => {
  let url: UrlModel;
  for (let i = 0; i < body.longUrls.length; i++) {
    url = {
      shortenedUrl: body.shortenedUrls.at(i),
      longUrl: body.longUrls.at(i),
    }
    try{
      await urlService.createUrl(url);
    } catch (e) {
      throw new Error("ERROR: could not save Url to Database " + e)
    }
  }
    return true;
}

export const main = middyfy(getShortenedUrls);
