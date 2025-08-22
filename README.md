# WalmartPro

WalmartPro is an e-commerce platform where users can list and browse products. Built with Next.js and powered by a Node.js backend, it supports user authentication and product management.

[Live Demo](https://walmart-pro.vercel.app)  
[Backend Repository](https://github.com/Mysterio-O/walmart-pro-server)

## Features

### Product Highlights
- Showcases a curated selection of featured products on the homepage.
- Randomly selected or prioritized based on backend logic.

### Products (/products)
- Displays a catalog of all products listed by registered users.
- Includes a "View More" button to access detailed product information.

### Add Product (/dashboard/add-product)
- Allows authenticated users to list new products.
- Protected route: Requires user login to access.
- Form includes fields for product name, price, description, category, and stock quantity.

### Authentication
- Implemented using NextAuth.js.
- Supports login with email/password credentials or Google OAuth.

## Prerequisites
- Node.js (version 16.x or higher)
- npm or yarn
- A running instance of the backend server (see [Backend Repository](https://github.com/Mysterio-O/walmart-pro-server) for setup instructions)
- Environment variables configured in a `.env.local` file (see below)

 ## Installation

 ```bash
 git clone https://github.com/Mysterio-O/walmart-pro.git
 cd walmart-pro
 npm install
 npm run dev
 ```


 **Set up environment variables:**
  - Create a .env.local file in the root directory.
  - Add the necessary environment variables (e.g., NextAuth secrets, backend API URL). Example:
  ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   API_URL=http://localhost:5000
   ```

**Run the development server:**
 ```bash
 npm run dev
 ```

 **Set up the backend:**
  - Set up the backend: Follow the instructions in the [Backend Repository](https://github.com/Mysterio-O/walmart-pro-server) to set up and run the backend server.

  ## Usage
   - Visit /products to browse all listed products.
   - Log in via /login to access the /dashboard/add-product route and list new products.
   - View featured products on the homepage.

 ## Contributing
  Contributions are welcome! Please open an issue or submit a pull request with your changes.

  ## License


This project is licensed under the MIT License.