import { Component, OnInit } from '@angular/core';
import { Course, Lecture } from '../../course/models';
import { CourseService } from '../../course/course.service';
import { ActivatedRoute } from '@angular/router';
import { QuizCreate, QuizCreateQuestion, QuizCreateOption } from '../models';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

/**
 * This is the component for the instructor to create a quiz for a lecture.
 */
@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {


  // The course the quiz is a part of.
  course: Course;

  // The lecture the quiz should be added to.
  lecture: Lecture;

  // Wheter the quiz is a pre- or post-quiz.
  type: string;
  error: string;

  /**
   * An observer that listens for changes in the URL.
   */
  private sub: any;


  /*
  * The form that holds the data for the quiz.
  */
  quizForm: FormGroup;

  /**
   * Inject the needed services.
   */
  constructor(private courseService: CourseService, private route: ActivatedRoute, private fb: FormBuilder, private quizService: QuizService, private router: Router) {
  }

  /**
   * Add a new blank option to the quizForm.
   * @param question_idx - The question id of the question.
   */
  newOption(question_idx: number) {
    ((this.quizForm.get('questions') as FormArray).at(question_idx).get('options') as FormArray).push(this.fb.group({
      text: "",
      correct: false,
    }));
  }

  /**
   * Delete an option from a question in the quizForm.
   * @param question_idx - The question the option is located at.
   * @param option_idx - The id of the option to be removed.
   */
  deleteOption(question_idx: number, option_idx: number) {
    ((this.quizForm.get('questions') as FormArray).at(question_idx).get('options') as FormArray).removeAt(option_idx);
  }

  /**
   * Add a new empty question to the question form. 
   */
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

  /**
   * Remove a question from the question form.
   * @param idx - The question index to be removed.
   */
  deleteQuestion(idx: number) {
    (this.quizForm.get('questions') as FormArray).removeAt(idx);
  }

  /**
   * Generate the form on the correct format, and add initial values.
   * The quizForm is on the same format as the QuizCreate model.
   */
  createForm() {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      deadline: '',
      lectureID: this.lecture.id,
      lectureQuiz: this.type,

      questions: this.fb.array([

        this.fb.group({
          question: ["", Validators.required],
          answer_description: "",
          options: this.fb.array([

            this.fb.group({
              text: ['', Validators.required],
              correct: false,
            }),

            this.fb.group({
              text: ['', Validators.required],
              correct: false,
            }),

          ])
        })
      ]),

    });
  }

  /**
   * Create the quiz in the backend.
   * 
   * Get the data from the quizForm, and send it to the quiz service.
   */
  createQuiz() {
    this.quizService.createQuiz(this.quizForm.value)
      .then(() => {
        this.router.navigate(["/course", this.course.id, "teacher"]);
      })
      .catch(error => this.error = error)
  }

  /**
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

  /**
  * A function to determine if the current user should have acces to view this page.
  * The implementation on the front-end is cosmetical, and the real security is handeled by the backend
  * based on the access token.
  */
  hasAccess() {
    return this.course && this.course.role == "INSTRUCTOR";
  }

  /**
  * Get the course and load it to the course-field. Will get the course id from the url.
  */
  getCourse() {
    // Updates the current course if the url is changed
    this.sub = this.route.params.subscribe(params => {
      this.courseService.getCourse(+params['course_id'])
        .then(course => this.course = course)
        .catch(error => this.error = error);
    })
  }

  /**
   * Get the lecture and load it to the lecture-field. Will get the lecture id from the url.
   */
  getLecture() {
    this.sub = this.route.params.subscribe(params => {
      this.courseService.getLecture(+params['lecture_id'])
        .then(lecture => { this.lecture = lecture; this.createForm(); })
        .catch(error => this.error = error);
    })
  }
}