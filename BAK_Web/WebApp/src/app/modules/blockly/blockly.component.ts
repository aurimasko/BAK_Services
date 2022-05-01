import { Component, Output, EventEmitter, ViewChild, Input, SimpleChanges, AfterViewInit  } from "@angular/core";
import { Blockly, NgxBlocklyConfig, NgxBlocklyGenerator, NgxBlocklyComponent, CustomBlock, NgxBlocklyToolbox } from 'ngx-blockly';
import { BlocklyCode } from "../../interfaces/blockly-code.interface";
import { BlocklyCategories } from "./categories";
import { BlocklyWorkspaceContent } from "./blockly.workspace.content";

@Component({
  selector: 'blockly-workspace',
  templateUrl: 'blockly.component.html',
  styleUrls: ['blockly.component.css']

})
export class BlocklyComponent implements AfterViewInit {
  @Output() codeChangeEvent = new EventEmitter<BlocklyCode>();
  @ViewChild(NgxBlocklyComponent) workspace;

  @Input()
  blocklyWorkspaceContent: BlocklyWorkspaceContent | null = null;

  @Input()
  readonly: boolean = false;

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

  ngAfterViewInit() {
    if (!this.blocklyWorkspaceContent) {
      this.setInitialWorkspace();
    } else {
      this.workspace.fromXml(this.blocklyWorkspaceContent.workspaceContent);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readonly']) {
      this.config.readOnly = changes['readonly'].currentValue;
    }

    if (changes['blocklyWorkspaceContent']) {
      if (this.workspace === undefined)
        return;

      var change = changes['blocklyWorkspaceContent'];

      if (change.currentValue === undefined || change.currentValue === null || change.currentValue["workspaceContent"] === "" || change.currentValue["workspaceContent"] === undefined || change.currentValue["workspaceContent"] === null) {
        this.workspace.clear();
        this.setInitialWorkspace();
      } else {
        this.workspace.fromXml(change.currentValue.workspaceContent);
      }
    }
  }

  setInitialWorkspace() {
    this.workspace.fromXml("<xml xmlns=\"https://developers.google.com/blockly/xml\">" +
      "<block type=\"InitMainBlock\" id = \"lA^+972(@ai/N~`T{{j1\" x =\"8\" y = \"8\">" +
      "</block></xml>");
    var code = Blockly[NgxBlocklyGenerator.DART].workspaceToCode(Blockly.Workspace.getById(this.workspace));

    let blocklyCode: BlocklyCode = {
      workspaceJson: this.workspace.toXml(),
      code: code
    };

    setTimeout(() => {
        this.codeChangeEvent.emit(blocklyCode);
      },
      0);
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
      Blockly[NgxBlocklyGenerator.DART].definitions_ = Object.create(null);
      Blockly[NgxBlocklyGenerator.DART].functionNames_ = Object.create(null);

      if (!Blockly[NgxBlocklyGenerator.DART].variableDB_) {
        Blockly[NgxBlocklyGenerator.DART].nameDB_ =
          new Blockly.Names(Blockly[NgxBlocklyGenerator.DART].RESERVED_WORDS_);
      } else {
        Blockly[NgxBlocklyGenerator.DART].variableDB_.reset();
      }
      Blockly[NgxBlocklyGenerator.DART].nameDB_.setVariableMap(workspace.getVariableMap());
      // todo: global variables

      this.isInitialized = true;
    };

    Blockly[NgxBlocklyGenerator.DART].finish = function (code) {
      // Indent every line.
      if (code) {
        code = Blockly[NgxBlocklyGenerator.DART].prefixLines(code, Blockly[NgxBlocklyGenerator.DART].INDENT);
      }
      code = '\n' + code;

      // Convert the definitions dictionary into a list.
      var includes: string[] = [];
      var declarations: string[] = [];
      var defines: string[] = [];
      var func_definitions :string[] = [];
      for (var name in Blockly[NgxBlocklyGenerator.DART].definitions_) {
        var def = Blockly[NgxBlocklyGenerator.DART].definitions_[name];
        var nameInclude = 'include';
        var nameFunc_declare = 'Func_declare';
        var nameDefine = 'define';
        if (name.match(nameInclude)) {
          includes.push(def);
        }
        else if (name.match(nameFunc_declare)) {
          declarations.push(def);//declaration
        }
        else if (name.match(nameDefine)) {
          defines.push(def);//#define
        }
        else {
          func_definitions.push(def);//definition
        }
      }
      //imports--> #include
      //definitions--> function def, #def
      var allDefs = includes.join('\n') + '\n\n' + declarations.join('\n') + '\n\n' + defines.join('\n');
      var allFuncs = func_definitions.join('\n');

      return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n') + code + allFuncs.replace(/\n\n+/g, '\n\n');
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
