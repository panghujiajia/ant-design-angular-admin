import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';

@NgModule({
	declarations: [AppComponent, NoAccessComponent, NotFoundComponent],
	imports: [CoreModule, ShareModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
