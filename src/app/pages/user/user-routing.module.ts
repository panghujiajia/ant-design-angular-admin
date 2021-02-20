import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
	{
		path: "",
		component: UserComponent,
	},
	{
		path: "add",
		data: {
			authName: "add-menu",
		},
		component: AddUserComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
