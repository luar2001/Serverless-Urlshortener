import axios from 'axios';
import {SENDER_MAIL,SENDGRID_URL,SENDGRID_AUTHORIZATION} from "@libs/envFIlesSubstitute"; //Todo: Add an env plugin.

const sendMail= (event) => {

    const content = `Hi! 
    LongUrls: ${event.body.longUrls.toString()},
    shortenedUrls: ${event.body.shortenedUrls.toString()}
    `;

    const data = JSON.stringify({
        "personalizations": [
            {
                "to": [
                    {
                        "email": event.body.mail,
                        "name": event.body.mail
                    }
                ],
                "subject": "Here are your shortened urls! :)"
            }
        ],
        "content": [
            {
                "type": "text/plain",
                "value": content
            }
        ],
        "from": {
            "email": SENDER_MAIL,
            "name": "Urlshortener Service"
        }
    });

    axios({
        method: 'post',
        url: SENDGRID_URL,
        headers: {
            'Authorization': SENDGRID_AUTHORIZATION,
            'Content-Type': 'application/json'
        },
        data: data
    })
        .then(function (response) {

            console.log(JSON.stringify(response.data));
            return true
        })
        .catch(function (error) {
            console.log(error);
            return false
        });
    console.log("Skipped!")
    return false
}
export default sendMail