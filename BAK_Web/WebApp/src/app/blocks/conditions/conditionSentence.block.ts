import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

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
    var operator = block.getFieldValue('OPERATION') === "AND" ? "&&" : "||";
    var order = operator === "&&" ? Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_AND : Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_OR;

    var value_operanda = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || 'false';
    var value_operandb = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || 'false';

    var code = value_operanda + " " + operator + " " + value_operandb;
    return [code, order];
  }
}
