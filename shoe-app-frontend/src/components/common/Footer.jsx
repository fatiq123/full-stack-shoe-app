// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShoeStore</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for premium footwear. Quality, comfort, and style for every step.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition">Cart</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=running" className="text-gray-400 hover:text-white transition">Running Shoes</Link>
              </li>
              <li>
                <Link to="/shop?category=casual" className="text-gray-400 hover:text-white transition">Casual Shoes</Link>
              </li>
              <li>
                <Link to="/shop?category=sports" className="text-gray-400 hover:text-white transition">Sports Shoes</Link>
              </li>
              <li>
                <Link to="/shop?category=formal" className="text-gray-400 hover:text-white transition">Formal Shoes</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Shoe Street</p>
              <p className="mb-2">Footwear City, FC 12345</p>
              <p className="mb-2">Email: info@shoestore.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ShoeStore. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Shipping Info</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
