import { https } from 'firebase-functions';
import { cors } from '../commons/cors';
import { methodEnum } from '../enums/method.enum';
import { PeriodsService } from '../services/periods.service';
import { BudgetsService } from '../services/budgets.service';

export const budgets = https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const id = request.params['0']?.length > 1 ? request.params['0'].replace('/', '') || null : null;

      switch (request.method) {
        case methodEnum.GET:
          /**
           * Get budget
           */
          if (id) {
            return response
              .status(200)
              .send(await BudgetsService.get(id));
          }

          /**
           * List budgets
           */
          return response
            .status(200)
            .send(await BudgetsService.list(request.query as any));

        case methodEnum.POST:
          /**
           * Create budget
           */
          return response
            .status(201)
            .send(await BudgetsService.create(request.body));

        case methodEnum.PATCH:
          if (!id) {
            return response.status(400).send({
              message: 'id is required'
            });
          }

          /**
           * Patch budget
           */
          return response
            .status(201)
            .send(
              await BudgetsService.patch(
                id,
                request.body
              )
            );

        case methodEnum.DELETE:
          if (!id) {
            return response.status(400).send({
              message: 'id is required'
            });
          }

          /**
           * Delete budget
           */
          return response
            .status(201)
            .send(
              await PeriodsService.patch(
                id,
                request.body
              )
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
  });
});
