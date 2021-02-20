import { NgModule } from "@angular/core";

import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";
import { AddMenuComponent } from "./add-menu/add-menu.component";
import { ShareModule } from "src/app/share/share.module";

@NgModule({
	declarations: [MenuComponent, AddMenuComponent],
	imports: [ShareModule, MenuRoutingModule],
})
export class MenuModule {}
