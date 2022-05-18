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
exports.NotBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var NotBlock = /** @class */ (function (_super) {
    __extends(NotBlock, _super);
    function NotBlock() {
        var _this = _super.call(this, 'NotBlock') || this;
        _this.class = NotBlock;
        _this.disabled = true;
        return _this;
    }
    NotBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("INPUT")
            .setCheck("Boolean")
            .appendField("priešingai nei");
        this.block.setOutput(true, null);
        this.block.setColour(0);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
        //todo: helpurl
    };
    NotBlock.prototype.toXML = function () {
        return '<block type="NotBlock"></block>';
    };
    NotBlock.prototype.toDartCode = function (block) {
        var input = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT);
        var code = '!' + input;
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT];
    };
    return NotBlock;
}(ngx_blockly_1.CustomBlock));
exports.NotBlock = NotBlock;
//# sourceMappingURL=not.block.js.map