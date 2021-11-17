import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { HeaderComponent } from './header/header.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListStudentComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DetailStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports:[RouterModule],
  //this is contain all components of my application
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
