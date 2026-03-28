"use client";

import { useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { LiveMessage } from "../../models";

interface Props {
  liveInfo: LiveMessage | null;
}

const Map = ({ liveInfo }: Props) => {
  const zoomNum = 18;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter({
      lat: Number(process.env.NEXT_PUBLIC_LATITUDE ?? 0.0),
      lng: Number(process.env.NEXT_PUBLIC_LONGITUDE ?? 0.0),
    });
    map.setZoom(zoomNum);
  }, []);

  const colorsByAthlete: { [key: string]: string } = {
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
    if (athleteId in colorsByAthlete) {
      return colorsByAthlete[athleteId];
    }
    return "blue";
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
          }}
        >
          {liveInfo && (
            <>
              {liveInfo.athletes.map((user) => (
                <Marker
                  key={user.user_id}
                  position={{
                    lat: user.location.latitude + 0.00000025,
                    lng: user.location.longitude + 0.00000025,
                  }}
                  icon={{
                    url: `/sails/${Number(user.user_id.replace("athlete", ""))}.png`,
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                  opacity={0.75}
                  zIndex={5}
                />
              ))}
              {liveInfo.athletes.map((user) => (
                <Marker
                  key={user.user_id}
                  position={{
                    lat: user.location.latitude,
                    lng: user.location.longitude,
                  }}
                  icon={{
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    strokeColor: "white",
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: getColorByAthlete(user.user_id),
                    fillOpacity: 1,
                    rotation: user.location.heading,
                  }}
                  zIndex={10}
                />
              ))}

              {liveInfo.marks.map((user, index) => (
                <Marker
                  key={user.user_id !== "" ? user.user_id : `mark${index + 1}`}
                  position={{
                    lat: user.position.latitude,
                    lng: user.position.longitude,
                  }}
                  icon={{
                    url: `/marks/${index + 1}.png`,
                    scaledSize: new google.maps.Size(40, 40),
                  }}
                  zIndex={0}
                />
              ))}
            </>
          )}
        </GoogleMap>
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </>
  );
};

export default Map;
