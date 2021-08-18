import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { CollectionEnum } from '../enums/collection.enum';
import { PeriodModel, PeriodQueryModel } from '../models/period.model';

const list = async (
  queryParams: PeriodQueryModel
): Promise<PeriodModel[]> => {
  let query: any = firestore().collection(CollectionEnum.periods);

  if (queryParams.date_start) {
    query = query.where('date_start', '==', queryParams.date_start);
  }

  if (queryParams.date_end) {
    query = query.where('date_end', '==', queryParams.date_end);
  }

  return query.get().docs?.map((o: { data: () => PeriodModel; id: any; }) => {
    const data = o.data() as PeriodModel;
    const uid = o.id;

    return {
      ...data,
      uid
    };
  });
};

const get = async (id: string): Promise<PeriodModel> => {
  const snapShot = await firestore()
    .collection(CollectionEnum.periods)
    .doc(id)
    .get();

  if (!snapShot.id) {
    throw new HttpsError('not-found', 'periods not found');
  }

  const data = snapShot.data() as PeriodModel;

  return {
    ...data,
    id
  };
};

const create = async (body: PeriodModel): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  return firestore().collection(CollectionEnum.periods).add(body);
};

const patch = async (id: string, body: PeriodModel): Promise<firestore.WriteResult> => {
  return await firestore()
    .collection(CollectionEnum.periods)
    .doc(id)
    .set(body, { merge: true });
};

const remove = async (id: string): Promise<firestore.WriteResult> => {
  return firestore().collection(CollectionEnum.periods).doc(id).delete();
};

export const PeriodsService = {
  get,
  list,
  create,
  patch,
  remove
};
