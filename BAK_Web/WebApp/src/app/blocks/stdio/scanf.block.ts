import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import { ScanfMutator } from '../../mutators/scanf.mutator';
import BlocksHelper from '../blocks.helper';

export class ScanfBlock extends CustomBlock {
  constructor() {
    super('ScanfBlock', new ScanfMutator('scanf_mutator', ['ScanfAdd', 'ScanfScanf']));
    this.class = ScanfBlock;
    this.disabled = true;
 
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "COUNT")
      .setVisible(false);

    this.block.appendValueInput("INPUT0")
      .setCheck("Variable")
      .appendField("Vartotojo duomenų įvestis");
    
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(352);

    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.jsonInit({
      'mutator': 'scanf_mutator'
    });

    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="ScanfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    // Scan statement
    var argument = '';
    var typeCode = '';
    var inQutCode = '';
    var outQutCode = '';
    var code = '';

    for (var n = 0; n <= block.getFieldValue("COUNT"); n++) {
      argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT' + n,
        Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '';

      if (block.inputList[n + 1].connection == null)
        continue;

      var childConnection = block.inputList[n + 1].connection;
      var childBlock = childConnection.targetBlock();

      if (childBlock) {
        var childBlockType = childBlock.type;

        if (childBlockType ==='variables_get') 
        {
          typeCode = BlocksHelper.varTypeCheckInPrintScan(this.block, argument);

          inQutCode += typeCode;
          outQutCode += ', &' + argument;
        }
      }
    } 

    if (outQutCode === '') {
      code = 'scanf(\"' + inQutCode + '\");';
    } else {
      code = 'scanf(\"' + inQutCode + '\"' + outQutCode + ');';
    }

    Blockly[NgxBlocklyGenerator.DART].definitions_['include_C_stdio'] =
      '#include <stdio.h>';
    return code + '\n';
  }

}

export class ScanfScanf extends CustomBlock {
  constructor() {
    super('ScanfScanf');
    this.class = ScanfScanf;
    this.disabled = true;
  }

  public defineBlock() {

    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Vartotojo duomenų įvestis");
    this.block.appendStatementInput('STACK');
  }

  public override toXML(): string {
    return '<block type="ScanfScanf"></block>';
  }

  public override  toDartCode(block: any): string | any[] {

    return " ";
  }
}


export class ScanfAdd extends CustomBlock {
  constructor() {
    super('ScanfAdd');
    this.class = ScanfAdd;
  }

  public defineBlock() {

    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Vartotojo įvestis");
    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
  }

  public override toXML(): string {
    return '<block type="ScanfAdd"></block>';
  }

  public override  toDartCode(block: any): string | any[] {

    return " ";
  }
}
