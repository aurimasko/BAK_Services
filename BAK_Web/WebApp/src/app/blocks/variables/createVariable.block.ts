import { Blockly, CustomBlock } from 'ngx-blockly';

export class CreateVariableBlock extends CustomBlock {
  constructor() {
    super('CreateVariableBlock');
    this.class = CreateVariableBlock;
    this.disabled = true;
  }

  public defineBlock() {

    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"], ["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "NAME");

    this.block.setTooltip("Grąžina pasirinkto kintamojo tipą");
    this.block.setHelpUrl("");
  }

  public override toXML() : string {
    return '<block type="CreateVariableBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    /*var variable_variablename = block.nameDB_.getName(block.getFieldValue('VariableName'), Blockly.Variables.NAME_TYPE);
    var dropdown_kintamojo_tipas = block.getFieldValue('Kintamojo tipas');
    var value_name = block.valueToCode(block, 'NAME', block.ORDER_ATOMIC);

    return dropdown_kintamojo_tipas + " " + variable_variablename;*/
    return " ";
  }
}
