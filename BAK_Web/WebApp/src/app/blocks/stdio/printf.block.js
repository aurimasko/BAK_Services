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
exports.PrintfPrintfBlock = exports.PrintfAddBlock = exports.PrintfBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var printf_mutator_1 = require("../../mutators/printf.mutator");
var blocks_helper_1 = require("../blocks.helper");
var PrintfBlock = /** @class */ (function (_super) {
    __extends(PrintfBlock, _super);
    function PrintfBlock() {
        var _this = _super.call(this, 'PrintfBlock', new printf_mutator_1.PrintfMutator('printf_mutator', ['PrintfAdd', 'PrintfPrintf'])) || this;
        _this.class = PrintfBlock;
        _this.disabled = true;
        return _this;
    }
    PrintfBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldNumber(0), "COUNT")
            .setVisible(false);
        this.block.appendValueInput("INPUT0")
            .setCheck(null)
            .appendField("Išvesti į ekraną");
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(352);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        this.block.jsonInit({
            'mutator': 'printf_mutator'
        });
        //todo: tooltip
    };
    PrintfBlock.prototype.toXML = function () {
        return '<block type="PrintfBlock"></block>';
    };
    PrintfBlock.prototype.toDartCode = function (block) {
        // Print statement
        var argument = '';
        var typeCode = '';
        var inQutCode = '';
        var outQutCode = '';
        var code = '';
        for (var n = 0; n <= block.getFieldValue("COUNT"); n++) {
            argument = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT' + n, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '';
            var childConnection = block.inputList[n + 1].connection;
            var childBlock = childConnection.targetBlock();
            if (childBlock) {
                var childBlockType = childBlock.type;
                // todo: add new types if there are such
                if (childBlockType === 'ArithmeticActionBlock' ||
                    childBlockType === 'ModValueBlock' ||
                    childBlockType === 'AbsoluteValBlock' ||
                    childBlockType === 'PowerBlock' ||
                    childBlockType === 'SqrtBlock' ||
                    childBlockType === 'StringLengthBlock') {
                    inQutCode += '%d';
                    outQutCode += ', ' + argument;
                }
                else if (childBlockType === 'StringConcatBlock' ||
                    childBlockType === 'StringCompareBlock') {
                    inQutCode += '%s';
                    outQutCode += ', ' + argument;
                }
                else if (childBlockType === 'ConditionComparisonBlock' ||
                    childBlockType === 'ConditionSentenceBlock' ||
                    childBlockType === 'NotBlock' ||
                    childBlockType === 'BooleanBlock' ||
                    childBlockType === 'NullBlock' ||
                    childBlockType === 'SwitchBlock') {
                    childConnection.targetBlock().unplug(true, true);
                }
                else {
                    typeCode = blocks_helper_1.default.varTypeCheckInPrintScan(this.block, argument);
                    if (typeCode === '') {
                        inQutCode += argument;
                    }
                    else {
                        inQutCode += typeCode;
                        outQutCode += ', ' + argument;
                    }
                }
            }
        } // for loop end
        if (outQutCode === '') {
            code = 'printf(\"' + inQutCode + '\");';
        }
        else {
            code = 'printf(\"' + inQutCode + '\"' + outQutCode + ');';
        }
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_['include_C_stdio'] =
            '#include <stdio.h>';
        return code + '\n';
    };
    return PrintfBlock;
}(ngx_blockly_1.CustomBlock));
exports.PrintfBlock = PrintfBlock;
var PrintfAddBlock = /** @class */ (function (_super) {
    __extends(PrintfAddBlock, _super);
    function PrintfAddBlock() {
        var _this = _super.call(this, 'PrintfAddBlock') || this;
        _this.class = PrintfAddBlock;
        _this.disabled = true;
        return _this;
    }
    PrintfAddBlock.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendDummyInput()
            .appendField("Išvestis");
        this.block.setPreviousStatement(true);
        this.block.setNextStatement(true);
        this.block.contextMenu = false;
    };
    PrintfAddBlock.prototype.toXML = function () {
        return '<block type="PrintfAddBlock"></block>';
    };
    PrintfAddBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return PrintfAddBlock;
}(ngx_blockly_1.CustomBlock));
exports.PrintfAddBlock = PrintfAddBlock;
var PrintfPrintfBlock = /** @class */ (function (_super) {
    __extends(PrintfPrintfBlock, _super);
    function PrintfPrintfBlock() {
        var _this = _super.call(this, 'PrintfPrintfBlock') || this;
        _this.class = PrintfPrintfBlock;
        _this.disabled = true;
        return _this;
    }
    PrintfPrintfBlock.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendDummyInput()
            .appendField("Išvesti į ekraną");
        this.block.appendStatementInput('STACK');
        this.block.contextMenu = false;
    };
    PrintfPrintfBlock.prototype.toXML = function () {
        return '<block type="PrintfPrintfBlock"></block>';
    };
    PrintfPrintfBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return PrintfPrintfBlock;
}(ngx_blockly_1.CustomBlock));
exports.PrintfPrintfBlock = PrintfPrintfBlock;
//# sourceMappingURL=printf.block.js.map