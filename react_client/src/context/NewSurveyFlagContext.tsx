import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { InferPropTypes } from '../types/types';

interface Props extends InferPropTypes<typeof NewSurveyProviderPropTypes> {
  children: ReactNode
}

const NewSurveyCtx = createContext({
  newSurvey: true,
  setNewSurvey: (value: boolean) => {
    console.log(value);
  },
});

const { Provider: CtxProvider } = NewSurveyCtx;

export const NewSurveyFlagProvider: FunctionComponent<Props> = ({ children }) => {
  const [newSurvey, setNewSurvey] = useState(true);
  const newSurveyContext = useMemo(() => ({
    newSurvey,
    setNewSurvey,
  }), [newSurvey]);

  return <CtxProvider value={newSurveyContext}>{children}</CtxProvider>;
};

export const useNewSurveyFlag = () => {
  const context = useContext(NewSurveyCtx);
  if (!context) {
    throw new Error('useUserCtx must be used within a UserProvider');
  }
  return context;
};

// PropTypes

const NewSurveyProviderPropTypes = {
  children: PropTypes.node.isRequired,
};

NewSurveyFlagProvider.propTypes = NewSurveyProviderPropTypes;
