// src/pages/Home.jsx
import React from 'react';
import Layout from '../components/common/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import TestimonialSection from '../components/home/TestimonialSection';
import NewsletterSection from '../components/home/NewsletterSection';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Home;
