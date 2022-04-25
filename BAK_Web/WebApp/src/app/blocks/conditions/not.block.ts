import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class NotBlock extends CustomBlock {
  constructor() {
    super('NotBlock');
    this.class = NotBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("Boolean")
      .appendField("priešingai nei");
    this.block.setOutput(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
    //todo: helpurl
  }

  public override toXML(): string {
    return '<block type="NotBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var input = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'INPUT', Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT);

    var code = '!' + input;
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT];
  }
}
