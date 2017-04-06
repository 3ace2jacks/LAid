import { Injectable } from '@angular/core';
import { Quiz, Question, Option, OptionResults, QuestionResults, QuizResults, QuestionAnswer } from './models';
import { AuthHttpService } from '../auth/auth-http.service';


@Injectable()
export class QuizService {

  constructor(private authHttp: AuthHttpService) { }


  createQuiz(quizData): Promise<void> {
    return this.authHttp.post('/quiz/', quizData)
      .toPromise()
      .then(() => { })
      .catch(error => error.json())
  }

  getQuiz(id: number): Promise<Quiz> {
    return this.authHttp.get('/quiz/' + id + '/')
      .toPromise()
      .then(response => response.json() as Quiz)
      .catch(error => error.json())
  }

   getQuizResults(id: number): Promise<QuizResults> {
    return this.authHttp.get('/quiz/' + id + '/result')
    .toPromise()
    .then(response => response.json() as QuizResults)
    .catch(error => error);
  }

  answerQuestion(answer: QuestionAnswer) : Promise<void> {
    return this.authHttp.post('/quiz/answer/question/', answer)
    .toPromise()
    .then(() => {})
    .catch(error => console.log(error.json()))
  }
}
