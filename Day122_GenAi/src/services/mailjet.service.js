import Mailjet from 'node-mailjet';

// const mailjet = new Mailjet({
//     apiKey: process.env.MJ_APIKEY_PUBLIC,
//     apiSecret: process.env.MJ_APIKEY_PRIVATE,
// });
try {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'demomailer.aryan@gmail.com',
                    Name: 'Me',
                },
                To: [
                    {
                        Email: 'leopatel967@gmail.com',
                        Name: 'LeoPatel',
                    },
                ],
                Subject: 'My first Mailjet Email!',
                TextPart: 'Greetings from Mailjet!',
                HTMLPart:
                    '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.statusCode);
        });
} catch (error) {
    console.log(process.env.MJ_APIKEY_PUBLIC);
    console.log(process.env.MJ_APIKEY_PRIVATE);
}
