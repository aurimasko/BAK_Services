import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import { IfMutator } from "../../mutators/if.mutator";

export class Ifblock extends CustomBlock {
  constructor() {
    super('Ifblock', new IfMutator('if_mutator', ['IfAddBlock', 'IfMutatorBlock', 'ElseBlock']));

    this.class = Ifblock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "ELSECOUNT")
      .setVisible(false);

    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "COUNT")
      .setVisible(false);
    this.block.appendValueInput("CONDITION0")
      .setCheck("Boolean")
      .appendField("Jei");
    this.block.appendStatementInput("DO0")
      .setCheck(null)
      .appendField("Vykdyti");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(210);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.jsonInit({
      'mutator': 'if_mutator'
    });
    //todo: tooltip
    //todo: helpurl
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

    for (n = 1; n <= block.getFieldValue("COUNT"); n++) {
      argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'CONDITION' + n,
        Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
      branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO' + n);
      code += ' else if (' + argument + ') {\n' + branch + '}';
    }

    if (block.getFieldValue("ELSECOUNT") > 0) {
      branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'ELSE_DO');
      code += ' else {\n' + branch + '}';
    }
    return code + '\n';
  }
}

export class ElseBlock extends CustomBlock {
  constructor() {
    super('ElseBlock');
    this.class = ElseBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);


    this.block.appendStatementInput("ELSE_DO")
      .setCheck(null)
      .appendField("Jei visa kita, vykdyti ");

    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.contextMenu = false;
  }

  public override toXML(): string {
    return '<block type="ElseBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

export class IfAddBlock extends CustomBlock {
  constructor() {
    super('IfAddBlock');
    this.class = IfAddBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);

    this.block.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Jei");
    this.block.appendStatementInput("DO")
      .setCheck(null)
      .appendField("Vykdyti");
    
    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.contextMenu = false;
  }

  public override toXML(): string {
    return '<block type="IfAddBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

export class IfMutatorBlock extends CustomBlock {
  constructor() {
    super('IfMutatorBlock');
    this.class = IfMutatorBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Sąlygos sakinys");
    this.block.appendStatementInput('STACK');
  }

  public override toXML(): string {
    return '<block type="IfMutatorBlock"></block>';
  }

  public override toDartCode(block: any): string | any[] {
    return "";
  }

}
