// contact-form.component.ts
import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    
    <div class="card mx-auto p-2" style="width: 90rem;">
    <div class="card-body">
    <h5 class="card-title">Add Contact</h5>
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="firstName" class="form-label">First Name:</label>
        <input type="text" class="form-control" id="firstName" formControlName="firstName" required>
      </div>
      <div>
        <label for="lastName" class="form-label">Last Name:</label>
        <input type="text" class="form-control" id="lastName" formControlName="lastName" required>
      </div>
      <div>
        <label for="phoneNumber" class="form-labe" >Phone Number:</label>
        <input type="tel" class="form-control"  id="phoneNumber" formControlName="phoneNumber" required>
      </div>
      <div>
        <label for="email" class="form-label" >Email:</label>
        <input type="email" class="form-control" id="email" formControlName="email">
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-primary m-1 " type="submit" [disabled]="contactForm.invalid">{{ isEdit ? 'Update' : 'Add' }}</button>
      <button class="btn btn-primary m-1 " type="button" (click)="cancel.emit()">Cancel</button>
      </div>
    </form>
  `,
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges {
  @Input() contactToEdit: Contact | null = null;
  @Output() addContact = new EventEmitter<Contact>();
  @Output() updateContact = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  contactForm: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactToEdit'] && changes['contactToEdit'].currentValue) {
      this.isEdit = true;
      this.populateForm(changes['contactToEdit'].currentValue);
    } else {
      this.isEdit = false;
      this.contactForm.reset();
      this.contactForm.patchValue({ id: '' }); // Ensure ID is clear for new adds
    }
  }

  populateForm(contact: Contact): void {
    this.contactForm.patchValue(contact);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.isEdit) {
        this.updateContact.emit(this.contactForm.value);
      } else {
        this.addContact.emit({ ...this.contactForm.value, id: Date.now() }); // Basic ID generation
      }
      this.contactForm.reset();
      this.isEdit = false;
      this.cancel.emit(); // Go back to the list after submission
    }
  }
}