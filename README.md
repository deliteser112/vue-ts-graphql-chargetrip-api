# Vehicle List and Details Application

This is a Vue.js application that fetches and displays a list of vehicles and their details. It also includes unit tests to verify the correctness of the application.

## The Explanation for Specific Components 

The project is structured into several components, GraphQL queries, and test files, here are some components:

- **queries.ts**: Contains GraphQL queries for fetching the vehicle list and individual vehicle details.
- **VehicleList.vue**: Renders the vehicle list, provides searching and pagination functionality.
- **VehicleDetail.vue**: Renders the details of a selected vehicle.
- **Toast.vue**: A utility component for displaying toast notifications.
- **VehicleDetails.spec.ts**: Unit tests for the `VehicleDetails` component.
- **VehicleList.spec.ts**: Unit tests for the `VehicleList` component.

## Setup

1. Install all dependencies using `npm install` or `yarn install`.
2. Run the project using `npm run dev` or `yarn dev`.
3. Run the tests using `npm run test` or `yarn test`.

## Usage

### Vehicle List

The Vehicle List page will display a list of vehicles. You can search for a specific vehicle by typing in the search box. The list will update as you type. 

### Vehicle Details

Clicking on a vehicle will take you to the Vehicle Details page. This page displays more detailed information about the selected vehicle.

### Toast Notifications

The application uses toast notifications to inform the user about certain actions, such as when they need to type text to search for a vehicle.

## GraphQL Queries

The application uses GraphQL queries to fetch data from the server. The queries are defined in the `queries.ts` file.

## Components

The application is built using Vue.js components. Each component is responsible for a specific part of the application's functionality:

- **VehicleList.vue**: This component fetches and displays the list of vehicles. It also handles the search functionality.
- **VehicleDetail.vue**: This component fetches and displays the details for a selected vehicle.
- **Toast.vue**: This component handles the display of toast notifications.

## Testing

The application uses Jest for testing. Test files are located alongside the components they are testing and are named `[component].spec.ts`.

- **VehicleDetails.spec.ts**: Tests for the `VehicleDetails` component.
- **VehicleList.spec.ts**: Tests for the `VehicleList` component.

## Styles

The application uses Tailwind CSS for styling. The styles are defined in each component's `<style>` block.

## Scripts

The application uses TypeScript for scripting. The scripts are defined in each component's `<script>` block.