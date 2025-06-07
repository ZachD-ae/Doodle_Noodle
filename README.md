# Doodle_Noodle

**Doodle Noodle** is an interactive daily drawing challenge app built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **GraphQL**. The app allows users to sign up, log in, participate in a daily drawing challenge, and view their artwork in a gallery.

## Features

- **User Authentication**: Users can sign up, log in, and authenticate using JWT tokens.
- **Daily Drawing Challenge**: Each day, users are given a prompt to create a drawing.
- **Canvas**: Users can draw on a canvas using various brush settings and submit their drawings.
- **Gallery**: Users can view their drawings as well as drawings from others in a gallery format.
- **Streak Tracker**: Displays the user's drawing streak for the day.

## Technologies Used

- **Frontend**:
  - **React**: Frontend framework for building interactive user interfaces.
  - **TypeScript**: Static type checking for the app.
  - **Tailwind CSS**: Utility-first CSS framework for fast and responsive design.
  - **Apollo Client**: State management for GraphQL data in the frontend.
  - **React Sketch Canvas**: Canvas component to draw with mouse or touch input.

- **Backend**:
  - **Node.js/Express**: Backend server to handle requests and responses.
  - **MongoDB**: NoSQL database for storing user data and drawings.
  - **GraphQL**: Query language for APIs and runtime for executing queries against your data.
  - **JWT**: JSON Web Tokens for user authentication.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **GraphQL** server setup for handling mutations and queries
- **npm** (Node package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/doodle-noodle.git
   cd doodle-noodle
   ```

2. **Install dependencies**:
   Install both frontend and backend dependencies.

   - **Frontend**:
     ```bash
     cd client
     npm install
     ```

   - **Backend**:
     ```bash
     cd server
     npm install
     ```

3. **Set up MongoDB**:
   Ensure your MongoDB database is running locally or use **MongoDB Atlas** for cloud hosting.

4. **Environment variables**:
   Create a `.env` file in the **server** folder and add the following variables:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

5. **Run the application**:
   - **Start the backend**:
     ```bash
     cd server
     npm run dev
     ```

   - **Start the frontend**:
     ```bash
     cd client
     npm run dev
     ```

6. Open your browser and navigate to `http://localhost:5173` to view the app.

## Usage

1. **Sign Up / Login**:
   - Users can create an account or log in with their email and password.
   - Authentication is handled using **JWT tokens**.

2. **Start Drawing**:
   - Once logged in, users can access the **Start Drawing Page**.
   - Users will receive a prompt, and after 30 seconds, whatever drawing is on the canvas will be submitted to the gallery page.

3. **Gallery**:
   - After submitting the drawing, users are taken to the **Gallery Page** where their drawing and others' drawings for the same prompt are displayed.
   - Users can download their drawing from the gallery page.

4. **Profile Page**:
   - The **Profile Page** displays all the drawings submitted by the user with a streak counter.

## Structure

- **client/**: React frontend code.
- **server/**: Node.js backend code, GraphQL API, authentication, and database connection.

### Client Folder

- **src/pages**: Contains all the React pages (LoginPage, GalleryPage, CanvasPage, etc.).
- **src/components**: Contains reusable React components such as Navbar, DrawingCanvas, etc.
- **src/utils**: Helper functions and GraphQL queries/mutations.

### Server Folder

- **src/models**: Mongoose models for database schemas (User, Drawing).
- **src/schemas**: GraphQL schema definitions and resolvers.
- **src/controllers**: Backend logic for handling requests (authentication, drawing submission).
- **src/utils**: Utility functions (JWT handling, password hashing).

## Future Enhancements

- Add support for multiple drawings in the gallery.
- Implement daily prompt tracking and reminders.
- Add social media sharing options for artwork.
- Implement mobile responsiveness and performance optimization.

## Contributing

Feel free to fork the repository and submit pull requests with improvements. Please ensure your code follows the existing style and includes tests for any new functionality.

## License

This project is licensed under the MIT License.
