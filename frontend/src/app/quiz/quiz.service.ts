import { Injectable } from '@angular/core';
import { Quiz, Question, Option, OptionResults, QuestionResults, QuizResults, QuestionAnswer } from './models';
import { AuthHttpService } from '../auth/auth-http.service';

const optionResults2: OptionResults[] = [
  {
    optionID: 1,
    text: "The first option",
    correct: false,
    answers: 55,
  },
  {
    optionID: 2,
    text: "The lol option",
    correct: false,
    answers: 25,
  },
  {
    optionID: 2,
    text: "Caught in a landslide",
    correct: true,
    answers: 215,
  },
];

const questionResults: QuestionResults[] = [
  {
    questionID: 1,
    question: "Is this the real life?",
    optionResults: optionResults2,
  },
  {
    questionID: 2,
    question: "Is this just fantasy?",
    optionResults: optionResults2,
  },

];

const quizResults: QuizResults = {
  quizID: 1,
  title: "A quiz about life",
  questionResults: questionResults,
};


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
    return Promise.resolve(quizResults);
  }

  answerQuestion(answer: QuestionAnswer) : Promise<void> {
    return this.authHttp.post('/quiz/answer/question/', answer)
    .toPromise()
    .then(() => {})
    .catch(error => console.log(error.json()))
  }

}
