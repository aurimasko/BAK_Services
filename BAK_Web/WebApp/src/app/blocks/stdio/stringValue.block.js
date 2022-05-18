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
exports.StringValueBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var StringValueBlock = /** @class */ (function (_super) {
    __extends(StringValueBlock, _super);
    function StringValueBlock() {
        var _this = _super.call(this, 'StringValueBlock') || this;
        _this.class = StringValueBlock;
        _this.disabled = true;
        return _this;
    }
    StringValueBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("Tekstas")
            .appendField(new ngx_blockly_1.Blockly.FieldTextInput(""), "INPUT");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "String");
        this.block.setColour(0);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    StringValueBlock.prototype.toXML = function () {
        return '<block type="StringValueBlock"></block>';
    };
    StringValueBlock.prototype.toDartCode = function (block) {
        var value_input = block.getFieldValue("INPUT");
        var code = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].quote_(value_input);
        if (block.getParent()
            && block.getParent().type === 'PrintfBlock') {
            return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
        }
        else if (code.length === 1) {
            code = '\'' + code + '\'';
        }
        else {
            code = '\"' + code + '\"';
        }
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return StringValueBlock;
}(ngx_blockly_1.CustomBlock));
exports.StringValueBlock = StringValueBlock;
//# sourceMappingURL=stringValue.block.js.map