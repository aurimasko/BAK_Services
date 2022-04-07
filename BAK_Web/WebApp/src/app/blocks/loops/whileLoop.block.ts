import { Blockly, CustomBlock } from 'ngx-blockly';
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
    var dropdown_while_condition_option = Blockly['dart'].getFieldValue('WHILE_CONDITION_OPTION');
    var value_while_condition = Blockly['dart'].valueToCode(block, 'WHILE_CONDITION', Blockly['dart'].ORDER_ATOMIC);
    var statements_do = Blockly['dart'].statementToCode(block, 'DO');

    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  }
}


