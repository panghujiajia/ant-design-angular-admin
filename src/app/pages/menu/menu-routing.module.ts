import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { AddMenuComponent } from "./add-menu/add-menu.component";

const routes: Routes = [
	{
		path: "",
		component: MenuComponent,
	},
	{
		path: "add",
		component: AddMenuComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MenuRoutingModule {}
