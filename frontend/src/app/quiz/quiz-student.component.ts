import { Component, HostListener } from '@angular/core';
import { Quiz, Question, Option } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';



import { QuizService } from './quiz.service';
@Component({
  selector: 'quiz-student',
  templateUrl: './quiz-student.component.html',
})
export class QuizStudentComponent implements OnInit {
  quiz:Quiz;
  error: string = "";

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
      this.getQuiz();
  }

  getQuiz(): void {
      this.quizService.getQuiz()
      .then(quiz => {
          this.quiz = quiz;
      })
      .catch(error => this.error=error);
  }
}
