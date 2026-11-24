# Where are You? 📍

Where Are You is a free, self-hosted service to share your location with friends and family and ONLY friends and family. This is an alternative to other location sharing services and works on your own home server. Where Are You keeps your location on your own hardware and shares your location to those with access to your server, on any mobile device, without needing to share your location with a 3rd party. 

## Overview

Where Are You is a React Native app built using Expo. It runs on iOS and Andriod and can be installed via the Expo app. The map uses [MapBox](https://www.mapbox.com/) and you must get a personal MapBox API token in order to render the maps(set  `EXPO_PUBLIC_MAPBOX_TOKEN` equal to your token in `.env` then build the project). The app will get your location from your phone and display a dot at your location.

This project is the front end. It communicates with the [Where Are You server](https://github.com/DallinKooyman/where-are-you-server) via API calls and websockets (Features may still not be added yet).

This project is still a work in progress. Features have yet to be tested. This repo and ReadMe will be updated when it is ready for use

## Development 
### Expo
This project is developed with Expo. You will need your own Expo account to start building

### Install and Run

1. Clone the repository
gh repo clone DallinKooyman/where-are-you

2. Install dependencies (see package.json)

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

