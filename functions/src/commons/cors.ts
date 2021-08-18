/* eslint @typescript-eslint/no-var-requires: "off" */

import { methodEnum } from '../enums/method.enum';

export const cors = require('cors')({
  origin: true,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Authorization'
  ],

  methods: [
    methodEnum.OPTIONS,
    methodEnum.GET,
    methodEnum.POST,
    methodEnum.PUT,
    methodEnum.PATCH,
    methodEnum.DELETE
  ]
});
