import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class DoWhileLoopBlock extends CustomBlock {
  constructor() {
    super('DoWhileLoopBlock');
    this.class = DoWhileLoopBlock;
    this.disabled = true;
  }
  
  public defineBlock() {
    this.block.appendStatementInput("DO_STATEMENT")
      .setCheck(null)
      .appendField("Vykdyti");
    this.block.appendDummyInput()
      .appendField("ir kartoti tol, kol sąlyga yra");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["tiesa", "TRUE"], ["netiesa", "FALSE"]]), "WHILE_CONDITION_OPTION");
    this.block.appendValueInput("WHILE_CONDITION")
      .setCheck("Boolean");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(20);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  public override toXML(): string {
    return '<block type="DoWhileLoopBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var whileConditionIsTrue = block.getFieldValue('WHILE_CONDITION_OPTION') === "true";
    var value_while_condition = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'WHILE_CONDITION', whileConditionIsTrue ? Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT : Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
    var statements_do_statement = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO_STATEMENT');

    statements_do_statement = Blockly[NgxBlocklyGenerator.DART].addLoopTrap(statements_do_statement, block.id); 

    if (!whileConditionIsTrue)
      value_while_condition = '!' + value_while_condition;

    return "do {\n" + statements_do_statement + "}\nwhile(" + value_while_condition + ");";
  }
}


