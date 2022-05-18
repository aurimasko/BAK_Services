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
exports.LoopFlowStatementsBlock = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var LoopFlowStatementsBlock = /** @class */ (function (_super) {
    __extends(LoopFlowStatementsBlock, _super);
    function LoopFlowStatementsBlock() {
        var _this = _super.call(this, 'LoopFlowStatementsBlock') || this;
        _this.class = LoopFlowStatementsBlock;
        _this.disabled = true;
        return _this;
    }
    LoopFlowStatementsBlock.prototype.defineBlock = function () {
        this.block.appendDummyInput()
            .appendField(new ngx_blockly_1.Blockly.FieldDropdown([["išeiti iš ciklo", "BREAK"], ["tęsti su kita ciklo iteracija", "CONTINUE"]]), "FLOW_OPTION");
        this.block.setInputsInline(true);
        this.block.setPreviousStatement(true, null);
        this.block.setColour(20);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
        //todo: translations
        //todo: tooltip
    };
    LoopFlowStatementsBlock.prototype.toXML = function () {
        return '<block type="LoopFlowStatementsBlock"></block>';
    };
    LoopFlowStatementsBlock.prototype.toDartCode = function (block) {
        switch (block.getFieldValue('FLOW_OPTION')) {
            case 'BREAK':
                return 'break;\n';
            case 'CONTINUE':
                return 'continue;\n';
        }
        throw 'Unknown flow statement.';
    };
    LoopFlowStatementsBlock.prototype.onChange = function (changeEvent) {
        if (!this.block.workspace) {
            return;
        }
        var legal = false;
        var block = this.block;
        do {
            if (block.type === 'ForLoopBlock' || block.type === 'WhileLoopBlock' || block.type === 'DoWhileLoopBlock') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            this.block.setWarningText(null);
        }
        else {
            this.block.setWarningText("Šis blokas gali būti naudojamas tik ciklo bloko viduje");
        }
    };
    return LoopFlowStatementsBlock;
}(ngx_blockly_1.CustomBlock));
exports.LoopFlowStatementsBlock = LoopFlowStatementsBlock;
//# sourceMappingURL=loopFlowStatements.block.js.map