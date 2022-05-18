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
exports.ArithmeticActionBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ArithmeticActionBlock = /** @class */ (function (_super) {
    __extends(ArithmeticActionBlock, _super);
    function ArithmeticActionBlock() {
        var _this = _super.call(this, 'ArithmeticActionBlock') || this;
        _this.class = ArithmeticActionBlock;
        _this.disabled = true;
        return _this;
    }
    ArithmeticActionBlock.prototype.defineBlock = function () {
        this.block.appendValueInput("OperandA")
            .setCheck("Number");
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["pridėti", "ADD"], ["atimti", "MINUS"], ["dauginti", "MULTIPLY"], ["dalinti", "DIVIDE"]]), "Operator");
        this.block.appendValueInput("OperandB")
            .setCheck("Number");
        this.block.setInputsInline(true);
        this.block.setOutput(true);
        this.block.setColour(65);
        this.block.setTooltip("Aritmetinio veiksmo (sudėtis, atimtis, daugyba, dalyba) atlikimas");
    };
    ArithmeticActionBlock.prototype.toXML = function () {
        return '<block type="ArithmeticActionBlock"></block>';
    };
    ArithmeticActionBlock.prototype.toDartCode = function (block) {
        var possibleOperatorsDetails = {
            "ADD": ["+", ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_ADDITION],
            "MINUS": ["-", ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_SUBTRACTION],
            "MULTIPLY": ["*", ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_MULTIPLICATION],
            "DIVIDE": ["/", ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].ORDER_DIVISION]
        };
        var selectedOperatorDetails = possibleOperatorsDetails[block.getFieldValue("Operator")];
        var operator = selectedOperatorDetails[0];
        var order = selectedOperatorDetails[1];
        var inputA = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || '0';
        var inputB = ngx_blockly_1.Blockly[ngx_blockly_1.NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || '0';
        var code = inputA + " " + operator + " " + inputB;
        return [code, order];
    };
    return ArithmeticActionBlock;
}(ngx_blockly_1.CustomBlock));
exports.ArithmeticActionBlock = ArithmeticActionBlock;
//# sourceMappingURL=arithmeticAction.block.js.map