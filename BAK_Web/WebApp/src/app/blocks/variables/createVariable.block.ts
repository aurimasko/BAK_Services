import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import BlocksHelper from '../blocks.helper';

export class CreateIntVariableBlock extends CustomBlock {
  constructor() {
    super('CreateIntVariableBlock');
    this.class = CreateIntVariableBlock;
    this.disabled = true;
  }

  public defineBlock() {
    var name = Blockly.Procedures.findLegalName("kintamasis", this.block);

    this.block.appendDummyInput()
      .appendField("Sukurti sveikojo skaičiaus tipo kintamąjį");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    Blockly.Variables.createVariableButtonHandler(this.block.workspace, undefined, 'int');

    //todo: tooltip
  }

  public override onChange(changeEvent: Object): void {
      // todo: check initial value according type
      // todo: set setCheck.
  }

  public override toXML() : string {
    return '<block type="CreateIntVariableBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}
