import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationRoutingModule } from './verification-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, VerificationRoutingModule, SharedModule.forRoot()]
})
export class VerificationModule {}
