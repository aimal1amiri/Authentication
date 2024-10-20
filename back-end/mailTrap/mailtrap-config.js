import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config();


const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;

export const client = new MailtrapClient({
  token: TOKEN,
  endPoint: ENDPOINT
  
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
