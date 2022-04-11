import { Blockly, CustomBlock } from 'ngx-blockly';

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
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringLengthBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = Blockly['dart'].valueToCode(block, 'INPUT', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];
    //todo: new ORDER_NONE, ORDER_aTOMIC
  }
}
