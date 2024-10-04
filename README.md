# AdviceShare

AdviceShare is a web application that allows users to share and receive advice on various topics. Built with Next.js, TypeScript, and Firebase, it provides a platform for community wisdom sharing.

## Features

- Share advice in different categories
- View and like advice from other users
- Responsive design with a clean, modern UI
- Real-time updates using Firebase Realtime Database
- Support for both English and Hebrew text

## Technologies Used

- Next.js 14
- TypeScript
- Firebase (Realtime Database)
- Tailwind CSS
- Shadcn UI components

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/advice-share.git
   cd advice-share
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Firebase configuration:
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- Browse advice by category
- Share your own advice
- Like and unlike advice from others
- View most liked and recent advice in each category

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
