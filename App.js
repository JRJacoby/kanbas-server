import express from 'express';
import mongoose from "mongoose"
import "dotenv/config"
import session from "express-session"
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js"
import CourseRoutes from './Kanbas/Database/courses/routes.js';
import ModuleRoutes from './Kanbas/Database/modules/routes.js';
import UserRoutes from "./Kanbas/Database/users/routes.js";
import AssignmentRoutes from './Kanbas/Database/assignments/routes.js';
import QuizRoutes from './Kanbas/Database/quizzes/routes.js';
import cors from "cors"

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas"

mongoose.connect(CONNECTION_STRING)

const app = express()
app.use(cors({
	credentials: true,
	origin: process.env.FRONTEND_URL
}))

app.use((err, req, res, next) => {
  console.error('Error message:', err.message);
  console.error('Stack trace:', err.stack);
  res.status(500).send('Internal Server Error');
});

const sessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}

if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
		domain: process.env.HTTP_SERVER_DOMAIN
	}
}

app.use(session(sessionOptions))

app.use(express.json());

UserRoutes(app)
AssignmentRoutes(app)
ModuleRoutes(app)
CourseRoutes(app);
QuizRoutes(app);
Lab5(app);
Hello(app)

app.listen(process.env.PORT || 4000)
