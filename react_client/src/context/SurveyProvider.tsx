import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  FunctionComponent,
  ReactNode,
  useMemo,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FORM_DEFAULT_VALUES } from '../constants/config';
import schema from '../constants/validation';
import { SurveyData } from '../types/types';

type SurveyProviderProps = {
  children: ReactNode;
};

const SurveyProvider: FunctionComponent<SurveyProviderProps> = ({ children }) => {
  const methods = useForm<SurveyData>({
    resolver: yupResolver(schema),
    defaultValues: FORM_DEFAULT_VALUES,
  });
  const memoizedMethods = useMemo(
    () => methods,
    [methods],
  );
  return <FormProvider {...memoizedMethods}>{children}</FormProvider>;
};

export default SurveyProvider;
