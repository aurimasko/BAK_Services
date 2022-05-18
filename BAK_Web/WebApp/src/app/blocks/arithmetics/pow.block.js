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
exports.PowerBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var PowerBlock = /** @class */ (function (_super) {
    __extends(PowerBlock, _super);
    function PowerBlock() {
        var _this = _super.call(this, 'PowerBlock') || this;
        _this.class = PowerBlock;
        _this.disabled = true;
        return _this;
    }
    PowerBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("OperandA")
            .setCheck("Number");
        this.block.appendDummyInput()
            .appendField("pakelti");
        this.block.appendValueInput("OperandB")
            .setCheck("Number")
            .appendField("laipsniu");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Number");
        this.block.setColour(65);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    PowerBlock.prototype.toXML = function () {
        return '<block type="PowerBlock"></block>';
    };
    PowerBlock.prototype.toDartCode = function (block) {
        var value_operanda = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || "0";
        var value_operandb = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || "0";
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_["include_math"] = "#include <math.h>";
        var code = 'pow(' + value_operanda + ', ' + value_operandb + ')';
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return PowerBlock;
}(ngx_blockly_1.CustomBlock));
exports.PowerBlock = PowerBlock;
//# sourceMappingURL=pow.block.js.map