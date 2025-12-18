// student-manager.component.ts - COMPLETE VERSION
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent {
  // Basic Student Info
  studentName: string = 'John Doe';
  studentId: string = 'STU001';
  age: number = 20;
  email: string = 'john@example.com';
  isEnrolled: boolean = true;
  profileImage: string = 'https://via.placeholder.com/150';
  statusClass: string = 'enrolled';

  // Courses
  courses: string[] = ['Angular Basics', 'TypeScript', 'HTML/CSS'];
  newCourse: string = '';

  // Grades
  mathScore: number = 0;
  scienceScore: number = 0;
  englishScore: number = 0;
  totalScore: number = 0;
  percentage: number = 0;
  grade: string = '';

  // Enrollment Methods
  enrollStudent(): void {
    this.isEnrolled = true;
    this.statusClass = 'enrolled';
    console.log(`${this.studentName} has been enrolled!`);
  }

  unenrollStudent(): void {
    this.isEnrolled = false;
    this.statusClass = 'not-enrolled';
    console.log(`${this.studentName} has been unenrolled!`);
  }

  toggleEnrollment(): void {
    this.isEnrolled = !this.isEnrolled;
    this.statusClass = this.isEnrolled ? 'enrolled' : 'not-enrolled';
  }

  // Course Methods
  addCourse(): void {
    if (this.newCourse.trim() !== '') {
      this.courses.push(this.newCourse);
      this.newCourse = '';
    }
  }

  removeCourse(index: number): void {
    this.courses.splice(index, 1);
  }

  // Grade Calculation
  calculateGrades(): void {
    this.totalScore = this.mathScore + this.scienceScore + this.englishScore;
    this.percentage = (this.totalScore / 300) * 100;

    if (this.percentage >= 90) {
      this.grade = 'A';
    } else if (this.percentage >= 75) {
      this.grade = 'B';
    } else if (this.percentage >= 60) {
      this.grade = 'C';
    } else if (this.percentage >= 40) {
      this.grade = 'D';
    } else {
      this.grade = 'F';
    }
  }
}
