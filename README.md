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

## 📜 Documentation
To generate and serve documentation:
1. Use **JSDoc** or **Docz** for auto-generated docs.
2. Store documentation inside the `docs/` folder.
3. Deploy using GitHub Pages, Vercel, or another platform.

### Generate Documentation
For JSDoc:
```sh
yarn global add jsdoc
jsdoc -c jsdoc.json
```


---

### Contributing
Pull requests are welcome! For major changes, please open an issue first.

### License
This project is licensed under the MIT License.

---

