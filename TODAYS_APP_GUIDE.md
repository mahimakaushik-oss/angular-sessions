# Today's Application: Student Profile Manager

## Overview
Build a **Student Profile Manager** that allows users to:
- Enter student information
- Display student details
- Calculate grades
- Toggle enrollment status
- Add/remove courses

This app demonstrates ALL concepts from today's class!

---

## **Step-by-Step Building Process**

### **Step 1: Create the Component (5 mins)**

```bash
ng g c student-manager --skip-tests
```

Add the component selector to `app.component.html`:

```html
<!-- app.component.html -->
<div class="container">
  <h1>🎓 Student Profile Manager</h1>
  <app-student-manager></app-student-manager>
</div>
```

---

### **Step 2: Basic Properties & Interpolation (10 mins)**

**Goal:** Display static student information

```typescript
// student-manager.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent {
  // Student Properties
  studentName: string = 'John Doe';
  studentId: string = 'STU001';
  age: number = 20;
  email: string = 'john@example.com';
  isEnrolled: boolean = true;
}
```

```html
<!-- student-manager.component.html -->
<div class="profile-card">
  <h2>Student Profile</h2>

  <div class="info-row">
    <strong>Name:</strong> {{ studentName }}
  </div>

  <div class="info-row">
    <strong>ID:</strong> {{ studentId }}
  </div>

  <div class="info-row">
    <strong>Age:</strong> {{ age }} years old
  </div>

  <div class="info-row">
    <strong>Email:</strong> {{ email }}
  </div>

  <div class="info-row">
    <strong>Status:</strong> {{ isEnrolled ? 'Enrolled' : 'Not Enrolled' }}
  </div>
</div>
```

**✅ Concepts Covered:** Component properties, Interpolation, Ternary operator

---

### **Step 3: Property Binding & Styling (10 mins)**

**Goal:** Add dynamic images and styling based on enrollment status

```typescript
// Add to component class
export class StudentManagerComponent {
  // ... existing properties

  profileImage: string = 'https://via.placeholder.com/150';
  statusClass: string = 'enrolled';  // or 'not-enrolled'
}
```

```html
<!-- Add to template -->
<div class="profile-card">
  <div class="profile-header">
    <img [src]="profileImage" [alt]="studentName" class="profile-img">
    <span [class]="statusClass" class="status-badge">
      {{ isEnrolled ? '✓ Enrolled' : '✗ Not Enrolled' }}
    </span>
  </div>

  <!-- ... rest of the info rows -->
</div>
```

**✅ Concepts Covered:** Property Binding `[src]`, `[alt]`, `[class]`

---

### **Step 4: Event Binding & Methods (15 mins)**

**Goal:** Add buttons to change enrollment status

```typescript
// Add to component class
export class StudentManagerComponent {
  // ... existing properties

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
}
```

```html
<!-- Add buttons section -->
<div class="actions">
  <button (click)="enrollStudent()" [disabled]="isEnrolled">
    Enroll Student
  </button>

  <button (click)="unenrollStudent()" [disabled]="!isEnrolled">
    Unenroll Student
  </button>

  <button (click)="toggleEnrollment()">
    Toggle Status
  </button>
</div>
```

**✅ Concepts Covered:** Event Binding `(click)`, Methods, Property Binding `[disabled]`

---

### **Step 5: Two-Way Binding with Forms (20 mins)**

**Goal:** Allow editing student information

**First, add FormsModule:**

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Add form to component:**

```html
<!-- Add before profile-card -->
<div class="edit-form">
  <h3>Edit Student Information</h3>

  <div class="form-group">
    <label>Name:</label>
    <input [(ngModel)]="studentName" type="text" placeholder="Enter name">
  </div>

  <div class="form-group">
    <label>Student ID:</label>
    <input [(ngModel)]="studentId" type="text" placeholder="Enter ID">
  </div>

  <div class="form-group">
    <label>Age:</label>
    <input [(ngModel)]="age" type="number" placeholder="Enter age">
  </div>

  <div class="form-group">
    <label>Email:</label>
    <input [(ngModel)]="email" type="email" placeholder="Enter email">
  </div>

  <div class="form-group">
    <label>Profile Image URL:</label>
    <input [(ngModel)]="profileImage" type="text" placeholder="Enter image URL">
  </div>
</div>
```

