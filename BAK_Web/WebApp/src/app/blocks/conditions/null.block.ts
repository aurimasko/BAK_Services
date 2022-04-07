import { Blockly, CustomBlock } from 'ngx-blockly';

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
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: galbut perkelti i kita kategorija
    //todo: tooltip
    //todo: helpurl
  }

  public override toXML(): string {
    return '<block type="NullBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    //todo: change ORDER_NONE

    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];
  }
}
