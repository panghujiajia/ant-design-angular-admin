import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { ShareModule } from '../share/share.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { WelcomeComponent } from '../pages/welcome/welcome.component';

@NgModule({
	declarations: [
		LayoutComponent,
		AsideComponent,
		HeaderComponent,
		WelcomeComponent,
	],
	imports: [LayoutRoutingModule, ShareModule],
})
export class LayoutModule {}
