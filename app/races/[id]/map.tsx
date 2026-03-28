"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import type { LiveMessage } from "../../models";

interface Props {
  liveInfo: LiveMessage | null;
}

type AdvancedMarker = google.maps.marker.AdvancedMarkerElement;

const DEFAULT_MAP_ID = "DEMO_MAP_ID";

const COLORS_BY_ATHLETE: Record<string, string> = {
  athlete1: "yellow",
  athlete2: "blue",
  athlete3: "white",
  athlete4: "green",
  athlete5: "yellow",
  athlete6: "pink",
  athlete7: "blue",
  athlete8: "white",
  athlete9: "green",
  athlete10: "pink",
};

const getColorByAthlete = (athleteId: string): string => {
  if (athleteId in COLORS_BY_ATHLETE) {
    return COLORS_BY_ATHLETE[athleteId];
  }

  return "blue";
};

const Map = ({ liveInfo }: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<AdvancedMarker[]>([]);
  const zoomNum = 18;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["marker"],
  });

  useEffect(() => {
    if (!map || !liveInfo) {
      clearMarkers(markersRef.current);
      markersRef.current = [];
      return;
    }

    let isActive = true;

    const renderMarkers = async () => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      if (!isActive) {
        return;
      }

      const markers: AdvancedMarker[] = [
        ...liveInfo.athletes.map(
          (user) =>
            new AdvancedMarkerElement({
              map,
              position: {
                lat: user.location.latitude + 0.00000025,
                lng: user.location.longitude + 0.00000025,
              },
              content: createImageMarkerContent(
                `/sails/${Number(user.user_id.replace("athlete", ""))}.png`,
                30,
                0.75,
              ),
              zIndex: 5,
              title: user.user_id,
            }),
        ),
        ...liveInfo.athletes.map(
          (user) =>
            new AdvancedMarkerElement({
              map,
              position: {
                lat: user.location.latitude,
                lng: user.location.longitude,
              },
              content: createArrowMarkerContent(
                getColorByAthlete(user.user_id),
                user.location.heading,
              ),
              zIndex: 10,
              title: user.user_id,
            }),
        ),
        ...liveInfo.marks.map(
          (user, index) =>
            new AdvancedMarkerElement({
              map,
              position: {
                lat: user.position.latitude,
                lng: user.position.longitude,
              },
              content: createImageMarkerContent(`/marks/${index + 1}.png`, 40),
              zIndex: 0,
              title: user.user_id !== "" ? user.user_id : `mark${index + 1}`,
            }),
        ),
      ];

      clearMarkers(markersRef.current);
      markersRef.current = markers;
    };

    void renderMarkers();

    return () => {
      isActive = false;
      clearMarkers(markersRef.current);
      markersRef.current = [];
    };
  }, [liveInfo, map]);

  const onLoad = (map: google.maps.Map) => {
    map.setCenter({
      lat: Number(process.env.NEXT_PUBLIC_LATITUDE ?? 0.0),
      lng: Number(process.env.NEXT_PUBLIC_LONGITUDE ?? 0.0),
    });
    map.setZoom(zoomNum);
    setMap(map);
  };

  const onUnmount = () => {
    clearMarkers(markersRef.current);
    markersRef.current = [];
    setMap(null);
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoom={zoomNum}
          tilt={0}
          onLoad={onLoad}
          options={{
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            mapTypeId: "satellite",
            mapId: DEFAULT_MAP_ID,
          }}
          onUnmount={onUnmount}
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </>
  );
};

const clearMarkers = (markers: AdvancedMarker[]) => {
  for (const marker of markers) {
    marker.map = null;
  }
};

const createImageMarkerContent = (src: string, size: number, opacity = 1) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = "";
  image.width = size;
  image.height = size;
  image.style.width = `${size}px`;
  image.style.height = `${size}px`;
  image.style.opacity = `${opacity}`;
  image.style.pointerEvents = "none";

  return image;
};

const createArrowMarkerContent = (color: string, heading: number) => {
  const arrow = document.createElement("div");
  arrow.style.width = "18px";
  arrow.style.height = "18px";
  arrow.style.backgroundColor = color;
  arrow.style.clipPath = "polygon(50% 0, 100% 100%, 50% 75%, 0 100%)";
  arrow.style.border = "2px solid rgba(255, 255, 255, 0.5)";
  arrow.style.boxSizing = "border-box";
  arrow.style.transform = `rotate(${heading}deg)`;
  arrow.style.transformOrigin = "center";
  arrow.style.pointerEvents = "none";

  return arrow;
};

export default Map;
