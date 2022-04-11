import { Blockly, CustomBlock } from 'ngx-blockly';

export class ScanfBlock extends CustomBlock {
  constructor() {
    super('ScanfBlock');
    this.class = ScanfBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("Variable")
      .appendField("Vartotojo įvestis");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
    //todo: mutator
  }

  public override toXML(): string {
    return '<block type="ScanfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = Blockly['dart'].valueToCode(block, 'INPUT', Blockly['dart'].ORDER_ATOMIC);

    return " ";
  }
}
