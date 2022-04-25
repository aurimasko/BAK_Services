import { Blockly, CustomBlock } from 'ngx-blockly';

export class SwitchBreakBlock extends CustomBlock {
  constructor() {
    super('SwitchBreakBlock');
    this.class = SwitchBreakBlock;
    this.disabled = true;
  }

  public defineBlock() {
    this.block.setColour(200);
    this.block.appendDummyInput()
      .appendField("break");
    this.block.setPreviousStatement(true);
    this.block.setTooltip("");

    //todo: tooltip
    //todo: helpurl
    //todo: aiškiau užvardinti kas čia per blokas
  }

  public override onChange(changeEvent) {
    if (!this.block.workspace) {
      return;
    }
    var legal = false;
    var block = this.block;
    do {
      if (block.type === 'SwitchBlock') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);

    if (legal) {
      this.block.setWarningText(null!);
    } else {
      this.block.setWarningText("Šis blokas gali būti naudojamas tik switch bloko viduje"); //todo: pakeisti žodį "switch"
    }
  }

  public override toXML(): string {
    return '<block type="SwitchBreakBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    return "break;\n";
  }

}
