import { Component } from '@angular/core';
import { Contact } from './contact';
import { ContactItemComponent } from "./contact-item/contact-item.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  template: `
    <button (click)="showAddContactForm()">Add Contact</button>
    <div *ngFor="let contact of contacts">
      <app-contact-item [contact]="contact"></app-contact-item>
    </div>
    <app-contact-form *ngIf="isAddingContact" (addContact)="addContact($event)" (cancel)="cancelAddContact()"></app-contact-form>
  `,
  imports: [ContactItemComponent, ContactFormComponent],
})
export class ContactListComponent {
  contacts: Contact[] = [];
  isAddingContact = false;

  showAddContactForm() {
    this.isAddingContact = true;
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.isAddingContact = false;
  }

  cancelAddContact() {
    this.isAddingContact = false;
  }
}