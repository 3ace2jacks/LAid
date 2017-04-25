import { Injectable } from '@angular/core';
import { AuthHttpService } from '../auth/auth-http.service';
import { ButtonCount } from './models';
import { Question } from './models';

@Injectable()
export class LiveService {

  /**
   * Inject the required services.
   */
  constructor(private authHttp: AuthHttpService) { }

  /**
   * Evaluate the lecture speed. Submits a vote to too fast, or too slow.
   * @param value - "slow" or "fast"
   * @param lectureID - The lecture id to submit evaluation to.
   */
  evaluate(value: string, lectureID: number): Promise<void> {
    return this.authHttp.post('/lectures/' + lectureID + '/flow/', JSON.stringify({ flow: value }))
      .toPromise()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  /**
   * Get the count of votes from the last minutes, of type "too fast" or "too slow".
   * @param lectureID - The lecture to get the votes from
   * @param minutesAgo - The interval for votes. Show the number of votes in the last minutesAgo minutes.
   */
  getEvaluationCount(lectureID: number, minutesAgo: number): Promise<ButtonCount> {
    return this.authHttp.get('/lectures/' + lectureID + '/flow/count/' + minutesAgo )
      .toPromise()
      .then(response => response.json() as ButtonCount)
      .catch(error => console.log(error));
  }
  
  /**
   * Submit a live question to a lecture.
   * @param question - A string that is the question.
   * @param lectureID - The ID of the lecture where the question should be added.
   */
  submitQuestion(question: string, lectureID: number): Promise<void> {
    console.log(question, lectureID)
    return this.authHttp.post('/lectures/' + lectureID + '/questions/', JSON.stringify({ question: question }))
      .toPromise()
      .catch(error => console.log(error));
  }

  /**
   * Retrieve an array of all the live questions in the given lecture.
   * @param lectureID - The id of the lecture.
   */
  getQuestions(lectureID: number): Promise<Question[]> {
    return this.authHttp.get('/lectures/' + lectureID + '/questions/')
    .toPromise()
    .then(response => response.json() as Question[])
    .catch(error => console.log(error));
  }

  /**
   * Submit a vote to a live question.
   * @param vote - either "up" or "down" 
   * @param id - The id of the question to be upvoted.
   */
  submitVote(vote: string, id: number): Promise<void>{
    return this.authHttp.post('/questions/' + id + '/votes/', JSON.stringify({ vote: vote}))
    .toPromise()
    .catch(error => console.log(error));
  }

  /**
   * Flag a live question as answered.
   * @param id - The question of the live id.
   */
  answered(id: number): Promise<void>{
    return this.authHttp.post('/questions/' + id + '/answer/', {})
    .toPromise()
    .catch(error => console.log(error));
  }
}
