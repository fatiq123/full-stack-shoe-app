// src/components/home/TestimonialSection.jsx
import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "These are the most comfortable running shoes I've ever owned. The support is amazing and they look great too!",
      author: "Sarah Johnson",
      role: "Marathon Runner",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      content: "I've been buying shoes from this store for years. The quality is always top-notch and the customer service is excellent.",
      author: "Michael Chen",
      role: "Fitness Instructor",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 3,
      content: "The casual shoes I bought are perfect for everyday wear. They're stylish, durable, and worth every penny.",
      author: "Emily Rodriguez",
      role: "Fashion Blogger",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-500">Don't just take our word for it - hear from our satisfied customers</p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <div className="relative">
                  <FaQuoteLeft className="absolute top-0 left-0 text-blue-100 text-4xl" />
                  <p className="text-gray-600 italic pl-8 pt-2">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
