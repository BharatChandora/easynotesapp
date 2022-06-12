import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { INote } from 'src/app/shared/models/inote';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  updatenote!: FormGroup;
  @Input() action!: string;

  @Output() noteUpdatedEvent = new EventEmitter()
  @Output() noteDeletedEvent = new EventEmitter()

  modal = {
    title: this.action
  }

  constructor(public notesService: NotesService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.updatenote = new FormGroup( {
      _id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required])

    })

  }  

  get f() {
    return this.updatenote.controls;
  }

  changeValue() {
    this.updatenote.patchValue(this.notesService.selectedNote);
  }

  onDelete() {
    // console.log("delete");
    this.notesService.deletenote().subscribe({
      next: (res) => {
        this.alertService.alertDismisal("success", "Note delete successfully");
        this.noteDeletedEvent.emit();

      },
      error: (err) => {
        this.alertService.alertDismisal("Danger", err)
      }
    })
  }

  onSubmit(){
    
    
    this.notesService.selectedNote = this.updatenote.value;

    this.notesService.updatenote().subscribe({
      next: (res) => {
        this.alertService.alertDismisal("success", "Note updated successfully");
        this.noteUpdatedEvent.emit();
      },
      error: (err) => {
        this.alertService.alertDismisal("danger", err)
      }
    })

    
  }


}

