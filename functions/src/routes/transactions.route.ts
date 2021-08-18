import { https } from 'firebase-functions';
import { cors } from '../commons/cors';
import { methodEnum } from '../enums/method.enum';
import { TransactionsService } from '../services/transactions.service';

export const transactions = https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const id = request.params['0']?.length > 1 ? request.params['0'].replace('/', '') || null : null;

      switch (request.method) {
        case methodEnum.GET:
          /**
           * Get transaction
           */
          if (id) {
            return response
              .status(200)
              .send(await TransactionsService.get(id));
          }

          /**
           * List transactions
           */
          return response
            .status(200)
            .send(await TransactionsService.list(request.query as any));

        case methodEnum.POST:
          /**
           * Create transaction
           */
          return response
            .status(201)
            .send(await TransactionsService.create(request.body));

        case methodEnum.PATCH:
          if (!id) {
            return response.status(400).send({
              message: 'id is required'
            });
          }

          /**
           * Patch transaction
           */
          return response
            .status(201)
            .send(
              await TransactionsService.patch(
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
           * Delete transaction
           */
          return response
            .status(201)
            .send(
              await TransactionsService.patch(
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
