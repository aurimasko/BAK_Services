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
exports.CreateIntVariableBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var CreateIntVariableBlock = /** @class */ (function (_super) {
    __extends(CreateIntVariableBlock, _super);
    function CreateIntVariableBlock() {
        var _this = _super.call(this, 'CreateIntVariableBlock') || this;
        _this.class = CreateIntVariableBlock;
        _this.disabled = true;
        return _this;
    }
    CreateIntVariableBlock.prototype.defineBlock = function () {
        var name = ngx_blockly_1.Blockly.Procedures.findLegalName("kintamasis", this.block);
        this.block.appendDummyInput()
            .appendField("Sukurti sveikojo skaičiaus tipo kintamąjį");
        this.block.setInputsInline(true);
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(230);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        ngx_blockly_1.Blockly.Variables.createVariableButtonHandler(this.block.workspace, undefined, 'int');
        //todo: tooltip
    };
    CreateIntVariableBlock.prototype.onChange = function (changeEvent) {
        // todo: check initial value according type
        // todo: set setCheck.
    };
    CreateIntVariableBlock.prototype.toXML = function () {
        return '<block type="CreateIntVariableBlock"></block>';
    };
    CreateIntVariableBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return CreateIntVariableBlock;
}(ngx_blockly_1.CustomBlock));
exports.CreateIntVariableBlock = CreateIntVariableBlock;
//# sourceMappingURL=createVariable.block.js.map