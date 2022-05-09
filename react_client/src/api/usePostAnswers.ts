import axios from 'axios';
import { useMutation } from 'react-query';
import { POST_ANSWERS_ENDPOINT } from '../constants/config';
import { ErrorResponse, SuccessResponse, SurveyData } from '../types/types';

const ONE_SECOND = 1000;
const RETRY = 2;
const RETRY_DELAY = 2 * ONE_SECOND;

const REQUEST = {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
};

const usePostAnswers = () => useMutation<SuccessResponse, ErrorResponse, SurveyData>(
  async (answers) => {
    const { data: dataAxiosResponse } = await axios.post<SuccessResponse>(
      POST_ANSWERS_ENDPOINT,
      answers,
      REQUEST,
    );
    return dataAxiosResponse;
  },
  {
    retry: RETRY,
    retryDelay: RETRY_DELAY,
  },
);

export default usePostAnswers;
