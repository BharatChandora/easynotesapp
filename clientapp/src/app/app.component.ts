import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
// import { HomeComponent } from './components/Home/home/home.component';
import { INote } from './shared/models/inote';
import { AlertService } from './shared/services/alert.service';
import { AuthService } from './shared/services/auth.service';
import { NotesService } from './shared/services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'EasyNotes';
  searchForm!:FormGroup;

  @ViewChild(RouterOutlet) outlet: any;
  

  constructor(public auth: AuthService, private router: Router, public alertService: AlertService, public notesService: NotesService) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {  
    
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
    
  }


  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
    
  }

  resetView() {
    
    // console.log(this.componentExists())
    if(this.componentExists()) {

      this.outlet.component.getallnotes()
    }
    
  }

  private componentExists(): boolean {
    return this.outlet.activated !== null && this.outlet.component !== null;
  }

  
  

  onSubmit(form?: any) {
    
    
    let query = form.value['search']

    this.notesService.searchnotes(query).subscribe({
      next: (res) => {
        this.notesService.allNotes = res as INote[]
      },
      error: (err) => {
        this.alertService.alertDismisal("danger", "something went wrong")
      }
    })

    // this.searchForm.reset()
  }

}
