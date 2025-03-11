import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, sendPasswordReset } from '../firebase';
import '../styles/AuthForm.css';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password);
      setError('');
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailPassword(email, password);
      setError('');
      alert('Inscription réussie!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      setError('');
      alert('Email de réinitialisation envoyé !');
      setIsResetPassword(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isResetPassword ? (
          <form onSubmit={handlePasswordReset} className="auth-form">
            <h2>Réinitialisation</h2>
            <p>Entrez votre email</p>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Envoyer</button>
            <button className="switch-btn" onClick={() => setIsResetPassword(false)}>Retour</button>
          </form>
        ) : isSignUp ? (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Inscription</h2>
            <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">S'inscrire</button>
            <button className="switch-btn" onClick={() => setIsSignUp(false)}>Se connecter</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Connexion</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Se connecter</button>
            <button className="google-btn" onClick={handleGoogleLogin}>Se connecter avec Google</button>
            <p className="link" onClick={() => setIsResetPassword(true)}>Mot de passe oublié?</p>
            <button className="switch-btn" onClick={() => setIsSignUp(true)}>Créer un compte</button>
          </form>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
