import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { Store } from "@ngrx/store";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.less"],
})
export class LoginComponent implements OnInit {
	validateForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private message: NzMessageService,
		private store: Store<{ common: any }>
	) {}
	condition = false;
	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userNum: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [false],
		});
	}
	// 登录
	submitForm(): void {
		// tslint:disable-next-line: forin
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[i].markAsDirty();
			this.validateForm.controls[i].updateValueAndValidity();
		}
		if (this.validateForm.status !== "VALID") {
			return;
		}
		const value = this.validateForm.value;
		const params = {
			userNum: value.userNum,
			password: value.password,
		};
		this.router.navigate([""]);
	}
}
