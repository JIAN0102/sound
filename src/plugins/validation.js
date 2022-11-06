import {
  Form as VForm,
  Field as VField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate';
import { required, min, max, email, confirmed } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

export default {
  install(app) {
    app.component('VForm', VForm);
    app.component('VField', VField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('confirmed', confirmed);

    localize({ zh_TW: zhTW });

    configure({
      generateMessage: localize('zh_TW', {
        names: {
          name: '姓名',
          email: '電子郵件',
          password: '密碼',
          confirmPassword: '密碼',
        },
      }),
      classes: true,
    });

    setLocale('zh_TW');
  },
};
