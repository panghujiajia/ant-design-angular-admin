import { NgModule, InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";
import { httpInterceptorProvides } from "./http-interceptors";
import { ShareModule } from "../share/share.module";

export const PAY_SERVER = new InjectionToken("ApiConfigToken");

@NgModule({
	declarations: [],
	imports: [ShareModule],
	providers: [
		{ provide: PAY_SERVER, useValue: environment.url },
		httpInterceptorProvides,
	],
})
export class ServicesModule {}
