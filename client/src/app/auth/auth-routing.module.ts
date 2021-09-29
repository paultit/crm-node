import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const authRoutes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]    
  }    
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes,
    )],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
