import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CanActiveGuide } from './layout/routeGuide/CanActiveGuide';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./layout/layout.module').then(m => m.LayoutModule),
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
		path: '404',
		component: NotFoundComponent,
	},
	{
		path: '**',
		redirectTo: '404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [CanActiveGuide],
})
export class AppRoutingModule {}
