import { Blockly, CustomBlock } from 'ngx-blockly';

export class ModValueBlock extends CustomBlock {
  constructor() {
    super('ModValueBlock');
    this.class = ModValueBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("DIVIDEND")
      .setCheck("Number")
      .appendField("Dalybos liekana");
    this.block.appendValueInput("DIVISOR")
      .setCheck("Number")
      .appendField("iš");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Number");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip, geresnis tekstas
  }

  public override toXML(): string {
    return '<block type="ModValueBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_dividend = Blockly['dart'].valueToCode(block, 'DIVIDEND', Blockly['dart'].ORDER_ATOMIC);
    var value_divisor = Blockly['dart'].valueToCode(block, 'DIVISOR', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];

    //todo: new ORDER_NONE, ORDER_aTOMIC
  }
}
