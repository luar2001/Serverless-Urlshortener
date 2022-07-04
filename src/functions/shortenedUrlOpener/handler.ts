import {middyfy} from "@libs/lambda";
import {formatJSONRedirect} from "../../libs/api-gateway";
import urlService from "../../service";

const urlOpener: (event) => Promise<{ headers: any; statusCode: number }> = async (event) => {

  const url = await urlService.getByShortenedUrl(event.pathParameters?.shortenedUrl);

  return formatJSONRedirect( //redirect
      301,
      {Location: new URL(url.longUrl)},
  )

};
export default urlOpener

export const main = middyfy(urlOpener);
