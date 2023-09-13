import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  authService: AuthService = inject(AuthService);

  handleLogout(){
this.authService.removeUserToken('token');
  }
}
