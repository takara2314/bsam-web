import { useMemo } from "react";
import { calcDistance } from "../../utils/geo";
import type { Mark } from "../../models";

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
  const distances = useMemo(() => {
    if (!marks) {
      return {
        distance1to2: 0,
        distance2to3: 0,
        distance1to3: 0,
      };
    }

    return {
      distance1to2: isEachValidMark(marks[0], marks[1])
        ? calcDistanceMarkToMark(marks[0], marks[1])
        : 0,
      distance2to3: isEachValidMark(marks[1], marks[2])
        ? calcDistanceMarkToMark(marks[1], marks[2])
        : 0,
      distance1to3: isEachValidMark(marks[0], marks[2])
        ? calcDistanceMarkToMark(marks[0], marks[2])
        : 0,
    };
  }, [marks]);

  // Example: [{user_id: ''}, {user_id: 'example_B'}, {user_id: 'example_C'}]
  // -> setOutlineImg('/course-outlines/2-3.svg');
  const outlineImg = useMemo(() => {
    if (!marks) {
      return "/course-outlines/none.svg";
    }

    const prepared: number[] = [];

    for (let i = 0; i < marks.length; i++) {
      if (isValidMark(marks[i])) {
        prepared.push(i + 1);
      }
    }

    if (prepared.length === 0) {
      return "/course-outlines/none.svg";
    }

    return `/course-outlines/${prepared.join("-")}.svg`;
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
            distance={distances.distance1to2}
            position="inset-x-0 bottom-0"
          />

          <Distance
            markA={marks[1]}
            markB={marks[2]}
            distance={distances.distance2to3}
            position="top-12 2xl:top-20 right-2 2xl:right-8"
          />

          <Distance
            markA={marks[0]}
            markB={marks[2]}
            distance={distances.distance1to3}
            position="top-12 2xl:top-20 left-2 2xl:left-8"
          />
        </>
      )}
    </section>
  );
};

const Distance = ({ markA, markB, distance, position }: DistanceProps) => {
  const maxDistance = 10000;

  return (
    <>
      {isEachValidMark(markA, markB) && (
        <div
          className={`m-auto w-16 text-xl 2xl:text-2xl text-center absolute ${position}`}
        >
          {distance == 0 || distance >= maxDistance ? "?" : distance}
          <span className="pl-1 text-base 2xl:text-lg">m</span>
        </div>
      )}
    </>
  );
};

const isValidMark = (mark: Mark): boolean => {
  return mark.position.latitude !== 0 || mark.position.longitude !== 0;
};

const isEachValidMark = (markA: Mark, markB: Mark): boolean => {
  return isValidMark(markA) && isValidMark(markB);
};

const calcDistanceMarkToMark = (markA: Mark, markB: Mark): number => {
  const distance = calcDistance(
    markA.position.latitude,
    markA.position.longitude,
    markB.position.latitude,
    markB.position.longitude,
  );

  return Math.floor(distance);
};

export default CourseInfo;
