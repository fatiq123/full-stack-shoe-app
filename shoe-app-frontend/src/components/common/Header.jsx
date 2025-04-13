// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaSearch, FaShoppingBag } from 'react-icons/fa';
import ShoeService from '../../services/shoe.service';

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allShoes, setAllShoes] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Fetch all shoes for search functionality
    const fetchShoes = async () => {
      try {
        const shoes = await ShoeService.getAllShoes();
        setAllShoes(shoes);
      } catch (error) {
        console.error('Error fetching shoes for search:', error);
      }
    };
    
    fetchShoes();
    
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${searchQuery}`);
    setShowSearchResults(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1) {
      // Filter shoes based on search query
      const filteredShoes = allShoes.filter(shoe => 
        shoe.name.toLowerCase().includes(query.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
        shoe.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      
      setSearchResults(filteredShoes);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (shoeId) => {
    navigate(`/shoes/${shoeId}`);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-gradient-to-r from-dark to-darkSecondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaShoppingBag className="text-2xl text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
              ShoeStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center ml-8 space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition duration-300 border-b-2 border-transparent hover:border-primary py-1">Home</Link>
            <Link to="/shop" className="font-medium hover:text-primary transition duration-300 border-b-2 border-transparent hover:border-primary py-1">Shop</Link>
            {isAdmin() && (
              <Link to="/admin" className="font-medium hover:text-primary transition duration-300 border-b-2 border-transparent hover:border-primary py-1">Admin</Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block relative flex-1 mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-field flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 border border-gray-700 transition-all duration-300">
              <input
                type="text"
                placeholder="Search for shoes..."
                className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="ml-2 text-gray-400 hover:text-primary transition duration-300">
                <FaSearch />
              </button>
            </form>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-50 animate-fade-in">
                {searchResults.map(shoe => (
                  <div 
                    key={shoe.id} 
                    className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSearchResultClick(shoe.id)}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {shoe.imageUrl && (
                        <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{shoe.name}</p>
                      <p className="text-xs text-gray-500">{shoe.brand} · ${shoe.price}</p>
                    </div>
                  </div>
                ))}
                <div 
                  className="p-2 bg-gray-50 text-center text-sm text-primary hover:text-primaryHover cursor-pointer"
                  onClick={handleSearch}
                >
                  See all results
                </div>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/cart" className="relative group">
                  <div className="p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-primary transition duration-300">
                    <FaShoppingCart size={18} />
                  </div>
                  {cart.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.totalItems}
                    </span>
                  )}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Cart</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-primary transition duration-300">
                    <FaUser size={18} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Hello, {currentUser.username}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-full border border-gray-600 hover:border-primary hover:text-primary transition duration-300">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-full bg-primary hover:bg-primaryHover text-white font-medium transition duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="search-field flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 mb-4 border border-gray-700">
              <input
                type="text"
                placeholder="Search for shoes..."
                className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="ml-2 text-gray-400 hover:text-primary">
                <FaSearch />
              </button>
            </form>
            
            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="bg-white rounded-md shadow-lg overflow-hidden mb-4">
                {searchResults.map(shoe => (
                  <div 
                    key={shoe.id} 
                    className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSearchResultClick(shoe.id)}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {shoe.imageUrl && (
                        <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{shoe.name}</p>
                      <p className="text-xs text-gray-500">{shoe.brand} · ${shoe.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-primary transition py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="hover:text-primary transition py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              {currentUser && (
                <Link to="/cart" className="flex items-center hover:text-primary transition py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>
                  <FaShoppingCart size={20} className="mr-2" />
                  <span>Cart ({cart.totalItems})</span>
                </Link>
              )}
              {currentUser && (
                <Link to="/profile" className="flex items-center hover:text-primary transition py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>
                  <FaUser size={20} className="mr-2" />
                  <span>Profile</span>
                </Link>
              )}
              {isAdmin() && (
                <Link to="/admin" className="hover:text-primary transition py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              )}
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center hover:text-red-500 transition py-2"
                >
                  <FaSignOutAlt size={20} className="mr-2" />
                  <span>Sign out</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link 
                    to="/login" 
                    className="flex justify-center items-center py-2 border border-gray-600 rounded-full hover:border-primary hover:text-primary transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaSignInAlt size={18} className="mr-2" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex justify-center items-center py-2 bg-primary text-white rounded-full hover:bg-primaryHover transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus size={18} className="mr-2" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
