// 文件上传的签名
export interface OssToken {
    accessid: string;
    expire: string;
    filename: string;
    policy: string;
    signature: string;
}