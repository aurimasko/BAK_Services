import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class StringLengthBlock extends CustomBlock {
  constructor() {
    super('StringLengthBlock');
    this.class = StringLengthBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("String")
      .appendField("Teksto");
    this.block.appendDummyInput()
      .appendField("ilgis");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(102);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringLengthBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
    var code = 'strlen(' + value_input + ')';
     Blockly[NgxBlocklyGenerator.DART].definitions_["include_string"] = "#include <string.h>";

    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
