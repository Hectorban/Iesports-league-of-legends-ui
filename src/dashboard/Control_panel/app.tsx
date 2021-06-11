import React, { FC, useEffect, useState} from 'react';
import NCGStore, { replicate } from "../../stores/NodecgStore";

import './app.scss'
import TeamInfo from'./Components/TeamInfo'

const app:FC = () => {
  const [repState, setRepState] = useState({
    replicants: NCGStore.getReplicants(),
  });

  useEffect(() => {
    replicate("TeamInfoRep"); // You can subscribe to replicants with this method
  }, []);

  useEffect(() => {
    NCGStore.on("change", () => {
      setRepState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }, []);
  
  const {
    replicants: { TeamInfoRep }, // Used to take out a replicant from the replicants object
  } = repState || {}  

  const TeamInfoRepData = TeamInfoRep || null 
  const { Team1Name, Team2Name, Team1Score, Team2Score } = TeamInfoRepData || null
  
  return (
    <div id='app'>
      <div className='app-container'>
        <TeamInfo
          Team1Name = {Team1Name || "default"}
          Team2Name = {Team2Name || "default"}
          Team1Score = {Team1Score || 0}
          Team2Score = {Team2Score || 0}
        /> 
      </div>
    </div>
  );
};

export default app;
