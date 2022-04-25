import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import { SwitchMutator } from "../../mutators/switch.mutator";

export class SwitchBlock extends CustomBlock {
  constructor() {
    super('SwitchBlock', new SwitchMutator('switch_mutator', ['SwitchAddBlock', 'SwitchMutatorBlock']));
    this.class = SwitchBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "COUNT")
      .setVisible(false);

    this.block.appendValueInput("SWITCH")
      .setCheck(null)
      .appendField("Sąlygos sakinys");
  
    this.block.appendDummyInput("DEFAULT")
      .appendField("Jei nėra jokio atitikmens");
    this.block.appendStatementInput("DEFAULT_DO")
      .setCheck(null)
      .appendField("tuomet ");

    this.block.appendValueInput("EXPRESSION0")
      .setCheck(null)
      .appendField("Jei yra");
    this.block.appendStatementInput("CASE0")
      .setCheck(null)
      .appendField("tuomet ");

    this.block.setInputsInline(false);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.jsonInit({
      'mutator': 'switch_mutator'
    });

    //todo: tooltip
    //todo: helpurl
    //todo: aiškiau užvardinti kas čia per blokas
  }

  public override toXML(): string {
    return '<block type="SwitchBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var n = 0;
    var condition = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'SWITCH', Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || '0';
    var argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'EXPRESSION' + n, Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || n;
    var branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'CASE0' + n);
    var defaultBranch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DEFAULT_DO');

    var code = 'switch (' + condition + ') {\ndefault : {\n' + defaultBranch + '}\ncase ' + argument + ' : {\n' + branch + '}';

    for (n = 1; n <= block.getFieldValue("COUNT"); n++) {
      argument = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'EXPRESSION' + n,
        Blockly[NgxBlocklyGenerator.DART].ORDER_NONE) || n;

      branch = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'CASE' + n);
      code += '\ncase ' + argument + ' : {' + '\n' + branch + '}';
    }
    return code + '\n';
  }
}


export class SwitchAddBlock extends CustomBlock {
  constructor() {
    super('SwitchAddBlock');
    this.class = SwitchAddBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);

    this.block.appendValueInput("EXPRESSION0")
      .setCheck(null)
      .appendField("Jei yra");
    this.block.appendStatementInput("CASE0")
      .setCheck(null)
      .appendField("tuomet ");
    
    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.contextMenu = false;
  }

  public override toXML(): string {
    return '<block type="SwitchAddBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

export class SwitchMutatorBlock extends CustomBlock {
  constructor() {
    super('SwitchMutatorBlock');
    this.class = SwitchMutatorBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Sąlygos sakinys");
    this.block.appendStatementInput('STACK');
  }

  public override toXML(): string {
    return '<block type="SwitchMutatorBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

