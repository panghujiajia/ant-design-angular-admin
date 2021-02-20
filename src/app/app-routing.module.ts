import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuide } from './layout/routeGuide/CanActiveGuide';
import { NoAccessComponent } from './pages/403/no-access.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./layout/layout.module').then(m => m.LayoutModule),
		canLoad: [CanActiveGuide],
		canActivate: [CanActiveGuide],
		canActivateChild: [CanActiveGuide],
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./pages/login/login.module').then(m => m.LoginModule),
	},
	{
		path: '403',
		component: NoAccessComponent,
	},
	{
		path: '**',
		redirectTo: '403',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [CanActiveGuide],
})
export class AppRoutingModule {}
