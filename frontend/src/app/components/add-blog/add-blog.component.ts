import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddBlogComponent {
  newPost: BlogPost = { title: '', author: '', content: '' };
  message = '';

  constructor(private blogService: BlogService) {
    console.log('✅ AddBlogComponent loaded!');
  }

  submitPost() {
    this.blogService.addBlog(this.newPost).subscribe({
      next: (res) => {
        this.message = res.message;
        this.newPost = { title: '', author: '', content: '' }; // reset form
      },
      error: (err) => {
        console.error(err);
        this.message = 'Failed to submit blog.';
      },
    });
  }
}
