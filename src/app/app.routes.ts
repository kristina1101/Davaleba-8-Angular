import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'cart', component: CartComponent },
];
