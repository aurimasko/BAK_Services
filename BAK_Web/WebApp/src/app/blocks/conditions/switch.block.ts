import { Blockly, CustomBlock } from 'ngx-blockly';

export class SwitchBlock extends CustomBlock {
  constructor() {
    super('SwitchBlock');
    this.class = SwitchBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("EXPRESSION")
      .setCheck(null)
      .appendField("Jei");
    this.block.appendDummyInput()
      .appendField("yra");
    this.block.appendStatementInput("DEFAULT")
      .setCheck(null)
      .appendField("default");
    this.block.appendValueInput("CASE0")
      .setCheck(null)
      .appendField("Case ");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.setMutator(new Blockly.Mutator(['controls_switch_case']));

    //todo: tooltip
    //todo: helpurl
    //todo: aiškiau užvardinti kas čia per blokas
  }

  public override toXML(): string {
    return '<block type="SwitchBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    //todo: change ORDER_ATOMIC

    var value_expression = Blockly['dart'].valueToCode(block, 'EXPRESSION', Blockly['dart'].ORDER_ATOMIC);
    var statements_default = Blockly['dart'].statementToCode(block, 'DEFAULT');
    var value_case0 = Blockly['dart'].valueToCode(block, 'CASE0', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  }
}
