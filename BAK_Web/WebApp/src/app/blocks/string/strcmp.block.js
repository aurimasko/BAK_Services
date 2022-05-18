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
exports.StringCompareBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var StringCompareBlock = /** @class */ (function (_super) {
    __extends(StringCompareBlock, _super);
    function StringCompareBlock() {
        var _this = _super.call(this, 'StringCompareBlock') || this;
        _this.class = StringCompareBlock;
        _this.disabled = true;
        return _this;
    }
    StringCompareBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("OperandA")
            .setCheck("String")
            .appendField("Tiesa, jei tekstas");
        this.block.appendValueInput("OperandB")
            .setCheck("String")
            .appendField("lygus tekstui");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Boolean");
        this.block.setColour(102);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    StringCompareBlock.prototype.toXML = function () {
        return '<block type="StringCompareBlock"></block>';
    };
    StringCompareBlock.prototype.toDartCode = function (block) {
        var value_operanda = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
        var value_operandb = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_["include_string"] = "#include <string.h>";
        var code = 'strcmp(' + value_operanda + ', ' + value_operandb + ')';
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return StringCompareBlock;
}(ngx_blockly_1.CustomBlock));
exports.StringCompareBlock = StringCompareBlock;
//# sourceMappingURL=strcmp.block.js.map