import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class NumberValueBlock extends CustomBlock {
  constructor() {
    super('NumberValueBlock');
    this.class = NumberValueBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Skaičius");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), "INSERTED_VALUE");
    this.block.setOutput(true, "Number");

    this.block.setInputsInline(true);
    this.block.setColour(0);
    this.block.setTooltip("Įrašyti skaitinę reikšmę");
  }

  public override toXML(): string {
    return '<block type="NumberValueBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var insertedValue = block.getFieldValue('INSERTED_VALUE');

    return [insertedValue, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
