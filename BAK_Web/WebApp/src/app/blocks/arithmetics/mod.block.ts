import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class ModValueBlock extends CustomBlock {
  constructor() {
    super('ModValueBlock');
    this.class = ModValueBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("DIVIDEND")
      .setCheck("Number")
      .appendField("Dalybos");
    this.block.appendValueInput("DIVISOR")
      .setCheck("Number")
      .appendField("iš");
    this.block.appendDummyInput().appendField("liekana");

    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(65);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="ModValueBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_dividend = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'DIVIDEND', Blockly[NgxBlocklyGenerator.DART].ORDER_MODULUS) || '0';
    var value_divisor = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'DIVISOR', Blockly[NgxBlocklyGenerator.DART].ORDER_MODULUS) || '0';

    var code = value_dividend + " % " + value_divisor;

    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_MODULUS];

  }
}
