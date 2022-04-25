import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

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

    var operators = {
      'EQ': '==',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    };
    var operator = operators[block.getFieldValue('OPERATION')];
    var order = (operator === '==' || operator === '!=')
      ? Blockly[NgxBlocklyGenerator.DART].ORDER_EQUALITY
      : Blockly[NgxBlocklyGenerator.DART].ORDER_RELATIONAL;

    var argument0 = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || '0';
    var argument1 = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || '0';

    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  }
}
