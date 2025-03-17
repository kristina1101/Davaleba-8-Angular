import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];
  constructor(public apiService: ApiService, public cartService: CartService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('პროდუქტი დაემატა კალათაში');
  }
}
