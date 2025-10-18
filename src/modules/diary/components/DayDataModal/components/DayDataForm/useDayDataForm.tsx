import {useCallback, useEffect, useMemo} from 'react';
import moment from 'moment';
import {UrinationDataDTO} from '../../../../../../types/diary';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  dayDataFormSchema,
  DayDataRawForm,
  volumeOptions,
  yesNoOptions,
} from './schema/dayDataFormSchema';

export type DayDataFormValues = UrinationDataDTO;

export interface UseDayDataFormParams {
  defaultValues?: Partial<DayDataFormValues>;
  onSubmit: (data: DayDataFormValues) => void;
  baseDate?: Date;
}

const buildDefaults = (dv?: Partial<DayDataFormValues>): DayDataRawForm => {
  const time = (() => {
    if (dv?.time) {
      const m = moment(dv.time, 'HH:mm');
      if (m.isValid()) return m.format('HH:mm');
    }
    return moment().format('HH:mm');
  })();
  return {
    time,
    amount: (dv?.amount as DayDataRawForm['amount']) || 'LOW',
    urgency: dv?.urgency === true ? 'YES' : 'NO',
    leakage: dv?.leakage === true ? 'YES' : 'NO',
    reason: dv?.reason || '',
  };
};

export function useDayDataForm({
  defaultValues,
  onSubmit,
  baseDate,
}: UseDayDataFormParams) {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    watch,
    reset,
  } = useForm<DayDataRawForm>({
    resolver: zodResolver(dayDataFormSchema),
    mode: 'onChange',
    defaultValues: buildDefaults(defaultValues),
  });

  useEffect(() => {
    reset(buildDefaults(defaultValues));
  }, [reset, defaultValues]);

  const timeString = watch('time');

  const setTimeFromDate = (date: Date) => {
    setValue('time', moment(date).format('HH:mm'), {shouldValidate: true});
  };

  const submit = useCallback(
    (data: DayDataRawForm) => {
      onSubmit({
        time: data.time,
        amount: data.amount,
        urgency: data.urgency === 'YES',
        leakage: data.leakage === 'YES',
        reason: data.reason || '',
      });
    },
    [onSubmit],
  );

  const handleConfirm = handleSubmit(submit);

  const currentTimeDate = useMemo(() => {
    const base = baseDate ? moment(baseDate) : moment();
    const t = moment(timeString, 'HH:mm');
    return base
      .clone()
      .hour(t.isValid() ? t.hour() : 0)
      .minute(t.isValid() ? t.minute() : 0)
      .second(0)
      .millisecond(0)
      .toDate();
  }, [baseDate, timeString]);

  return {
    control,
    errors,
    isValid,
    handleConfirm,
    setTimeFromDate,
    timeString,
    volumeOptions,
    yesNoOptions,
    currentTimeDate,
  };
}
