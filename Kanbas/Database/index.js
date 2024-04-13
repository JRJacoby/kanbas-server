import courses from "./courses.js"
import modules from "./modules.js"
import assignments from "./assignments.js"
import enrollments from "./enrollments.js"
import users from "./users.js"
import grades from "./grades.js"

let db = {
    courses,
    modules,
    assignments,
    enrollments,
    users,
    grades
}

export default db;
export { courses, modules, assignments, enrollments, users, grades }
