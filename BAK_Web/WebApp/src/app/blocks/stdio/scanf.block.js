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
exports.ScanfAdd = exports.ScanfScanf = exports.ScanfBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var scanf_mutator_1 = require("../../mutators/scanf.mutator");
var blocks_helper_1 = require("../blocks.helper");
var ScanfBlock = /** @class */ (function (_super) {
    __extends(ScanfBlock, _super);
    function ScanfBlock() {
        var _this = _super.call(this, 'ScanfBlock', new scanf_mutator_1.ScanfMutator('scanf_mutator', ['ScanfAdd', 'ScanfScanf'])) || this;
        _this.class = ScanfBlock;
        _this.disabled = true;
        return _this;
    }
    ScanfBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldNumber(0), "COUNT")
            .setVisible(false);
        this.block.appendValueInput("INPUT0")
            .setCheck("Variable")
            .appendField("Vartotojo duomenų įvestis");
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(352);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        this.block.jsonInit({
            'mutator': 'scanf_mutator'
        });
        //todo: tooltip
    };
    ScanfBlock.prototype.toXML = function () {
        return '<block type="ScanfBlock"></block>';
    };
    ScanfBlock.prototype.toDartCode = function (block) {
        // Scan statement
        var argument = '';
        var typeCode = '';
        var inQutCode = '';
        var outQutCode = '';
        var code = '';
        for (var n = 0; n <= block.getFieldValue("COUNT"); n++) {
            argument = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT' + n, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '';
            if (block.inputList[n + 1].connection == null)
                continue;
            var childConnection = block.inputList[n + 1].connection;
            var childBlock = childConnection.targetBlock();
            if (childBlock) {
                var childBlockType = childBlock.type;
                if (childBlockType === 'variables_get') {
                    typeCode = blocks_helper_1.default.varTypeCheckInPrintScan(this.block, argument);
                    inQutCode += typeCode;
                    outQutCode += ', &' + argument;
                }
            }
        }
        if (outQutCode === '') {
            code = 'scanf(\"' + inQutCode + '\");';
        }
        else {
            code = 'scanf(\"' + inQutCode + '\"' + outQutCode + ');';
        }
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_['include_C_stdio'] =
            '#include <stdio.h>';
        return code + '\n';
    };
    return ScanfBlock;
}(ngx_blockly_1.CustomBlock));
exports.ScanfBlock = ScanfBlock;
var ScanfScanf = /** @class */ (function (_super) {
    __extends(ScanfScanf, _super);
    function ScanfScanf() {
        var _this = _super.call(this, 'ScanfScanf') || this;
        _this.class = ScanfScanf;
        _this.disabled = true;
        return _this;
    }
    ScanfScanf.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendDummyInput()
            .appendField("Vartotojo duomenų įvestis");
        this.block.appendStatementInput('STACK');
    };
    ScanfScanf.prototype.toXML = function () {
        return '<block type="ScanfScanf"></block>';
    };
    ScanfScanf.prototype.toDartCode = function (block) {
        return " ";
    };
    return ScanfScanf;
}(ngx_blockly_1.CustomBlock));
exports.ScanfScanf = ScanfScanf;
var ScanfAdd = /** @class */ (function (_super) {
    __extends(ScanfAdd, _super);
    function ScanfAdd() {
        var _this = _super.call(this, 'ScanfAdd') || this;
        _this.class = ScanfAdd;
        return _this;
    }
    ScanfAdd.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendDummyInput()
            .appendField("Vartotojo įvestis");
        this.block.setPreviousStatement(true);
        this.block.setNextStatement(true);
    };
    ScanfAdd.prototype.toXML = function () {
        return '<block type="ScanfAdd"></block>';
    };
    ScanfAdd.prototype.toDartCode = function (block) {
        return " ";
    };
    return ScanfAdd;
}(ngx_blockly_1.CustomBlock));
exports.ScanfAdd = ScanfAdd;
//# sourceMappingURL=scanf.block.js.map