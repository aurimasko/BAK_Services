import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class ForLoopBlock extends CustomBlock {
  constructor() {
    super('ForLoopBlock');
    this.class = ForLoopBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Skaičiuoti su ");
    this.block.appendValueInput("FROM")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldVariable(""), "VAR").appendField("nuo");
 
    this.block.appendDummyInput()
      .appendField("iki");
    this.block.appendValueInput("TO")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT);

    this.block.appendDummyInput()
    .appendField("po kiekvieno vykdymo ")
      .appendField(new Blockly.FieldDropdown([["pridedant", "+"], ["minusuojant", "-"], ["dauginant", "*"], ["dalinant", "/"]]), "FOR_OPTION");
    this.block.appendValueInput("BY")
      .setCheck("Number")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.block.appendStatementInput("DO_ACTION")
      .setCheck(null)
      .appendField("Vykdyti");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);

    this.block.jsonInit({
      'extensions': [
        'contextMenu_newGetVariableBlock'
      ]
    });
    this.block.setNextStatement(true, null);
    this.block.setColour(20);
    this.block.setTooltip(
      "Šis blokas kartoja veiksmus, esančius 'Vykdyti' dalyje tol, kol pateiktas kintamasis yra mažesnis už skaičių pateiktą 'iki' dalyje." +
      "Po kiekvieno veiksmų pakartojimo, kintamojo reikšmę galima keisti.");
  }

  public override toXML(): string {
    return '<block type="ForLoopBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var forOption = block.getFieldValue('FOR_OPTION');
    var variable_var = Blockly[NgxBlocklyGenerator.DART].nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value_from = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'FROM', Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
    var value_to = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'TO', Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
    var value_by = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'BY', Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC) || '0';
    var statements_do_action = Blockly[NgxBlocklyGenerator.DART].statementToCode(block, 'DO_ACTION');

    return "for(" + variable_var + " = " + value_from + "; " +
      variable_var + "< " + value_to + "; " + variable_var + " " + forOption +"=" + value_by + ') {\n ' + statements_do_action + ' }\n';
  }
}
