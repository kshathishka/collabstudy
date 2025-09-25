import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text' | 'document';
  size: number;
  uploadDate: Date;
  uploadedBy: string;
  downloadUrl: string;
  description?: string;
  tags: string[];
  isUploading?: boolean;
  uploadProgress?: number;
}

@Component({
  selector: 'app-note-upload',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './note-upload.html',
  styleUrl: './note-upload.css'
})
export class NoteUpload implements OnInit {
  isDragOver = false;
  uploadedFiles: UploadedFile[] = [
    {
      id: '1',
      name: 'JavaScript ES6 Features.pdf',
      type: 'pdf',
      size: 2048000, // 2MB
      uploadDate: new Date(2025, 8, 24),
      uploadedBy: 'John Doe',
      downloadUrl: '#',
      description: 'Comprehensive guide to ES6 features including arrow functions, destructuring, and modules',
      tags: ['JavaScript', 'ES6', 'Programming']
    },
    {
      id: '2',
      name: 'React Hooks Cheatsheet.png',
      type: 'image',
      size: 512000, // 512KB
      uploadDate: new Date(2025, 8, 23),
      uploadedBy: 'Sarah Wilson',
      downloadUrl: '#',
      description: 'Visual reference for React Hooks usage patterns',
      tags: ['React', 'Hooks', 'Reference']
    },
    {
      id: '3',
      name: 'Database_Design_Notes.docx',
      type: 'document',
      size: 1024000, // 1MB
      uploadDate: new Date(2025, 8, 22),
      uploadedBy: 'Mike Johnson',
      downloadUrl: '#',
      description: 'Complete notes on database normalization and design principles',
      tags: ['Database', 'SQL', 'Design']
    },
    {
      id: '4',
      name: 'study_plan.txt',
      type: 'text',
      size: 8192, // 8KB
      uploadDate: new Date(2025, 8, 21),
      uploadedBy: 'Alex Chen',
      downloadUrl: '#',
      description: 'Weekly study schedule and goals',
      tags: ['Planning', 'Schedule']
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Initialize component
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  handleFiles(files: File[]) {
    files.forEach(file => {
      if (this.isValidFile(file)) {
        this.uploadFile(file);
      } else {
        this.snackBar.open(`File ${file.name} is not supported`, 'Close', { duration: 3000 });
      }
    });
  }

  isValidFile(file: File): boolean {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    return allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
  }

  uploadFile(file: File) {
    const fileId = Date.now().toString();
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      type: this.getFileType(file.type),
      size: file.size,
      uploadDate: new Date(),
      uploadedBy: 'You',
      downloadUrl: '#',
      description: '',
      tags: [],
      isUploading: true,
      uploadProgress: 0
    };

    this.uploadedFiles.unshift(newFile);

    // Simulate upload progress
    this.simulateUpload(fileId);
  }

  simulateUpload(fileId: string) {
    const fileIndex = this.uploadedFiles.findIndex(f => f.id === fileId);
    if (fileIndex === -1) return;

    const interval = setInterval(() => {
      const file = this.uploadedFiles[fileIndex];
      if (file.uploadProgress !== undefined) {
        file.uploadProgress += Math.random() * 20;
        if (file.uploadProgress >= 100) {
          file.uploadProgress = 100;
          file.isUploading = false;
          clearInterval(interval);
          this.snackBar.open(`${file.name} uploaded successfully!`, 'Close', { duration: 3000 });
        }
      }
    }, 300);
  }

  getFileType(mimeType: string): 'pdf' | 'image' | 'text' | 'document' {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('text')) return 'text';
    return 'document';
  }

  getFileIcon(type: string): string {
    switch (type) {
      case 'pdf': return 'picture_as_pdf';
      case 'image': return 'image';
      case 'text': return 'text_snippet';
      case 'document': return 'description';
      default: return 'insert_drive_file';
    }
  }

  getFileIconClass(type: string): string {
    return `file-icon-${type}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  downloadFile(file: UploadedFile) {
    this.snackBar.open(`Downloading ${file.name}...`, 'Close', { duration: 2000 });
    // Implement actual download logic here
  }

  deleteFile(file: UploadedFile) {
    const index = this.uploadedFiles.indexOf(file);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
      this.snackBar.open(`${file.name} deleted`, 'Undo', { duration: 3000 });
    }
  }

  trackFile(index: number, file: UploadedFile): string {
    return file.id;
  }
}
