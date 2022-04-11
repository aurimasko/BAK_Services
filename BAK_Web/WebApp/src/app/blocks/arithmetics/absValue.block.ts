import { Blockly, CustomBlock } from 'ngx-blockly';

export class AbsoluteValBlock extends CustomBlock {
  constructor() {
    super('AbsoluteValBlock');
    this.class = AbsoluteValBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("Number")
      .appendField("Skaičiaus");
    this.block.appendDummyInput()
      .appendField("modulis");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="AbsoluteValBlock"></block>';
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
