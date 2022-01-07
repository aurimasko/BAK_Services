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

    return errorMessages.join(" <br/> ");
  }
}
