import { Blockly, CustomBlock } from 'ngx-blockly';

export class StringCompareBlock extends CustomBlock {
  constructor() {
    super('StringCompareBlock');
    this.class = StringCompareBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck("String")
      .appendField("Tiesa, jei tekstas");
    this.block.appendValueInput("OperandB")
      .setCheck("String")
      .appendField("lygus tekstui");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Boolean");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringCompareBlock"></block>';
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
