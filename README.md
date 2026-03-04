# QuickHire API

Mini Job Board Application Backend built with Express.js, TypeScript, and Drizzle ORM (MySQL).

## Features
- Modular structure following tarsheed-api conventions.
- Job CRUD (Public & Admin).
- Application submission & management.
- Admin authentication with fixed credentials.
- Standardized API responses and error handling.
- Drizzle ORM for type-safe database operations.

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   DATABASE_URL=mysql://user:password@localhost:3306/quickhire
   JWT_SECRET=your_jwt_secret
   ```
4. **Run Migrations**
   ```bash
   npm run push
   ```
5. **Run the server**
   ```bash
   npm run dev
   ```

## Admin Credentials
- **Email**: admin@quickhire.com
- **Password**: admin123
