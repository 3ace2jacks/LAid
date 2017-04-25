import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizResults, QuestionResults } from '../models';
import { ActivatedRoute } from '@angular/router';

/**
 * This component displays the results for the quiz. That is a chart of the
 * number of answers for each option in each question.
 */
@Component({
  selector: 'app-quiz-teacher',
  templateUrl: './quiz-teacher.component.html',
  styleUrls: ['./quiz-teacher.component.css']
})
export class QuizTeacherComponent implements OnInit {



  // Configuration of the Question result charts
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartColors = [{ backgroundColor: [] }];
  public barChartData: any[] = [
    { data: [] },
  ];

  // The results for every option in the quiz.
  quizResults: QuizResults;
  
  // The currently selected question. Will show graph for this question.
  selected: QuestionResults;
  error: string;

  /**
   * A subscriber for listening to URL changes.
   */
  private sub: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  /**
   * Called on initialization.
   */
  ngOnInit() {
    this.getQuizResults();
  }

  /**
   * Retrieve the quiz results. The URL is retrieved from the URL.
   * This includes the number of votes for each option.
   */
  getQuizResults() {
    this.sub = this.route.params.subscribe(params => {
      this.quizService.getQuizResults(+params['id'])
        .then(quizResults => {
          this.quizResults = quizResults;
        })
        .catch(error => this.error = error);
    });
  }

  /**
   * Selects a new question, and updates the chart with the number of answers.
   * @param question - The question to show results for.
   */
  selectQuestion(question: QuestionResults) {
    this.selected = null;

    // Set a small timeout to give the template time to refresh the charts
    setTimeout(() => {
      this.selected = question;
      this.updateChartData();
    }, 1)

  }

  /**
   * Update the chart with the currently selected question.
   */
  updateChartData() {
    if (this.selected) {
      let labels: string[] = [];
      let data: number[] = [];
      let colors: string[] = [];
      this.selected.optionResults.forEach((option) => {
        labels.push(option.text);
        data.push(option.answers);
        if (option.correct) {
          colors.push("#3ebf9b")
        } else {
          colors.push("#e84351");
        }
      });

      // Seems to be a bug with the chart module that does not include the last datapoint, add an extra.
      data.push(0);


      this.barChartLabels = labels;
      this.barChartData = [
        { data: data },
      ];
      this.barChartColors = [
        { backgroundColor: colors }
      ];
    }
  }
}


