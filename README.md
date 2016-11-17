# 5-days-weather-forecast
Application for showing 5 days forecast for Riga, Latvia. Written using React, Redux, Typescript, LESS and built using Webpack

Install and run instructions:
1. To run the app you wil need NPM installed globally on your machine. 

2. Navigate to the folder you will clone the app to.

3. Run "npm run init" command from the command prompt (terminal). This will fetch all node modules, packages and will install typings for TypeScript.

4. When installation is complete run "npm run start" to build the app.

5. Navigate to http://localhost:4000/ in your browser.

There is a couple of things which need refactoring:
1. At the moment /components/forecast/Forecast component is way to big. Some things eg. temperature, humidity, wind placeholders need to be extracted to a separate componets. So it is easier to style and reuse them.
2. UI is a little "ugly" at the moment. So some time needs to be spent on CSS.
3. Some functions eg. turning degrees to direction need to moved to utility functions for keeping modules more readableand for being able to reuse them.