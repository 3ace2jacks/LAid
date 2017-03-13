export class Lecture {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    pre_quiz: number;
    post_quiz: number;
}

export class Course {
    id: number;
    staff:boolean;
    code: string;
    name: string;
    year: number;
    term: string;
}
