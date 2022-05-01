import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
declare var require: any;

export class WhileLoopBlock extends CustomBlock {
  constructor() {
    super('WhileLoopBlock');
    this.class = WhileLoopBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Kol ši sąlyga yra");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["tiesa", "true"], ["netiesa", "false"]]), "WHILE_CONDITION_OPTION");
    this.block.appendValueInput("WHILE_CONDITION")
      .setCheck("Boolean");
    this.block.appendDummyInput()
      .appendField("Kartoti");
    this.block.appendStatementInput("DO")
      .setCheck(null);
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  public override toXML(): string {
    return '<block type="WhileLoopBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var whileConditionIsTrue = block.getFieldValue('WHILE_CONDITION_OPTION') === "true";
    var value_while_condition = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'WHILE_CONDITION', whileConditionIsTrue ? Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT : Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
    var statements_do = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO');

    statements_do = Blockly[NgxBlocklyGenerator.DART].addLoopTrap(statements_do, block.id); 

    if (!whileConditionIsTrue)
      value_while_condition = '!' + value_while_condition;

    return "while(" + value_while_condition + ") {\n" + statements_do + "}\n";
  }
}


