import React, { FunctionComponent } from 'react';
import { QUANTITY_WORD } from '../constants/config';
import { formatAsPercent } from '../utils/utils';
import StatisticsItem from './StatisticsItem';

type StatisticsRowProps = {
  title: string;
  score: number;
  totalScore: number;
};

const StatisticsRow: FunctionComponent<StatisticsRowProps> = ({
  title,
  score,
  totalScore,
}) => (
  <div className="columns">
    <div className="column">
      <StatisticsItem title={`${QUANTITY_WORD} ${title}`} score={score} />
    </div>
    <div className="column">
      <StatisticsItem
        title={`% ${title}`}
        score={formatAsPercent((score / totalScore) * 100)}
      />
    </div>
  </div>
);

export default StatisticsRow;
