const { RandomNumber } = require('../utils/number-handler');
require('dotenv').config();

const setMessage = function (payload) {
    if (payload.title === process.env.TITLE_UPCOMING_EVENT) {
        return `
                <p> Dear Sir/Madam,</p>
                <p> We would like to inform you about an upcoming event that is scheduled to take place soon:</p>
                <p> Conference: <b>${payload.confName}</b></p>
                <p> Detail: <b>${payload.detail}</b></p>
                <p> Please be prepared to join this event and don't forget to mark your calendar!</p>
                `
    }
    else if (payload.title === process.env.TITLE_NEW_UPDATED_EVENT) {
        return `
                <p> Dear Sir/Madam,</p>
                <p> We would like to inform you about an updated event from a conference you are following:</p>
                <p> Conference: <b>${payload.confName}</b></p>
                <p> Detail: <b>${payload.detail}</b></p>
                <p> Please be prepared to join this event and don't forget to mark your calendar!</p>
                `
    }
    else if (payload.title === process.env.TITLE_CANCELLED_EVENT) {
        return `
                <p> Dear Sir/Madam,</p>
                <p> We would like to inform you about an cancelled event of one of your followed conference:</p>
                <p> Conference: <b>${payload.confName}</b></p>
                <p> Detail: <b>${payload.detail}</b></p>
                <p> Please be prepared to join this event and don't forget to mark your calendar!</p>
                `
    }
    else if (payload.title === process.env.TITLE_CANCELLED_CONFERENCE) {
        return `
                <p> Dear Sir/Madam,</p>
                <p> We would like to inform you about an cancelled conference that you are concerned about:</p>
                <p> ${payload.confName}</p>
                <p> From now on, you will no longer find any information about this conference on ConferenceHub. Sorry for this inconvenience.</p>
                `
    }
    else if (payload.title === process.env.TITLE_REGISTER_SUCCESSFULLY) {
        return `
                <p> Dear Sir/Madam,</p>
                <p> Thank you for participating in using CONFHUB.</p>
                <p> Your password is: <b>${payload.password}</b>.</p>
                <p> For safety, please change your password immediately after logging in. </p>
                <p> If you have any questions, please email ${process.env.ADMIN_EMAIL_ADDRESS}.</p>
                `
    }
}


module.exports.mail = (payload) => {
    const key = RandomNumber(6);
    let message = setMessage(payload);
    const data = {
        to: payload.uEmail,
        subject: `NOTIFICATION - ${payload.title}`,
        html:
            (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                
            </head>
            <body>
                <div class="container" style="width: 50%;height: 100%;margin: 0 auto;box-shadow: 3px 3px 3px black;">
                    <div class="header" style="width: 100%;display: flex;">
                        <img src="https://www.unicef.org.uk/babyfriendly/wp-content/uploads/sites/2/2022/03/2000x1000-Conference-2016-1500x750-1.jpg" alt="conference searching" style="width: 100%;height: 250px;">
                    </div>
                    <div class="content">
                        <div class="title">
                            <h3 class="title-header" style="text-align: center;font-size: 26px;">${payload.title}</h3>
                        </div>
                        <div class="description" style="margin: -10px 0 0 30px;">
                        ${message}
                        </div>
                        
                    </div>
                    <div class="footer" style="background-color: rgb(242, 164, 9);margin-top: 30px;height: 80px;">
                        <div class="copy-right" style="margin-left: 30px;margin-top: 10px;display: inline-block;">
                            <p style="color: white;font-size: 12px;">@email, when ${new Date}</p>
                            <p style="color: white;font-size: 12px;">Hệ thống tìm kiếm Hội nghị khoa học</p>
                        </div>
                        <div class="redirect-media" style="margin-right: 30px;margin-top: 10px;display: inline-block;">
                            <a href="myconference.com">
                                <img src="https://firebasestorage.googleapis.com/v0/b/prebook-ba0a0.appspot.com/o/images%2Ficon.drawio.png?alt=media&token=56b08f39-8d60-4aec-99fa-f32c60467db5" alt="" style="border-radius: 50%;width: 40px;height: 40px;margin-left: 320px;">
                            </a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `)
    };

    return { data, key };
}