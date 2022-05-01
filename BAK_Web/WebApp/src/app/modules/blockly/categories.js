"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocklyCategories = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var createVariable_block_1 = require("../../blocks/variables/createVariable.block");
var arithmeticAction_block_1 = require("../../blocks/arithmetics/arithmeticAction.block");
var numberValue_block_1 = require("../../blocks/arithmetics/numberValue.block");
var forLoop_block_1 = require("../../blocks/loops/forLoop.block");
var whileLoop_block_1 = require("../../blocks/loops/whileLoop.block");
var dowhileLoop_block_1 = require("../../blocks/loops/dowhileLoop.block");
var loopFlowStatements_block_1 = require("../../blocks/loops/loopFlowStatements.block");
var if_block_1 = require("../../blocks/conditions/if.block");
var not_block_1 = require("../../blocks/conditions/not.block");
var null_block_1 = require("../../blocks/conditions/null.block");
var switch_block_1 = require("../../blocks/conditions/switch.block");
var switchBreak_block_1 = require("../../blocks/conditions/switchBreak.block");
var boolean_block_1 = require("../../blocks/conditions/boolean.block");
var conditionSentence_block_1 = require("../../blocks/conditions/conditionSentence.block");
var conditionComparison_block_1 = require("../../blocks/conditions/conditionComparison.block");
var mod_block_1 = require("../../blocks/arithmetics/mod.block");
var printf_block_1 = require("../../blocks/stdio/printf.block");
var newLine_block_1 = require("../../blocks/stdio/newLine.block");
var scanf_block_1 = require("../../blocks/stdio/scanf.block");
var sqrt_block_1 = require("../../blocks/arithmetics/sqrt.block");
var pow_block_1 = require("../../blocks/arithmetics/pow.block");
var absValue_block_1 = require("../../blocks/arithmetics/absValue.block");
var strcmp_block_1 = require("../../blocks/string/strcmp.block");
var strlen_block_1 = require("../../blocks/string/strlen.block");
var strcat_block_1 = require("../../blocks/string/strcat.block");
var stringValue_block_1 = require("../../blocks/stdio/stringValue.block");
var initMain_block_1 = require("../../blocks/general/initMain.block");
var BlocklyCategories = /** @class */ (function () {
    function BlocklyCategories() {
        this.generalBlocks = [
            new initMain_block_1.InitMainBlock()
        ];
        this.variableBlocks = [
            new createVariable_block_1.CreateVariableBlock()
        ];
        this.stringBlocks = [
            new strcmp_block_1.StringCompareBlock(),
            new strlen_block_1.StringLengthBlock(),
            new strcat_block_1.StringConcatBlock(),
            new stringValue_block_1.StringValueBlock()
        ];
        this.arithmeticBlocks = [
            new arithmeticAction_block_1.ArithmeticActionBlock(),
            new pow_block_1.PowerBlock(),
            new numberValue_block_1.NumberValueBlock(),
            new mod_block_1.ModValueBlock(),
            new sqrt_block_1.SqrtBlock(),
            new absValue_block_1.AbsoluteValBlock()
        ];
        this.stdioBlocks = [
            new printf_block_1.PrintfBlock(),
            new scanf_block_1.ScanfBlock(),
            new newLine_block_1.NewLineBlock()
        ];
        this.loopBlocks = [
            new forLoop_block_1.ForLoopBlock(),
            new whileLoop_block_1.WhileLoopBlock(),
            new dowhileLoop_block_1.DoWhileLoopBlock(),
            new loopFlowStatements_block_1.LoopFlowStatementsBlock()
        ];
        this.conditionBlocks = [
            new if_block_1.Ifblock(),
            new not_block_1.NotBlock(),
            new null_block_1.NullBlock(),
            new switch_block_1.SwitchBlock(),
            new switchBreak_block_1.SwitchBreakBlock(),
            new boolean_block_1.BooleanBlock(),
            new conditionSentence_block_1.ConditionSentenceBlock(),
            new conditionComparison_block_1.ConditionComparisonBlock()
        ];
        this.hidinBlocks = [
            new scanf_block_1.ScanfAdd(),
            new scanf_block_1.ScanfScanf(),
            new printf_block_1.PrintfAddBlock(),
            new printf_block_1.PrintfPrintfBlock(),
            new switch_block_1.SwitchAddBlock(),
            new switch_block_1.SwitchMutatorBlock(),
            new if_block_1.IfAddBlock(),
            new if_block_1.IfMutatorBlock(),
            new if_block_1.ElseBlock()
        ];
        this.allCustomBlocks = this.variableBlocks.concat(this.generalBlocks, this.arithmeticBlocks, this.hidinBlocks, this.loopBlocks, this.conditionBlocks, this.stdioBlocks, this.stringBlocks);
        this.blocklyCategories = [
            ngx_blockly_1.VARIABLES_CATEGORY,
            //  new Category('Kintamieji', '#ff0000', [...this.variableBlocks]),
            new ngx_blockly_1.Category('Matematika', '#ff0000', __spreadArray([], this.arithmeticBlocks)),
            new ngx_blockly_1.Category('Ciklai', '#ff0000', __spreadArray([], this.loopBlocks)),
            new ngx_blockly_1.Category('Sąlygos sakiniai', '#ff0000', __spreadArray([], this.conditionBlocks)),
            new ngx_blockly_1.Category('Duomenų įvedimas/išvedimas', '#ff0000', __spreadArray([], this.stdioBlocks)),
            new ngx_blockly_1.Category('Tekstai ir jų funkcijos', '#ff0000', __spreadArray([], this.stringBlocks))
        ];
    }
    return BlocklyCategories;
}());
exports.BlocklyCategories = BlocklyCategories;
//# sourceMappingURL=categories.js.map