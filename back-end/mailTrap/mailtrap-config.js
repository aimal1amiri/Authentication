import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config();


const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;

const client = new MailtrapClient({
  token: TOKEN,
  endPoint: ENDPOINT
  
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: process.env.EMAIL,
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);