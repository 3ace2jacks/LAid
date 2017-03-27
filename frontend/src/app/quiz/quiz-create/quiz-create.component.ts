import { Component, OnInit } from '@angular/core';
import { Course, Lecture } from '../../course/models';
import { CourseService } from '../../course/course.service';
import { ActivatedRoute } from '@angular/router';
import { QuizCreate, QuizCreateQuestion, QuizCreateOption } from '../models';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {

  course: Course;
  lecture: Lecture;
  type: string;
  error: string;
  private sub: any;


  /*
  * Form data
  *
  */
  quizForm: FormGroup;
  

  constructor(private courseService: CourseService, private route: ActivatedRoute, private fb: FormBuilder, private quizService: QuizService) {
  }

  newOption(question_idx: number) {
    ((this.quizForm.get('questions') as FormArray).at(question_idx).get('options') as FormArray).push(this.fb.group({
        text: "",
        correct: false,
    }));
  }

  deleteOption(question_idx: number, option_idx: number) {
    ((this.quizForm.get('questions') as FormArray).at(question_idx).get('options') as FormArray).removeAt(option_idx);
  }

  newQuestion() {
    (this.quizForm.get('questions') as FormArray).push(this.fb.group({
          question: "",
          answer_description: "",
          options: this.fb.array([
            this.fb.group({
              text: "",
              correct: false,
            }),
            this.fb.group({
              text: "",
              correct: false,
            }),
          ])
        }))
  }

  deleteQuestion(idx:number) {
    (this.quizForm.get('questions') as FormArray).removeAt(idx);
  }

  createForm() {
    this.quizForm = this.fb.group({
      title: ['', Validators.required ],
      description: '',
      deadline: '',
      lectureID: this.lecture.id,
      lectureQuiz: this.type,

      questions: this.fb.array([

        this.fb.group({
          question: ["", Validators.required ],
          answer_description: "",
          options: this.fb.array([

            this.fb.group({
              text: ['', Validators.required ],
              correct: false,
            }),

            this.fb.group({
              text: ['', Validators.required ],
              correct: false,
            }),

          ])
        })
      ]),

    });
  }

  createQuiz() {
    this.quizService.createQuiz(this.quizForm.value)
    .then(() => {})
    .catch(error => this.error = error)
  }

  /*
  * Loads the quiz_type field from the url, and gets the course and lecture details.
  * Will run when the component is loaded. 
  */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.type = params['type'];
    })
    this.getCourse();
    this.getLecture();
  }

  /*
  * A function to determine if the current user should have acces to view this page.
  * The implementation on the front-end is cosmetical, and the real security is handeled by the backend
  * based on the access token.
  */
  hasAccess() {
    return this.course && this.course.role == "INSTRUCTOR";
  }

  /*
  * Get the course and load it to the course-field. Will get the course id from the url.
  */
  getCourse() {
      // Updates the current course if the url is changed
      this.sub = this.route.params.subscribe(params => {
          this.courseService.getCourse(+params['course_id'])
          .then(course => this.course=course)
          .catch(error => this.error=error);
      })
  }

  getLecture() {
    this.sub = this.route.params.subscribe(params => {
        this.courseService.getLecture(+params['lecture_id'])
        .then(lecture => {this.lecture=lecture; this.createForm();})
        .catch(error => this.error=error);
    })
  }
}
