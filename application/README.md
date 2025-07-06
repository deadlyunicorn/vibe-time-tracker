# Time Tracker

A modern time tracking web application built with Next.js, TypeScript, and MongoDB. This project helps you log, view, and manage your time entries efficiently. Scaffolded with https://v0.dev. The goal of this project is a time tracker app you can self-host and access even offline. 

## Features
- Start/stop timers for tasks
- View and manage time entries
- Project-based organization
- Responsive and modern UI

## Tech Stack
- [v0](https://v0.dev)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/) (via PostCSS)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud) (I recommend MongoDB Atlas with Free tier to get up and running)

### Installation
1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variable:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     ```
   - Replace `your_mongodb_connection_string` with your actual MongoDB URI.

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `app/` - Main Next.js app directory (routes, components, API endpoints)
- `components/` - Shared UI components
- `lib/` - Utility functions, database, hooks, and services
- `public/` - Static assets

## Environment Variables
- `MONGODB_URI` - MongoDB connection string (required)

## Scripts
- `dev` - Start the development server
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint

## Linting & Formatting
- ESLint is configured for code quality. Run `npm run lint` to check for issues.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://opensource.org/license/mit)