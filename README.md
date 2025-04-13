# Shoe E-Commerce Application

A full-stack e-commerce application for buying and selling shoes, featuring user authentication, product management, shopping cart functionality, and order processing.

![Shoe App Banner](https://placeholder-for-your-banner-image.jpg)

## 🚀 Features

### User Features
- **User Authentication**: Secure signup and login functionality
- **Product Browsing**: Browse through a catalog of shoes with filtering options
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Complete purchases with shipping and payment details
- **Order History**: View past orders and their status
- **User Profile**: Manage personal information and preferences

### Admin Features
- **Product Management**: Add, edit, and remove shoe listings
- **Inventory Management**: Track stock levels and update availability
- **Order Management**: Process orders and update order status
- **User Management**: View and manage user accounts

## 🛠️ Tech Stack

### Backend
- **Java Spring Boot**: RESTful API development
- **Spring Security**: Authentication and authorization
- **JPA/Hibernate**: Database ORM
- **MySQL**: Relational database
- **JWT**: Token-based authentication

### Frontend
- **React**: UI component library
- **Tailwind CSS**: Styling and responsive design
- **React Router**: Navigation and routing
- **Context API**: State management
- **Axios**: API requests

## 📋 Prerequisites

- Java 11 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher
- Maven

## 🔧 Installation & Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shoe-app.git
   cd shoe-app
   ```

2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/shoeapp
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build and run the Spring Boot application:
   ```bash
   cd shoe-app
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd shoe-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`

### Data Upload

The project includes a data upload utility to populate the database with initial shoe data:

1. Navigate to the data upload directory:
   ```bash
   cd shoe-data-upload
   ```

2. Follow the instructions in `upload_instructions.md` to upload sample shoe data and images

## 📱 Usage

### Customer Journey
1. Create an account or log in
2. Browse the shoe catalog
3. Filter shoes by category, price, or size
4. View detailed information about a specific shoe
5. Add shoes to your shopping cart
6. Proceed to checkout
7. Enter shipping and payment information
8. Complete your purchase
9. View order history and status

### Admin Journey
1. Log in with admin credentials
2. Access the admin dashboard
3. Manage shoe inventory (add, edit, delete)
4. Process and update orders
5. Manage user accounts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Your Name - [Fatiq Hussnain](mailto:fatiqhussnain1@gmail.com)

Project Link: [https://github.com/fatiq123/full-stack-shoe-app](https://github.com/fatiq123/full-stack-shoe-app)
