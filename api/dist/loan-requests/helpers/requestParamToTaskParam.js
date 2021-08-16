"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestParamToTaskParam = void 0;
function requestParamToTaskParam(params) {
    const { status } = params;
    if (status === 'open') {
        return Object.assign(Object.assign({}, params), { state: 'CREATED' });
    }
    if (status === 'resolved') {
        return Object.assign(Object.assign({}, params), { state: 'COMPLETED' });
    }
    return params;
}
exports.requestParamToTaskParam = requestParamToTaskParam;
//# sourceMappingURL=requestParamToTaskParam.js.map