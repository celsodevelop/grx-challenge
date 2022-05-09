import React, { FunctionComponent } from 'react';
import { SuccessResponse, SurveyJSON } from '../types/types';
import { extractKeysFromObject } from '../utils/utils';
import StatisticsItem from './StatisticsItem';
import StatisticsRow from './StatisticsRow';

type SurveyStatisticsProps = {
  statistics: SuccessResponse;
  responseLabels: SurveyJSON['responses'];
};

const SurveyStatistics: FunctionComponent<SurveyStatisticsProps> = ({
  statistics,
  responseLabels,
}) => {
  const statisticsKey = extractKeysFromObject(statistics);
  const getTotalScore = statisticsKey.reduce(
    (
      total: number,
      statisticItem: keyof SuccessResponse,
    ) => total + statistics[statisticItem],
    0,
  );

  // const _renderStatisticsItem = () => (
  //   <div className="columns">
  //     <div className="column">
  //       <p>Positivas</p>
  //     </div>
  //     <div className="column">
  //       <p>Negativas</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <StatisticsItem title="Total" score={getTotalScore} />
          {statisticsKey.map((statisticKey) => {
            const { [statisticKey]: responseString } = responseLabels;
            return (
              <StatisticsRow
                key={statisticKey}
                title={responseString || ''}
                score={statistics[statisticKey]}
                totalScore={getTotalScore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SurveyStatistics;
