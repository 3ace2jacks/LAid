import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz, QuizAnswer, QuestionAnswer } from '../models';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.css']
})
export class QuizStudentComponent implements OnInit {

  quiz: Quiz;
  answer: QuizAnswer;
  valid: boolean;
  error: string;
  private sub: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this.sub = this.route.params.subscribe(params => {
      this.quizService.getQuiz(+params['id'])
        .then(quiz => {
          this.quiz = quiz;
          this.generateQuestionAnswers();
        })
        .catch(error => this.error = error);
    })
  }

  setChoice(questionID: number, choiceID: number) {
    this.answer.answers.forEach((answer, index) => {
      if (answer.question == questionID) {
        answer.choice = choiceID;
      }
    })
    this.validQuiz();
  }

  getChoice(questionID: number): number {
    let a = 0;
    this.answer.answers.forEach((answer) => {
      if (answer.question == questionID) {
        a = answer.choice;
      }
    })
    return a;
  }

  answerQuiz() {
    console.log(this.answer);
    this.answer.answers.forEach((answer, index) => {
      this.quizService.answerQuestion(answer as QuestionAnswer)
        .then(() => {
          this.router.navigate(["/courses"]);
        })
        .catch(error => this.error = error);
    })
  }

  validQuiz() {
    let valid = true;
    this.answer.answers.forEach((answer) => {
      if (!answer.choice) {
        valid = false;
      }
    })
    this.valid = valid;
  }

  generateQuestionAnswers() {
    this.answer = {
      quizID: this.quiz.id,
      answers: [],
    }
    this.quiz.questions.forEach((question) => {
      this.answer.answers.push({ question: question.id, choice: null });
    })
  }
}
