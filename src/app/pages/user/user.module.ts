import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
	declarations: [AddComponent, ListComponent, EditComponent, DeleteComponent],
	imports: [UserRoutingModule, ShareModule],
})
export class UserModule {}
