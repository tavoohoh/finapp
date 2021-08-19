import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { CollectionEnum } from '../enums/collection.enum';
import { TransactionQueryModel, TransactionModel } from '../models/transaction.model';
import { PeriodsService } from './periods.service';

const list = async (
  queryParams: TransactionQueryModel
): Promise<TransactionModel[]> => {
  let query: any = firestore().collection(CollectionEnum.transactions);

  if (queryParams.period_id) {
    query = query.where('period_id', '==', queryParams.period_id);
  }

  if (queryParams.budget) {
    query = query.where('budget', '==', queryParams.budget);
  }

  const querySnapshot = await query.orderBy('date', 'desc').get();

  return querySnapshot.docs.map((o: { data: () => TransactionModel; id: any; }) => {
    const data = o.data() as TransactionModel;
    const id = o.id;

    return {
      ...data,
      id
    };
  });
};

const get = async (id: string): Promise<TransactionModel> => {
  const snapShot = await firestore()
    .collection(CollectionEnum.transactions)
    .doc(id)
    .get();

  if (!snapShot.data()) {
    throw new HttpsError('not-found', 'transaction not found');
  }

  const data = snapShot.data() as TransactionModel;

  return {
    ...data,
    id
  };
};

const create = async (data: TransactionModel): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  const periods = await PeriodsService.list({
    is_active: true
  });

  if (periods.length === 0) {
    throw new HttpsError('failed-precondition', 'No active period found ');
  }

  const currentPeriod = periods[0];

  if (!data.is_income) {
    const budgetIndex = currentPeriod.budget.findIndex((o) => o.name === data.budget);

    if (budgetIndex === -1) {
      throw new HttpsError('failed-precondition', `No budget found with name ${data.budget}`);
    }

    currentPeriod.budget[budgetIndex].spent = currentPeriod.budget[budgetIndex].spent + data.amount;
    currentPeriod.total_expenses = currentPeriod.total_expenses + data.amount;
  } else {
    currentPeriod.total_income = currentPeriod.total_income + data.amount;
  }

  currentPeriod.difference = currentPeriod.total_income - currentPeriod.total_expenses;

  const body: TransactionModel = {
    ...data,
    period_id: currentPeriod.id as string
  };

  const response = await firestore().collection(CollectionEnum.transactions).add(body);

  await PeriodsService.patch(currentPeriod.id as string, currentPeriod);

  return response;
};

const patch = async (id: string, body: TransactionModel): Promise<firestore.WriteResult> => {
  // TODO if the amount changes then a recalculation of the budget "spent" is required
  return await firestore()
    .collection(CollectionEnum.transactions)
    .doc(id)
    .set(body, { merge: true });
};

const remove = async (id: string): Promise<firestore.WriteResult> => {
  // TODO the budget "spent" most be recalculated
  return firestore().collection(CollectionEnum.transactions).doc(id).delete();
};

export const TransactionsService = {
  get,
  list,
  create,
  patch,
  remove
};
