# AR App with React Native 😎

This project is an AR (Augmented Reality) application developed using React Native, designed to integrate AR into navigation and product detection. The app provides an immersive experience by allowing users to detect products and navigate to them using both 2D maps and 3D AR visualizations.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).\
We use [**Viro library**](https://github.com/viromedia/viro) that detects and displays images and objects in real-time, presenting lifelike 3D models through augmented reality (AR)🕶️

## Technologies

- **React Native**
- **Viro - AR**
- **Mapbox**
- **Redux Toolkit**
- **Mobile Sensors**

# Video Preview

<!-- <img align="center" width="200" alt="UIApp" src="./assets/videos/detect_object.gif">
<img align="center" width="200" alt="direction" src="./assets/videos/direction.gif"> -->
<img align="center" width="200" alt="card" src="./assets/images/mocks/bohuc_card.jpg">

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install the dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install

# if you can't install, try:
npm install --legacy-peer-deps
```

## Step 2: Start your Application

You need to use real device to test or run this app.

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Open the App on Your Device:

- For iOS: Use Xcode to open the project and run on a simulator or device.
- For Android: Use Android Studio or a connected device.

## Main Features

### Detect Products in AR

- **Product Recognition and Information Display**: The app can scan and recognize products, displaying relevant information in AR.
- **Navigation Using AR**: Users can navigate to the products using both 2D maps and AR 3D paths.

## Detailed Functionality

### Product Recognition and Information Display

- **Product Image Recognition**: Utilizing Viro, the app recognizes product images.
- **Image Dataset Creation**: A dataset of product images is created for recognition.
- **AR Information Card Display**: Once a product is recognized, an information card about the product is displayed in AR.

### Navigation Using AR

- **3D Model Display**: AR models are displayed using Viro.
- **Coordinate Transformation**: Real-world coordinates are converted into AR reference frames.
- **Mapbox Integration in AR**: Mapbox is integrated to provide navigation routes within the AR environment.

### Steps for Shortest Path Navigation to a Product

1. **Data Initialization**: Collect product data and initialize it on Mapbox.
2. **Shortest Path Calculation**: Use Dijkstra's algorithm to find the shortest path from the current location to the product.
3. **Path Visualization**: Draw the navigation path in Viro.

## Challenges

- **Mobile Sensor Optimization**: The current mobile sensors are not fully optimized for AR navigation.
- **Indoor Positioning**: Accurate indoor positioning remains a significant challenge.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
