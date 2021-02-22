import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';

@Injectable({
	providedIn: ServicesModule,
})
export class StorageService {
	// 设置网络存储
	setSessionStorage(key: string, value: any) {
		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}
		window.sessionStorage.setItem(key, value);
	}
	// 获取网络存储
	getSessionStorage(key: string) {
		try {
			let value = window.sessionStorage.getItem(key);
			if (!value) return value;
			if (/(^\{(.*?)\}$)|(^\[(.*?)\]$)/.test(value))
				return JSON.parse(value);
		} catch (error) {
			console.error('获取缓存失败：', error);
		}
	}
	// 删除网络存储
	deleteStorageStorage(key: string) {
		window.sessionStorage.removeItem(key);
	}

	// 设置本地存储
	setLocalStorage(key: string, value: any) {
		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}
		window.localStorage.setItem(key, value);
	}
	// 获取本地存储
	getLocalStorage(key: string) {
		try {
			let value = window.localStorage.getItem(key);
			if (!value) return value;
			if (/(^\{(.*?)\}$)|(^\[(.*?)\]$)/.test(value))
				return JSON.parse(value);
		} catch (error) {
			console.error('获取缓存失败：', error);
		}
	}
	// 删除本地存储
	deleteLocalStorage(key: string) {
		window.localStorage.removeItem(key);
	}
}
