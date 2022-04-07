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
    //todo: gali būti naudojamas tik su switch
  }

  public override toXML(): string {
    return '<block type="SwitchBreakBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {

    return "";
  }
}
