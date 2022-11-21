import {
  Form as VForm,
  Field as VField,
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

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('confirmed', confirmed);

    configure({
      generateMessage: localize({ zh_TW: zhTW }),
      validateOnInput: true,
    });

    setLocale('zh_TW');
  },
};
