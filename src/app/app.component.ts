import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { LoaderComponent } from './loader/loader.component';
import { CartService } from './cart.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'davaleba8';

  isLoading = false;

  constructor(
    public service: ApiService,
    public cartService: CartService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((loadingStatus) => {
      this.isLoading = loadingStatus;
    });
  }
}
