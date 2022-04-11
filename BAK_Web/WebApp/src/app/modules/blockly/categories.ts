import { CustomBlock, Category, Node, VARIABLES_CATEGORY } from 'ngx-blockly';

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
import { NewLineBlock } from "../../blocks/stdio/newLine.block";
import { ScanfBlock } from "../../blocks/stdio/scanf.block";
import { SqrtBlock } from "../../blocks/arithmetics/sqrt.block";
import { AbsoluteValBlock } from "../../blocks/arithmetics/absValue.block";
import { StringCompareBlock } from "../../blocks/string/strcmp.block";
import { StringLengthBlock } from "../../blocks/string/strlen.block";
import { StringConcatBlock } from "../../blocks/string/strcat.block";

export class BlocklyCategories {

  private stringBlocks: CustomBlock[] = [
    new StringCompareBlock(),
    new StringLengthBlock(),
    new StringConcatBlock()
  ];

  private arithmeticBlocks: CustomBlock[] = [
    new ArithmeticActionBlock(),
    new NumberValueBlock(),
    new ModValueBlock(),
    new SqrtBlock(),
    new AbsoluteValBlock()
  ];

  public stdioBlocks: CustomBlock[] = [
    new PrintfBlock(),
    new ScanfBlock(),
  new NewLineBlock()
  ];

  private loopBlocks: CustomBlock[] = [
    new ForLoopBlock(),
    new WhileLoopBlock(),
    new DoWhileLoopBlock(),
    new LoopFlowStatementsBlock()
  ];

  private conditionBlocks: CustomBlock[] = [
    new Ifblock(),
    new NotBlock(),
    new NullBlock(),
    new SwitchBlock(),
    new SwitchBreakBlock(),
    new BooleanBlock(),
    new ConditionSentenceBlock(),
    new ConditionComparisonBlock()
  ];

  public allCustomBlocks: CustomBlock[] = this.arithmeticBlocks.concat(this.loopBlocks, this.conditionBlocks, this.stdioBlocks, this.stringBlocks);


  public blocklyCategories: Node[] = [
    VARIABLES_CATEGORY,
    new Category('Matematika', '#ff0000', [...this.arithmeticBlocks]),
    new Category('Ciklai', '#ff0000', [...this.loopBlocks]),
    new Category('Sąlygos sakiniai', '#ff0000', [...this.conditionBlocks]),
    new Category('Duomenų įvedimas/išvedimas', '#ff0000', [...this.stdioBlocks]),
    new Category('Tekstai ir jų funkcijos', '#ff0000', [...this.stringBlocks])
  ];
}
