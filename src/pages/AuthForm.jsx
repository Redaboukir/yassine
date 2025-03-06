import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, sendPasswordReset } from '../firebase';
import '../styles/AuthForm.css';


const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false); 
  const navigate = useNavigate(); // Hook pour la navigation// État pour afficher le formulaire de réinitialisation

  // Gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password);
      setError('');
      alert('Connexion réussie!');
      navigate('/home');
    } catch (err) {
      setError('Erreur lors de la connexion: ' + err.message);
    }
  };

  // Gestion de l'inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailPassword(email, password);
      setError('');
      alert('Inscription réussie!');
      
    } catch (err) {
      setError('Erreur lors de l\'inscription: ' + err.message);
    }
  };

  // Gestion de la connexion avec Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert('Connexion réussie avec Google!');
      navigate('/home');
    } catch (err) {
      setError('Erreur de connexion avec Google: ' + err.message);
    }
  };

  // Gestion de la réinitialisation du mot de passe
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      setError('');
      alert('Un email de réinitialisation de mot de passe a été envoyé !');
      setIsResetPassword(false); // Revenir au formulaire de connexion
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email de réinitialisation: ' + err.message);
    }
  };

  return (
    <div>
      
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Formulaire d'inscription */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social" onClick={handleGoogleLogin}>
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Formulaire de connexion */}
        <div className="form-container sign-in-container">
          {isResetPassword ? (
            // Formulaire de réinitialisation de mot de passe
            <form onSubmit={handlePasswordReset}>
              <h1>Reset Password</h1>
              <span>Enter your email to reset your password</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Send Reset Email</button>
              <button
                type="button"
                className="ghost"
                onClick={() => setIsResetPassword(false)}
              >
                Back to Sign In
              </button>
            </form>
          ) : (
            // Formulaire de connexion normal
            <form onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social" onClick={handleGoogleLogin}>
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" onClick={() => setIsResetPassword(true)}>
                Forgot your password?
              </a>
              <button type="submit">Sign In</button>
            </form>
          )}
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error-message">{error}</div>}

      {/* Footer */}
      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
          - Read how I created this and how you can join the challenge
          <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
        </p>
      </footer>
    </div>
  );
};

export default AuthForm;