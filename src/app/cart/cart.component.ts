import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartProducts = this.cartCount.asObservable();

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
    this.loadCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  getTotalAmount() {
    return this.cartService.getTotalAmount();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }
}
