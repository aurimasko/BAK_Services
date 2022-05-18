import { Blockly, CustomBlock } from 'ngx-blockly';
declare var require: any;

export class LoopFlowStatementsBlock extends CustomBlock {

  constructor() {
    super('LoopFlowStatementsBlock');
    this.class = LoopFlowStatementsBlock;
    this.disabled = true;

  }


  public defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["išeiti iš ciklo", "BREAK"], ["tęsti su kita ciklo iteracija", "CONTINUE"]]), "FLOW_OPTION");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setColour(20);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    //todo: translations
    //todo: tooltip
  }

  public override toXML(): string {
    return '<block type="LoopFlowStatementsBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    switch (block.getFieldValue('FLOW_OPTION')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
    }
    throw 'Unknown flow statement.';
  }

  public override onChange(changeEvent) {
    if (!this.block.workspace) {
      return;
    }
    var legal = false;
    var block = this.block;
    do {
      if (block.type === 'ForLoopBlock' || block.type === 'WhileLoopBlock' || block.type === 'DoWhileLoopBlock') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);

    if (legal) {
      this.block.setWarningText(null!);
    } else {
      this.block.setWarningText("Šis blokas gali būti naudojamas tik ciklo bloko viduje"); 
    }
  }
}


