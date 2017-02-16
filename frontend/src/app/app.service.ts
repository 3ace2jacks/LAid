export class API_Table {
  name: string;
  kind: string;
  url: string;
}

constructor(private http: Http) {
  this.headers.append('Authorization', 'Basic ' + btoa(this.userName+":"+this.authToken));
}

getTables(): Promise<API_Table[]> {
  return this.http.get(this.baseUrl, {headers: this.headers})
    .toPromise()
    .then(response => response.json().value )
    .catch(this.handleError);
}

getTableData(tableName:string, columnList: string): Promise<Object[]> {
  return this.http.get(`${this.baseUrl}/${tableName}/?$select=${columnList}`, {headers: this.headers})
    .toPromise()
    .then(response => response = response.json().value )
    .catch(this.handleError);
}