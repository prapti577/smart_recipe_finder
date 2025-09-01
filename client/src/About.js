import React from "react";
import './About.css';

export default function About() {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <p>
        Welcome to our Recipe Hub! 🍳 We are passionate about creating simple,
        delicious, and healthy recipes that anyone can cook at home.
      </p>
      <p>
        Our journey started with the idea of making cooking fun and accessible
        for everyone. From quick snacks to gourmet dishes, we bring together
        recipes that suit beginners and experts alike.
      </p>
      <h2>Our Mission</h2>
      <p>
        To inspire people around the world to explore new flavors and discover
        the joy of cooking. We believe food brings people together, and every
        recipe tells a story.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Step-by-step instructions for every recipe</li>
        <li>Healthy options with nutritional information</li>
        <li>Community-driven sharing of favorite dishes</li>
        <li>Regularly updated with new and trending recipes</li>
      </ul>
    </div>
  );
}
