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
exports.NumberValueBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var NumberValueBlock = /** @class */ (function (_super) {
    __extends(NumberValueBlock, _super);
    function NumberValueBlock() {
        var _this = _super.call(this, 'NumberValueBlock') || this;
        _this.class = NumberValueBlock;
        _this.disabled = true;
        return _this;
    }
    NumberValueBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .setAlign(ngx_blockly_1.Blockly.ALIGN_CENTRE)
            .appendField("Skaičius");
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldNumber(0), "INSERTED_VALUE");
        this.block.setOutput(true, "Number");
        this.block.setInputsInline(true);
        this.block.setColour(0);
        this.block.setTooltip("Įrašyti skaitinę reikšmę");
    };
    NumberValueBlock.prototype.toXML = function () {
        return '<block type="NumberValueBlock"></block>';
    };
    NumberValueBlock.prototype.toDartCode = function (block) {
        var insertedValue = block.getFieldValue('INSERTED_VALUE');
        return [insertedValue, ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    };
    return NumberValueBlock;
}(ngx_blockly_1.CustomBlock));
exports.NumberValueBlock = NumberValueBlock;
//# sourceMappingURL=numberValue.block.js.map