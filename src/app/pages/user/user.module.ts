import { NgModule } from "@angular/core";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ShareModule } from "src/app/share/share.module";

@NgModule({
	declarations: [UserComponent, AddUserComponent],
	imports: [ShareModule, UserRoutingModule],
})
export class UserModule {}
