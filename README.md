### Angular Developer Coding Assessment

During this assessment it is allowed to install and use 3th party libs, like Angular Material, to help you complete the assessment. The project starts from scratch as we want to evaluate your problem solving skills as well as your project management skills.

If you have any questions, you can contact me through email. Ask the recruiter for the details.
Please fork or download the project to be able to complete the assessment.

**ATTENTION:**

- For the API's you can use JSON server or any other solution, but you need to use HttpClient from Angular.
- It is up to you how you structure your code.
- Make as much use of the stable features of Angular 17. You are also allowed to use the new features of Angular 18. We are currently on Angular version 17.

#### Part 1: Coding Tasks

**Project: E-Commerce Platform**

Develop a simplified e-commerce platform with the following features:

- **Product Listing Page**: Display a list of 5 products. This can be in a table.
- **Product Details Page**: Display detailed information about a product. Detail of a product must contain a title, a description and the number in stock.
- **Shopping Cart**: Allow users to add, update, and remove items from the cart. Display the total price and handle cart persistence using local storage. Make sure that the stock is also updated.
- **Checkout Process**: Implement a multi-step checkout process with forms for shipping details (name and address is sufficient), payment information (no formatting is needed, but validation should be in place), and order summary (keep it simpel and combine the frist 2 steps)
- **Notification System**: Implement a notification system which tracks when new items are added to the cart. Also show the amount of items.

**Bonus:**

- Implement this with NgRx
- Make sure the cart is updated in realtime.
- Add unit and end-to-end tests using Jest (you can also use Spectator as we use this in our project)

#### Part 2: In-Depth Code Review Exercise

Given the code below. Review the code as it would be in a code review.

```typescript
// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get('api/orders');
  }

  createOrder(order: any): Observable<any> {
    // Note: No error handling here
    return this.http

.post('api/orders', order);
  }
}

// order.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  template: `
    <h1>Order List</h1>
    <ul>
      <li *ngFor="let order of orders">{{ order.id }} - {{ order.total }}</li>
    </ul>
    <button (click)="createOrder()">Create Order</button>
  `
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data: any[]) => {
      this.orders = data;
    }, error => {
      console.error('Failed to load orders', error);
    });
  }

  createOrder() {
    const newOrder = { id: Date.now(), total: 100 };
    this.orderService.createOrder(newOrder).subscribe(order => {
      this.orders.push(order);
    }, error => {
      console.error('Failed to create order', error);
    });
  }
}
```

**Instructions:**

- What issues do you identify?
- What suggestions would you provide for the creator of this code?
