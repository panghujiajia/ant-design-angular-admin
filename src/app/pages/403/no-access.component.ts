import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "app-no-access",
	templateUrl: "./no-access.component.html",
	styleUrls: ["./no-access.component.less"],
})
export class NoAccessComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {
		timer(3000).subscribe((res) => {
			this.router.navigate(["/"]);
		});
	}
}
