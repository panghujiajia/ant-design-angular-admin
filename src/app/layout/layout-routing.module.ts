import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MENU_ROUTES } from '../configs/menuConfig';
import { CanActiveGuide } from './routeGuide/CanActiveGuide';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: MENU_ROUTES,
		canLoad: [CanActiveGuide],
		canActivate: [CanActiveGuide],
		canActivateChild: [CanActiveGuide],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [CanActiveGuide],
})
export class LayoutRoutingModule {}
