"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfMutator = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var IfMutator = /** @class */ (function (_super) {
    __extends(IfMutator, _super);
    function IfMutator(name, blockList) {
        return _super.call(this, name, blockList) || this;
    }
    IfMutator.prototype.mutationToDom = function (block) {
        var container = ngx_blockly_1.Blockly.utils.xml.createElement('mutation');
        container.setAttribute('ifadd', block.getFieldValue('COUNT').toString());
        container.setAttribute('else', block.getFieldValue('ELSECOUNT').toString());
        return container;
    };
    IfMutator.prototype.domToMutation = function (block, xmlElement) {
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
    };
    IfMutator.prototype.decompose = function (block, workspace) {
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
    };
    IfMutator.prototype.compose = function (block, topBlock) {
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
                    var elseInput = block.appendValueInput('ELSE_DO')
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
    };
    IfMutator.prototype.saveConnections = function (block, containerBlock) {
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
    };
    IfMutator.prototype.afterBlockInit = function (block) {
        block.setMutator(new ngx_blockly_1.Blockly.Mutator(['IfAddBlock', 'ElseBlock']));
    };
    IfMutator.prototype.loadExtraState = function (state) {
    };
    IfMutator.prototype.saveExtraState = function () {
    };
    return IfMutator;
}(ngx_blockly_1.BlockMutator));
exports.IfMutator = IfMutator;
//# sourceMappingURL=if.mutator.js.map