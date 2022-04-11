import { Blockly, CustomBlock } from 'ngx-blockly';
import { PrintfMutator } from "../../mutators/printf.mutator";

export class PrintfBlock extends CustomBlock {
  constructor() {
    super('PrintfBlock');//, new PrintfMutator('library_stdio_printf_add'));
    this.class = PrintfBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.appendValueInput("INPUT")
      .setCheck("String")
      .appendField("Išvesti į ekraną");
    this.block.setInputsInline(true);
    this.block.setOutput(true, "String");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
   /* this.block.jsonInit({
      'mutator': 'library_stdio_printf_add'
    });*/
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="PrintfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var value_input = Blockly['dart'].valueToCode(block, 'INPUT', Blockly['dart'].ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly['dart'].ORDER_NONE];

    //todo: new ORDER_NONE, ORDER_ATOMIC
  }
}

export class PrintfAddBlock extends CustomBlock {
  constructor() {
    super('PrintfAddBlock');
    this.class = PrintfAddBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("printf");
    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.contextMenu = false;
  }

  public override toXML(): string {
    return '<block type="PrintfAddBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
  }
}

export class PrintfPrintfBlock extends CustomBlock {
  constructor() {
    super('PrintfPrintfBlock');
    this.class = PrintfPrintfBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(280);
    this.block.appendDummyInput()
      .appendField("Printf");
    this.block.appendStatementInput('STACK');
    this.block.contextMenu = false;

    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="PrintfPrintfBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "";
    //todo: insert smth
  }
}

