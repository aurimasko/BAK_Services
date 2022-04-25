import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';
import BlocksHelper from '../blocks.helper';

export class CreateVariableBlock extends CustomBlock {
  constructor() {
    super('CreateVariableBlock');
    this.class = CreateVariableBlock;
    this.disabled = true;
  }

  public defineBlock() {
    var name = Blockly.Procedures.findLegalName("kintamasis", this.block);
    
    this.block.appendDummyInput()
      .appendField("Sukurti kintamąjį, pavadinimu")
      .appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), "NAME");
    this.block.appendDummyInput()
      .appendField("tipas")
      .appendField(new Blockly.FieldDropdown([["sveikasis skaičius", "int"], ["simbolis", "char"], ["tekstas", "string"]]), "TYPE");
    this.block.appendValueInput("VALUE")
      .setCheck(null)
      .appendField("pradinė reikšmė");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
  }

  public override onChange(changeEvent: Object): void {
      // todo: check initial value according type
      // todo: set setCheck.
  }

  public override toXML() : string {
    return '<block type="CreateVariableBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
   
    var argument0 = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'VALUE',
      Blockly[NgxBlocklyGenerator.DART].ORDER_ASSIGNMENT) || '0';
    var varName = Blockly[NgxBlocklyGenerator.DART].variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var varType = block.getFieldValue('TYPE');
  
    return varType + ' ' + varName + ' = ' + argument0 + ';\n';
  }
}
