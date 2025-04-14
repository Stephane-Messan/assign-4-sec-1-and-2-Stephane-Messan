// contact-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [],
  template: `
    
    <div class="card mt-0 p-3 " style="width: 80rem;">
    <span class="fs-1">{{ contact.firstName }} {{ contact.lastName }}</span><br>
    <span class="border-bottom">{{ contact.phoneNumber }}</span>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" class="btn btn-primary ms-1  mt-3" (click)="edit.emit(contact)">Edit</button>
    <button type="button" class="btn btn-primary ms-1 mt-3" (click)="delete.emit(contact.id)">Delete</button>
    </div>
  `,
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<number>();
}