# Chess Grandmasters Profile Viewer

This is a frontend application that fetches and displays a list of Chess Grandmasters from the [Chess.com public API](https://www.chess.com/news/view/published-data-api), with detailed profile information shown in a modal. Built using **React**, **TypeScript**, and **Material UI**.

## Suboptimal Compromises

### 1. Hardcoded UI layout
Profile fields are written manually instead of being extracted as reusable components.  
I would refactor to something like `<UserInfoField label="..." value="..." />` for scalability.

### 2. UI feedback is missing during API fetch
The UI currently does not display a loading indicator while fetching user data.  
This may cause confusion if the API response is delayed, as users might think the app is unresponsive.  
In a production setting, I would add a **skeleton loader or spinner** to clearly indicate that data is being loaded and the app is actively working.

### 3. Hardcoded base URL in API requests
The current implementation uses a hardcoded base URL directly in Axios calls (e.g., `https://api.chess.com`).  
In production, I would configure Axios to use an environment-based `baseURL` via `.env` variables and a reusable Axios instance, making the codebase easier to maintain and more adaptable across environments.


1. **Clone the repository**
   ```bash
   git clone https://github.com/ReyesBryanAngel/amenitiz-technical-challenge
   npm install
   npm run dev
