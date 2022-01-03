export function isValidEmail(str: string) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(str);
}

export function includesNumber(str: string) {
  const regex = /[0-9]/;
  if (regex.test(str)) return true;
  return false;
}

export function includesSpecialCharacter(str: string) {
  const regex = /[!@#$&()\-`.+,]/;
  if (regex.test(str)) return true;
  return false;
}

export function includesLetter(str: string) {
  const regex = /[A-Za-z]/;
  if (regex.test(str)) return true;
  return false;
}

export function includes8Characters(str: string) {
  return str?.length > 7;
}

export function passwordsMatch(str1: string, str2: string) {
  return str1 === str2;
}

export function isValidPassword(str: string) {
  if (
    includesNumber(str) &&
    includesLetter(str) &&
    includes8Characters(str) &&
    includesSpecialCharacter(str)
  ) {
    return true;
  }
  return false;
}
