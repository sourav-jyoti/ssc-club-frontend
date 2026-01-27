"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { OTPForm } from "./otp-form";

export function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState("login"); // "login", "signup", or "otp"
  const [userEmail, setUserEmail] = useState("");

  const handleSignupSuccess = (email) => {
    setUserEmail(email);
    setStep("otp");
  };

  const handleSwitchToSignup = () => {
    setStep("signup");
  };

  const handleSwitchToLogin = () => {
    setStep("login");
  };

  const handleBackToSignup = () => {
    setStep("signup");
  };

  const handleClose = () => {
    setStep("login");
    setUserEmail("");
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Form content */}
          {step === "login" ? (
            <LoginForm onSwitchToSignup={handleSwitchToSignup} />
          ) : step === "signup" ? (
            <SignupForm
              onSuccess={handleSignupSuccess}
              onSwitchToLogin={handleSwitchToLogin}
            />
          ) : (
            <OTPForm email={userEmail} onBack={handleBackToSignup} />
          )}
        </div>
      </div>
    </>
  );
}
