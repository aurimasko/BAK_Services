import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class StringValueBlock extends CustomBlock {
  constructor() {
    super('StringValueBlock');
    this.class = StringValueBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendDummyInput()
      .appendField("Tekstas")
      .appendField(new Blockly.FieldTextInput(""), "INPUT");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "String");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="StringValueBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = block.getFieldValue("INPUT");

    var code = Blockly[NgxBlocklyGenerator.DART].quote_(value_input);

    if (block.getParent()
      && block.getParent().type === 'PrintfBlock') {
      return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
    } else if (code.length === 1) {
      code = '\'' + code + '\'';
    } else {
      code = '\"' + code + '\"';
    }
    return [code, Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC];
  }
}
