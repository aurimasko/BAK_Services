import { CreateVariableBlock } from "../../blocks/variables/createVariable.block";
import { ArithmeticActionBlock } from "../../blocks/arithmetics/arithmeticAction.block";
import { NumberValueBlock } from "../../blocks/arithmetics/numberValue.block";
import { ForLoopBlock } from "../../blocks/loops/forLoop.block";
import { WhileLoopBlock } from "../../blocks/loops/whileLoop.block";
import { DoWhileLoopBlock } from "../../blocks/loops/dowhileLoop.block";
import { LoopFlowStatementsBlock } from "../../blocks/loops/loopFlowStatements.block";
import { Ifblock } from "../../blocks/conditions/if.block";
import { NotBlock } from "../../blocks/conditions/not.block";
import { NullBlock } from "../../blocks/conditions/null.block";
import { SwitchBlock } from "../../blocks/conditions/switch.block";
import { SwitchBreakBlock } from "../../blocks/conditions/switchBreak.block";
import { BooleanBlock } from "../../blocks/conditions/boolean.block";
import { ConditionSentenceBlock } from "../../blocks/conditions/conditionSentence.block";
import { ConditionComparisonBlock } from "../../blocks/conditions/conditionComparison.block";
import { ModValueBlock } from "../../blocks/arithmetics/mod.block";
import { PrintfBlock } from "../../blocks/stdio/printf.block";

import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    ArithmeticActionBlock,
    NumberValueBlock,
    ForLoopBlock,
    WhileLoopBlock,
    DoWhileLoopBlock,
    LoopFlowStatementsBlock,
    Ifblock,
    NotBlock,
    NullBlock,
    SwitchBlock,
    SwitchBreakBlock,
    BooleanBlock,
    ConditionSentenceBlock,
    ConditionComparisonBlock,
    ModValueBlock,
    PrintfBlock
  ],
  exports: [
    ArithmeticActionBlock,
    NumberValueBlock,
    ForLoopBlock,
    WhileLoopBlock,
    DoWhileLoopBlock,
    LoopFlowStatementsBlock,
    Ifblock,
    NotBlock,
    NullBlock,
    SwitchBlock,
    SwitchBreakBlock,
    BooleanBlock,
    ConditionSentenceBlock,
    ConditionComparisonBlock,
    ModValueBlock,
    PrintfBlock
  ]
})
export class BlocksModule { }
