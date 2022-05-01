"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Student"] = "Student";
    Role["Teacher"] = "Teacher";
    Role["None"] = "";
})(Role = exports.Role || (exports.Role = {}));
var User = /** @class */ (function () {
    function User() {
        this.id = 0;
        this.username = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.roles = [];
        this.token = "";
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map