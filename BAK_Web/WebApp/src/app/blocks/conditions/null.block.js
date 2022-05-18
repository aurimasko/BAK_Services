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
exports.NullBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var NullBlock = /** @class */ (function (_super) {
    __extends(NullBlock, _super);
    function NullBlock() {
        var _this = _super.call(this, 'NullBlock') || this;
        _this.class = NullBlock;
        _this.disabled = true;
        return _this;
    }
    NullBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("null");
        this.block.setOutput(true, null);
        this.block.setColour(0);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
        //todo: helpurl
    };
    NullBlock.prototype.toXML = function () {
        return '<block type="NullBlock"></block>';
    };
    NullBlock.prototype.toDartCode = function (block) {
        var code = 'null';
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return NullBlock;
}(ngx_blockly_1.CustomBlock));
exports.NullBlock = NullBlock;
//# sourceMappingURL=null.block.js.map