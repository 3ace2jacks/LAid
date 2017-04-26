import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz, QuizAnswer, QuestionAnswer } from '../models';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/**
 * The component that lets the student answer a quiz, and view the correct answer. 
 */
@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.css']
})
export class QuizStudentComponent implements OnInit {

  // The current quiz instance.
  quiz: Quiz;

  // The user's choice for each question on the quiz.
  answer: QuizAnswer;

  // True if the answer is valid, one answer per question.
  valid: boolean;
  error: string;
  private sub: any;

  // Inject the needed services.
  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Automatically get the quiz.
   * Get called on initialization.
   */
  ngOnInit() {
    this.getQuiz();
  }

  /**
   * Retrieve the quiz from the backend. The id is retreieved from the URL.
   */
  getQuiz() {
    this.sub = this.route.params.subscribe(params => {
      this.quizService.getQuiz(+params['id'])
        .then(quiz => {
          this.quiz = quiz;
          this.generateQuestionAnswers();
        })
        .catch(error => this.error = error);
    });
  }

  /**
   * Set the answer choice to the choice with choiceID on the
   * question with questionID
   * @param questionID - The id of the question
   * @param choiceID - The id of the choice the student selects
   */
  setChoice(questionID: number, choiceID: number) {
    this.answer.answers.forEach((answer, index) => {
      if (answer.question == questionID) {
        answer.choice = choiceID;
      }
    });
    this.validQuiz();
  }

  /**
   * Get the answer choice of the question with the given ID.
   * @param questionID 
   */
  getChoice(questionID: number): number {
    let a = 0;
    this.answer.answers.forEach((answer) => {
      if (answer.question == questionID) {
        a = answer.choice;
      }
    });
    return a;
  }

  /**
   * Use the quizService to send the answer to the backend.
   */
  answerQuiz() {
    console.log(this.answer);
    this.quizService.answerQuestion(this.answer as QuizAnswer)
      .then(() => {
        location.reload();
      })
      .catch(error => this.error = error);
  }

  /**
   * Update the valid flag. If every question has an answer, the quiz is valid.
   */
  validQuiz() {
    let valid = true;
    this.answer.answers.forEach((answer) => {
      if (!answer.choice) {
        valid = false;
      }
    });
    this.valid = valid;
  }

  /**
   * Generate the QuestionAnswer instance with the correct number of questions,
   * and the question ids. 
   */
  generateQuestionAnswers() {
    this.answer = {
      quizID: this.quiz.id,
      answers: [],
    };
    this.quiz.questions.forEach((question) => {
      this.answer.answers.push({ question: question.id, choice: null });
    });
  }
}
