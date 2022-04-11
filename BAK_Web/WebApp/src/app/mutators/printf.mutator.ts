import { Blockly, BlockMutator } from 'ngx-blockly';
import { CustomMutator } from './custom-mutator';

export class PrintfMutator extends BlockMutator {

  constructor(name, blockList? : string[]) {
    super(name, blockList);
  }

  mutationToDom(block: any) {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('divisor_input', block.getFieldValue('INPUT'));
    return container;
  }

  domToMutation(block: any, xmlElement: any) {

  }

  decompose(block: any, workspace: any) {
  
  }

  compose(block: any, topBlock: any) {
   
  }

  saveConnections(block: any, containerBlock: any) {

  }

  afterBlockInit(block: any) {
  
  }

  loadExtraState(state: any): any {
  }

  saveExtraState(): any {
  }
}
