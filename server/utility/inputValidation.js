module.exports = class InputValidation {
  static checkFullName(...fullName) {
    const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
    return fullName.every(
      (element) => typeof element === "string" && nameRegExp.test(element)
    );
  }

  static checkPhone(phone) {
    const phoneRegExp =
      /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    return phoneRegExp.test(phone);
  }

  static checkEmail(email) {
    const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    return emailRegExp.test(email);
  }

  static checkPassword(password) {
    const passwordRegExp =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordRegExp.test(password);
  }

  static checkTgLink(tgLink){
    const tgLinkRegExp = /^[A-Za-z\d_]{5,32}$/;
    return tgLinkRegExp.test(tgLink);
  }

  static checkVKLink(vkLink){
    const vkLinkRegExp = /(http:\/\/|https:\/\/)?(www.)?(vk\.com|vkontakte\.ru)\/(id(\d{9})|[a-zA-Z0-9_.]+)/;
    return vkLinkRegExp.test(vkLink);
  }

  static checkLogin(login){
    const loginRegExp = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    return loginRegExp.text(login);
  }
};