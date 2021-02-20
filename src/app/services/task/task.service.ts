import { Injectable, Inject } from "@angular/core";
import { ServicesModule, PAY_SERVER } from "../services.module";
import { Observable } from "rxjs";
import { NzMessageService } from "ng-zorro-antd";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/internal/operators";
import { Task, TaskDetail } from "./task.type";

@Injectable({
	providedIn: ServicesModule,
})
export class TaskService {
	constructor(
		private http: HttpClient,
		@Inject(PAY_SERVER) private url: string,
		private message: NzMessageService
	) {}

	/**
	 * 查询任务列表
	 * @param query 查询参数
	 */
	getTaskList(query?): Observable<any> {
		const params = new HttpParams({ fromObject: query });
		return this.http.get(`${this.url}/task/find`, { params }).pipe(
			map(
				(res: {
					success: boolean;
					content: Task[];
					totalElements: number;
					message: string;
				}) => {
					if (res.success) {
						return res;
					} else {
						this.message.error(res.message || "请求失败，请重试");
						return [];
					}
				}
			)
		);
	}
	/**
	 * 恢复任务
	 * @param id 任务id
	 */
	reStartTask(id): Observable<boolean> {
		return this.http.post(`${this.url}/task/recovery/${id}`, {}).pipe(
			map((res: { success: boolean; message: string }) => {
				if (res.success) {
					this.message.success("恢复成功");
					return true;
				} else {
					this.message.error(res.message || "操作失败，请重试");
					return null;
				}
			})
		);
	}
	/**
	 * 修改任务信息
	 * @param id 任务id
	 * @param params 任务信息
	 */
	updateTaskDetail(id, params: TaskDetail): Observable<boolean> {
		return this.http.put(`${this.url}/task/${id}/update`, params).pipe(
			map((res: { success: boolean; message: string }) => {
				if (res.success) {
					this.message.success("修改成功");
					return true;
				} else {
					this.message.error(res.message || "修改失败，请重试");
					return false;
				}
			})
		);
	}
	/**
	 * 删除任务
	 * @param params 任务id数组
	 */
	deleteTask(params): Observable<boolean> {
		const options = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
			body: params,
		};
		return this.http.delete(`${this.url}/task/delete`, options).pipe(
			map((res: { success: boolean; message: string }) => {
				if (res.success) {
					this.message.success("删除成功");
					return true;
				} else {
					this.message.error(res.message || "删除失败，请重试");
					return false;
				}
			})
		);
	}
}
