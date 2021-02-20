// 任务列表数据
export interface Task {
    id: number;
    taskName: string;
    agentId: string;
    must: string;
    appName: string;
    verNo: string;
    create_time: string;
    taskType: string;
    level: string;
    detail: string;
}

// 任务流水
export interface TaskWater {
    id: number;
    sn: string;
    agentName: string;
    vendorName: string;
    modelName: string;
    lastConnect: string;
    address: string;
    updateTime: string;
    disable: boolean;
    taskType: string;
}

// 终端信息
export interface Terminal {
    id: number;
    sn: string;
    agentName: string;
    vendorName: string;
    modelName: string;
    lastConnect: string;
    address: string;
    updateTime: string;
    disable: boolean;
}

// 查询终端
export interface SearchTerminal {
    agentId?: string;
    id?: number;
    vendorId?: string;
    modelId?: string;
    sn?: string;
}

// 查询任务
export interface SearchTask {
    agentName?: string;
    status?: string;
    taskName?: string;
}

// 任务详情
export interface TaskDetail {
    agentName?: string;
    agentId?: string;
    appName?: string;
    startTime?: string;
    endTime?: string;
    detail?: string;
    disable?: boolean;
    verNo?: string;
    editionId?: string;
    id?: number;
    appId?: number;
    must?: boolean;
    status?: string;
    taskName?: string;
    taskType?: string;
    updateTime?: string;
    terminals?: TaskWater[];
}
