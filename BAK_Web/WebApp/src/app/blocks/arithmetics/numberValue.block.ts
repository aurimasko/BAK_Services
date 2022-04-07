import { Blockly, CustomBlock } from 'ngx-blockly';

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
    this.block.setOutput(true, null);

    this.block.setInputsInline(true);
    this.block.setColour(230);
    this.block.setTooltip("Įrašyti skaitinę reikšmę");
  }

  public override toXML(): string {
    return '<block type="NumberValueBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var insertedValue = block.getFieldValue('INSERTED_VALUE');

    return [insertedValue, 0];
    //todo: new ORDER_NONE
  }
}
