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
exports.ScanfMutator = void 0;
var ngx_blockly_1 = require("ngx-blockly");
var ScanfMutator = /** @class */ (function (_super) {
    __extends(ScanfMutator, _super);
    function ScanfMutator(name, blockList) {
        return _super.call(this, name, blockList) || this;
    }
    ScanfMutator.prototype.mutationToDom = function (block) {
        var container = ngx_blockly_1.Blockly.utils.xml.createElement('mutation');
        container.setAttribute('scanadd', block.getFieldValue('COUNT').toString());
        return container;
    };
    ScanfMutator.prototype.domToMutation = function (block, xmlElement) {
        block.setFieldValue(parseInt(xmlElement.getAttribute('scanadd'), 10), "COUNT");
        for (var x = 1; x <= block.getFieldValue('COUNT'); x++) {
            block.appendValueInput('INPUT' + x)
                .setCheck("Variable")
                .appendField(''); // a blank space
        }
    };
    ScanfMutator.prototype.decompose = function (block, workspace) {
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
    };
    ScanfMutator.prototype.compose = function (block, topBlock) {
        for (var x = block.getFieldValue('COUNT'); x > 0; x--) {
            block.removeInput('INPUT' + x);
        }
        block.setFieldValue(0, "COUNT");
        // Rebuild the block's optional inputs.
        var clauseBlock = topBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'ScanfAdd':
                    block.setFieldValue(block.getFieldValue('COUNT') + 1, "COUNT");
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
    };
    ScanfMutator.prototype.saveConnections = function (block, containerBlock) {
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
    };
    ScanfMutator.prototype.afterBlockInit = function (block) {
        block.setMutator(new ngx_blockly_1.Blockly.Mutator(['ScanfAdd']));
    };
    ScanfMutator.prototype.loadExtraState = function (state) {
    };
    ScanfMutator.prototype.saveExtraState = function () {
    };
    return ScanfMutator;
}(ngx_blockly_1.BlockMutator));
exports.ScanfMutator = ScanfMutator;
//# sourceMappingURL=scanf.mutator.js.map