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

    html2canvas(content, {
      backgroundColor: '#f0f4f8', // Light background
      scale: 2, // Improve quality
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = (pdf as any).getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add a custom colored header
      pdf.setFillColor('#4a90e2'); // Blue header
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, 'F');

      // Add header text
      pdf.setTextColor('#ffffff');
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(this.selectedPost?.title || 'My PDF', 10, 13);

      // Add image content below header
      pdf.addImage(imgData, 'PNG', 0, 25, pdfWidth, pdfHeight);

      // Add footer
      pdf.setTextColor('#666666');
      pdf.setFontSize(10);
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.text(
        'Generated with ❤️ by ThinkHub @Copyright S&A Venture-2025',
        10,
        pageHeight - 10
      );

      // Save the file
      pdf.save(`${this.selectedPost?.title || 'download'}.pdf`);
    });
  }
}
