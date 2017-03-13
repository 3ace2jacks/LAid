import { Component, HostListener } from '@angular/core';
import { Quiz, Question, Option } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';



import { QuizService } from './quiz.service';
@Component({
  selector: 'quiz-create',
  templateUrl: './quiz-create.component.html',
})
export class QuizCreateComponent implements OnInit {
  quiz:Quiz = new Quiz();

  error: string = "";

  constructor(private quizService: QuizService, private router: Router) {}


  ngOnInit(): void {
  }

  create() : void {
      let d = new Date();
      console.log(d.getTime());
      this.quiz.title = "Something else";
      this.quiz.description = "Description";
      this.quiz.start_time = d.toISOString();
      this.quiz.end_time = "2017-03-06T12:33:34.468083Z";
      this.quiz.lectureID = 1;
      this.quiz.lectureQuiz = "pre_quiz";
      this.quiz.questions = [
          {question: "Is this the real life?", answer_description: "Quite certainly", options: [{text: "Option 1", correct: false}, {text: "Option 2", correct: true}] },
          {question: "Is this just fantasy?", answer_description: "Fantastically accurate", options: [{text: "Caught in a landslide", correct: true}, {text: "Reality", correct: false}] },
      ];

      this.quizService.createQuiz(this.quiz)
      .then()
      .catch(error => this.error = "Something went wrong.");
  }

  addQuestion() :void {
      console.log(this.quiz.questions);
      this.quiz.questions.push({question: "", answer_description: "", options: [{text: "", correct: false}] });
      console.log(this.quiz.questions);
  }

  removeQuestion(question:Question) : void {

      let index = this.quiz.questions.indexOf(question);
      if (index != -1) {
          this.quiz.questions.splice(index, 1);
      }

  }
}
