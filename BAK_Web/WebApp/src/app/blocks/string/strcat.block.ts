import { Blockly, CustomBlock } from 'ngx-blockly';

export class StringConcatBlock extends CustomBlock {
  constructor() {
    super('StringConcatBlock');
    this.class = StringConcatBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck("String")
      .appendField("Prie teksto");
    this.block.appendValueInput("OperandB")
      .setCheck("String")
      .appendField("prijungti tekstą");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringConcatBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_operanda = Blockly['dart'].valueToCode(block, 'OperandA', Blockly['dart'].ORDER_ATOMIC);
    var value_operandb = Blockly['dart'].valueToCode(block, 'OperandB', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];
    //todo: new ORDER_NONE, ORDER_aTOMIC
  }
}
