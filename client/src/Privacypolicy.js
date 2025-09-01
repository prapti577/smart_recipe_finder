import React from "react";
import "./Privacypolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is very important to us. This Privacy Policy explains how
        we collect, use, and safeguard your information when you use our Recipe
        Hub website.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> such as name, email, or contact
          details when you sign up or contact us.
        </li>
        <li>
          <strong>Usage Data:</strong> such as pages visited, recipes viewed,
          and interaction with content.
        </li>
        <li>
          <strong>Cookies:</strong> to improve your browsing experience.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Personalize your recipe recommendations</li>
        <li>Respond to your queries or feedback</li>
        <li>Improve our website and user experience</li>
        <li>Send you occasional recipe updates (if subscribed)</li>
      </ul>

      <h2>Your Rights</h2>
      <p>
        You can request to access, update, or delete your data anytime. We
        respect your privacy and do not sell your personal information to third
        parties.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions regarding this Privacy Policy, feel free to reach
        out at <strong>privacy@recipes.com</strong>.
      </p>
    </div>
  );
}
