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
exports.IfMutatorBlock = exports.IfAddBlock = exports.ElseBlock = exports.Ifblock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var if_mutator_1 = require("../../mutators/if.mutator");
var Ifblock = /** @class */ (function (_super) {
    __extends(Ifblock, _super);
    function Ifblock() {
        var _this = _super.call(this, 'Ifblock', new if_mutator_1.IfMutator('if_mutator', ['IfAddBlock', 'IfMutatorBlock', 'ElseBlock'])) || this;
        _this.class = Ifblock;
        _this.disabled = true;
        return _this;
    }
    Ifblock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldNumber(0), "ELSECOUNT")
            .setVisible(false);
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldNumber(0), "COUNT")
            .setVisible(false);
        this.block.appendValueInput("CONDITION0")
            .setCheck("Boolean")
            .appendField("Jei");
        this.block.appendStatementInput("DO0")
            .setCheck(null)
            .appendField("Vykdyti");
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(230);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        this.block.jsonInit({
            'mutator': 'if_mutator'
        });
        //todo: tooltip
        //todo: helpurl
    };
    Ifblock.prototype.toXML = function () {
        return '<block type="Ifblock"></block>';
    };
    Ifblock.prototype.toDartCode = function (block) {
        var n = 0;
        var argument = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'CONDITION' + n, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
        var branch = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'DO' + n);
        var code = 'if (' + argument + ') {\n' + branch + '}';
        for (n = 1; n <= block.getFieldValue("COUNT"); n++) {
            argument = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'CONDITION' + n, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
            branch = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (block.getFieldValue("ELSECOUNT") > 0) {
            branch = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].statementToCode(block, 'ELSE_DO');
            code += ' else {\n' + branch + '}';
        }
        return code + '\n';
    };
    return Ifblock;
}(ngx_blockly_1.CustomBlock));
exports.Ifblock = Ifblock;
var ElseBlock = /** @class */ (function (_super) {
    __extends(ElseBlock, _super);
    function ElseBlock() {
        var _this = _super.call(this, 'ElseBlock') || this;
        _this.class = ElseBlock;
        _this.disabled = true;
        return _this;
    }
    ElseBlock.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendStatementInput("ELSE_DO")
            .setCheck(null)
            .appendField("Jei visa kita, vykdyti ");
        this.block.setPreviousStatement(true);
        this.block.setNextStatement(true);
        this.block.contextMenu = false;
    };
    ElseBlock.prototype.toXML = function () {
        return '<block type="ElseBlock"></block>';
    };
    ElseBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return ElseBlock;
}(ngx_blockly_1.CustomBlock));
exports.ElseBlock = ElseBlock;
var IfAddBlock = /** @class */ (function (_super) {
    __extends(IfAddBlock, _super);
    function IfAddBlock() {
        var _this = _super.call(this, 'IfAddBlock') || this;
        _this.class = IfAddBlock;
        _this.disabled = true;
        return _this;
    }
    IfAddBlock.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("Jei");
        this.block.appendStatementInput("DO")
            .setCheck(null)
            .appendField("Vykdyti");
        this.block.setPreviousStatement(true);
        this.block.setNextStatement(true);
        this.block.contextMenu = false;
    };
    IfAddBlock.prototype.toXML = function () {
        return '<block type="IfAddBlock"></block>';
    };
    IfAddBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return IfAddBlock;
}(ngx_blockly_1.CustomBlock));
exports.IfAddBlock = IfAddBlock;
var IfMutatorBlock = /** @class */ (function (_super) {
    __extends(IfMutatorBlock, _super);
    function IfMutatorBlock() {
        var _this = _super.call(this, 'IfMutatorBlock') || this;
        _this.class = IfMutatorBlock;
        _this.disabled = true;
        return _this;
    }
    IfMutatorBlock.prototype.defineBlock = function () {
        this.block.setColour(280);
        this.block.appendDummyInput()
            .appendField("Sąlygos sakinys");
        this.block.appendStatementInput('STACK');
    };
    IfMutatorBlock.prototype.toXML = function () {
        return '<block type="IfMutatorBlock"></block>';
    };
    IfMutatorBlock.prototype.toDartCode = function (block) {
        return "";
    };
    return IfMutatorBlock;
}(ngx_blockly_1.CustomBlock));
exports.IfMutatorBlock = IfMutatorBlock;
//# sourceMappingURL=if.block.js.map