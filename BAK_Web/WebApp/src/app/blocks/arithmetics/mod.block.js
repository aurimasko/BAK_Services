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
exports.ModValueBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ModValueBlock = /** @class */ (function (_super) {
    __extends(ModValueBlock, _super);
    function ModValueBlock() {
        var _this = _super.call(this, 'ModValueBlock') || this;
        _this.class = ModValueBlock;
        _this.disabled = true;
        return _this;
    }
    ModValueBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("DIVIDEND")
            .setCheck("Number")
            .appendField("Dalybos liekana");
        this.block.appendValueInput("DIVISOR")
            .setCheck("Number")
            .appendField("iš");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Number");
        this.block.setColour(65);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip, geresnis tekstas
    };
    ModValueBlock.prototype.toXML = function () {
        return '<block type="ModValueBlock"></block>';
    };
    ModValueBlock.prototype.toDartCode = function (block) {
        var value_dividend = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'DIVIDEND', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_MODULUS) || '0';
        var value_divisor = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'DIVISOR', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_MODULUS) || '0';
        var code = value_dividend + " % " + value_divisor;
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_MODULUS];
    };
    return ModValueBlock;
}(ngx_blockly_1.CustomBlock));
exports.ModValueBlock = ModValueBlock;
//# sourceMappingURL=mod.block.js.map