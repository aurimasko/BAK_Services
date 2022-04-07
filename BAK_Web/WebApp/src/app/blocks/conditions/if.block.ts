import { Blockly, CustomBlock } from 'ngx-blockly';
declare var require: any;

const dartGenerator = require('blockly/dart');

export class Ifblock extends CustomBlock {
  constructor() {
    super('Ifblock');
    this.class = Ifblock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Jei");
    this.block.appendStatementInput("DO")
      .setCheck(null)
      .appendField("Vykdyti");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.jsonInit({
      'mutator': 'controls_if_mutator'
    });
    //todo: tooltip
    //todo: helpurl
    //todo: sutvarkyti jsonInit
  }

  public override toXML(): string {
    return '<block type="Ifblock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    //todo: change ORDER_ATOMIC to custom value

    var value_condition = Blockly['dart'].valueToCode(block, 'CONDITION', Blockly['dart'].ORDER_ATOMIC);
    var statements_do = Blockly['dart'].statementToCode(block, 'DO');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  }
}
