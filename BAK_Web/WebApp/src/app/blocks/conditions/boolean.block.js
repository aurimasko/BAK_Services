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
exports.BooleanBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var BooleanBlock = /** @class */ (function (_super) {
    __extends(BooleanBlock, _super);
    function BooleanBlock() {
        var _this = _super.call(this, 'BooleanBlock') || this;
        _this.class = BooleanBlock;
        _this.disabled = true;
        return _this;
    }
    BooleanBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["tiesa", "true"], ["netiesa", "false"]]), "INPUT_SELECTION");
        this.block.setOutput(true, "Boolean");
        this.block.setColour(0);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: tooltip
        //todo: helpurl
    };
    BooleanBlock.prototype.toXML = function () {
        return '<block type="BooleanBlock"></block>';
    };
    BooleanBlock.prototype.toDartCode = function (block) {
        var dropdown_input_selection = block.getFieldValue('INPUT_SELECTION');
        var code;
        if (dropdown_input_selection === "true")
            code = "true";
        else
            code = "false";
        return [code, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_NONE];
    };
    return BooleanBlock;
}(ngx_blockly_1.CustomBlock));
exports.BooleanBlock = BooleanBlock;
//# sourceMappingURL=boolean.block.js.map