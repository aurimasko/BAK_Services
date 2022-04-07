import { Blockly, CustomBlock } from 'ngx-blockly';

export class ConditionComparisonBlock extends CustomBlock {
  constructor() {
    super('ConditionComparisonBlock');
    this.class = ConditionComparisonBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck(null);
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["=", "EQ"], ["\\u2260", "NEQ"], ["\\u200F<", "LT"], ["\\u200F\\u2264", "LTE"], ["\\u200F>", "GT"], ["\\u200F\\u2265", "GTE"]]), "OPERATION");
    this.block.appendValueInput("OperandB")
      .setCheck(null);
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Boolean");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    this.block.jsonInit({
      'extensions': 'logic_compare'
    });
    //todo: tooltip
    //todo: helpurl
    //todo: sutvarkyti jsonInit

  }

  public override toXML(): string {
    return '<block type="ConditionComparisonBlock"></block>';
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
