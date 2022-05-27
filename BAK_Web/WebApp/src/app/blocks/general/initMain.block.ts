import { Blockly, CustomBlock, NgxBlocklyGenerator} from 'ngx-blockly';

export class InitMainBlock extends CustomBlock {
  constructor() {
    super('InitMainBlock');
    this.class = InitMainBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Programa");
    this.block.appendStatementInput("PROGRAM")
      .setCheck(null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    this.block.setDeletable(false);
  }

  public override toXML(): string {
    return '<block type="InitMainBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var statements_program = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'PROGRAM');
    var variablesOutput = "";

    const defvars: string[] = [];

    const variables = block.workspace.getAllVariables();
    for (let i = 0; i < variables.length; i++) {
      defvars.push("int " + Blockly[NgxBlocklyGenerator.DART].nameDB_.getName(variables[i].getId(), "VARIABLE") + ";");
    }

    return 'int main() { \n' + defvars.join('\n') +'\n' + statements_program + 'return 0;\n}';
  }
}
