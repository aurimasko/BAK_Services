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
exports.ForLoopBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ForLoopBlock = /** @class */ (function (_super) {
    __extends(ForLoopBlock, _super);
    function ForLoopBlock() {
        var _this = _super.call(this, 'ForLoopBlock') || this;
        _this.class = ForLoopBlock;
        _this.disabled = true;
        return _this;
    }
    ForLoopBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("Skaičiuoti su ");
        this.block.appendValueInput("FROM")
            .setCheck("Number")
            .setAlign(ngx_blockly_1.Blockly.ALIGN_RIGHT)
            .appendField(new ngx_blockly_1.Blockly.FieldVariable("i"), "VAR").appendField("nuo");
        this.block.appendDummyInput()
            .appendField("iki");
        this.block.appendValueInput("TO")
            .setCheck("Number")
            .setAlign(ngx_blockly_1.Blockly.ALIGN_RIGHT);
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["pridedant", "+"], ["minusuojant", "-"], ["dauginant", "*"], ["dalinant", "/"]]), "FOR_OPTION");
        this.block.appendValueInput("BY")
            .setCheck("Number")
            .setAlign(ngx_blockly_1.Blockly.ALIGN_RIGHT);
        this.block.appendStatementInput("DO_ACTION")
            .setCheck(null)
            .appendField("Vykdyti");
        this.block.setInputsInline(true);
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(20);
        this.block.setTooltip("Šis blokas kartoja veiksmus, esančius 'Vykdyti' dalyje tol, kol pateiktas kintamasis yra mažesnis už skaičių pateiktą 'iki' dalyje." +
            "Po kiekvieno veiksmų pakartojimo, kintamojo reikšmę galima keisti.");
    };
    ForLoopBlock.prototype.toXML = function () {
        return '<block type="ForLoopBlock"></block>';
    };
    ForLoopBlock.prototype.toDartCode = function (block) {
        var forOption = block.getFieldValue('FOR_OPTION');
        var variable_var = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].nameDB_.getName(block.getFieldValue('VAR'), ngx_blockly_1.Blockly.Variables.NAME_TYPE);
        var value_from = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'FROM', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
        var value_to = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'TO', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
        var value_by = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'BY', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
        var statements_do_action = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'DO_ACTION');
        return "for(" + variable_var + " = " + value_from + "; " +
            variable_var + "< " + value_to + "; " + variable_var + " " + forOption + "=" + value_by + ') {\n ' + statements_do_action + ' }\n';
    };
    return ForLoopBlock;
}(ngx_blockly_1.CustomBlock));
exports.ForLoopBlock = ForLoopBlock;
//# sourceMappingURL=forLoop.block.js.map