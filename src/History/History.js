import React from 'react';
import moment from 'moment';

import './History.css';

import SoundService from '../SoundService';
import Graph from '../Graph/Graph';

export default ({ onSelect }) => {
  const clips = SoundService.getClips();

  return (
    <ul className="history">{
      clips.map(({
        id,
        data,
        timestamp,
        duration,
        samples,
      }) => (
        <li
          key={timestamp}
        >
          <Graph values={samples} />
          <div className="time">
            <div className="timestamp">{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div className="duration">{duration}ms</div>
          </div>
          {/* <button onClick={() => SoundService.deleteClip(id)}>X</button>
          <button onClick={() => onSelect(data)}>Play</button> */}
        </li>))
    }
    </ul>
  );
};
