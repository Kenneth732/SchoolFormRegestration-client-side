import React, { useState } from "react";
import axios from "axios";
import "./EmailForm.css";

const EmailForm = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.sendgrid.com/v3/mail/send",
        {
          personalizations: [
            {
              to: [{ email: recipientEmail }],
            },
          ],
          from: { email: senderEmail, name: senderName },
          subject,
          content: [{ type: "text/plain", value: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <h2>Send an Email</h2>
      {status === "success" && (
        <div className="status success">Email sent successfully!</div>
      )}
      {status === "error" && (
        <div className="status error">An error occurred. Please try again.</div>
      )}
      <div className="form-group">
        <label htmlFor="senderName">Your Name:</label>
        <input
          type="text"
          id="senderName"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="senderEmail">Your Email:</label>
        <input
          type="email"
          id="senderEmail"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipientEmail">Recipient's Email:</label>
        <input
          type="email"
          id="recipientEmail"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default EmailForm;
