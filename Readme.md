# Course Management Backend

This is a generic template for a **Course Management System** built with Node.js, Express, MongoDB, and several middlewares. The backend handles user authentication, course creation, and application enrollments, along with various middleware to enhance security and performance.

## Features
- User registration and login (Authentication).
- Course creation and management.
- User enrollment in courses.
- Rate limiting and request monitoring for performance tracking.
- Error handling and response time monitoring.

## Tech Stack
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing course and user data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **JWT**: JSON Web Token for user authentication.
- **dotenv**: For environment variable management.
- **bcryptjs**: For password hashing.
- **Zod**: For data validation.

## Prerequisites
- Node.js (v16 or later)
- MongoDB
- npm (Node package manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rk4rohankumar/Course-Management.git
    ```

2. Install dependencies:
    ```bash
    cd course-management
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. Run the application:
    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication Routes
| Route          | Method | Description               |
|----------------|--------|---------------------------|
| `/api/v1/auth/register` | POST   | Registers a new user      |
| `/api/v1/auth/login`    | POST   | Logs in a user            |

### User & Course Routes
| Route                         | Method | Description                                       |
|--------------------------------|--------|---------------------------------------------------|
| `/api/v1/user`                 | GET    | Retrieves user data                               |
| `/api/v1/courses`              | GET    | Fetches all available courses                     |
| `/api/v1/course/:id`           | GET    | Fetches a course by ID                            |
| `/api/v1/createCourse`         | POST   | Creates a new course (requires authentication)    |
| `/api/v1/enroll/:id`           | POST   | Enrolls a user in a course (requires authentication) |
| `/api/v1/applications`         | GET    | Fetches all applications (requires authentication) |
| `/api/v1/application/:id`      | PUT    | Updates an application by ID (requires authentication) |
| `/api/v1/application/:id`      | GET    | Fetches an application by ID (requires authentication) |
| `/api/v1/userApplications`     | GET    | Fetches all user applications (requires authentication) |

## Middlewares

1. **requestCounter**: Tracks the number of requests made to the server.
2. **rateLimiter**: Limits users to 5 requests per second for security purposes.
3. **errorCounter**: Logs the number of errors encountered.
4. **responseTimeChecker**: Monitors response time for performance analysis.
5. **authMiddleware**: Protects routes that require authentication.

## Scripts
- **`npm run dev`**: Runs the application with `nodemon` for live reloading during development.
- **`npm test`**: Runs test cases with Jest.

## License
This project is licensed under the ISC License.

---