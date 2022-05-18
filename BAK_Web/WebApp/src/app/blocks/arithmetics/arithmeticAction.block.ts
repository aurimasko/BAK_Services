import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class ArithmeticActionBlock extends CustomBlock {
  constructor() {
    super('ArithmeticActionBlock');
    this.class = ArithmeticActionBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck("Number");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["pridėti", "ADD"], ["atimti", "MINUS"], ["dauginti", "MULTIPLY"], ["dalinti", "DIVIDE"]]), "Operator");
    this.block.appendValueInput("OperandB")
      .setCheck("Number");
    this.block.setInputsInline(true);
    this.block.setOutput(true);
    this.block.setColour(65);
    this.block.setTooltip("Aritmetinio veiksmo (sudėtis, atimtis, daugyba, dalyba) atlikimas");
  }

  public override toXML(): string {
    return '<block type="ArithmeticActionBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var possibleOperatorsDetails = {
      "ADD" : ["+", Blockly[NgxBlocklyGenerator.DART].ORDER_ADDITION],
      "MINUS": ["-", Blockly[NgxBlocklyGenerator.DART].ORDER_SUBTRACTION],
      "MULTIPLY": ["*", Blockly[NgxBlocklyGenerator.DART].ORDER_MULTIPLICATION],
      "DIVIDE": ["/", Blockly[NgxBlocklyGenerator.DART].ORDER_DIVISION]
    };

    var selectedOperatorDetails = possibleOperatorsDetails[block.getFieldValue("Operator")];
    var operator = selectedOperatorDetails[0];
    var order = selectedOperatorDetails[1];
    
    var inputA = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || '0';
    var inputB = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || '0';

    var code = inputA + " " + operator + " " + inputB;
    return [code, order];

  }
}

