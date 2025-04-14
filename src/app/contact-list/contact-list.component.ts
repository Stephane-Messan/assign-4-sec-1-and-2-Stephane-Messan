// contact-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactItemComponent, NgFor],
  template: `
    <div *ngFor="let contact of contacts; trackBy: trackContact">
      <app-contact-item [contact]="contact" (edit)="editContact.emit(contact)" (delete)="deleteContact.emit(contact.id)"></app-contact-item>
    </div>
  `,
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<number>();

  trackContact(index: number, contact: Contact): number {
    return contact.id;
  }
}