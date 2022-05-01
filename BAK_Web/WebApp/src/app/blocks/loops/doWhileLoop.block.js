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
exports.DoWhileLoopBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var DoWhileLoopBlock = /** @class */ (function (_super) {
    __extends(DoWhileLoopBlock, _super);
    function DoWhileLoopBlock() {
        var _this = _super.call(this, 'DoWhileLoopBlock') || this;
        _this.class = DoWhileLoopBlock;
        _this.disabled = true;
        return _this;
    }
    DoWhileLoopBlock.prototype.defineBlock = function () {
        this.block.appendStatementInput("DO_STATEMENT")
            .setCheck(null)
            .appendField("Vykdyti");
        this.block.appendDummyInput()
            .appendField("Kol šį sąlyga yra");
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["tiesa", "TRUE"], ["netiesa", "FALSE"]]), "WHILE_CONDITION_OPTION");
        this.block.appendValueInput("WHILE_CONDITION")
            .setCheck("Boolean");
        this.block.setInputsInline(true);
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(230);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
    };
    DoWhileLoopBlock.prototype.toXML = function () {
        return '<block type="DoWhileLoopBlock"></block>';
    };
    DoWhileLoopBlock.prototype.toDartCode = function (block) {
        var whileConditionIsTrue = block.getFieldValue('WHILE_CONDITION_OPTION') === "true";
        var value_while_condition = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'WHILE_CONDITION', whileConditionIsTrue ? ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT : ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
        var statements_do_statement = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'DO_STATEMENT');
        statements_do_statement = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].addLoopTrap(statements_do_statement, block.id);
        if (!whileConditionIsTrue)
            value_while_condition = '!' + value_while_condition;
        return "do {\n" + statements_do_statement + "}\nwhile(" + value_while_condition + ");";
    };
    return DoWhileLoopBlock;
}(ngx_blockly_1.CustomBlock));
exports.DoWhileLoopBlock = DoWhileLoopBlock;
//# sourceMappingURL=doWhileLoop.block.js.map