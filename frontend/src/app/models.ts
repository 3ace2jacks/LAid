export class Lecture {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
}

export class Course {
    id: number;
    code: string;
    name: string;
    year: number;
    term: string;

    constructor(id, code, name, year, term, lectures) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.year = year;
        this.term = term;
    }
}
