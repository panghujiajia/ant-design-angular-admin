import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
	{
		path: 'list',
		component: ListComponent,
	},
	{
		path: 'delete',
		component: DeleteComponent,
	},
	{
		path: 'edit',
		component: EditComponent,
	},
	{
		path: 'add',
		component: AddComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MenuRoutingModule {}
