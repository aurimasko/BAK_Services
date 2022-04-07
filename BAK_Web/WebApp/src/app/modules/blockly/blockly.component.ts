import { Component, Output, EventEmitter, ViewChild, Input, SimpleChanges } from "@angular/core";
import { Blockly, NgxBlocklyConfig, NgxBlocklyGenerator, NgxBlocklyComponent, CustomBlock, Category, NgxBlocklyToolbox, VARIABLES_CATEGORY} from 'ngx-blockly';
import { BlocklyCode } from "../../interfaces/blockly-code.interface";

import { CreateVariableBlock } from "../../blocks/variables/createVariable.block";
import { ArithmeticActionBlock } from "../../blocks/arithmetics/arithmeticAction.block";
import { NumberValueBlock } from "../../blocks/arithmetics/numberValue.block";
import { ForLoopBlock } from "../../blocks/loops/forLoop.block";

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
    new ForLoopBlock()
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
