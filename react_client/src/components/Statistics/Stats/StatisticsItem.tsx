import React, { FunctionComponent } from 'react';

type StatisticsItemProps = {
  title: string;
  score: number | string;
};

const StatisticsItem: FunctionComponent<StatisticsItemProps> = ({ title, score }) => {
  const renderScore = () => (
    <div className="columns is-centered">
      <div className="column has-background-grey-lighter subtitle">
        <p className="is-size-4">{score}</p>
      </div>
    </div>
  );

  return (
    <div className="box">
      <div className="column">
        <p className="title is-size-4">{title}</p>
        {renderScore()}
      </div>
    </div>
  );
};

export default StatisticsItem;
