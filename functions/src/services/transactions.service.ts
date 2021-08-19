import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { CollectionEnum } from '../enums/collection.enum';
import { TransactionQueryModel, TransactionModel } from '../models/transaction.model';

const list = async (
  queryParams: TransactionQueryModel
): Promise<TransactionModel[]> => {
  let query: any = firestore().collection(CollectionEnum.transactions);

  if (queryParams.period_id) {
    query = query.where('period_id', '==', queryParams.period_id);
  }

  if (queryParams.budget_id) {
    query = query.where('budget_id', '==', queryParams.budget_id);
  }

  const querySnapshot = await query.get();

  return querySnapshot.docs.map((o: { data: () => TransactionModel; id: any; }) => {
    const data = o.data() as TransactionModel;
    const uid = o.id;

    return {
      ...data,
      uid
    };
  });
};

const get = async (id: string): Promise<TransactionModel> => {
  const snapShot = await firestore()
    .collection(CollectionEnum.transactions)
    .doc(id)
    .get();

  if (!snapShot.id) {
    throw new HttpsError('not-found', 'transaction not found');
  }

  const data = snapShot.data() as TransactionModel;

  return {
    ...data,
    id
  };
};

const create = async (body: TransactionModel): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  return firestore().collection(CollectionEnum.transactions).add(body);
};

const patch = async (id: string, body: TransactionModel): Promise<firestore.WriteResult> => {
  return await firestore()
    .collection(CollectionEnum.transactions)
    .doc(id)
    .set(body, { merge: true });
};

const remove = async (id: string): Promise<firestore.WriteResult> => {
  return firestore().collection(CollectionEnum.transactions).doc(id).delete();
};

export const TransactionsService = {
  get,
  list,
  create,
  patch,
  remove
};
