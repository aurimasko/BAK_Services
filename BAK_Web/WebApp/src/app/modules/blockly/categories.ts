import { CustomBlock, Category, Node, VARIABLES_CATEGORY } from 'ngx-blockly';

import { CreateIntVariableBlock } from "../../blocks/variables/createVariable.block";
import { ArithmeticActionBlock } from "../../blocks/arithmetics/arithmeticAction.block";
import { NumberValueBlock } from "../../blocks/arithmetics/numberValue.block";
import { ForLoopBlock } from "../../blocks/loops/forLoop.block";
import { WhileLoopBlock } from "../../blocks/loops/whileLoop.block";
import { DoWhileLoopBlock } from "../../blocks/loops/dowhileLoop.block";
import { LoopFlowStatementsBlock } from "../../blocks/loops/loopFlowStatements.block";
import { Ifblock, IfMutatorBlock, IfAddBlock, ElseBlock } from "../../blocks/conditions/if.block";
import { NotBlock } from "../../blocks/conditions/not.block";
import { NullBlock } from "../../blocks/conditions/null.block";
import { SwitchBlock, SwitchAddBlock, SwitchMutatorBlock } from "../../blocks/conditions/switch.block";
import { SwitchBreakBlock } from "../../blocks/conditions/switchBreak.block";
import { BooleanBlock } from "../../blocks/conditions/boolean.block";
import { ConditionSentenceBlock } from "../../blocks/conditions/conditionSentence.block";
import { ConditionComparisonBlock } from "../../blocks/conditions/conditionComparison.block";
import { ModValueBlock } from "../../blocks/arithmetics/mod.block";
import { PrintfBlock, PrintfAddBlock, PrintfPrintfBlock } from "../../blocks/stdio/printf.block";
import { NewLineBlock } from "../../blocks/stdio/newLine.block";
import { ScanfBlock, ScanfAdd, ScanfScanf } from "../../blocks/stdio/scanf.block";
import { SqrtBlock } from "../../blocks/arithmetics/sqrt.block";
import { PowerBlock } from "../../blocks/arithmetics/pow.block";
import { AbsoluteValBlock } from "../../blocks/arithmetics/absValue.block";
import { StringCompareBlock } from "../../blocks/string/strcmp.block";
import { StringLengthBlock } from "../../blocks/string/strlen.block";
import { StringConcatBlock } from "../../blocks/string/strcat.block";
import { StringValueBlock } from "../../blocks/stdio/stringValue.block";
import { InitMainBlock } from "../../blocks/general/initMain.block";
import { Blockly } from 'ngx-blockly';

export class BlocklyCategories {

  private generalBlocks: CustomBlock[] = [
    new InitMainBlock()
  ];

  private variableBlocks: CustomBlock[] = [
  ];

  private constBlocks: CustomBlock[] = [
    new StringValueBlock(),
    new NumberValueBlock(),
    new BooleanBlock(),
    new NullBlock(),
    new NewLineBlock()
  ];

  private stringBlocks: CustomBlock[] = [
    new StringCompareBlock(),
    new StringLengthBlock(),
    new StringConcatBlock()
  ];

  private arithmeticBlocks: CustomBlock[] = [
    new ArithmeticActionBlock(),
    new PowerBlock(),
    new ModValueBlock(),
    new SqrtBlock(),
    new AbsoluteValBlock()
  ];

  public stdioBlocks: CustomBlock[] = [
    new PrintfBlock(),
    new ScanfBlock()
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
    new ConditionSentenceBlock(),
    new ConditionComparisonBlock()
  ];

  private hidinBlocks: CustomBlock[] = [
    new ScanfAdd(),
    new ScanfScanf(),
    new PrintfAddBlock(),
    new PrintfPrintfBlock(),
    new SwitchAddBlock(),
    new SwitchMutatorBlock(),
    new IfAddBlock(),
    new IfMutatorBlock(),
    new ElseBlock()
  ];

  public allCustomBlocks: CustomBlock[] = this.variableBlocks.concat(this.generalBlocks, this.constBlocks, this.arithmeticBlocks,this.hidinBlocks, this.loopBlocks, this.conditionBlocks, this.stdioBlocks, this.stringBlocks);


  public createFlyout = function (workspace) {
    let xmlList : Element[] = [];
    // Add your button and give it a callback name.
    const button = document.createElement('button');
    button.setAttribute('text', 'Create Typed Variable');
    button.setAttribute('callbackKey', 'callbackName');

    xmlList.push(button);

    // This gets all the variables that the user creates and adds them to the
    // flyout.
    const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
    xmlList = [...blockList];
    console.log(JSON.stringify(xmlList));
    return xmlList;
  };

  public blocklyCategories: Node[] = [
    VARIABLES_CATEGORY,
    new Category('Kintamieji', '#ff0000', [...this.variableBlocks], "VARIABLES1"),
    new Category('Konstantos', '#ff0000', [...this.constBlocks]),
    new Category('Matematika', '#B0BF1A', [...this.arithmeticBlocks]),
    new Category('Ciklai', '#FF9966	', [...this.loopBlocks]),
    new Category('Sąlygos sakiniai', '#007FFF', [...this.conditionBlocks]),
    new Category('Duomenų įvedimas/išvedimas', '#CB4154', [...this.stdioBlocks]),
    new Category('Tekstai ir jų funkcijos', '#7BB661', [...this.stringBlocks])
  ];
}
