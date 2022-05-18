import { Blockly, BlockMutator } from 'ngx-blockly';

export class IfMutator extends BlockMutator {
  constructor(name, blockList?: string[]) {
    super(name, blockList);
  }

  mutationToDom(block: any) {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('ifadd', block.getFieldValue('COUNT').toString());
    container.setAttribute('else', block.getFieldValue('ELSECOUNT').toString());

    return container;
  }

  domToMutation(block: any, xmlElement: any) {

    block.setFieldValue(parseInt(xmlElement.getAttribute('ifadd'), 10), "COUNT");
    block.setFieldValue(parseInt(xmlElement.getAttribute('else'), 10), "ELSECOUNT");

    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      block.appendValueInput("CONDITION" + x)
        .setCheck("Boolean")
        .appendField("Jei");
      block.appendStatementInput("DO" + x)
        .setCheck(null)
        .appendField("Vykdyti");
    }

    if (block.getFieldValue('ELSECOUNT') > 0) {
      block.appendStatementInput("ELSE_DO")
        .setCheck(null)
        .appendField("Jei visa kita, vykdyti");
    }
  }

  decompose(block: any, workspace: any) {
    var containerBlock = workspace.newBlock('IfMutatorBlock');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;


    for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
      var ifAddBlock = workspace.newBlock('IfAddBlock');
      ifAddBlock.initSvg();
      connection.connect(ifAddBlock.previousConnection);
      connection = ifAddBlock.nextConnection;
    }

    if (block.getFieldValue('ELSECOUNT') > 0) {
      var elseBlock = workspace.newBlock('ElseBlock');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
      connection = elseBlock.nextConnection;
    }
    return containerBlock;
  }

  compose(block: any, topBlock: any) {
    for (var x = block.getFieldValue('COUNT'); x > 0; x--) {
      block.removeInput('CONDITION' + x);
      block.removeInput('DO' + x);
    }
    if (block.getFieldValue('ELSECOUNT') > 0) {
      block.removeInput("ELSE_DO");
    }

    block.setFieldValue(0, "ELSECOUNT");
    block.setFieldValue(0, "COUNT");

    // Rebuild the block's optional inputs.
    var clauseBlock = topBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ElseBlock':
          block.setFieldValue(block.getFieldValue('ELSECOUNT') + 1, "ELSECOUNT");

          var elseInput = block.appendStatementInput('ELSE_DO')
            .appendField("Jei visa kita, vykdyti ");
          
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            elseInput.connection.connect(clauseBlock.valueConnection_);
          }
          break;
        case 'IfAddBlock':
          block.setFieldValue(block.getFieldValue('COUNT') + 1, "COUNT");

          var ifInput = block.appendValueInput('CONDITION' + block.getFieldValue('COUNT'))
            .appendField("Jei ");
          var doInput = block.appendStatementInput('DO' + block.getFieldValue('COUNT'));
          doInput.appendField("Vykdyti");
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
      case 'ElseBlock':
        var elseBlock = block.getInput('ELSE_DO');
        clauseBlock.valueConnection_ =
          elseBlock && elseBlock.connection.targetConnection;

        x++;
        break;
        case 'IfAddBlock':

          var inputIf = block.getInput('CONDITION' + x);
          var inputDo = block.getInput('DO' + x);
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
    block.setMutator(new Blockly.Mutator(['IfAddBlock', 'ElseBlock']));
  }

  loadExtraState(state: any): any {
  }

  saveExtraState(): any {

  }
}
