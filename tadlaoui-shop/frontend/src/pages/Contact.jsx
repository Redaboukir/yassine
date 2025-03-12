import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Envoi en cours...");

    const formData = new FormData(event.target);
    formData.append("access_key", "2128cf19-6432-4955-8ba1-d6fdae3533f5"); // Remplace avec ta clé Web3Forms

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message envoyé avec succès !");
      event.target.reset();
    } else {
      console.error("Erreur :", data);
      setResult("Erreur lors de l'envoi. Réessayez.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Votre nom" required />
        <input type="email" name="email" placeholder="Votre email" required />
        <input type="text" name="subject" placeholder="Sujet" required />
        <textarea name="message" placeholder="Votre message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
      <p className="result-message">{result}</p>
    </div>
  );
}
