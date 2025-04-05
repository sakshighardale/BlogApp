import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  _id?: string;
  title: string;
  author: string;
  content: string;
  date?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  // Add a blog (requires auth)
  addBlog(post: BlogPost): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('🔥 Token being sent:', token); // 👈 Add this line to debug

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, post, { headers });
  }

  // Get all blogs (public)
  getBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  // Get a blog by ID (public)
  getBlog(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  // Update a blog by ID (optional: protect it if needed)
  updateBlog(id: string, post: BlogPost): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/${id}`, post, { headers });
  }
}
