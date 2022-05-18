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
exports.WhileLoopBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var WhileLoopBlock = /** @class */ (function (_super) {
    __extends(WhileLoopBlock, _super);
    function WhileLoopBlock() {
        var _this = _super.call(this, 'WhileLoopBlock') || this;
        _this.class = WhileLoopBlock;
        _this.disabled = true;
        return _this;
    }
    WhileLoopBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("Kol sąlyga");
        this.block.appendValueInput("WHILE_CONDITION")
            .setCheck("Boolean");
        this.block.appendDummyInput()
            .appendField("yra");
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["tiesa", "true"], ["netiesa", "false"]]), "WHILE_CONDITION_OPTION");
        this.block.appendDummyInput()
            .appendField("tol kartoti");
        this.block.appendStatementInput("DO")
            .setCheck(null);
        this.block.setInputsInline(true);
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(20);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
    };
    WhileLoopBlock.prototype.toXML = function () {
        return '<block type="WhileLoopBlock"></block>';
    };
    WhileLoopBlock.prototype.toDartCode = function (block) {
        var whileConditionIsTrue = block.getFieldValue('WHILE_CONDITION_OPTION') === "true";
        var value_while_condition = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'WHILE_CONDITION', whileConditionIsTrue ? ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT : ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
        var statements_do = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'DO');
        statements_do = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].addLoopTrap(statements_do, block.id);
        if (!whileConditionIsTrue)
            value_while_condition = '!' + value_while_condition;
        return "while(" + value_while_condition + ") {\n" + statements_do + "}\n";
    };
    return WhileLoopBlock;
}(ngx_blockly_1.CustomBlock));
exports.WhileLoopBlock = WhileLoopBlock;
//# sourceMappingURL=whileLoop.block.js.map