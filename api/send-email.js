import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: "http://localhost:3001", // allow your frontend
  })
);
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abdulsalamseidu22@yahoo.com",
      subject: "message from portfolio site",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:<br/>${message}</p>
      `,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Email failed", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
