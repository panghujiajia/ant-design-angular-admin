import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { ngZorroConfig } from '../configs/ngZorroConfig';
import { commonReducer } from '../stores/reducers/bus.reducer';
import { StoreModule } from '@ngrx/store';
import { ServicesModule } from '../services/services.module';
registerLocaleData(zh);
/**
 * 引入配置性模块 只需要引入
 */
@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ServicesModule,
		StoreModule.forRoot({ common: commonReducer }),
	],
	exports: [AppRoutingModule],
	providers: [ngZorroConfig],
})
export class CoreModule {}
