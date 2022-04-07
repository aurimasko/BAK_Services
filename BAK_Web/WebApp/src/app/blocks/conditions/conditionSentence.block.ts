import { Blockly, CustomBlock } from 'ngx-blockly';

export class ConditionSentenceBlock extends CustomBlock {
  constructor() {
    super('ConditionSentenceBlock');
    this.class = ConditionSentenceBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck("Boolean");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["ir", "AND"], ["arba", "OR"]]), "OPERATION");
    this.block.appendValueInput("OperandB")
      .setCheck("Boolean");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Boolean");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
    //todo: helpurl
    //todo: sutvarkyti jsonInit

  }

  public override toXML(): string {
    return '<block type="ConditionSentenceBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    //todo: change ORDER_ATOMIC to custom value
    //todo: change ORDER_NONE

    var value_operanda = Blockly['dart'].valueToCode(block, 'OperandA', Blockly['dart'].ORDER_ATOMIC);
    var dropdown_operation = block.getFieldValue('OPERATION');
    var value_operandb = Blockly['dart'].valueToCode(block, 'OperandB', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];
  }
}