**✅ Concepts Covered:** Two-way binding `[(ngModel)]`, FormsModule

---

### **Step 6: Working with Arrays & Grade Calculation (20 mins)**

**Goal:** Add courses and calculate grades

```typescript
// Add to component class
export class StudentManagerComponent {
  // ... existing properties

  // Course Management
  courses: string[] = ['Angular Basics', 'TypeScript', 'HTML/CSS'];
  newCourse: string = '';

  // Grade Management
  mathScore: number = 0;
  scienceScore: number = 0;
  englishScore: number = 0;
  totalScore: number = 0;
  percentage: number = 0;
  grade: string = '';

  addCourse(): void {
    if (this.newCourse.trim() !== '') {
      this.courses.push(this.newCourse);
      this.newCourse = '';  // Clear input
    }
  }

  removeCourse(index: number): void {
    this.courses.splice(index, 1);
  }

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
```

```html
<!-- Add courses section -->
<div class="courses-section">
  <h3>Enrolled Courses</h3>

  <div class="course-input">
    <input
      [(ngModel)]="newCourse"
      type="text"
      placeholder="Enter course name"
      (keyup.enter)="addCourse()">
    <button (click)="addCourse()">Add Course</button>
  </div>

  <ul class="course-list">
    <li *ngFor="let course of courses; let i = index">
      {{ i + 1 }}. {{ course }}
      <button (click)="removeCourse(i)" class="delete-btn">Delete</button>
    </li>
  </ul>

  <p><strong>Total Courses:</strong> {{ courses.length }}</p>
</div>

<!-- Add grades section -->
<div class="grades-section">
  <h3>Grade Calculator</h3>

  <div class="grade-inputs">
    <div class="form-group">
      <label>Math (out of 100):</label>
      <input [(ngModel)]="mathScore" type="number" min="0" max="100">
    </div>

    <div class="form-group">
      <label>Science (out of 100):</label>
      <input [(ngModel)]="scienceScore" type="number" min="0" max="100">
    </div>

    <div class="form-group">
      <label>English (out of 100):</label>
      <input [(ngModel)]="englishScore" type="number" min="0" max="100">
    </div>
  </div>

  <button (click)="calculateGrades()" class="calculate-btn">
    Calculate Grade
  </button>

  <div class="results" *ngIf="totalScore > 0">
    <p><strong>Total Score:</strong> {{ totalScore }} / 300</p>
    <p><strong>Percentage:</strong> {{ percentage.toFixed(2) }}%</p>
    <p><strong>Grade:</strong> <span [class]="'grade-' + grade">{{ grade }}</span></p>
    <p><strong>Status:</strong> {{ percentage >= 40 ? 'PASS ✓' : 'FAIL ✗' }}</p>
  </div>
</div>
```

**✅ Concepts Covered:** Arrays, `*ngFor`, Array methods (push, splice), Methods with calculations

---

### **Step 7: Complete Styling (10 mins)**

