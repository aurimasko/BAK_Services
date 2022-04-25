import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class Ifblock extends CustomBlock {
  constructor() {
    super('Ifblock');
    this.class = Ifblock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("CONDITION0")
      .setCheck("Boolean")
      .appendField("Jei");
    this.block.appendStatementInput("DO0")
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
    var n = 0;
    var argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'CONDITION' + n,
      Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';

    var branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO' + n);

    var code = 'if (' + argument + ') {\n' + branch + '}';

    for (n = 1; n <= block.elseifCount_; n++) {
      argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'CONDITION' + n,
        Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
      branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO' + n);
      code += ' else if (' + argument + ') {\n' + branch + '}';
    }

    if (block.elseCount_) {
      branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'ELSE');
      code += ' else {\n' + branch + '}';
    }
    return code + '\n';
  }
}
