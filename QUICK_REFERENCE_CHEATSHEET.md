# Angular Data Binding - Quick Reference Cheatsheet

## 📚 Today's Core Concepts

### 1. Interpolation `{{ }}`
**Direction:** Component → Template (One-way)
**Purpose:** Display data in the template

```typescript
// Component
name: string = 'John';
age: number = 20;
```

```html
<!-- Template -->
<h1>Hello {{ name }}</h1>
<p>Age: {{ age }}</p>
<p>Next year: {{ age + 1 }}</p>
<p>{{ age > 18 ? 'Adult' : 'Minor' }}</p>
```

---

### 2. Property Binding `[property]`
**Direction:** Component → Template (One-way)
**Purpose:** Set element properties/attributes

```typescript
// Component
imageUrl: string = 'image.jpg';
isDisabled: boolean = false;
```

```html
<!-- Template -->
<img [src]="imageUrl" [alt]="name">
<button [disabled]="isDisabled">Click</button>
<div [class]="statusClass">Content</div>
<div [style.color]="textColor">Styled</div>
```

**Remember:**
- Use `[]` for properties, NOT attributes
- `<img [src]="url">` ✅
- `<img src="{{ url }}">` ⚠️ (works but not recommended)

---

### 3. Event Binding `(event)`
**Direction:** Template → Component (One-way)
**Purpose:** Handle user events

```typescript
// Component
count: number = 0;

increment(): void {
  this.count++;
}

handleClick(event: Event): void {
  console.log('Clicked!', event);
}
```

```html
<!-- Template -->
<button (click)="increment()">+</button>
<button (click)="count = 0">Reset</button>
<input (input)="handleInput($event)">
<div (mouseenter)="onHover()">Hover me</div>
```

**Common Events:**
- `(click)` - Mouse click
- `(input)` - Input changes
- `(change)` - Input loses focus
- `(submit)` - Form submit
- `(keyup)` - Key released
- `(keydown)` - Key pressed
- `(keyup.enter)` - Enter key

---

### 4. Two-Way Binding `[(ngModel)]`
**Direction:** Component ↔ Template (Two-way)
**Purpose:** Sync data between component and template

```typescript
// Component
userName: string = '';
age: number = 0;
```

```html
<!-- Template -->
<input [(ngModel)]="userName" type="text">
<p>Hello {{ userName }}</p>

<input [(ngModel)]="age" type="number">
<p>You are {{ age }} years old</p>
```

**⚠️ IMPORTANT:** Must import FormsModule in app.module.ts!

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule]
})
```

**Banana in a box:** `[(ngModel)]` = `[ngModel]` + `(ngModelChange)`

---

## 🔧 Component Structure

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',           // <app-example></app-example>
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Properties
  title: string = 'Hello';
  count: number = 0;
  isActive: boolean = true;
  items: string[] = ['A', 'B', 'C'];

  // Methods
  doSomething(): void {
    this.count++;
    console.log('Done!');
  }

  calculate(x: number, y: number): number {
    return x + y;
  }
}
```

---

## 📊 TypeScript Data Types

```typescript
// Basic Types
name: string = 'John';
age: number = 20;
isActive: boolean = true;
anything: any = 'can be anything';

// Arrays
names: string[] = ['John', 'Jane'];
numbers: number[] = [1, 2, 3];

// Objects
student: any = {
  name: 'John',
  age: 20
};

// Interface (Advanced)
interface Student {
  name: string;
  age: number;
}

student: Student = {
  name: 'John',
  age: 20
};
```

---

## 🔄 Common Array Methods

```typescript
// Add to array
items: string[] = ['A', 'B'];
items.push('C');           // ['A', 'B', 'C']

// Remove from array
items.splice(1, 1);        // Remove 1 item at index 1
                           // Result: ['A', 'C']

// Get array length
total: number = items.length;

// Check if empty
isEmpty: boolean = items.length === 0;
```

---

## 🎯 Directives Quick Ref

### *ngFor - Loop through arrays
```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>

<!-- With index -->
<li *ngFor="let item of items; let i = index">
  {{ i + 1 }}. {{ item }}
</li>
```

### *ngIf - Conditional rendering
```html
<p *ngIf="isLoggedIn">Welcome back!</p>
<p *ngIf="!isLoggedIn">Please login</p>

<!-- With else -->
<div *ngIf="isLoggedIn; else notLoggedIn">
  Welcome!
</div>
<ng-template #notLoggedIn>
  Please login
</ng-template>
```

---

## 💡 Common Patterns

### Toggle Boolean
```typescript
isActive: boolean = false;

toggle(): void {
  this.isActive = !this.isActive;
}
```

### Form Input Validation
```typescript
name: string = '';

isValid(): boolean {
  return this.name.trim() !== '';
}
```

```html
<button (click)="save()" [disabled]="!isValid()">
  Save
</button>
```

### Clear Input After Submit
```typescript
newItem: string = '';
items: string[] = [];

addItem(): void {
  if (this.newItem.trim() !== '') {
    this.items.push(this.newItem);
    this.newItem = '';  // Clear input
  }
}
```

---

## 🐛 Common Errors & Solutions

### Error: Can't bind to 'ngModel'
```
Template parse errors: Can't bind to 'ngModel' since it isn't a known property
```
**Solution:** Import FormsModule in app.module.ts

### Error: Property doesn't exist
```
Property 'userName' does not exist on type 'AppComponent'
```
**Solution:** Declare the property in component class

### Error: Method not a function
```
this.save is not a function
```
**Solution:** Define the method in component class

---

## ⌨️ CLI Commands

```bash
# Create component
ng generate component name
ng g c name

# Create component without test file
ng g c name --skip-tests

# Start dev server
ng serve
ng s

# Build for production
ng build

# Run tests
ng test
```

---

## 📋 Class Exercise Solutions

### Task Manager
```typescript
export class TaskManagerComponent {
  tasks: string[] = [];
  newTask: string = '';

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
```

```html
<input [(ngModel)]="newTask" (keyup.enter)="addTask()">
<button (click)="addTask()">Add</button>

<ul>
  <li *ngFor="let task of tasks; let i = index">
    {{ task }}
    <button (click)="removeTask(i)">Delete</button>
  </li>
</ul>
```

---

## 🎨 Quick CSS Tips

```css
/* Center content */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Card style */
.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Button hover */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Disabled state */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 📝 Homework Hints

### Grade Calculator
```typescript
subject1: number = 0;
subject2: number = 0;
subject3: number = 0;
total: number = 0;
percentage: number = 0;
grade: string = '';

calculate(): void {
  this.total = this.subject1 + this.subject2 + this.subject3;
  this.percentage = (this.total / 300) * 100;

  if (this.percentage >= 90) this.grade = 'A';
  else if (this.percentage >= 75) this.grade = 'B';
  else if (this.percentage >= 60) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
}
```

---

## 🔗 Important Links

- **Angular Docs:** https://angular.io
- **TypeScript Docs:** https://www.typescriptlang.org
- **Practice:** https://stackblitz.com

---

## 🎯 Key Takeaways

1. ✅ `{{ }}` - Display data
2. ✅ `[property]` - Set element properties
3. ✅ `(event)` - Handle events
4. ✅ `[(ngModel)]` - Two-way binding (needs FormsModule!)
5. ✅ Components are building blocks
6. ✅ TypeScript adds type safety
7. ✅ Use Angular CLI for everything

---

**Remember:** Practice makes perfect! 🚀

Print this and keep it handy during class!
