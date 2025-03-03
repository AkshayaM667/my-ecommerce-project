import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      <p>© 2025 E-Commerce | All Rights Reserved</p>
      <p>
        <a href="/about" className="text-light">About Us</a> | 
        <a href="/contact" className="text-light"> Contact</a> | 
        <a href="/policies" className="text-light"> Policies</a>
      </p>
    </footer>
  );
};

export default Footer;
