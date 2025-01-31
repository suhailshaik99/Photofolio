# Image Upload and Storage Application

This application allows users to upload images through a URL, which are then stored in a Firebase database. The project demonstrates how to integrate Firebase with a frontend React application to manage image uploads and retrievals.

## Features

- **Image Upload**: Users can submit image URLs through an input form.
- **Firebase Integration**: The image URLs are securely stored in Firebase Realtime Database.
- **Display Images**: The application fetches and displays images stored in Firebase in a user-friendly gallery.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase (for database storage)
- **Hosting**: Firebase Hosting (optional for deployment)

## Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the repository

git clone https://github.com/yourusername/image-upload-app.git
cd image-upload-app

### 2. Install dependencies

npm install

### 3. Set up Firebase

Create a .env file in the root of the project and add the following variables:

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_firebase_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

### 4. Run the project

npm run start
