import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: '', component: ContactFormComponent},
  { path: '**', redirectTo: '' }
];