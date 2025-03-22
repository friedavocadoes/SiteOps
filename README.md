# SiteOps

The Material Logger & Tracker with Inventory support for Builders.

## Features
- Built with **Next.js 13** 
- **Firebase** for authentication, database, and storage.
- **ShadCN** for beautiful, accessible UI components.
- Secure authentication and role-based access.
- Responsive and user-friendly design.

## Setup & Installation

### Prerequisites
Before setting up the project, ensure you have:
- [**Node.js**](https://nodejs.org/en) (Latest LTS recommended)
- [**Git**](https://git-scm.com/downloads) (optional-for version control)
- [**Firebase Account**](https://firebase.google.com/) (for backend services)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/friedavocadoes/SiteOps.git
cd SiteOps
```
>[!NOTE]
>You may have to change the directory name to `siteops` since NextJS has dropped support for UpperCase directory names.

### 2️⃣ Install Dependencies
```sh
yarn install
# or
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4️⃣ Set Up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a web app and copy the config to `.env.local`.
4. Enable Authentication (Google, Email/Password, etc.).
5. Set up Firestore Database (if used).

### 5️⃣ Run the Development Server
```sh
yarn dev
# or
npm run dev
```
Your app will be live at `http://localhost:3000`.

## UI with ShadCN
This project uses **ShadCN** for UI components.

To install new components, use:
```sh
npx shadcn-ui add component-name
```

See the full list of components at [shadcn/ui](https://ui.shadcn.com/).


---

### Contributing
Pull requests are welcome! For major changes, please open an issue first.


### License
Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
