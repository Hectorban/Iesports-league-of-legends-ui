import React, {ReactElement, useEffect, useState} from 'react';
import ReactLoading from 'react-loading'
import { ChampSelectType } from 'src/types/champSelect';
import NCGStore, { replicate } from "../../stores/NodecgStore";

import './app.scss'
import Team from './components/Team';
import Ban from './components/Ban'
import Timer from './components/Timer';

const app: React.FC = (): ReactElement => {
  const [repState, setRepState] = useState({
    replicants: NCGStore.getReplicants(),
  });

  useEffect(() => {
    replicate("champSelectUpdate");
    replicate('TeamInfoRep') // You can subscribe to replicants with this method
  }, []);

  useEffect(() => {
    NCGStore.on("change", () => {
      setRepState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }, []);
  
  const {
    replicants: { champSelectUpdate }, // Used to take out a replicant from the replicants object
  } = repState || {}
  
  if(!champSelectUpdate) {
    return (
      <div className='loading-container'>
        <ReactLoading
          className='loading'
          type="spinningBubbles" 
          color="black" 
          height={400} 
          width={400} 
        />
      </div>
    )
  }
  const champSelect:ChampSelectType = champSelectUpdate
  const { myTeam, theirTeam, bans } = champSelect
  const { myTeamBans, theirTeamBans} = bans
  
  return (
    <div id="app">
      <div className="app-background">
        <img className='background-1' src='https://i.imgur.com/fs4iwBB.png' alt='El FONDO deberia estar aqui'/>
        <video className='background-2' autoPlay muted> 
          <source src='https://www.dropbox.com/s/qmgmgupp007ytmw/Fondo_Colores.mp4?raw=1'/>
        </video>
      </div>
      <div className="app-container">
        <Team
          key={1}
          side="Blue"
          data={myTeam}
        />
        <Team
          key={2}
          side="Red"
          data={theirTeam}
        />
        <Ban
          key={3}
          side='Blue'
          data={myTeamBans}
        />
        <Ban
          key={4}
          side='Red'
          data={theirTeamBans}
        />
      </div>
    </div>
  );
};

export default app;