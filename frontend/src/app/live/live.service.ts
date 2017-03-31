import { Injectable } from '@angular/core';
import { AuthHttpService } from '../auth/auth-http.service';
import { ButtonCount } from './models';

@Injectable()
export class LiveService {

  constructor(private authHttp: AuthHttpService) { }

  evaluate(value: string, lectureID: number): Promise<void> {
    return this.authHttp.post('/lectures/' + lectureID + '/flow/', JSON.stringify({ flow: value }))
      .toPromise()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  getEvaluation(lectureID: number): Promise<void> {
    return this.authHttp.get('/lectures/' + lectureID + '/flow/count/')
      .toPromise()
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  getEvaluationCount(lectureID: number, minutesAgo: number): Promise<ButtonCount> {
    return this.authHttp.get('/lectures/' + lectureID + '/flow/count/' + minutesAgo )
      .toPromise()
      .then(response => response.json() as ButtonCount)
      .catch(error => console.log(error));
  }
  submitQuestion(question: string, lectureID: number): Promise<void> {
    return this.authHttp.post('/lectures/' + lectureID + '/questions', JSON.stringify({ question: question }))
      .toPromise()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
}
