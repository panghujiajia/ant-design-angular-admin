import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.less"],
})
export class WelcomeComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
	role: string | string[];
	log(e) {
		console.log(e);
		this.role = e;
	}
}
