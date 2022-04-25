import { Blockly, CustomBlock, NgxBlocklyGenerator} from 'ngx-blockly';

export class BooleanBlock extends CustomBlock {
  constructor() {
    super('BooleanBlock');
    this.class = BooleanBlock;
    this.disabled = true;
  }

  public defineBlock() {
      this.block.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["tiesa", "true"], ["netiesa", "false"]]), "INPUT_SELECTION");
    this.block.setOutput(true, "Boolean");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
    //todo: tooltip
    //todo: helpurl
    //todo: pagalvoti, gal perkelti prie kintamųjų
  }

  public override toXML(): string {
    return '<block type="BooleanBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var dropdown_input_selection = block.getFieldValue('INPUT_SELECTION');

    var code;

    if (dropdown_input_selection === "true")
      code = "true";
    else
      code = "false";

    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_NONE];
  }
}
