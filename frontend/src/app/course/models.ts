
export class Lecture {
    id: number;
    course: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    pre_quiz: number;
    post_quiz: number;
}

export class Course {
    id: number;
    code: string;
    name: string;
    year: number;
    term: string;
    role: string; // The user's role in the course. Either null, staff or student
}
