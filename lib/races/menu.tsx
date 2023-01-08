import type { Association } from '../../models';
import AthleteInfo from './athleteInfo';
import Copyright from './copyright';
import CourseInfo from './courseInfo';
import Stopwatch from './stopwatch';
import Title from './title';

const Menu = ({ assoc }: { assoc: Association }) => {
  return (
    <nav className="px-5 py-5 2xl:py-8 col-span-1 relative overflow-hidden">
      <Title
        raceName={assoc.race_name}
        assocName={assoc.name}
      />
      <Stopwatch />
      <AthleteInfo />
      <CourseInfo />
      <Copyright />
    </nav>
  );
};

export default Menu;
