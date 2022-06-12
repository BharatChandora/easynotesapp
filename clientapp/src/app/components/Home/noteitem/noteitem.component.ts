import { Component, Input, OnInit, Output, ViewChild, ViewChildren, EventEmitter  } from '@angular/core';
import { INote } from 'src/app/shared/models/inote';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NotesService } from 'src/app/shared/services/notes.service';

import { ModalComponent} from '../modal/modal.component';


@Component({
  selector: 'app-noteitem',
  templateUrl: './noteitem.component.html',
  styleUrls: ['./noteitem.component.css']
})
export class NoteitemComponent implements OnInit {
  action!:string;

  @Input() note!: INote; 
  // @ViewChildren(ModalComponent) modalchild: any;
  @Output() noteEditEvent = new EventEmitter();
  @Output() noteDeleteEvent = new EventEmitter();
 

  constructor(public noteService: NotesService, public alertService: AlertService) { }

  ngOnInit() {
    // console.log(this.note.created_at.toISOString().split( "T" ))
  }

  edit(note:any) {
    
    this.noteService.selectedNote = this.note;
    this.noteEditEvent.emit();
    
  }

  onDelete(note: any) {
    
    this.noteService.selectedNote = this.note
    this.noteDeleteEvent.emit();
  }

}

