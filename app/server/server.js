const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const moment = require("moment");
const bcrypt = require("bcrypt"); 
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json()); 

// Route to initiate password reset
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return res.status(404).send("Email not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const tokenExpiry = moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");

  await supabase
    .from("users")
    .update({ reset_token: token, token_expiry: tokenExpiry })
    .eq("email", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_KEY,
    },
    secure: false,
  });

  const mailOptions = {
    from: "noreply@campus-isuccc.com",
    to: email,
    subject: "CAMPUS | Password Reset",
    text: `Click the following link to reset your password: http://localhost:5173/reset-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    return res
      .status(200)
      .send("Check your email for instructions on resetting your password");
  });
});

// Check token and expiry
app.get("/reset-password", async (req, res) => {
  const { token } = req.query;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("reset_token", token)
    .single();

  if (error || !user) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  if (moment(user.token_expiry).isBefore(moment())) {
    return res.status(403).json({ message: "Token has expired" });
  }

  return res.status(200).json({ message: "Token is valid" });
});

// Route to update the password
app.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("reset_token", token)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        reset_token: null,
        token_expiry: null,
      })
      .eq("id_number", user.id_number);

    if (updateError) {
      return res.status(500).json({ message: "Error updating password" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
