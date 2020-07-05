import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsNotAuthenticatedGuard} from '../guards/is-not-authenticated/is-not-authenticated.guard';
import {IsAuthenticatedGuard} from '../guards/is-authenticated/is-authenticated.guard';
import {ChatLayoutComponent} from '../containers/chat/chat-layout/chat-layout.component';
import {ChatSignInPageComponent} from '../containers/auth/sign-in-page/sign-in-page.component';
import {ChatPageComponent} from '../containers/chat/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'auth/sign-in',
    component: ChatSignInPageComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'chat',
    canActivate: [IsAuthenticatedGuard],
    component: ChatLayoutComponent,
    children: [
      {
        path: '',
        component: ChatPageComponent,
        canActivate: [IsAuthenticatedGuard]
      }
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
