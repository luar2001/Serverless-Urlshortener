import {dynamoDBClient} from "../model";
import UrlService  from "./service";

const urlService = new UrlService(dynamoDBClient());
export default urlService;