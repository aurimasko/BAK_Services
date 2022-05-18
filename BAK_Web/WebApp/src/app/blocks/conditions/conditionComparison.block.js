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
exports.ConditionComparisonBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ConditionComparisonBlock = /** @class */ (function (_super) {
    __extends(ConditionComparisonBlock, _super);
    function ConditionComparisonBlock() {
        var _this = _super.call(this, 'ConditionComparisonBlock') || this;
        _this.class = ConditionComparisonBlock;
        _this.disabled = true;
        return _this;
        /*  const LOGIC_COMPARE_EXTENSION = function () {
            // Add onchange handler to ensure types are compatible.
            this.mixin(LOGIC_COMPARE_ONCHANGE_MIXIN);
          };
          Blockly.Extensions.register('logic_compare', LOGIC_COMPARE_EXTENSION);
          */
        //  'parent_tooltip_extension',
    }
    ConditionComparisonBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("OperandA")
            .setCheck(null);
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["=", "EQ"], ['\u2260', "NEQ"], ['\u200F<', "LT"], ['\u200F\u2264', "LTE"], ['\u200F>', "GT"], ['\u200F\u2265', "GTE"]]), "OPERATION");
        this.block.appendValueInput("OperandB")
            .setCheck(null);
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Boolean");
        this.block.setColour(210);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        this.block.jsonInit({
            "extensions": "logic_compare"
        });
        //todo: tooltip
        //todo: helpurl
    };
    ConditionComparisonBlock.prototype.toXML = function () {
        return '<block type="ConditionComparisonBlock"></block>';
    };
    ConditionComparisonBlock.prototype.toDartCode = function (block) {
        var operators = {
            'EQ': '==',
            'NEQ': '!=',
            'LT': '<',
            'LTE': '<=',
            'GT': '>',
            'GTE': '>='
        };
        var operator = operators[block.getFieldValue('OPERATION')];
        var order = (operator === '==' || operator === '!=')
            ? ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_EQUALITY
            : ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_RELATIONAL;
        var argument0 = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || '0';
        var argument1 = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || '0';
        var code = argument0 + ' ' + operator + ' ' + argument1;
        return [code, order];
    };
    ConditionComparisonBlock.prototype.onChange = function (changeEvent) {
        if (!this.prevBlocks)
            this.prevBlocks = [null, null];
        var blockA = this.block.getInputTargetBlock('OperandA');
        var blockB = this.block.getInputTargetBlock('OperandB');
        if (blockA &&
            blockB &&
            !this.block.workspace.connectionChecker.doTypeChecks(blockA.outputConnection, blockB.outputConnection)) {
            ngx_blockly_1.Blockly.Events.setGroup(changeEvent.group);
            var prevA = this.prevBlocks[0];
            if (prevA !== blockA) {
                blockA.unplug();
                if (prevA && !prevA.isDisposed() && !prevA.isShadow()) {
                    // The shadow block is automatically replaced during unplug().
                    this.block.getInput('OperandA').connection.connect(prevA.outputConnection);
                }
            }
            var prevB = this.prevBlocks[1];
            if (prevB !== blockB) {
                blockB.unplug();
                if (prevB && !prevB.isDisposed() && !prevB.isShadow()) {
                    // The shadow block is automatically replaced during unplug().
                    this.block.getInput('OperandB').connection.connect(prevB.outputConnection);
                }
            }
            this.block.bumpNeighbours();
            ngx_blockly_1.Blockly.Events.setGroup(false);
        }
        this.prevBlocks[0] = this.block.getInputTargetBlock('OperandA');
        this.prevBlocks[1] = this.block.getInputTargetBlock('OperandB');
    };
    return ConditionComparisonBlock;
}(ngx_blockly_1.CustomBlock));
exports.ConditionComparisonBlock = ConditionComparisonBlock;
//# sourceMappingURL=conditionComparison.block.js.map