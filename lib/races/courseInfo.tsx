import { useEffect, useState } from 'react';
import type { PositionWithId } from '../../models';

interface Props {
  marks: PositionWithId[] | null;
}

const CourseInfo = ({ marks }: Props) => {
  const [outlineImg, setOutlineImg] = useState<string>('/course-outlines/none.svg');

  // Example: [{user_id: ''}, {user_id: 'example_B'}, {user_id: 'example_C'}]
  // -> setOutlineImg('/course-outlines/2-3.svg');
  useEffect(() => {
    if (!marks) {
      return;
    }

    const prepared = [];

    for (let i = 0; i < marks.length; i++) {
      if (marks[i].user_id !== '') {
        prepared.push(i + 1);
      }
    }

    if (prepared.length === 0) {
      setOutlineImg('/course-outlines/none.svg');
      return;
    }

    setOutlineImg(`/course-outlines/${prepared.join('-')}.svg`);
  }, [marks]);

  return (
    <section className="mt-4 2xl:mt-5 w-full aspect-video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={outlineImg}
        alt="コースの概形"
        className="w-full select-none pointer-events-none"
      />
    </section>
  );
};

export default CourseInfo;
