import { Component, Output, EventEmitter, ViewChild, Input, SimpleChanges } from "@angular/core";
import { Blockly, NgxBlocklyConfig, NgxBlocklyGenerator, NgxBlocklyComponent, CustomBlock, Category, NgxBlocklyToolbox, VARIABLES_CATEGORY} from 'ngx-blockly';
import { BlocklyCode } from "../../interfaces/blockly-code.interface";
import { BlocklyCategories } from "./categories";

@Component({
  selector: 'blockly-workspace',
  templateUrl: 'blockly.component.html',
  styleUrls: ['blockly.component.css']

})
export class BlocklyComponent  {
  @Output() codeChangeEvent = new EventEmitter<BlocklyCode>();
  @ViewChild(NgxBlocklyComponent) workspace;
  @Input() workspacecontent = "";
  private blocklyCategories: BlocklyCategories;
  public customBlocks: CustomBlock[];

  constructor() {
    this.blocklyCategories = new BlocklyCategories();

    const workspace = new Blockly.WorkspaceSvg(new Blockly.Options({}));
    const toolbox: NgxBlocklyToolbox = new NgxBlocklyToolbox(workspace);
    toolbox.nodes = this.blocklyCategories.blocklyCategories;
    this.customBlocks = this.blocklyCategories.allCustomBlocks;

    this.config.toolbox = toolbox.toXML();

    this.setupBlocklyForC();
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

  setupBlocklyForC() {
    Blockly[NgxBlocklyGenerator.DART].RESERVED_WORDS_ = "auto,break,case,char,const,continue,default,do,double,else,enum,extern,float,for,goto,if,inline,int,long,register, restrict,return,short,signed,sizeof,static,struct,switch, " +
      "typedef,union,unsigned,void,volatile,while,_Alignas,_Alignof,_Atomic,_Bool,_Complex,_Decimal128,_Decimal32,_Decimal64,_Generic,_Imaginary,_Noreturn,_Static_assert,_Thread_local," +
      "alignas,alignof,atomic_bool,elif,else,endif,ifdef,ifndef,define,undef,include,line,error,pragma,";

    Blockly[NgxBlocklyGenerator.DART].ORDER_ATOMIC = 0;         // 0 "" ...
    Blockly[NgxBlocklyGenerator.DART].ORDER_MEMBER = 2;         // . []
    Blockly[NgxBlocklyGenerator.DART].ORDER_FUNCTION_CALL = 2;  // ()
    Blockly[NgxBlocklyGenerator.DART].ORDER_INCREMENT = 3;      // ++
    Blockly[NgxBlocklyGenerator.DART].ORDER_DECREMENT = 3;      // --
    Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_NOT = 3;    // !
    Blockly[NgxBlocklyGenerator.DART].ORDER_BITWISE_NOT = 3;    // ~
    Blockly[NgxBlocklyGenerator.DART].ORDER_UNARY_PLUS = 3;     // +
    Blockly[NgxBlocklyGenerator.DART].ORDER_UNARY_NEGATION = 3; // -
    Blockly[NgxBlocklyGenerator.DART].ORDER_MULTIPLICATION = 5; // *
    Blockly[NgxBlocklyGenerator.DART].ORDER_DIVISION = 5;       // /
    Blockly[NgxBlocklyGenerator.DART].ORDER_MODULUS = 5;        // %
    Blockly[NgxBlocklyGenerator.DART].ORDER_ADDITION = 6;       // +
    Blockly[NgxBlocklyGenerator.DART].ORDER_SUBTRACTION = 6;    // -
    Blockly[NgxBlocklyGenerator.DART].ORDER_BITWISE_SHIFT = 7;  // << >>
    Blockly[NgxBlocklyGenerator.DART].ORDER_RELATIONAL = 8;     // < <= > >=
    Blockly[NgxBlocklyGenerator.DART].ORDER_EQUALITY = 9;       // == != 
    Blockly[NgxBlocklyGenerator.DART].ORDER_BITWISE_AND = 10;   // &
    Blockly[NgxBlocklyGenerator.DART].ORDER_BITWISE_XOR = 11;   // ^
    Blockly[NgxBlocklyGenerator.DART].ORDER_BITWISE_OR = 12;    // |
    Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_AND = 13;   // &&
    Blockly[NgxBlocklyGenerator.DART].ORDER_LOGICAL_OR = 14;    // ||
    Blockly[NgxBlocklyGenerator.DART].ORDER_CONDITIONAL = 15;   // ?:
    Blockly[NgxBlocklyGenerator.DART].ORDER_ASSIGNMENT = 15;    // = += -= *= /= %= <<= >>= ...
    Blockly[NgxBlocklyGenerator.DART].ORDER_COMMA = 17;         // ,
    Blockly[NgxBlocklyGenerator.DART].ORDER_NONE = 99;          // (...)

    Blockly[NgxBlocklyGenerator.DART].init = function (workspace) {
      // Create a dictionary of definitions to be printed before the code.
      Blockly[NgxBlocklyGenerator.DART].definitions_ = Object.create(null);
      // Create a dictionary mapping desired function names in definitions_
      // to actual function names (to avoid collisions with user functions).
      Blockly[NgxBlocklyGenerator.DART].functionNames_ = Object.create(null);

      if (!Blockly[NgxBlocklyGenerator.DART].variableDB_) {
        Blockly[NgxBlocklyGenerator.DART].variableDB_ =
          new Blockly.Names(Blockly[NgxBlocklyGenerator.DART].RESERVED_WORDS_);
      } else {
        Blockly[NgxBlocklyGenerator.DART].variableDB_.reset();
      }

      Blockly[NgxBlocklyGenerator.DART].variableDB_.setVariableMap(workspace.getVariableMap());

      /*  var defvars = [];
        // Add developer variables (not created or named by the user).
        var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
        for (var i = 0; i < devVarList.length; i++) {
          defvars.push(Blockly[NgxBlocklyGenerator.DART].variableDB_.getName(devVarList[i],
            Blockly.Names.DEVELOPER_VARIABLE_TYPE));
        }
  
        // Add user variables, but only ones that are being used.
        var variables = Blockly.Variables.allUsedVarModels(workspace);
        for (var i = 0; i < variables.length; i++) {
          defvars.push(Blockly[NgxBlocklyGenerator.DART].variableDB_.getName(variables[i].getId(),
            Blockly.VARIABLE_CATEGORY_NAME));
        }
  
        // Declare all of the variables.
        if (defvars.length) {
          Blockly[NgxBlocklyGenerator.DART].definitions_['variables'] =
            'var ' + defvars.join(', ') + ';';
        }*/
      this.isInitialized = true;
    };

    Blockly[NgxBlocklyGenerator.DART].finish = function (code) {
      // Convert the definitions dictionary into a list.
      var definitions: any = [];
      for (var name in Blockly[NgxBlocklyGenerator.DART].definitions_) {
        definitions.push(Blockly[NgxBlocklyGenerator.DART].definitions_[name]);
      }
      // Clean up temporary data.
      delete Blockly[NgxBlocklyGenerator.DART].definitions_;
      delete Blockly[NgxBlocklyGenerator.DART].functionNames_;
      Blockly[NgxBlocklyGenerator.DART].variableDB_.reset();
      return definitions.join('\n\n') + '\n\n\n' + code;
    };
    Blockly[NgxBlocklyGenerator.DART].scrubNakedValue = function (line) {
      return line + ';\n';
    };
    Blockly[NgxBlocklyGenerator.DART].quote_ = function (string) {
      string = string.replace(/\\/g, '\\\\')
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\\"')
        .replace(/\?/g, '\\?');
      string = string.replace(/\\\\n/g, '\\n');
      return string;
    };
    Blockly[NgxBlocklyGenerator.DART].multiline_quote_ = function (string) {
      var lines = string.split(/\n/g).map(Blockly[NgxBlocklyGenerator.DART].quote_);
      return lines.join(' + \'\\n\' +\n');
    };
    Blockly[NgxBlocklyGenerator.DART].scrub_ = function (block, code, opt_thisOnly) {
      var commentCode = '';
      // Only collect comments for blocks that aren't inline.
      if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
          comment = Blockly.utils._string.wrap(comment,
            Blockly[NgxBlocklyGenerator.DART].COMMENT_WRAP - 3);
          commentCode += Blockly[NgxBlocklyGenerator.DART].prefixLines(comment + '\n', '// ');
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
          if (block.inputList[i].type == Blockly.inputTypes.VALUE) {
            var childBlock = block.inputList[i].connection.targetBlock();
            if (childBlock) {
              comment = Blockly[NgxBlocklyGenerator.DART].allNestedComments(childBlock);
              if (comment) {
                commentCode += Blockly[NgxBlocklyGenerator.DART].prefixLines(comment, '// ');
              }
            }
          }
        }
      }
      var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
      var nextCode = opt_thisOnly ? '' : Blockly[NgxBlocklyGenerator.DART].blockToCode(nextBlock);
      return commentCode + code + nextCode;
    };
    Blockly[NgxBlocklyGenerator.DART].getAdjusted = function (block, atId, opt_delta, opt_negate,
      opt_order) {
      var delta = opt_delta || 0;
      var order = opt_order || Blockly[NgxBlocklyGenerator.DART].ORDER_NONE;
      if (block.workspace.options.oneBasedIndex) {
        delta--;
      }
      var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
      if (delta > 0) {
        var at = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, atId,
          Blockly[NgxBlocklyGenerator.DART].ORDER_ADDITION) || defaultAtIndex;
      } else if (delta < 0) {
        var at = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, atId,
          Blockly[NgxBlocklyGenerator.DART].ORDER_SUBTRACTION) || defaultAtIndex;
      } else if (opt_negate) {
        var at = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, atId,
          Blockly[NgxBlocklyGenerator.DART].ORDER_UNARY_NEGATION) || defaultAtIndex;
      } else {
        var at = Blockly[NgxBlocklyGenerator.DART].valueToCode(block, atId, order) ||
          defaultAtIndex;
      }

      if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = Number(at) + delta;
        if (opt_negate) {
          at = -at;
        }
      } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
          at = at + ' + ' + delta;
          var innerOrder = Blockly[NgxBlocklyGenerator.DART].ORDER_ADDITION;
        } else if (delta < 0) {
          at = at + ' - ' + -delta;
          var innerOrder = Blockly[NgxBlocklyGenerator.DART].ORDER_SUBTRACTION;
        }
        if (opt_negate) {
          if (delta) {
            at = '-(' + at + ')';
          } else {
            at = '-' + at;
          }
          var innerOrder = Blockly[NgxBlocklyGenerator.DART].ORDER_UNARY_NEGATION;
        }
        innerOrder = Math.floor(innerOrder);
        order = Math.floor(order);
        if (innerOrder && order >= innerOrder) {
          at = '(' + at + ')';
        }
      }
      return at;
    };
  }
}
