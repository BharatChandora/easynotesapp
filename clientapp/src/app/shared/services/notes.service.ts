import { Injectable } from '@angular/core';
import { INote } from '../models/inote';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  

  selectedNote = {
    _id: "",
    title: "",
    note: "",
    
  };
  
  httpOptions: Object | undefined

  


  constructor(private httpClient: HttpClient, private authClient: AuthService) { }

  allNotes: INote[]|any;

  getHeaders() {
    

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:4200',
        'token': this.authClient.getToken()
      })
    };

    // return this.httpOptions

  }
  
  getnotes(): Observable<INote[]> {

    this.getHeaders()
   
    const url = `${environment.ApiBaseUrl}/note/`;

    return this.httpClient.get<INote[]>(url, this.httpOptions).pipe(catchError(this.handleError))

    
  }

  addnote(note: INote) {
    
    const url = `${environment.ApiBaseUrl}/note/addnote`;
   

    return this.httpClient.post<INote>(url, note, this.httpOptions).pipe(catchError(this.handleError))

  }

  updatenote() {
    
    const url = `${environment.ApiBaseUrl}/note/updatenote/${this.selectedNote._id}`;

    const note = {
      title: this.selectedNote.title,
      note: this.selectedNote.note
    }

    return this.httpClient.put(url, note, this.httpOptions).pipe(catchError(this.handleError))

  }

  deletenote() {
    
    const url = `${environment.ApiBaseUrl}/note/deletenote/${this.selectedNote._id}`;

    return this.httpClient.delete(url, this.httpOptions).pipe(catchError(this.handleError))
  }
  

  searchnotes(query:string): Observable<INote[]> {

    
    const url = `${environment.ApiBaseUrl}/note/searchnotes?q=${query}`;

    return this.httpClient.get<INote[]>(url, this.httpOptions).pipe(catchError(this.handleError))

    
  }
  


  handleError(err: any) {
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      
      errorMsg = err.error.message;
    } else {
      
      errorMsg = err.error.error
         
    }

    return throwError(()=>{

      return errorMsg;

    })
  

  }

}

