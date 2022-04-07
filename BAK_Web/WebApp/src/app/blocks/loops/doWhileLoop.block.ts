import { Blockly, CustomBlock } from 'ngx-blockly';
declare var require: any;

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
      .appendField("Kol šį sąlyga yra");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["tiesa", "TRUE"], ["netiesa", "FALSE"]]), "WHILE_CONDITION_OPTION");
    this.block.appendValueInput("WHILE_CONDITION")
      .setCheck("Boolean");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  public override toXML(): string {
    return '<block type="DoWhileLoopBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var statements_do_statement = Blockly['dart'].statementToCode(block, 'DO_STATEMENT');
    var dropdown_while_condition_option = block.getFieldValue('WHILE_CONDITION_OPTION');
    var value_while_condition = Blockly['dart'].valueToCode(block, 'WHILE_CONDITION', Blockly['dart'].ORDER_ATOMIC);

    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  }
}


