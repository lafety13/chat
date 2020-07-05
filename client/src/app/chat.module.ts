import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routing/app-routing.module';
import {ChatComponent} from './chat.component';
import {ChatPageComponent} from './containers/chat/chat-page/chat-page.component';
import {ChatLayoutComponent} from './containers/chat/chat-layout/chat-layout.component';
import {ChatSignInPageComponent} from './containers/auth/sign-in-page/sign-in-page.component';
import {SignInFormComponent} from './components/auth/sign-in-form/sign-in-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserListComponent} from './components/chat/user-list/user-list.component';
import {MessageComponent} from './components/chat/message/message.component';
import {MessagesComponent} from './components/chat/messages/messages.component';
import {MessageFormComponent} from './components/chat/message-form/message-form.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    ChatComponent,
    ChatPageComponent,
    ChatLayoutComponent,
    ChatSignInPageComponent,
    SignInFormComponent,
    UserListComponent,
    MessageComponent,
    MessagesComponent,
    MessageFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [ChatComponent]
})
export class ChatModule {}
