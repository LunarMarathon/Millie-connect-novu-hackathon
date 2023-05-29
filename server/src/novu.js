import { Novu } from '@novu/node';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const NovuNotification = async (Username, Email, Id, Activity) => {

    const NOVU_API_KEY = process.env.NOVU_API_KEY
    const novu = new Novu(`${NOVU_API_KEY}`);
    // console.log(NOVU_API_KEY, Username, Email, Id, Activity)
    try {

        await novu.trigger('tested', {
            to: {
                subscriberId: Id,
                email: Email
            },
            payload: {
                username: Username,
                activity: Activity,
            }
        });

    } catch (error) {
        console.log(error)
    }
}

// module.exports = { NovuNotification }
export default NovuNotification