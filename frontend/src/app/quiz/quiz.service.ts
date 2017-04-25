import { Injectable } from '@angular/core';
import { Quiz, Question, Option, OptionResults, QuestionResults, QuizResults, QuizAnswer } from './models';
import { AuthHttpService } from '../auth/auth-http.service';


/**
 * This service will handle communication with the backend
 * regarding quizzes. 
 */
@Injectable()
export class QuizService {

    constructor(private authHttp: AuthHttpService) { }

    /**
     * Send a request to the server with the given quiz data. 
     * @param quizData - 
     */
    createQuiz(quizData): Promise<void> {
        return this.authHttp.post('/quiz/', quizData)
            .toPromise()
            .then(() => { })
            .catch(error => error.json())
    }

    /**
     * Get the quiz with the given id.
     * @param id - The id of the quiz.
     */
    getQuiz(id: number): Promise<Quiz> {
        return this.authHttp.get('/quiz/' + id + '/')
            .toPromise()
            .then(response => response.json() as Quiz)
            .catch(error => error.json())
    }


    /**
     * Retrieve the results from the quiz with the given id.
     * This includes how many have answered each option.
     * @param id - The quiz id.
     */
    getQuizResults(id: number): Promise<QuizResults> {
        return this.authHttp.get('/quiz/' + id + '/result/')
            .toPromise()
            .then(response => response.json() as QuizResults)
            .catch(error => error);
    }

    /**
     * Send the quiz answers to the server.
     * @param answer - A QuizAnswer object that contains what options was selected.
     */
    answerQuestion(answer: QuizAnswer): Promise<void> {
        return this.authHttp.post('/quiz/' + answer.quizID + '/answer/', answer)
            .toPromise()
            .then(() => { })
            .catch(error => console.log(error.json()))
    }
}
