export interface userType {
  email: string;
  password: string;
  confirm: string;
}

export interface regType {
  reg_email: string;
  reg_pw: string;
  reg_cf: string;
}

/* regExp
email : ^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}

패스워드는 8자리에서 20자리수이며, 대문자 소문자 숫자 특수기호 (!@#$%&)가 1개 이상 들어가야됨
pw : ^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$
*/
