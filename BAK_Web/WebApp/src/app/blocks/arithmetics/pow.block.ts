import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class PowerBlock extends CustomBlock {
  constructor() {
    super('PowerBlock');
    this.class = PowerBlock;
    this.disabled = true;
  }

  public defineBlock() {

    this.block.appendValueInput("OperandA")
      .setCheck("Number");
    this.block.appendDummyInput()
      .appendField("pakelti");
    this.block.appendValueInput("OperandB")
      .setCheck("Number")
      .appendField("laipsniu");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="PowerBlock"></block>';
}

  public override  toDartCode(block: any): string | any[] {
    var value_operanda = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "0";
    var value_operandb = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || "0";

    Blockly[NgxBlocklyGenerator.DART].definitions_["include_math"] = "#include <math.h>";

    var code = 'pow(' + value_operanda + ', ' + value_operandb + ')';
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
