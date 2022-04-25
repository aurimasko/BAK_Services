export default class BlocksHelper {
  static varTypeCheckInPrintScan(block, varName) { // variable type check
    var typeCode = '';
    var varList = block.workspace.getAllVariables();

    for (var temp = 0; temp < varList.length; temp++) {
      if (varName === varList[temp].name) {
        var type = varList[temp].type;

        typeCode = "%d";
        // todo: kai bus variable types, atkomentuoti
        /*
        if (type === 'int') {
          typeCode = '%d';
        } else if (type === 'unsigned int') {
          typeCode = '%u';
        } else if (type === 'float') {
          typeCode = '%f';
        } else if (type === 'double') {
          typeCode = '%f';
        } else if (type === 'char') {
          typeCode = '%c';
        } else if (type === 'dbchar') {
          typeCode = '%s';
        }*/
        return typeCode;
      }
    }
    return typeCode;
  };

  //todo: pasiziureti ar gerai veikia
  static checkLegalName(msg, name) {
    var err = 0;

    if (name.length > 0) {
      var chk = name.substring(0, 1);
      if (!chk.match(/[a-z]|[A-Z]/)) {
        err = err + 1;
      }
    }
    for (var i = 1; i < name.length; i++) {
      var chk = name.substring(i, i + 1);
      if (!chk.match(/[0-9]|[a-z]|[A-Z]|_/)) {
        err = err + 1;
      }
    }

    if (err > 0) {
      window.alert(msg);
      return -1;
    }
    return;
  };
}
