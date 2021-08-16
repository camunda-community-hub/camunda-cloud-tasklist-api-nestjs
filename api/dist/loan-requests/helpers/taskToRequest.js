"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskToRequest = void 0;
function taskToRequest(_a) {
    var { variables } = _a, task = __rest(_a, ["variables"]);
    return Object.assign(Object.assign(Object.assign({}, task), { status: task.taskState === 'CREATED' ? 'open' : 'resolved' }), variables.reduce((accumulator, { value, name }) => name === 'id'
        ? accumulator
        : Object.assign({}, accumulator, {
            [name]: JSON.parse(value),
        }), {}));
}
exports.taskToRequest = taskToRequest;
//# sourceMappingURL=taskToRequest.js.map