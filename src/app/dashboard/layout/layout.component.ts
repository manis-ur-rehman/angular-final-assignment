import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  authService: AuthService = inject(AuthService);

  constructor(private router: Router){}

  handleLogout(){
this.authService.removeUserToken('token');
this.router.navigateByUrl('/login');
  }
}
