import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { CollectionEnum } from '../enums/collection.enum';
import { BudgetModel, BudgetQueryModel } from '../models/budget.model';

const list = async (queryParams?: BudgetQueryModel): Promise<BudgetModel[]> => {
  const query: any = firestore().collection(CollectionEnum.budgets);
  const querySnapshot = await query.get();

  return querySnapshot.docs.map((o: { data: () => BudgetModel; id: any }) => {
    const data = o.data() as BudgetModel;
    const id = o.id;

    return {
      ...data,
      id
    };
  });
};

const get = async (id: string): Promise<BudgetModel> => {
  const snapShot = await firestore()
    .collection(CollectionEnum.budgets)
    .doc(id)
    .get();

  if (!snapShot.data()) {
    throw new HttpsError('not-found', 'budget type not found');
  }

  const data = snapShot.data() as BudgetModel;

  return {
    ...data,
    id
  };
};

const create = async (
  body: BudgetModel
): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  return firestore().collection(CollectionEnum.budgets).add(body);
};

const patch = async (
  id: string,
  body: BudgetModel
): Promise<firestore.WriteResult> => {
  return await firestore()
    .collection(CollectionEnum.budgets)
    .doc(id)
    .set(body, { merge: true });
};

const remove = async (id: string): Promise<firestore.WriteResult> => {
  return firestore().collection(CollectionEnum.budgets).doc(id).delete();
};

export const BudgetsService = {
  get,
  list,
  create,
  patch,
  remove
};
