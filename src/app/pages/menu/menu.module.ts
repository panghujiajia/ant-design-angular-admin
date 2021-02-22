import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
	declarations: [ListComponent, AddComponent, DeleteComponent, EditComponent],
	imports: [MenuRoutingModule, ShareModule],
})
export class MenuModule {}
