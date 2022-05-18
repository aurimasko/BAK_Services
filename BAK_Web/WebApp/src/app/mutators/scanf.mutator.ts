import { Blockly, BlockMutator } from 'ngx-blockly';

export class ScanfMutator extends BlockMutator {
  constructor(name, blockList? : string[]) {
    super(name, blockList);
  }

  mutationToDom(block: any) {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('scanadd', block.getFieldValue('COUNT').toString());
    return container;
  }

  domToMutation(block: any, xmlElement: any) {

    block.setFieldValue(parseInt(xmlElement.getAttribute('scanadd'), 10), "COUNT");

    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      block.appendValueInput('INPUT' + x)
        .setCheck("Variable")
        .appendField(''); // a blank space
    }
  }

  decompose(block: any, workspace: any) {
    var containerBlock = workspace.newBlock('ScanfScanf');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;

    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      var scanAddBlock = workspace.newBlock('ScanfAdd');
      scanAddBlock.initSvg();
      connection.connect(scanAddBlock.previousConnection);
      connection = scanAddBlock.nextConnection;
    }
    return containerBlock;
  }

  compose(block: any, topBlock: any) {
    for (var x = block.getFieldValue('COUNT'); x > 0; x--) {
      block.removeInput('INPUT' + x);
    }
    block.setFieldValue(0, "COUNT");
    // Rebuild the block's optional inputs.
    var clauseBlock = topBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ScanfAdd':
          block.setFieldValue(block.getFieldValue('COUNT')+1, "COUNT");
          var printInput = block.appendValueInput('INPUT' + block.getFieldValue('COUNT'))
            .setCheck("Variable")
            .appendField('');
        // Reconnect any child blocks.
        if (clauseBlock.valueConnection_) {
          printInput.connection.connect(clauseBlock.valueConnection_);
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
        case 'ScanfAdd':
          var inputPrint = block.getInput('INPUT' + x);
        clauseBlock.valueConnection_ =
          inputPrint && inputPrint.connection.targetConnection;
        clauseBlock.statementConnection_ =
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
    block.setMutator(new Blockly.Mutator(['ScanfAdd']));
  }

  loadExtraState(state: any): any {
  }

  saveExtraState(): any {
  
  }
}
