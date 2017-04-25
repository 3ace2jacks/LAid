import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/course.service';
import { Lecture } from '../../course/models';
import { LiveService } from '../live.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../models';
import { Observable } from 'rxjs/Rx';

/**
 * The component that should let the student answer questions and vote on speed.
 */
@Component({
  selector: 'app-live-student',
  templateUrl: './live-student.component.html',
  styleUrls: ['./live-student.component.css']
})
export class LiveStudentComponent implements OnInit {

  constructor(private liveService: LiveService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private formBuilder: FormBuilder) { }

  /**
   * Subscriber to listen to changes in url.
   */
  private sub: any;

  // The istance of the current lecture
  lecture: Lecture;

  // The array of questions that should be 
  questions: Question[];

  // Delay switches
  feedback: Boolean;
  questionAsked: Boolean;


  // The question form that stores the question.
  questionForm = new FormGroup({
    question: new FormControl()
  });

  // An error message 
  error: string = "";

  /**'
   * Automatically retrieve the lecture on initialization.
   */
  ngOnInit(): void {
    this.getLecture();
  }

  /**
   * Evaluate the lecture speed as too slow.
   */
  slow() {
    this.liveService.evaluate("slow", this.lecture.id)
      .then(() => { })
      .catch(error => this.error = "Something went wrong.");
    this.setFeedback();
  }

  /**
   * Evaluate the lecture speed as too fast.
   */
  fast() {
    this.liveService.evaluate("fast", this.lecture.id)
      .then(() => { })
      .catch(error => this.error = "Something went wrong.");
    this.setFeedback();
  }

  /**
   * Dealy for pressing the evaluation buttons, too fast and too slow.
   */
  setFeedback() {
    this.feedback = true;
    Observable.interval(60000).subscribe(x => {
      this.feedback = false;
    });
  }

  /**
   * Retrieve the lecture, and store it in hte lecture field.
   */
  getLecture() {
    this.sub = this.route.params.subscribe(params => {
      this.courseService.getLecture(+params['id'])
        .then(lecture => { this.lecture = lecture; this.getQuestions(); this.refresh() })
        .catch(error => {
        this.error = error;
          console.log(error)
        });
    })
  }

  /**
   * Create the question form.
   */
  createForm() {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
    });
  }

  /**
   * Submit a question. The question is retreived from the questionForm.
   */
  submitQuestion() {
    this.liveService.submitQuestion(this.questionForm.get("question").value, this.lecture.id);
    this.questionForm.setValue({
      question: "",
    })
    this.timeQuestion();
  }

  /**
   * Delay for the question submit button. Can only send a question once a minute.
   */
  timeQuestion() {
    this.questionAsked = true;
    Observable.interval(60000).subscribe(x => {
      this.questionAsked = false;
    });

  }

  /**
   * Retrieve an array of questions from the server, and store them in the questions field.
   */
  getQuestions() {
    this.liveService.getQuestions(this.lecture.id).then(questions => {
      this.questions = questions.sort(function (a, b) {
        if ((a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)) {
          return 1
        }
        return -1
      });
    })
      .catch(error => console.log(error));

  }

  /**
   * Refresh the question list every 2 seconds.
   */
  refresh() {
    Observable.interval(2000).subscribe(x => {
      if (this.lecture) {
        this.getQuestions();
      }
    });
  }

  /**
   * The current user upvotes the question
   * @param id - The id of the question to be voted on
   */
  upvote(id: number) {
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id == id) {
        this.questions[i].upvotes++;
        this.liveService.submitVote("up", id);
      }
    }
  }


  /**
   * The current user downvotes the question
   * @param id - The id of the question to be voted on
   */
  downvote(id: number) {
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id == id) {
        this.questions[i].downvotes++;
        this.liveService.submitVote("down", id);
      }
    }
  }


  /**
   * Flag the question locally as voted on by the current user.
   * @param q 
   */
  hasvoted(q: Question) {
    q.has_voted = true;
  }
}
