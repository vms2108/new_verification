import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AlertComponent } from './directives';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
       AlertComponent,
    ],
    imports: [
        CommonModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        UserService,
        ApiService,
        AuthService
    ],
    bootstrap: [
    ],
    exports: [
        AlertComponent
    ]
 })
 export class CoreModule { }
