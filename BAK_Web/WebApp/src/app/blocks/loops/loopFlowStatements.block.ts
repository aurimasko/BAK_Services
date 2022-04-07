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
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    this.block.jsonInit({
      'extensions': 'controls_flow_in_loop_check'
    });
  //  Blockly.Extensions.apply("controls_flow_in_loop_check", this.block, false);
    //todo: translations
    //todo: tooltip
    //todo: fix this extension, does not work
  }

  public override toXML(): string {
    return '<block type="LoopFlowStatementsBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {
    var statements_do_statement = Blockly['dart'].statementToCode(block, 'DO_STATEMENT');
    var dropdown_while_condition_option = block.getFieldValue('WHILE_CONDITION_OPTION');
    var value_while_condition = Blockly['dart'].valueToCode(block, 'WHILE_CONDITION', Blockly['dart'].ORDER_ATOMIC);

    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  }
}


