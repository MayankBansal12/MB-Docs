# MB Docs - Write, Share, Collaborate.

MB Docs is a collaborative document editing platform that allows users to create, share, and collaborate on documents in real-time.

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
    
- **GPT Assistant**:
  - Using OpenAI API to allow users to chat with the assistant.
  - Users can get help in writing documents.


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

Make sure to create a .env file with the following configurations:
   ```bash
ATLAS_URI=__MongoDB url__
SECRET=__random string to encrypt passwd__
CLIENT_URL=http://localhost:5173

//For advanced features like reset passwd and assistant
SERVER_EMAIL=__email__
SERVER_PASSWORD=__password__
OPENAI_SECRET=__openai api key__
```

## Technologies Used

- Frontend: React.js
- Backend: Node.js
- Database: MongoDB
- Other: Quill for editor, Socket.io, OpenAI API
  
## Demo

Access the website live:- [https://www.mbdocs.xyz/](https://www.mbdocs.xyz/)

## Screenshots

![Login](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128743/Website%20Demo/Login_yqvatw.png)
![Reset Password](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128743/Website%20Demo/Reset_amdzfg.png)
![HomePage](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703774198/Website%20Demo/Home_Page_omsuhd.png)
![Edit Profile](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/edit_fjibjt.png)
![Doc](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/Doc_c7w6lv.png)
![Doc](https://res.cloudinary.com/dwuyp1nss/image/upload/v1702128742/Website%20Demo/Doc2_e55iki.png)
![Chat](https://res.cloudinary.com/dwuyp1nss/image/upload/v1703776350/Website%20Demo/Chat_yysqsz.png)


## License
This is a personal project, not for commercial use. The design is original, and any resemblance is unintentional and I apologize for the same. In case of queries or feedback, you can reach out at mayankbansal125@gmail.com.

---
