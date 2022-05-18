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
exports.StringLengthBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var StringLengthBlock = /** @class */ (function (_super) {
    __extends(StringLengthBlock, _super);
    function StringLengthBlock() {
        var _this = _super.call(this, 'StringLengthBlock') || this;
        _this.class = StringLengthBlock;
        _this.disabled = true;
        return _this;
    }
    StringLengthBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("INPUT")
            .setCheck("String")
            .appendField("Teksto");
        this.block.appendDummyInput()
            .appendField("ilgis");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Number");
        this.block.setColour(102);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    StringLengthBlock.prototype.toXML = function () {
        return '<block type="StringLengthBlock"></block>';
    };
    StringLengthBlock.prototype.toDartCode = function (block) {
        var value_input = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
        var code = 'strlen(' + value_input + ')';
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_["include_string"] = "#include <string.h>";
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return StringLengthBlock;
}(ngx_blockly_1.CustomBlock));
exports.StringLengthBlock = StringLengthBlock;
//# sourceMappingURL=strlen.block.js.map