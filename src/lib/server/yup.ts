import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const schema = yup.object({
  username: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).minLowercase(1).minUppercase(1).minNumbers(1)
});
