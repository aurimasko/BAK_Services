import { Blockly, CustomBlock, NgxBlocklyGenerator } from 'ngx-blockly';

export class ConditionComparisonBlock extends CustomBlock {
  prevBlocks;

  constructor() {
    super('ConditionComparisonBlock');
    this.class = ConditionComparisonBlock;
    this.disabled = true;

  /*  const LOGIC_COMPARE_EXTENSION = function () {
      // Add onchange handler to ensure types are compatible.
      this.mixin(LOGIC_COMPARE_ONCHANGE_MIXIN);
    };
    Blockly.Extensions.register('logic_compare', LOGIC_COMPARE_EXTENSION);
    */
    //  'parent_tooltip_extension',
  }

  public defineBlock() {
    this.block.appendValueInput("OperandA")
      .setCheck(null);
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["=", "EQ"], ['\u2260', "NEQ"], ['\u200F<', "LT"], ['\u200F\u2264', "LTE"], ['\u200F>', "GT"], ['\u200F\u2265', "GTE"]]), "OPERATION");
    this.block.appendValueInput("OperandB")
      .setCheck(null);
    this.block.setInputsInline(true);
    this.block.setOutput(true, "Boolean");
    this.block.setColour(210);
    this.block.setTooltip("");
    this.block.setHelpUrl("");

    this.block.jsonInit({
      "extensions": "logic_compare"
    });
    //todo: tooltip
    //todo: helpurl

  }

  public override toXML(): string {
    return '<block type="ConditionComparisonBlock"></block>';
  }

  public override  toDartCode(block: any): string | any[] {

    var operators = {
      'EQ': '==',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    };
    var operator = operators[block.getFieldValue('OPERATION')];
    var order = (operator === '==' || operator === '!=')
      ? Blockly[NgxBlocklyGenerator.DART].ORDER_EQUALITY
      : Blockly[NgxBlocklyGenerator.DART].ORDER_RELATIONAL;

    var argument0 = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandA', order) || '0';
    var argument1 = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, 'OperandB', order) || '0';

    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  }
  public override onChange(changeEvent) {
    if (!this.prevBlocks)
      this.prevBlocks = [null, null];

    const blockA = this.block.getInputTargetBlock('OperandA');
    const blockB = this.block.getInputTargetBlock('OperandB');
    if (blockA &&
      blockB &&
      !this.block.workspace.connectionChecker.doTypeChecks(
        blockA.outputConnection,
        blockB.outputConnection)) {

      Blockly.Events.setGroup(changeEvent.group);
      const prevA = this.prevBlocks[0];
      if (prevA !== blockA) {
        blockA.unplug();
        if (prevA && !prevA.isDisposed() && !prevA.isShadow()) {
          // The shadow block is automatically replaced during unplug().
          this.block.getInput('OperandA').connection.connect(prevA.outputConnection);
        }
      }
      const prevB = this.prevBlocks[1];
      if (prevB !== blockB) {
        blockB.unplug();
        if (prevB && !prevB.isDisposed() && !prevB.isShadow()) {
          // The shadow block is automatically replaced during unplug().
          this.block.getInput('OperandB').connection.connect(prevB.outputConnection);
        }
      }
      this.block.bumpNeighbours();
      Blockly.Events.setGroup(false);
    }
    this.prevBlocks[0] = this.block.getInputTargetBlock('OperandA');
    this.prevBlocks[1] = this.block.getInputTargetBlock('OperandB');
  }
}
