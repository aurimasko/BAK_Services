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
exports.AbsoluteValBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var AbsoluteValBlock = /** @class */ (function (_super) {
    __extends(AbsoluteValBlock, _super);
    function AbsoluteValBlock() {
        var _this = _super.call(this, 'AbsoluteValBlock') || this;
        _this.class = AbsoluteValBlock;
        _this.disabled = true;
        return _this;
    }
    AbsoluteValBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("INPUT")
            .setCheck("Number")
            .appendField("Skaičiaus");
        this.block.appendDummyInput()
            .appendField("modulis");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Number");
        this.block.setColour(65);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    AbsoluteValBlock.prototype.toXML = function () {
        return '<block type="AbsoluteValBlock"></block>';
    };
    AbsoluteValBlock.prototype.toDartCode = function (block) {
        var value_input = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_["include_stdlib"] = "#include <stdlib.h>";
        var code = 'abs(' + value_input + ')';
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE];
    };
    return AbsoluteValBlock;
}(ngx_blockly_1.CustomBlock));
exports.AbsoluteValBlock = AbsoluteValBlock;
//# sourceMappingURL=absValue.block.js.map