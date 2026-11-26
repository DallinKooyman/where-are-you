// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { locationManager } from "@rnmapbox/maps";
import { User } from "@/models/user";
import { Position } from "@/models/position";
import { apiRequest } from "./apiClient";

const eventRoute = '/events';

export const sendLocationUpdate = async (user: User) => {
  locationManager.getLastKnownLocation().then((location) => {
    if (location) {
      const position = new Position(location.coords.latitude, location.coords.longitude);
      apiRequest(eventRoute + '/location-change', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          position: position,
          time: location.timestamp
        })
      }).catch(err => {
        console.error('Error when sending the location update to the server.', err);
      });
    }
  });
};