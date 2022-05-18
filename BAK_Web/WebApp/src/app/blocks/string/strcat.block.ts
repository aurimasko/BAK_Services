import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class StringConcatBlock extends CustomBlock {
  constructor() {
    super('StringConcatBlock');
    this.class = StringConcatBlock;
    this.disabled = true;
  }

  public defineBlock() {


    this.block.appendValueInput("OperandA")
      .setCheck("String")
      .appendField("Prie teksto");
    this.block.appendValueInput("OperandB")
      .setCheck("String")
      .appendField("prijungti tekstą");
    this.block.setOutput(false);
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(102);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringConcatBlock"></block>';
  }
  
  public override  toDartCode(block: any): string | any[] {
    var value_operanda =
      Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";
    var value_operandb =
      Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "\"\"";

    Blockly[NgxBlocklyGenerator.DART].definitions_["include_string"] = "#include <string.h>";

    var code = "strcat(" + value_operanda + ", " + value_operandb + ")";
    return code;
  }
}
