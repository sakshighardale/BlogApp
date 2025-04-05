import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // ✅ Import AppRoutingModule
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { FormsModule } from '@angular/forms';
// Import Components
import { HomeComponent } from './components/home/home.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogListComponent,
    AddBlogComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // ✅ This is necessary
    RouterModule, // ✅ Ensure RouterModule is here
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
