import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
 },
  {path: '', redirectTo: 'dashboard', pathMatch:'full'},
 {path: 'dashboard', loadChildren: ()=>import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule) , canActivate: [authGuard]},
 {path: '', loadChildren:()=>import('./auth/auth.module').then(mod=>mod.AuthModule) , canActivate: [authGuard]},
 {
   path: "**",
   redirectTo: 'forbidden',
   pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
