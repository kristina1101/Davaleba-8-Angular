import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];
  private cartCount = 0;
  public isLoading: any;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.apiService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.apiService.refreshCartCount();
    });
  }

  updateQuantity(productId: number, change: number) {
    const product = this.cartItems.find(item => item.product.id === productId);
    if (product) {
      const newQuantity = product.quantity + change;
      
      if (newQuantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.apiService.updateCartItem(productId, newQuantity, product.price).subscribe(() => {
          this.loadCart();
        });
      }
    }
  }
  

  removeFromCart(itemId: number) {
    if (!itemId) {
      console.error("Invalid item ID:", itemId);
      return;
    }
  
    this.apiService.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.product.id !== itemId);
        this.apiService.refreshCartCount();
      },
      error: (err) => console.error("Error removing product:", err)
    });
  }

  getTotalAmount() {
    return this.apiService.getTotalAmount(this.cartItems);
  }

  ngOnInitt() {
    this.apiService.loader.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
