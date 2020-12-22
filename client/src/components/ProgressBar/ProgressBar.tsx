import React from "react";
import './ProgressBar.scss'

interface ProgressBarProps {
  completed: number,
}

const ProgressBar: React.FC<ProgressBarProps> = ({completed}) => {
  
  return (
    <div className="containerStyles">
      <div className="fillerStyles" style={{height: `${completed}%`}}>
        <span className="labelStyles">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;