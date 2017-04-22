import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizResults, QuestionResults } from '../models';
import { ActivatedRoute } from '@angular/router';

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
  public barChartLabels: string[] = ["This is the first option of the question for realz", "This is for realz the second option of this question"];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartColors = [{ backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"] }];
  public barChartData: any[] = [
    { data: [65, 59, 0] },
  ];


  quizResults: QuizResults;
  selected: QuestionResults;
  error: string;
  private sub: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuizResults();
  }

  getQuizResults() {
    this.sub = this.route.params.subscribe(params => {
      this.quizService.getQuizResults(+params['id'])
        .then(quizResults => {
          console.log(quizResults);
          this.quizResults = quizResults;
        })
        .catch(error => this.error = error);
    });
  }

  selectQuestion(question: QuestionResults) {
    this.selected = null;

    // Set a small timeout to give the template time to refresh the charts
    setTimeout(() => {
      this.selected = question;
      this.updateChartData();
    }, 1)

  }

  updateChartData() {
    if (this.selected) {
      let labels: string[] = [];
      let data: number[] = [];
      let colors: string[] = [];
      this.selected.optionResults.forEach((option) => {
        console.log(option);
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


