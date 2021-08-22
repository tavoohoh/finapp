import { https } from 'firebase-functions';
import { cors } from '../../commons/cors';
import { methodEnum } from '../../enums/method.enum';
import { PeriodsService } from '../../services/periods.service';
import { ApiUrlsEnum } from '../../enums/api.enum';
import { periodsApi } from './periods.route';

export const api = https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const params = request.path?.split('/');

      switch (params[1]) {
        case ApiUrlsEnum.periods:
          /**
           * Get periods
           */
          return periodsApi(request.method as methodEnum, params, response);

        case ApiUrlsEnum.periodsDetail:
          /**
           * Get period detail
           */
          return response.status(200).send({
            request: 'period detail'
          });

        case ApiUrlsEnum.budgetsDetail:
          /**
           * Get budget detail
           */
          return response.status(200).send({
            request: 'budget detail'
          });

        default:
          return response.status(405).send({
            message: 'Method not allowed'
          });
      }
    } catch (error) {
      return response.status(error.httpErrorCode?.status || 500).send({
        message: error.message
      });
    }
  });
});
