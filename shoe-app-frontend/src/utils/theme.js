// src/utils/theme.js
// Centralized theme configuration for consistent styling across the app

const theme = {
  colors: {
    primary: '#3B82F6',       // Blue
    primaryHover: '#2563EB',  // Darker blue
    secondary: '#F59E0B',     // Amber/Yellow
    secondaryHover: '#D97706',
    dark: '#1F2937',          // Dark gray/almost black
    darkSecondary: '#374151', // Slightly lighter dark
    light: '#F3F4F6',         // Light gray
    white: '#FFFFFF',
    error: '#EF4444',         // Red
    success: '#10B981',       // Green
    warning: '#F59E0B',       // Amber
    info: '#3B82F6',          // Blue
    textPrimary: '#1F2937',   // Dark text
    textSecondary: '#6B7280', // Gray text
    border: '#E5E7EB',        // Light gray border
  },
  
  gradients: {
    primary: 'linear-gradient(to right, #3B82F6, #2563EB)',
    secondary: 'linear-gradient(to right, #F59E0B, #D97706)',
    dark: 'linear-gradient(to right, #1F2937, #111827)',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    default: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

export default theme;
