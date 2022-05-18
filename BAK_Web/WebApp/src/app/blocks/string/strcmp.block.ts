import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class StringCompareBlock extends CustomBlock {
  constructor() {
    super('StringCompareBlock');
    this.class = StringCompareBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck("String")
      .appendField("Tiesa, jei tekstas");
    this.block.appendValueInput("OperandB")
      .setCheck("String")
      .appendField("lygus tekstui");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Boolean");
    this.block.setColour(102);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringCompareBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_operanda = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
    var value_operandb = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";

    Blockly[NgxBlocklyGenerator.DART].definitions_["include_string"] = "#include <string.h>";

    var code = 'strcmp(' + value_operanda + ', ' + value_operandb + ')';
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