```css
/* student-manager.component.css */

/* Container Styles */
.edit-form, .profile-card, .courses-section, .grades-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4CAF50;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}

.enrolled {
  background-color: #4CAF50;
  color: white;
}

.not-enrolled {
  background-color: #f44336;
  color: white;
}

/* Info Rows */
.info-row {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row strong {
  color: #333;
  margin-right: 10px;
}

/* Form Styles */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Buttons */
button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.actions button:first-child {
  background-color: #4CAF50;
  color: white;
}

.actions button:first-child:hover:not(:disabled) {
  background-color: #45a049;
}

.actions button:nth-child(2) {
  background-color: #f44336;
  color: white;
}

.actions button:nth-child(2):hover:not(:disabled) {
  background-color: #da190b;
}

.actions button:last-child {
  background-color: #2196F3;
  color: white;
}

.actions button:last-child:hover {
  background-color: #0b7dda;
}

/* Courses Section */
.course-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.course-input input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.course-input button {
  background-color: #4CAF50;
  color: white;
  margin: 0;
}

.course-list {
  list-style: none;
  padding: 0;
}

.course-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #4CAF50;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  margin: 0;
}

/* Grades Section */
.grade-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.calculate-btn {
  background-color: #FF9800;
  color: white;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin: 0 0 20px 0;
}

.calculate-btn:hover {
  background-color: #F57C00;
}

/* Results */
.results {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
}

.results p {
  margin: 10px 0;
  font-size: 16px;
}

.results strong {
  color: #333;
}

/* Grade Colors */
.grade-A {
  color: #4CAF50;
  font-size: 24px;
  font-weight: bold;
}

.grade-B {
  color: #2196F3;
  font-size: 24px;
  font-weight: bold;
}

.grade-C {
  color: #FF9800;
  font-size: 24px;
  font-weight: bold;
}

.grade-D {
  color: #FF5722;
  font-size: 24px;
  font-weight: bold;
}

.grade-F {
  color: #f44336;
  font-size: 24px;
  font-weight: bold;
}

/* Section Headings */
h2, h3 {
  color: #333;
  margin-bottom: 15px;
}

h2 {
  font-size: 24px;
  border-bottom: 3px solid #4CAF50;
  padding-bottom: 10px;
}

h3 {
  font-size: 18px;
  color: #4CAF50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .grade-inputs {
    grid-template-columns: 1fr;
  }
}
```

---

### **Step 8: App-Level Styling (Optional)**

```css
/* app.component.css */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #4CAF50;
  font-size: 36px;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
```

```css
/* styles.css (global) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}
```

---

## **Complete Component Code**

```typescript
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
```

---

## **Teaching Strategy**

### **Progressive Building:**
1. Start with Step 1-2 (Basic display) - 15 mins
2. Add Step 3 (Property binding) - 10 mins
3. Add Step 4 (Event binding) - 15 mins
4. **BREAK** - 10 mins
5. Add Step 5 (Two-way binding) - 20 mins
6. Add Step 6 (Arrays & calculations) - 30 mins
7. Add Step 7 (Styling) - 15 mins
8. Testing & Questions - 15 mins

### **Key Teaching Moments:**

1. **After Step 2:** "Notice how the template automatically updates when we use `{{ }}`"
2. **After Step 3:** "See how `[property]` is different from `{{ }}` - one is for attributes, one is for content"
3. **After Step 4:** "Every time you click, the method runs and updates the data"
4. **After Step 5:** "With `[(ngModel)]`, the data flows BOTH ways automatically!"
5. **After Step 6:** "We're combining everything - properties, methods, events, and loops"

### **Common Issues to Address:**
- Forgetting to import FormsModule
- Not understanding the difference between `()`, `[]`, and `[()]`
- Confusion between property binding and interpolation
- Index tracking in `*ngFor`

---

## **Extension Ideas (If Time Permits)**

### **Level 1: Easy**
- Add a "Clear All" button for courses
- Add min/max validation for grade inputs
- Add a "Reset Form" button

### **Level 2: Medium**
- Add more subjects for grading
- Create a GPA calculator (4.0 scale)
- Add course categories (Technical, General, Languages)

### **Level 3: Advanced**
- Save data to localStorage
- Add multiple student profiles
- Create a student comparison feature

---

## **What Students Will Learn**

By building this app, students will understand:

✅ Component structure and organization
✅ All 4 types of data binding
✅ Working with different data types (string, number, boolean, array)
✅ Event handling and methods
✅ Array manipulation (push, splice)
✅ Conditional logic in templates
✅ Form input handling
✅ Basic *ngFor and *ngIf directives
✅ Styling Angular components
✅ Real-world application structure

---

## **Demo Tips**

1. **Use Live Server:** Run `ng serve` and show changes in real-time
2. **Make Mistakes:** Show common errors and how to fix them
3. **Use Console:** Open DevTools and show console.log output
4. **Test Everything:** Click buttons, type in inputs, show it working
5. **Encourage Questions:** Pause after each step
6. **Save Progress:** Commit after each major step

---

## **Homework Challenge**

Ask students to enhance the app by adding:
1. A photo upload feature (URL input)
2. Address fields (Street, City, State, Zip)
3. Emergency contact information
4. Attendance percentage calculator
5. Better styling and animations

---

This app is engaging, practical, and demonstrates EVERYTHING from today's lesson! 🚀
