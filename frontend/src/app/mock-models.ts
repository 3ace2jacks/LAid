import { Course, Lecture } from './models';


export const LECTURES: Lecture[] = [
    {id:1, title: "Some lecture", startTime: "1900", endTime: "2000"},
];

export const LECTURES_SE: Lecture[] = [
];


export const COURSES: Course[] = [
    new Course(1, "TDT4100", "Object-oriented programming", 2017, "Fall", LECTURES),
    new Course(2, "TDT4140", "Software Engineering", 2017, "Fall", LECTURES_SE),
    new Course(3, "TDT4145", "Data modelling and Database sytems", 2017, "Fall", LECTURES),
    new Course(4, "TDT4180", "Human-machine interaction", 2017, "Fall", LECTURES),

]
