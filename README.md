# TeleHealth

TeleHealth is a web application that helps users describe their current symptoms to determine their medical condition and receive information about appropriate medications.

## Installation and Project Set-Up

### Backend

1. In the `my-app-backend` folder, import the `getMedication.sql` database into your MySQL server.

2. Install the necessary Python dependencies:

   ```bash
   cd my-app-backend
   pip install -r requirements.txt
    ```

### Frontend
1. Navigate to the `my-app` folder.
2. Install the required npm packages:

   ``` bash 
   cd my-app
   npm install
   ```

3. Start the frontend development server:

   ``` bash 
   npm start
   ```

## How to Use TeleHealth

To experience the full functionality of TeleHealth, follow these steps:

1. Select `high_fever` as a symptom.

2. Click on `AIDS` to see the backend call and retrieve the necessary medication information.

3. Click on `Acne` to observe the response when there is no backend data available.

Enjoy exploring TeleHealth!
