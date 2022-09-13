import translateText from "../../services/localization/translateText";

export default function login(code) {
  switch (code) {
    case 1:
      return translateText("error_login_1");
    case 2:
      return translateText("error_login_2");
    case 3:
      return translateText("error_login_3");
    case 4:
      return translateText("error_login_4");
    case 5:
      return translateText("error_login_5");
    case 6:
      return translateText("error_login_6");
    case 7:
      return translateText("error_login_7");
    case 8:
      return translateText("error_login_8");
    case 9:
      return translateText("error_login_9");
    case 10:
      return translateText("error_login_10");
    case 11:
      return translateText("error_login_11");
    case 12:
      return translateText("error_login_12");
    case 13:
      return translateText("error_login_13");
    case 14:
      return translateText("error_login_14");
    case 15:
      return translateText("error_login_15");
    default:
      return translateText("Try again");
  }
}
