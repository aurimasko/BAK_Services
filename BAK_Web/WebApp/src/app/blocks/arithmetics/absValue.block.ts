import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class AbsoluteValBlock extends CustomBlock {
  constructor() {
    super('AbsoluteValBlock');
    this.class = AbsoluteValBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("Number")
      .appendField("Skaičiaus");
    this.block.appendDummyInput()
      .appendField("modulis");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="AbsoluteValBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';

    Blockly[NgxBlocklyGenerator.DART].definitions_["include_stdlib"] = "#include <stdlib.h>";

    var code = 'abs(' + value_input + ')';
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_NONE];
  }
}
