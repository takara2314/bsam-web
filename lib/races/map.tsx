'use client';

import { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { Association, LiveMessage } from '../../models';

interface Props {
  assoc: Association;
  liveInfo: LiveMessage | null;
}

const Map = ({ assoc, liveInfo }: Props) => {
  const mapObj = useRef<GoogleMap>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const zoomNum = 18;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);

    setTimeout(() => {
      map.setCenter({
        lat: Number(process.env.NEXT_PUBLIC_LATITUDE ?? 0.0),
        lng: Number(process.env.NEXT_PUBLIC_LONGITUDE ?? 0.0)
      });
      map.setZoom(zoomNum);
    }, 100);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          ref={mapObj}
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          zoom={zoomNum}
          tilt={0}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            mapTypeId: 'satellite'
          }}
        >
          {liveInfo && (
            <>
              {liveInfo.athletes.map((user) =>
                <Marker
                  key={user.user_id}
                  position={{
                    lat: user.latitude,
                    lng: user.longitude
                  }}
                  icon={{
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    strokeColor: 'white',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: 'rgb(59, 130, 246)',
                    fillOpacity: 1,
                    rotation: user.heading
                  }}
                  zIndex={10}
                />
              )}

              {liveInfo.marks.map((user, index) =>
                <Marker
                  key={user.user_id !== '' ? user.user_id : `mark${index}`}
                  position={{
                    lat: user.latitude,
                    lng: user.longitude
                  }}
                  icon={{
                    url: `/marks/${index + 1}.png`,
                    scaledSize: new google.maps.Size(40, 40)
                  }}
                  zIndex={0}
                />
              )}
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
