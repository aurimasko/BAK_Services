import { Blockly, CustomBlock } from 'ngx-blockly';
declare var require: any;

const dartGenerator = require('blockly/dart');

export class ForLoopBlock extends CustomBlock {
  constructor() {
    super('ForLoopBlock');
    this.class = ForLoopBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Skaičiuoti su ");
    this.block.appendValueInput("FROM")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldVariable("i"), "VAR").appendField("nuo");
 
    this.block.appendDummyInput()
      .appendField("iki");
    this.block.appendValueInput("TO")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.block.appendDummyInput()
      .appendField("pakeliant po");
    this.block.appendValueInput("BY")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.block.appendStatementInput("DO_ACTION")
      .setCheck(null)
      .appendField("Vykdyti");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);

    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
  }

  public override toXML(): string {
    return '<block type="ForLoopBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var variable_var = dartGenerator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value_from = dartGenerator.valueToCode(block, 'FROM', dartGenerator.ORDER_ATOMIC);
    var value_to = dartGenerator.valueToCode(block, 'TO', dartGenerator.ORDER_ATOMIC);
    var value_by = dartGenerator.valueToCode(block, 'BY', dartGenerator.ORDER_ATOMIC);
    var statements_do_action = dartGenerator.statementToCode(block, 'DO_ACTION');

    console.log('test ' + variable_var + ' ' + value_from + ' ' + value_to + ', ' + value_by);
    return "for(" + variable_var + " = " + value_from + "; " +
    variable_var + "< " + value_to + "; " + variable_var + "+=" + value_by;
  }
}
