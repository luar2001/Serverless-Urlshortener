import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

/**
 * endpoint for the shortening of the urls
 * @param event should include a body with the array of urls which are Strings and the email that is also a String
 */
const getShortenedUrls: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const urls: String[] = event.body.urls;
  const email = event.body.email;

  if(email != null && email.length > 0) { //checks if urls and email exists
    //TODO: add filters to remove bad characters and check if the "email" is a real email

    return formatJSONResponse(200,{
      message: `Success! the shortened urls of ${urls.toString()} will be sent to ${email}`,
    });
  }

    return formatJSONResponse(500, {
      message: `Failure! the shortened urls will not be sent! please try again!`,
    });
};

//TODO: add getAllUrlsLikedToEmail endpoint

export const main = middyfy(getShortenedUrls);
