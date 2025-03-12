<p align="center">
  <img src="https://github.com/user-attachments/assets/b766bcee-2d62-424d-8a06-f974400d6d30" alt"Race Vision Logo" />
</p>
<p align="center">
⚠️ STILL IN DEVELOPMENT ⚠️
</p>

## 🏎️ Purpose
Free iRacing overlay solution until they finish their UX overhaul, and potentially longer depending on their implementation. Uses IRacing SDK data to display extra information that they expose, but currently do not show the user.

For those willing to help contribute, please reach out.

## 📥 Download the Latest Version
Get started with RaceVision today!
- Visit our [official website](https://www.racevision.app/)
- Or check out the [latest release on GitHub](https://github.com/mpavich2/RaceVision/releases)

## 🚀 Tech Stack Quick Look
![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

**Node Iracing SDK Wrapper** by [Friss](https://github.com/Friss/iracing-sdk-js) 🙏

## 🏁 Overlays
  - Standings (multiclass)
  - Relative (multiclass)
  - Inputs
  - Input Graph
  - Track Map (mostly working)
  - Fuel Calculator (🚧 currently developing)
  - Radar (planned)

  ### Standings
  ![standings-overlay](https://github.com/user-attachments/assets/1fac1bbd-38ef-46d1-ae46-2edfbd5df2a8)

  ### Relative
  ![relative-overlay](https://github.com/user-attachments/assets/e250942e-61cd-4a6f-ab6a-f09ab1e64f78)

  ### Inputs
  ![inputs-overlay](https://github.com/user-attachments/assets/e12d719d-fbbf-47de-be1c-97c8beafa7d1)

  ### Input Graph
  ![input-graph-overlay](https://github.com/user-attachments/assets/4e8cf40a-6939-4363-986e-1b13d1dae152)

  ### Track Map
  ![track-map-overlay](https://github.com/user-attachments/assets/79ccc7ab-8a7b-4fd8-8ace-b28081b0d34e)

  ### Overview
  ![overview](https://github.com/user-attachments/assets/549322b7-06cf-4a38-aca2-688540ba08a5)

  ## 📝 Dev Notes
  For those cloning/forking who want to run the project locally, follow these steps below.

  ### Initial setup
  - Recommend Node.js v21+
  - Create .env file with following values if you need to update track maps.
  ```
  IRACING_USERNAME=
  IRACING_PASSWORD=
  IRACING_BASE_URL=https://members-ng.iracing.com
  ```

  - Install dependencies
  ```
  npm run i
  ```

  - Update track maps script (if needed)
  ```
  npm run generate-tracks
  ```

  ### Run Locally
  Run the script below to run the project.
  ```
  npm run start
  ```


## 💬 Feedback & Support
We’d love to hear from you! Feel free to submit issues or suggestions via the [GitHub Issues](https://github.com/mpavich2/RaceVision/issues) page.
