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
exports.SqrtBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var SqrtBlock = /** @class */ (function (_super) {
    __extends(SqrtBlock, _super);
    function SqrtBlock() {
        var _this = _super.call(this, 'SqrtBlock') || this;
        _this.class = SqrtBlock;
        _this.disabled = true;
        return _this;
    }
    SqrtBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("INPUT")
            .setCheck("Number")
            .appendField("Šaknis iš");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "Number");
        this.block.setColour(65);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip, geresnis tekstas
    };
    SqrtBlock.prototype.toXML = function () {
        return '<block type="SqrtBlock"></block>';
    };
    SqrtBlock.prototype.toDartCode = function (block) {
        ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].definitions_['include_math'] = "#include <math.h>;";
        var valueInput = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE) || '\'\'';
        var code = "sqrt(" + valueInput + ")";
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE];
    };
    return SqrtBlock;
}(ngx_blockly_1.CustomBlock));
exports.SqrtBlock = SqrtBlock;
//# sourceMappingURL=sqrt.block.js.map