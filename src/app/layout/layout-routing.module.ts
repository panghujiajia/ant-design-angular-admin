import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CanActiveGuide } from './routeGuide/CanActiveGuide';
import { WelcomeComponent } from '../pages/welcome/welcome.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'welcome',
				component: WelcomeComponent,
			},
			{
				path: 'menu',
				loadChildren: () =>
					import('../pages/menu/menu.module').then(m => m.MenuModule),
			},
			{
				path: 'user',
				loadChildren: () =>
					import('../pages/user/user.module').then(m => m.UserModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [CanActiveGuide],
})
export class LayoutRoutingModule {}
