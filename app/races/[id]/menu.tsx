import type { Association, LiveMessage, StartRaceMessage } from '../../models';
import AthleteInfo from './athleteInfo';
import Copyright from './copyright';
import CourseInfo from './courseInfo';
import Stopwatch from './stopwatch';
import Title from './title';

interface Props {
  assoc: Association;
  liveInfo: LiveMessage | null;
  startRaceInfo: StartRaceMessage | null;
}

const Menu = ({ assoc, liveInfo, startRaceInfo }: Props) => {
  return (
    <nav className="px-5 py-5 2xl:py-8 md:col-span-1 relative overflow-hidden hidden md:block">
      <Title
        raceName={assoc.race_name}
        assocName={assoc.name}
      />
      <Stopwatch info={startRaceInfo} />
      <AthleteInfo />
      <CourseInfo marks={liveInfo ? liveInfo.marks : null} />
      <Copyright />
    </nav>
  );
};

export default Menu;
