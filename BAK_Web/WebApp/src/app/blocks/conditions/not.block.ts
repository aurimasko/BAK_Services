import { Blockly, CustomBlock } from 'ngx-blockly';

export class NotBlock extends CustomBlock {
  constructor() {
    super('NotBlock');
    this.class = NotBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("NAME")
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
    var value_name = Blockly['dart'].valueToCode(block, 'NAME', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];

    //todo: change ORDER_NONE to custom
    //todo: change ORDER_ATOMIC to custom
  }
}
