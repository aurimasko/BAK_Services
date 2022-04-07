import { Component, Output, EventEmitter, ViewChild, Input, SimpleChanges } from "@angular/core";
import { Blockly, NgxBlocklyConfig, NgxBlocklyGenerator, NgxBlocklyComponent, CustomBlock, Category, NgxBlocklyToolbox, VARIABLES_CATEGORY} from 'ngx-blockly';
import { BlocklyCode } from "../../interfaces/blockly-code.interface";

import { CreateVariableBlock } from "../../blocks/variables/createVariable.block";
import { ArithmeticActionBlock } from "../../blocks/arithmetics/arithmeticAction.block";
import { NumberValueBlock } from "../../blocks/arithmetics/numberValue.block";
import { ForLoopBlock } from "../../blocks/loops/forLoop.block";
import { WhileLoopBlock } from "../../blocks/loops/whileLoop.block";
import { DoWhileLoopBlock } from "../../blocks/loops/dowhileLoop.block";
import { LoopFlowStatementsBlock } from "../../blocks/loops/loopFlowStatements.block";
import { Ifblock } from "../../blocks/conditions/if.block";
import { NotBlock } from "../../blocks/conditions/not.block";
import { NullBlock } from "../../blocks/conditions/null.block";
import { SwitchBlock } from "../../blocks/conditions/switch.block";
import { SwitchBreakBlock } from "../../blocks/conditions/switchBreak.block";
import { BooleanBlock } from "../../blocks/conditions/boolean.block";
import { ConditionSentenceBlock } from "../../blocks/conditions/conditionSentence.block";
import { ConditionComparisonBlock } from "../../blocks/conditions/conditionComparison.block";

@Component({
  selector: 'blockly-workspace',
  templateUrl: 'blockly.component.html',
  styleUrls: ['blockly.component.css']

})
export class BlocklyComponent  {
  @Output() codeChangeEvent = new EventEmitter<BlocklyCode>();
  @ViewChild(NgxBlocklyComponent) workspace;
  @Input() workspacecontent = "";

  public arithmeticBlocks: CustomBlock[] = [
    new ArithmeticActionBlock(),
    new NumberValueBlock(),
    new ForLoopBlock(),
    new WhileLoopBlock(),
    new DoWhileLoopBlock(),
    new LoopFlowStatementsBlock(),
    new Ifblock(),
    new NotBlock(), new NullBlock(), new SwitchBlock(), new SwitchBreakBlock(), new BooleanBlock(), new ConditionSentenceBlock(), new ConditionComparisonBlock()
  ];
  
  constructor() {
    const workspace = new Blockly.WorkspaceSvg(new Blockly.Options({}));
    const toolbox: NgxBlocklyToolbox = new NgxBlocklyToolbox(workspace);
    toolbox.nodes = [
      VARIABLES_CATEGORY,
      new Category('Arithmetic', '#ff0000', [...this.arithmeticBlocks])
    ];
    this.config.toolbox = toolbox.toXML();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.workspace === undefined)
      return;

    for (const propName in changes) {
      const change = changes[propName];

      if (change.currentValue === undefined || change.currentValue === null)
        this.workspace.clear();
      else 
        this.workspace.fromXml(change.currentValue);
    }
  }

  
  public config: NgxBlocklyConfig = {
    toolbox: '<xml id="toolbox" style="display: none">' +
      '<block type="controls_if"></block>' +
      '<block type="controls_repeat_ext"></block>' +
      '<block type="logic_compare"></block>' +
      '<block type="math_number"></block>' +
      '<block type="math_arithmetic"></block>' +
      '<block type="text"></block>' +
      '<block type="text_print"></block>' +
      '</xml>',
    trashcan: true,
    move: {
      scrollbars: false,
      wheel: false
    },
    generators: [
      NgxBlocklyGenerator.DART
    ],
    defaultBlocks: false,
  };
  
  blocklyToCode(code: string) {
    let blocklyCode: BlocklyCode = {
      workspaceJson: this.workspace.toXml(),
      code: code
    };

    this.codeChangeEvent.emit(blocklyCode);
  }
}
