import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { CollectionEnum } from '../enums/collection.enum';
import { PeriodModel, PeriodQueryModel } from '../models/period.model';
import { DateFactory } from '../commons/date';
import { BudgetsService } from './budgets.service';

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

  if (queryParams.is_active) {
    query = query.where('is_active', '==', true);
  }

  if (queryParams.is_latest) {
    query = query.where('is_latest', '==', true);
  }

  const querySnapShot = await query.get();

  return querySnapShot.docs.map((o: { data: () => PeriodModel; id: string; }) => {
    const data = o.data() as PeriodModel;
    const id = o.id;

    return {
      ...data,
      id
    };
  });
};

const get = async (id: string): Promise<PeriodModel> => {
  const snapShot = await firestore()
    .collection(CollectionEnum.periods)
    .doc(id)
    .get();

  if (!snapShot.data()) {
    throw new HttpsError('not-found', 'periods not found');
  }

  const data = snapShot.data() as PeriodModel;

  return {
    ...data,
    id
  };
};

const create = async (): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  const currentPeriod = await list({
    is_active: true
  });

  if (currentPeriod.length > 0) {
    throw new HttpsError('failed-precondition', 'A period is already active');
  }

  const latestPeriod = await list({
    is_latest: true
  });

  const total_savings = (latestPeriod[0]?.total_savings || 0) + (latestPeriod[0]?.difference || 0);

  const body: PeriodModel = {
    date_start: DateFactory.formatAsYYYYMMDD(new Date()),
    budget: await BudgetsService.list(),
    is_active: true,
    is_latest: false,
    total_income: 0,
    total_expenses: 0,
    difference: 0,
    total_savings
  };

  if (latestPeriod.length > 0) {
    await patch(latestPeriod[0].id as string, { is_latest: false } as any);
  }

  return firestore().collection(CollectionEnum.periods).add(body);
};

const patch = async (id: string, body: PeriodModel): Promise<firestore.WriteResult> => {
  return await firestore()
    .collection(CollectionEnum.periods)
    .doc(id)
    .set(body, { merge: true });
};

const terminate = async (id: string): Promise<firestore.WriteResult> => {
  const period = await get(id);

  if (!period.is_active) {
    throw new HttpsError('failed-precondition', 'This period is not active');
  }

  return patch(id, {
    date_end: DateFactory.formatAsYYYYMMDD(new Date()),
    is_active: false,
    is_latest: true
  } as any);
};

export const PeriodsService = {
  get,
  list,
  create,
  patch,
  remove: terminate
};
