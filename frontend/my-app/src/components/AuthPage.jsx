import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import './AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: ''
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // track viewport width so we only render mobile toggles on <768px
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isSignUp) {
      const response = await fetch("https://student-dashboard-f21z.onrender.com/signup",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.text();
      console.log(result); 
    } else {
      const response = await fetch("https://student-dashboard-f21z.onrender.com/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
      if(response.ok){
        localStorage.setItem("token", result.token);
        navigate("/dashboard"); // redirect after login
      } else {
        alert(result);
      }
    }
  };

  // explicit setters so we don't accidentally flip incorrectly
  const openSignUp = () => {
    setIsSignUp(true);
    setFormData({ name: '', email: '', pass: '' });
  };
  const openSignIn = () => {
    setIsSignUp(false);
    setFormData({ name: '', email: '', pass: '' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="auth-container">
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <div className="auth-form">
            <h1>Create Account</h1>
            <div className="social-container">
              <div className="social"><span>f</span></div>
              <div className="social"><span>G</span></div>
              <div className="social"><span>in</span></div>
            </div>
            <span className="form-subtitle">or use your email for registration</span>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="password"
                name="pass"
                placeholder="password"
                value={formData.pass}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <button onClick={handleSubmit} className="auth-button">SIGN UP</button>

            {/* Mobile-only: show Sign In button under Sign Up form */}
            {isMobile && (
              <button
                className="ghost-button mobile-toggle"
                onClick={openSignIn}
              >
                SIGN IN
              </button>
            )}
          </div>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <div className="auth-form">
            <h1>Welcome Back</h1>
            <div className="social-container">
              <div className="social"><span>f</span></div>
              <div className="social"><span>G</span></div>
              <div className="social"><span>in</span></div>
            </div>
            <span className="form-subtitle">or use your account</span>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="password"
                name="pass"
                placeholder="password"
                value={formData.pass}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <button onClick={handleSubmit} className="auth-button">SIGN IN</button>

            {/* Mobile-only: show Sign Up button under Sign In form */}
            {isMobile && (
              <button
                className="ghost-button mobile-toggle"
                onClick={openSignUp}
              >
                SIGN UP
              </button>
            )}
          </div>
        </div>

        {/* Overlay Container (unchanged) */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="overlay-content">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost-button" onClick={openSignIn}>SIGN IN</button>
              </div>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="overlay-content">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button className="ghost-button" onClick={openSignUp}>SIGN UP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
