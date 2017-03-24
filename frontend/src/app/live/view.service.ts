import { Injectable, OnChanges } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { AuthenticationService } from '../auth/_services';
import { Observable } from 'rxjs';
import { apiUrl } from '../local-settings';
import { ButtonCount } from './view.models';



@Injectable()
export class ViewService {

    private headers:Headers;


	constructor(private http: Http, 
        private authenticationService:AuthenticationService) {
        this.updateHeaders();
    }


    updateHeaders() {
        console.log("Token changed");
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'JWT ' + this.authenticationService.getToken());
    }

    evaluate(value: string, lectureID: number): Promise<void> {
        let Url = apiUrl + '/lecture/' + lectureID + '/flow/';
        return this.http.post(Url, JSON.stringify({flow: value}), { headers : this.headers })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);

    }

    getEvaluation(lectureID: number): Promise<void>{
        let Url = apiUrl + '/lecture/' + lectureID + '/flow/';
    	return this.http.get(Url + '.json', {headers : this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getEvaluationCount(lectureID: number, minutesAgo: number): Promise<ButtonCount>{
        let Url = apiUrl + '/lecture/' + lectureID + '/flow/count/' + minutesAgo; console.log(Url);
        return this.http.get(Url + '.json', {headers : this.headers})
        .toPromise()
        .then(response => response.json() as ButtonCount)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}