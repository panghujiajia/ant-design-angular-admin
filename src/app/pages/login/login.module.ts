import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [LoginRoutingModule, ShareModule],
})
export class LoginModule {}
