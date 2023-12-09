# MB Docs - Write, Share, Collaborate.

MB Docs is a collaborative document editing platform that allows users to create, share, and collaborate on documents in real-time.

## Installation

### Client Side

1. Install dependencies:
   ```bash
   npm install
   
2. Build the project:
   ```bash
   npm run build
   
3. Run the server:
   ```bash
   npm run dev

Make sure to create a .env file with the following configurations:
   ```bash
   VITE_SERVER=__Server url__
  VITE_CLIENT=__Client url__
```

### Server Side

1. Install dependencies:
   ```bash
   npm install
   
2. Run the project server:
   ```bash
   npm start

## Key Features

- **User Accounts**:
  - Create and manage your account.
  - Edit profile details.
  - Change and reset passwords.

- **Document Editing**:
  - Use the Quill editor for rich text document creation.
  - Real-time collaboration with multiple users.

- **Document Sharing**:
  - Share document links for collaborative editing.
  - Anyone with the link can make changes to the document.
 
- **Real-time Collaboration**:
  - Using Socket.io for seamless collaboration.
  - Multiple users can work on the same document simultaneously.


## Technologies Used

- Frontend: React.js
- Backend: Node.js
- Database: MongoDB
- Other: Quill for editor, Socket.io
  
## Demo

Access the website live:- [https://mb-docs.vercel.app/](https://mb-docs.vercel.app/)

## Screenshots

![Login](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128743/Website%20Demo/Login_yqvatw.png)
![Reset Password](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128743/Website%20Demo/Reset_amdzfg.png)
![HomePage](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128743/Website%20Demo/Home_lcaqyy.png)
![Edit Profile](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/edit_fjibjt.png)
![Doc](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/Doc_c7w6lv.png)
![Doc](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/Doc2_e55iki.png)

---
