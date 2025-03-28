import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-blog-list',
  standalone: true, // ✅ Standalone component
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  imports: [CommonModule] // ✅ Import CommonModule
})
export class BlogListComponent {
  blogPosts = [
    { title: 'Post 1', author: 'Author 1', content: 'Content 1', date: 'March 29, 2025' },
    { title: 'Post 2', author: 'Author 2', content: 'Content 2', date: 'March 28, 2025' },
  ];
}
