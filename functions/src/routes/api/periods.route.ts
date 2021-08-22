import { methodEnum } from '../../enums/method.enum';
import { PeriodsService } from '../../services/periods.service';
import * as express from 'express';

export const periodsApi = async (
  method: methodEnum,
  params: any[],
  response: express.Response
): Promise<express.Response> => {
  try {
    switch (method) {
      case methodEnum.GET:
        /**
         * Get period
         */
        return response.status(200).send(await PeriodsService.apiList());

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
};
