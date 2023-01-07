import AthleteInfo from './athleteInfo';
import Copyright from './copyright';
import CourseInfo from './courseInfo';
import Stopwatch from './stopwatch';
import Title from './title';

const Menu = () => {
  return (
    <nav className="px-5 py-5 2xl:py-8 col-span-1 relative overflow-hidden">
      <Title />
      <Stopwatch />
      <AthleteInfo />
      <CourseInfo />
      <Copyright />
    </nav>
  );
};

export default Menu;
