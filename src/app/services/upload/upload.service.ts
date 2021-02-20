import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OssToken } from './upload.type';
import { tap } from 'rxjs/internal/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
    providedIn: ServicesModule
})
export class UploadService {

    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) { }

    // 获取oss上传签名信息
    getPolicy(): Observable<any> {
        const params = new HttpParams({ fromObject: { needToken: 'false' } });
        return this.http.get('https://api.lcsw.cn/lcsw/h5upload/7', { params })
            .pipe(
                tap(
                    (res: OssToken) => {
                        return res;
                    },
                    err => {
                        this.message.error('获取签名失败，请重试！');
                        return null;
                    }
                )
            );
    }

    // 上传
    upload(item, formData): Observable<any> {
        const req = new HttpRequest('POST', item.action, formData);
        return this.http.request(req)
            .pipe(
                tap(
                    (res: any) => {
                        if (res.status === 200) {
                            item.onSuccess(res.body, item.file, res);
                            return res;
                        }
                    },
                    err => {
                        // tslint:disable-next-line: no-non-null-assertion
                        item.onError!(err, item.file!);
                        this.message.error(err || '上传失败，请重试');
                    }
                )
            );
    }
}
