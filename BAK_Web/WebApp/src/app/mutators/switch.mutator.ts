import { Blockly, BlockMutator } from 'ngx-blockly';

export class SwitchMutator extends BlockMutator {
  constructor(name, blockList?: string[]) {
    super(name, blockList);
  }

  mutationToDom(block: any) {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('switchadd', block.getFieldValue('COUNT').toString());
    return container;
  }

  domToMutation(block: any, xmlElement: any) {

    block.setFieldValue(parseInt(xmlElement.getAttribute('switchadd'), 10), "COUNT");

    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      block.appendValueInput('EXPRESSION' + x)
        .setCheck(null)
        .appendField('Jei yra'); // a blank space

      block.appendValueInput('CASE' + x)
        .setCheck(null)
        .appendField('tuomet'); // a blank space
    }
  }

  decompose(block: any, workspace: any) {
    var containerBlock = workspace.newBlock('SwitchMutatorBlock');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;

    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      var switchAddBlock = workspace.newBlock('SwitchAddBlock');
      switchAddBlock.initSvg();
      connection.connect(switchAddBlock.previousConnection);
      connection = switchAddBlock.nextConnection;
    }
    return containerBlock;
  }

  compose(block: any, topBlock: any) {
    for (var x = block.getFieldValue('COUNT'); x > 0; x--) {
      block.removeInput('CASE' + x);
      block.removeInput('EXPRESSION' + x);
    }
    block.setFieldValue(0, "COUNT");
    // Rebuild the block's optional inputs.
    var clauseBlock = topBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'SwitchAddBlock':
          block.setFieldValue(block.getFieldValue('COUNT') + 1, "COUNT");

          var ifInput = block.appendValueInput('EXPRESSION' + block.getFieldValue('COUNT'))
            .appendField("Jei yra");
          var doInput = block.appendStatementInput('CASE' + block.getFieldValue('COUNT'));
          doInput.appendField("tuomet");
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }

          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
  }

  saveConnections(block: any, containerBlock: any) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'SwitchAddBlock':
          var inputIf = block.getInput('EXPRESSION' + x);
          var inputDo = block.getInput('CASE' + x);
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;

            x++;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
  }

  afterBlockInit(block: any) {
    block.setMutator(new Blockly.Mutator(['SwitchAddBlock']));
  }

  loadExtraState(state: any): any {
  }

  saveExtraState(): any {

  }
}
