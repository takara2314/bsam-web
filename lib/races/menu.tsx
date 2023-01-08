import type { Association, LiveMessage } from '../../models';
import AthleteInfo from './athleteInfo';
import Copyright from './copyright';
import CourseInfo from './courseInfo';
import Stopwatch from './stopwatch';
import Title from './title';

interface Props {
  assoc: Association;
  liveInfo: LiveMessage | null;
}

const Menu = ({ assoc, liveInfo }: Props) => {
  return (
    <nav className="px-5 py-5 2xl:py-8 col-span-1 relative overflow-hidden">
      <Title
        raceName={assoc.race_name}
        assocName={assoc.name}
      />
      <Stopwatch />
      <AthleteInfo />
      <CourseInfo marks={liveInfo ? liveInfo.marks : null} />
      <Copyright />
    </nav>
  );
};

export default Menu;
