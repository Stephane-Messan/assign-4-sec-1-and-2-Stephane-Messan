import { Component } from '@angular/core';
import { Contact } from './contact';
import { ContactListComponent } from './contact-list/contact-list.component'; // Corrected import path
import { ContactFormComponent } from './contact-form/contact-form.component'; // Corrected import path
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactListComponent, ContactFormComponent, NgIf, NgClass],
  template: `
    <h1 class="ms-5">Contact Manager</h1>
    <div>
      <button class="btn btn-success  ms-5" (click)="showContactList = true; showAddForm = false;" [ngClass]="{'active': showContactList}">List Contact</button>
      <button class="btn btn-success ms-5" (click)="showAddForm = true; showContactList = false; editingContact = null;" [ngClass]="{'active': showAddForm}">Add Contact</button>
    </div>

    <app-contact-list
      *ngIf="showContactList"
      [contacts]="contacts"
      (editContact)="startEdit($event)"
      (deleteContact)="deleteContact($event)"
    ></app-contact-list>

    <app-contact-form
      *ngIf="showAddForm"
      (addContact)="addContact($event)"
      (updateContact)="updateContact($event)"
      (cancel)="showAddForm = false"
      [contactToEdit]="editingContact"
    ></app-contact-form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contacts: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Adams', phoneNumber: '701-000-1000', emailAddress: '' },
    { id: 2, firstName: 'Mary', lastName: 'Jane', phoneNumber: '701-000-1000', emailAddress: '' },
  ];
  showContactList = true;
  showAddForm = false;
  editingContact: Contact | null = null;

  addContact(newContact: Contact): void {
    this.contacts = [...this.contacts, newContact];
    this.showContactList = true;
    this.showAddForm = false;
  }

  startEdit(contactToEdit: Contact): void {
    this.editingContact = { ...contactToEdit };
    this.showAddForm = true;
    this.showContactList = false;
  }

  updateContact(updatedContact: Contact): void {
    this.contacts = this.contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.showContactList = true;
    this.showAddForm = false;
    this.editingContact = null;
  }

  deleteContact(contactId: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== contactId);
  }
}