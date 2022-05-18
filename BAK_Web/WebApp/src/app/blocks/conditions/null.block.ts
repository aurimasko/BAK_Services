import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class NullBlock extends CustomBlock {
  constructor() {
    super('NullBlock');
    this.class = NullBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("null");
    this.block.setOutput(true, null);
    this.block.setColour(0);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
    //todo: helpurl
  }

  public override toXML(): string {
    return '<block type="NullBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var code = 'null';
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
