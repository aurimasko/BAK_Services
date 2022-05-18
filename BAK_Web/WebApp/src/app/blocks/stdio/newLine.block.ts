import { Blockly, CustomBlock } from 'ngx-blockly';

export class NewLineBlock extends CustomBlock {
  constructor() {
    super('NewLineBlock');
    this.class = NewLineBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Naujos eilutės simbolis");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "String");
    this.block.setColour(0);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="NewLineBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "\n";
  }
}
