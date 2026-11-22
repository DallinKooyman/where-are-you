import { locationManager } from "@rnmapbox/maps"
import { User } from "@/models/user"
import { Position } from "@/models/position";

const host = process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS;

console.log(process.env)
console.log(process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS)
console.log(host)

if (host === undefined || !host) {
  throw new Error(
    'Missing EXPO_PUBLIC_HOST_SERVER_ADDRESS. Check your .env.local file.'
  );
}

const eventRoute = host + '/events';

export const sendLocationUpdate = async (user: User) => {
  locationManager.getLastKnownLocation().then((location) => {
    if (location) {
      const position = new Position(location.coords.latitude, location.coords.longitude)
      fetch(eventRoute + '/location-change', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          position: position,
          time: location.timestamp
        })
      }).catch(err => {
        console.error('Error when sending the location update to the server.', err);
      })
    }
  });
};