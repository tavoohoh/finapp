import * as express from 'express';
import { methodEnum } from '../../enums/method.enum';
import { BudgetsService } from '../../services/budgets.service';

export const budgetDetailApi = async (
  method: methodEnum,
  params: any[],
  response: express.Response
): Promise<express.Response> => {
  try {
    switch (method) {
      case methodEnum.GET:
        /**
         * Get budget detail
         */
        if (!params[2] || !params[3]) {
          return response.status(200).send({
            message: 'budget_name and period_id are required'
          });
        }

        return response
          .status(200)
          .send(
            await BudgetsService.apiGetByPeriodAndName(params[2], params[3])
          );

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
