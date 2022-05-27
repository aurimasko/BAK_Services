"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitMainBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var InitMainBlock = /** @class */ (function (_super) {
    __extends(InitMainBlock, _super);
    function InitMainBlock() {
        var _this = _super.call(this, 'InitMainBlock') || this;
        _this.class = InitMainBlock;
        _this.disabled = true;
        return _this;
    }
    InitMainBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("Programa");
        this.block.appendStatementInput("PROGRAM")
            .setCheck(null);
        this.block.setColour(230);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        this.block.setDeletable(false);
    };
    InitMainBlock.prototype.toXML = function () {
        return '<block type="InitMainBlock"></block>';
    };
    InitMainBlock.prototype.toDartCode = function (block) {
        var statements_program = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'PROGRAM');
        var variablesOutput = "";
        var defvars = [];
        var variables = block.workspace.getAllVariables();
        for (var i = 0; i < variables.length; i++) {
            defvars.push("int " + ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].nameDB_.getName(variables[i].getId(), "VARIABLE") + ";");
        }
        return 'int main() { \n' + defvars.join('\n') + '\n' + statements_program + 'return 0;\n}';
    };
    return InitMainBlock;
}(ngx_blockly_1.CustomBlock));
exports.InitMainBlock = InitMainBlock;
//# sourceMappingURL=initMain.block.js.map