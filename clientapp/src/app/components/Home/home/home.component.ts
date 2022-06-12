import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { INote } from 'src/app/shared/models/inote';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { AlertComponent } from '../../common/alert/alert.component';
import { ModalComponent } from '../modal/modal.component';
import { NoteitemComponent } from '../noteitem/noteitem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  @ViewChild(NoteitemComponent) noteitemchild: any;
  @ViewChild(ModalComponent) modalChild: any;

  addnote!: FormGroup
  modalAction!: string

  
 
  

  constructor(public auth: AuthService, public noteService: NotesService, public alertService: AlertService) { }


  
  

  ngOnInit(): void {

    this.addnote = new FormGroup({
      title: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required])
    })
    
    this.noteService.allNotes = []
    if(this.auth.isLoggedIn()) {

      this.getallnotes()
    }
    
    

  }

  get f() {
    return this.addnote.controls;
  }


  getallnotes() {
    
    this.noteService.getnotes().subscribe({
      next: (res) => {
        this.noteService.allNotes = res as INote[]
      }
    })
    
  }

  noteEdit() {
    this.modalAction = "Update Note"
    this.modalChild.changeValue();
  }

  notedelete() {
    // this.modalChild.mod
    this.modalAction="Delete Note"
  }
 
  onSubmit() {
    
    this.noteService.addnote(this.addnote.value).subscribe({
      next: (res) => {
        
        this.noteService.getnotes().subscribe({
          next: (res) => {
            
            this.getallnotes()
            this.alertService.alertDismisal("success", "Note added successfully")
          }
        })

        


        
      },
      error: (err) => {
        this.alertService.alertDismisal("danger", err)
      }

    })

    this.addnote.reset()
    
  }

}
