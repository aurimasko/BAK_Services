import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import { PrintfMutator } from "../../mutators/printf.mutator";
import BlocksHelper from '../blocks.helper';

export class PrintfBlock extends CustomBlock {
  constructor() {
    super('PrintfBlock', new PrintfMutator('printf_mutator', ['PrintfAdd', 'PrintfPrintf']));
    this.class = PrintfBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "COUNT")
      .setVisible(false);

    this.block.appendValueInput("INPUT0")
      .setCheck(null)
      .appendField("Išvesti į ekraną");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.jsonInit({
      'mutator': 'printf_mutator'
    });
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="PrintfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    // Print statement
    var argument = '';
    var typeCode = '';
    var inQutCode = '';
    var outQutCode = '';
    var code = '';

    for (var n = 0; n <= block.getFieldValue("COUNT"); n++) {
      argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT' + n,
        Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '';

      var childConnection = block.inputList[n + 1].connection;
      var childBlock = childConnection.targetBlock();

      if (childBlock) {
        var childBlockType = childBlock.type;
        // todo: add new types if there are such
        if (
          childBlockType === 'ArithmeticActionBlock' ||
          childBlockType === 'ModValueBlock' ||
          childBlockType === 'AbsoluteValBlock' ||
          childBlockType === 'PowerBlock' ||
          childBlockType === 'SqrtBlock' ||
          childBlockType === 'StringLengthBlock') {
          inQutCode += '%d';
          outQutCode += ', ' + argument;
        }
        else if (childBlockType === 'StringConcatBlock' ||
          childBlockType === 'StringCompareBlock') {
          inQutCode += '%s';
          outQutCode += ', ' + argument;
        }
        else if (childBlockType === 'ConditionComparisonBlock' ||
          childBlockType === 'ConditionSentenceBlock' ||
          childBlockType === 'NotBlock' ||
          childBlockType === 'BooleanBlock' ||
          childBlockType === 'NullBlock' ||
          childBlockType === 'SwitchBlock') {

          childConnection.targetBlock().unplug(true, true);

        } else {
          typeCode = BlocksHelper.varTypeCheckInPrintScan(this.block, argument);

          if (typeCode === '') {
            inQutCode += argument;
          } else {
            inQutCode += typeCode;
            outQutCode += ', ' + argument;
          }
        }
      }
    } // for loop end

    if (outQutCode === '') {
      code = 'printf(\"' + inQutCode + '\");';
    } else {
      code = 'printf(\"' + inQutCode + '\"' + outQutCode + ');';
    }

    Blockly[NgxBlocklyGenerator.DART].definitions_['include_C_stdio'] =
      '#include <stdio.h>';

    return code + '\n';
  }
}

export class PrintfAddBlock extends CustomBlock {
  constructor() {
    super('PrintfAddBlock');
    this.class = PrintfAddBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Išvestis");
    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.contextMenu = false;
  }

  public override toXML(): string {
    return '<block type="PrintfAddBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

export class PrintfPrintfBlock extends CustomBlock {
  constructor() {
    super('PrintfPrintfBlock');
    this.class = PrintfPrintfBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Išvesti į ekraną");
    this.block.appendStatementInput('STACK');
    this.block.contextMenu = false;

  }

  public override toXML(): string {
    return '<block type="PrintfPrintfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

