var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  "YOUR_API_KEY";

export const sendMail = async (person) => {
  await new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: "meruaccounting@gmail.com", name: "Meru Accounting" },
      subject: "This is my default subject line",
      htmlContent:
        "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
      params: {
        greeting: "This is the default greeting",
        headline: "This is the default headline",
      },
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: person.email,
              name: person.firstName + " " + person.lastName,
            },
          ],
          htmlContent:
            "<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
          subject: "We are happy to be working with you",
        },
      ],
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
};
