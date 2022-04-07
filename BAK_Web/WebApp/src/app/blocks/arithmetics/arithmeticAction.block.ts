import { Blockly, CustomBlock } from 'ngx-blockly';

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
      .appendField(new Blockly.FieldDropdown([["pridėti", "ADD"], ["atimti", "MINUS"], ["dauginti", "MULTIPLY"], ["dalinti", "DIVIDE"], ["pakelti", "POWER"]]), "Operator");
    this.block.appendValueInput("OperandB")
      .setCheck("Number");
    this.block.setInputsInline(true);
    this.block.setOutput(true);
    this.block.setColour(230);
    this.block.setTooltip("Aritmetinio veiksmo (sudėtis, atimtis, daugyba, dalyba, kėlimas laipsniu) atlikimas");
  }

  public override toXML(): string {
    return '<block type="ArithmeticActionBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return " ";
  }
}

