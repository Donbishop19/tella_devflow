This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

  📋 Table of Contents
1. 🤖 Introduction
2. ⚙️ Tech Stack
3. 🔋 Features
4. 🤸 Quick Start

  🤖 Introduction
 The project uses MongoDB for a robust database layer, NextAuth (Auth.js) for versatile authentication options (Email/Password, GitHub, Google), and sleek styling with TailwindCSS and ShadCN UI. Devoverflow enables developers to ask questions, post answers, leverage AI for responses, vote, organize content, contribute, discover jobs, and explore recommended topics—all while engaging with gamified elements like badges and rewards. 


⚙️ Tech Stack
• Zod
• Next.js
• NextAuth
• Open AI
• MongoDB
• ShadCN UI
• TypeScript
• TailwindCSS
• React Hook Form


🔋 Features
👉 Authentication: Secure sign-in with NextAuth, supporting Email/Password, Google, and GitHub.

👉 Home Page: Displays questions with filters, search, and pagination for easy navigation.

👉 Recommendations: Personalized suggestions on the home page.

👉 Complex Layout: Organized layout with popular questions and tags in view.

👉 Question Details: View questions with rich content, including images and code blocks.

👉 Voting: Upvote/downvote on questions to highlight helpful content.

👉 View Counter: Tracks the number of views for each question.

👉 Bookmarking: Save questions for quick access later.

👉 Answer Posting: MDX editor with light/dark modes for submitting answers.

👉 AI Answer Generation: Get AI-generated responses to questions.

👉 Answer Filtering: Sort answers by newest or most-voted, with pagination.

👉 Answer Voting: Upvote/downvote answers to rank quality responses.

👉 Collections: Organized saved questions with filters, search, and pagination.

👉 Community: Browse all users with search, filters, and pagination.

👉 Profile: View user info, badges, and engagement history with pagination.

👉 Job Finder: Discover jobs with filters and search, tailored to the user’s location.

👉 Tags Page: List of all tags with question counts, filters, and pagination.

👉 Tag Details: View questions by tag with search and pagination.

👉 Ask a Question: Simple interface for posting new questions.

👉 Edit & Delete: Update or remove questions and answers with validation and authorization.

👉 Global Search: Find content across questions, users, tags, and more.

👉 Responsive Design: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

👉 High Performance: Fast loading and smooth interactions for an efficient user experience.

and many more, including code architecture and reusability


🤸 Quick Start
Follow these steps to set up the project locally on your machine.

Prerequisites

Make sure you have the following installed on your machine:

Git
Node.js
npm (Node Package Manager)
Cloning the Repository

git clone https://github.com/JavaScript-Mastery-Pro/devflow-v2-record.git
cd devflow-v2-record
Installation

Install the project dependencies using npm:

npm install
Set Up Environment Variables

Create a new file named .env in the root of your project and add the following content:

# Mongodb
MONGODB_URI=

# OpenAI
OPENAI_API_KEY=

# Rapid API
NEXT_PUBLIC_RAPID_API_KEY=

# Auth
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=
NEXTAUTH_URL=

# Tiny Editor
NEXT_PUBLIC_TINY_EDITOR_API_KEY=

NEXT_PUBLIC_SERVER_URL=

NODE_ENV=
Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

Running the Project

npm run dev
Open http://localhost:3000 in your browser to view the project.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
