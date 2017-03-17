import { Injectable, OnChanges } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { AuthenticationService } from '../auth/_services';
import { Observable } from 'rxjs';
import { apiUrl } from '../local-settings';



@Injectable()
export class ViewService {

    private headers:Headers;
	private lectureID = 1;
	private Url = apiUrl + '/lecture/' + this.lectureID + '/flow/';

	constructor(private http: Http, private authenticationService:AuthenticationService) {
        this.updateHeaders();
    }

    updateHeaders() {
        console.log("Token changed");
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'JWT ' + this.authenticationService.getToken());
    }

    evaluate(value: string): Promise<void> {
        return this.http.post(this.Url, JSON.stringify({flow: value}), { headers : this.headers })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);

    }

    getEvaluation(): Promise<void>{
    	return this.http.get(this.Url + '.json', {headers : this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}