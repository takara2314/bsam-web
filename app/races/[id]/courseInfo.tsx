import { useEffect, useState } from 'react';
import { calcDistance } from '../../utils/geo';
import type { Mark } from '../../models';

interface Props {
  marks: Mark[] | null;
}

interface DistanceProps {
  markA: Mark;
  markB: Mark;
  distance: number;
  position: string;
}

const CourseInfo = ({ marks }: Props) => {
  const [distance1to2, setDistance1to2] = useState<number>(0);
  const [distance2to3, setDistance2to3] = useState<number>(0);
  const [distance1to3, setDistance1to3] = useState<number>(0);
  const [outlineImg, setOutlineImg] = useState<string>('/course-outlines/none.svg');

  // Calc distance between marks
  useEffect(() => {
    if (!marks) {
      return;
    }

    if (isEachValidMark(marks[0], marks[1])) {
      setDistance1to2(calcDistanceMarkToMark(marks[0], marks[1]));
    }
    if (isEachValidMark(marks[1], marks[2])) {
      setDistance2to3(calcDistanceMarkToMark(marks[1], marks[2]));
    }
    if (isEachValidMark(marks[0], marks[2])) {
      setDistance1to3(calcDistanceMarkToMark(marks[0], marks[2]));
    }
  }, [marks]);

  // Example: [{user_id: ''}, {user_id: 'example_B'}, {user_id: 'example_C'}]
  // -> setOutlineImg('/course-outlines/2-3.svg');
  useEffect(() => {
    if (!marks) {
      return;
    }

    const prepared = [];

    for (let i = 0; i < marks.length; i++) {
      if (marks[i].position.latitude !== 0 || marks[i].position.longitude !== 0) {
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
    <section className="mt-4 2xl:mt-5 w-full aspect-video relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={outlineImg}
        alt="コースの概形"
        className="w-full select-none pointer-events-none"
      />

      {marks && (
        <>
          <Distance
            markA={marks[0]}
            markB={marks[1]}
            distance={distance1to2}
            position="inset-x-0 bottom-0"
          />

          <Distance
            markA={marks[1]}
            markB={marks[2]}
            distance={distance2to3}
            position="top-12 2xl:top-20 right-2 2xl:right-8"
          />

          <Distance
            markA={marks[0]}
            markB={marks[2]}
            distance={distance1to3}
            position="top-12 2xl:top-20 left-2 2xl:left-8"
          />
        </>
      )}
    </section>
  );
};

const Distance = ({markA, markB, distance, position}: DistanceProps) => {
  const maxDistance = 10000;

  return (
    <>
      {isEachValidMark(markA, markB) && (
        <div className={`m-auto w-16 text-xl 2xl:text-2xl text-center absolute ${position}`}>
          {distance == 0 || distance >= maxDistance ? '?' : distance}
          <span className="pl-1 text-base 2xl:text-lg">m</span>
        </div>
      )}
    </>
  );
};

const isEachValidMark = (markA: Mark, markB: Mark): boolean => {
  return markA.user_id !== '' && markB.user_id !== '';
};

const calcDistanceMarkToMark = (markA: Mark, markB: Mark): number => {
  const distance = calcDistance(
    markA.position.latitude,
    markA.position.longitude,
    markB.position.latitude,
    markB.position.longitude
  );

  return Math.floor(distance);
};

export default CourseInfo;
