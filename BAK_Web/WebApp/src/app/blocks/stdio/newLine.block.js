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
exports.NewLineBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var NewLineBlock = /** @class */ (function (_super) {
    __extends(NewLineBlock, _super);
    function NewLineBlock() {
        var _this = _super.call(this, 'NewLineBlock') || this;
        _this.class = NewLineBlock;
        _this.disabled = true;
        return _this;
    }
    NewLineBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField("Naujos eilutės simbolis");
        this.block.setInputsInline(true);
        this.block.setOutput(true, "String");
        this.block.setColour(0);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
    };
    NewLineBlock.prototype.toXML = function () {
        return '<block type="NewLineBlock"></block>';
    };
    NewLineBlock.prototype.toDartCode = function (block) {
        return "\n";
    };
    return NewLineBlock;
}(ngx_blockly_1.CustomBlock));
exports.NewLineBlock = NewLineBlock;
//# sourceMappingURL=newLine.block.js.map