import { Injectable } from '@angular/core';

@Injectable()
export class ResponseHelper {
  showErrorMessage(data) {
    let errorMessages = data.error.errorMessages;
    let errorCodes = data.error.errorCodes;

    //to avoid errors
    if (!errorMessages)
      errorMessages = [];

    if (!errorCodes)
      errorCodes = [];

    if (errorCodes.indexOf(4) !== -1)
      errorMessages = ["Šis objektas jau buvo atnaujintas kito vartotojo. Perkraukite puslapį."];

    return errorMessages.join("<br/>");
  }

  getRegistrationErrorMessages(errorMessages) {
    var errors : string[] = [];
    const errorCodesMappingWithTexts = [
      {
        errorCode: "PasswordTooShort",
        errorMessage: "Slaptažodis per trumpas!"
      },
      {
        errorCode: "PasswordRequiresNonAlphanumeric",
        errorMessage: "Slaptažodyje turi būti bent vienas simbolis (.,/?!@#$%&)"
      },
      {
        errorCode: "PasswordRequiresDigit",
        errorMessage: "Slaptažodyje turi būti bent vienas skaičius!"
      },
      {
        errorCode: "PasswordRequiresUpper",
        errorMessage: "Slaptažodyje turi būti bent viena didžioji raidė!"
      }
    ];

    errorMessages.forEach(errorCode => {
      if (!errorCodesMappingWithTexts)
        return;

      var error = errorCodesMappingWithTexts.find(x => x.errorCode === errorCode);

      if (error != null)
        errors.push(error.errorMessage);
    });

    return errors.join("<br/>");
  }
}
