import { Injectable, OnChanges } from '@angular/core';
import { Quiz, Question, Option } from './models';
import { Headers, Http, Response} from '@angular/http';
import { AuthenticationService } from '../auth/_services';
import { Observable } from 'rxjs';
import { apiUrl } from '../local-settings';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

const OPTIONS: Option[] = [
    {text: "Yes", correct: true},
    {text: "No", correct: false},
];

const OPTIONS2: Option[] = [
    {text: "42", correct: true },
    {text: "Live, Love, Sleep", correct: false },
    {text: "Sex, drugs and Rock'n Roll", correct: true }
]

const QUESTIONS: Question[] = [
    {question: "What is the answer to the ultimate question, of life, the universe and everything?", answer_description: "This is obvious.", options: OPTIONS2},
    {question: "What is the airspeed velocity of an unladen swallow?", answer_description: "This is obvious.", options: OPTIONS},
    {question: "Is this a question?", answer_description: "This is obvious.", options: OPTIONS},
    {question: "Is this not a question?", answer_description: "This is obvious.", options: OPTIONS},
    {question: "Is this the real life?", answer_description: "This is obvious.", options: OPTIONS},
    {question: "Is this just fantasy?", answer_description: "This is obvious.", options: OPTIONS},
    {question: "Caught in a landslide?", answer_description: "This is obvious.", options: OPTIONS},
];


const QUIZ: Quiz = {
    title: "quiz2",
    description: "this is a quiz",
    start_time: "onsdag 1900",
    end_time: "torsdag 2000",
    questions: QUESTIONS,
};




@Injectable()
export class QuizService {

    private courseUrl = apiUrl + '/courses/';
    private headers:Headers;

    constructor(private http: Http, private authenticationService:AuthenticationService) {
        this.updateHeaders();
    }

    updateHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'JWT ' + this.authenticationService.getToken());
    }


    getQuiz(): Promise<Quiz> {
        return Promise.resolve(QUIZ)
        .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {

        return Promise.reject(error.message || error);
    }

}
