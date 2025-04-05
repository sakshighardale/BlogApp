import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost } from '../../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  imports: [CommonModule],
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  showModal = false;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogPosts = data;
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }
  openBlog(post: BlogPost) {
    this.selectedPost = post;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPost = null;
  }

  downloadPDF() {
    const content = document.getElementById('pdfContent');
    if (!content) return;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = (pdf as any).getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${this.selectedPost?.title}.pdf`);
    });
  }
}
