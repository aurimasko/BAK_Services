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
exports.ConditionSentenceBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ConditionSentenceBlock = /** @class */ (function (_super) {
    __extends(ConditionSentenceBlock, _super);
    function ConditionSentenceBlock() {
        var _this = _super.call(this, 'ConditionSentenceBlock') || this;
        _this.class = ConditionSentenceBlock;
        _this.disabled = true;
        return _this;
    }
    ConditionSentenceBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("OperandA")
            .setCheck("Boolean");
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["ir", "AND"], ["arba", "OR"]]), "OPERATION");
        this.block.appendValueInput("OperandB")
            .setCheck("Boolean");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Boolean");
        this.block.setColour(230);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
        //todo: helpurl
    };
    ConditionSentenceBlock.prototype.toXML = function () {
        return '<block type="ConditionSentenceBlock"></block>';
    };
    ConditionSentenceBlock.prototype.toDartCode = function (block) {
        var operator = block.getFieldValue('OPERATION') === "AND" ? "&&" : "||";
        var order = operator === "&&" ? ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_AND : ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_OR;
        var value_operanda = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || 'false';
        var value_operandb = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || 'false';
        var code = value_operanda + " " + operator + " " + value_operandb;
        return [code, order];
    };
    return ConditionSentenceBlock;
}(ngx_blockly_1.CustomBlock));
exports.ConditionSentenceBlock = ConditionSentenceBlock;
//# sourceMappingURL=conditionSentence.block.js.map