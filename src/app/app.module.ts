import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NoAccessComponent } from './pages/403/no-access.component';

@NgModule({
	declarations: [AppComponent, NoAccessComponent],
	imports: [CoreModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
