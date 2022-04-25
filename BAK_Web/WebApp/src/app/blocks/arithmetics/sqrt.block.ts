import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class SqrtBlock extends CustomBlock {
  constructor() {
    super('SqrtBlock');
    this.class = SqrtBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("Number")
      .appendField("Šaknis iš");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip, geresnis tekstas
  }

  public override toXML(): string {
    return '<block type="SqrtBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    Blockly[NgxBlocklyGenerator.DART].definitions_['include_math'] = "#include <math.h>;";

    var valueInput = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '\'\'';
    var code = "sqrt(" + valueInput + ")";

    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_NONE];
  }
}
