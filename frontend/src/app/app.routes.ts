import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home
  { path: 'blogs', component: BlogListComponent },
  { path: 'add-blog', component: AddBlogComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect invalid routes
];
