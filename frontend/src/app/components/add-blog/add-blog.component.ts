import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-add-blog',
  standalone: true, // ✅ Standalone component
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
  imports: [FormsModule] // ✅ Import FormsModule
})
export class AddBlogComponent {
  newPost = { title: '', author: '', content: '' };

  // ✅ Add this method
  submitPost() {
    console.log('New Post Submitted:', this.newPost);
    // You can add logic to save the post here
  }
}
