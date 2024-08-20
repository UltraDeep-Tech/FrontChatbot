### Architecture Overview

The Gentleman Project is structured as a modern web application that leverages the power of Next.js, a React framework, for server-side rendering and static site generation. The architecture is designed to provide a seamless user experience for both the User-Facing WebApp and the Admin Dashboard, with a focus on performance, scalability, and security.

#### Frontend Architecture

The frontend of the application is built using Next.js, which allows for both client-side and server-side rendering. This hybrid approach enables the application to deliver fast page loads, SEO benefits, and a dynamic user experience. The use of Tailwind CSS for styling facilitates a utility-first approach to design, ensuring consistency and responsiveness across different devices.

The User-Facing WebApp includes interactive components such as user registration and login forms, profile management interfaces, and payment processing flows. The integration of Stripe's API for handling payments ensures secure transactions and a smooth checkout experience for users subscribing to one plan right now.

AI Avatars are a key feature of the application, providing users with text-to-voice and voice-to-text functionalities for real-time communication. The frontend interacts with backend services to convert text to speech and vice versa, enhancing the interactive experience with the AI avatars.

#### Backend Architecture

The backend of the application is designed to handle API requests, manage user data, and process payments. It interacts with various services, including authentication providers, speech services, and the Stripe API for subscription management.

The backend leverages environment variables to configure external services such as the Google Client ID for OAuth authentication and facebook OAuth, the API URL for backend services, and the Speech Service for text-to-speech and speech-to-text functionalities. These configurations are managed securely and can be easily updated without code changes.

#### Deployment and Hosting

The application is hosted on cloud infrastructure, which provides the necessary compute resources and scalability to handle varying loads. The use of containerization tools ensures that the application can be deployed consistently across different environments.

Security is a top priority, with SSL/TLS certificates implemented to establish secure HTTPS connections. Additionally, content is distributed globally using CDN services to reduce latency and improve load times for users around the world.

#### Data Management

MongoDB is used as the database management system, chosen for its flexibility and performance in handling JSON-like documents. It stores user data, subscription information, and app configurations, providing a robust backend for the application's data needs.

#### Real-time Communication

The application utilizes real-time communication APIs to provide text-to-voice and voice-to-text services. These APIs are integrated into the frontend and are triggered during user interactions with the AI avatars, allowing for a dynamic and engaging user experience.

#### Summary

In summary, the Gentleman Project's architecture is a well-orchestrated combination of frontend and backend technologies, cloud services, and third-party APIs. It is designed to deliver a high-quality user experience, with a focus on interactivity, performance, and security. The modular design allows for easy maintenance and scalability, ensuring that the application can evolve to meet future demands.

### Business Logic

The business logic of the application is centered around user account management, subscription services, and real-time communication with AI avatars. The codebase reflects a modular design where different features are encapsulated within their respective components and services. Below is an overview of how the modules interact to provide the core features of the application.

#### User Account Management

User account creation is facilitated through a registration form that collects basic information such as first name, last name, and email. The `Register` component handles the user input and communicates with the backend API to create a new user account. Upon successful registration, users receive a confirmation email to verify their account, which is managed by the `useMutation` hook that calls the `auth/resendemail` endpoint.

Login functionality is provided through a form that authenticates users via email and password. The `useMutation` hook is used to interact with the `auth/google` endpoint for users logging in with Google OAuth, and the `auth/login` endpoint for standard email/password login.

Password reset capability is implemented through the `Forget` component, which allows users to request a password reset email. The `useMutation` hook interacts with the `auth/requestnewpassword` endpoint to facilitate this process.

Profile management is handled by the `UserProfile` and `UserProfileData` components, allowing users to update personal information such as their profile picture and contact details. The `useQuery` and `useMutation` hooks are used to fetch and update user details from the `user_details` endpoint.

#### Subscription Services

The application integrates with Stripe for payment processing, as seen in the `stripePromise` and `CheckoutForm` components. Users can subscribe to different plans, and the `BillingTable` component uses the `useMutation` hook to interact with the `payment/PayInvoice` endpoint to handle invoice payments.

Plan subscriptions management is handled by the `getUserSubscriptionDetailsApi` and `getSubscriptionDetailsApi` services, which fetch subscription details from the backend. Users can view their current plan and manage subscriptions through the `UserPlansAndSettings` component.

#### AI Avatar Communication

Real-time communication with AI avatars is a key feature of the application. The `ChatUi` component facilitates text-to-voice and voice-to-text interactions using Microsoft Cognitive Services Speech SDK, as seen in the `SpeechToTextComponent`. The `useMutation` hook is used to send and receive messages from the `gemini` API endpoint.

AI Avatar settings management is provided by the `AiCharProfile` component, which allows users to view and update avatar details such as pictures and names. The `createUserModelApi` service is used to update the avatar's description.

#### Static Content Management

The application includes static content management for pages like Terms and Conditions and Privacy Policy. These are accessible to users for transparency and compliance purposes.

#### Role-Based Access Control

Admin functionality, such as viewing and managing user details and subscriptions, is implied through the presence of admin-specific components like `BillingTable`. However, explicit role-based access control logic is not present in the provided code snippets.

#### Monitoring and Statistics

While not directly evident from the provided code, the application likely includes monitoring of AI Avatar usage statistics to track and manage the resources consumed by each user, as suggested by the `checkTextCondition` and `checkAudioCondition` functions that check against usage limits.

#### Conclusion

The business logic of the application is designed to provide a seamless user experience for account management, subscription services, and real-time AI avatar communication. The modular approach and use of React hooks for API interactions facilitate a clean and maintainable codebase.The technology stack and design decisions for this project are centered around creating a robust, scalable, and secure web application. Below is a detailed breakdown of the technologies, frameworks, libraries, and languages used:

### Frontend:

- **Next.js**: A React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications. It is chosen for its ease of use, SEO benefits, and its automatic code splitting that helps to load pages faster.

  ```jsx
  import Link from "next/link";
  import Image from "next/image";
  // ... other Next.js specific imports
  ```

- **React**: A JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs. It is used for styling the application without writing custom CSS.

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### APIs and Services:

- **Google Cloud**: Utilized for hosting the application and managing cloud resources. The `NEXT_PUBLIC_GOOGLE_CLIENTID` is indicative of an OAuth client ID used for authenticating users via Google.

  ```javascript
  NEXT_PUBLIC_GOOGLE_CLIENTID;
  ```

- **Microsoft Azure Cognitive Services**: For speech-to-text and text-to-speech functionalities, leveraging Azure's Speech service.

  ```javascript
  NEXT_PUBLIC_SPEECH_KEY;
  NEXT_PUBLIC_SPEECH_REGION;
  NEXT_PUBLIC_SPEECH_URL;
  ```

- **Stripe API**: For handling payments and managing subscriptions. The `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` is used to integrate Stripe's payment processing capabilities into the application.

  ```javascript
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  ```

- **Axios**: A promise-based HTTP client for the browser and Node.js, used to make HTTP requests to external services.

  ```javascript
  import axios from "axios";
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    // ... other axios configuration
  });
  ```

### Containerization:

- **Docker**: A platform used to containerize the application, ensuring that it works seamlessly in any environment. The Dockerfile specifies the Node.js environment, the working directory, and the commands to build and start the application.

  ```Dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package.json ./
  RUN yarn install
  COPY . .
  RUN yarn build
  CMD ["yarn", "start"]
  ```

### Version Control:

- **Git**: For source code management, with GitHub as the hosting service for the code repository.

### Other Integrations:

- **Form Handling**: Utilizing `react-hook-form` for managing form state and validations in React components.

  ```javascript
  const { register, handleSubmit } = useForm();
  ```

- **Image Optimization**: Services like `imagekit.io` and `storage.googleapis.com` are used for hosting and delivering optimized images.

- **Social Authentication**: The presence of a Google Client ID suggests the use of Google for social login capabilities.

- **Email Services**: Although not explicitly mentioned in the code, transactional email services like postmark are typically used for sending emails such as account verification and password resets.

- **Analytics**: Google Tag Manager is integrated for tracking and managing marketing tags and pixels.

  ```javascript
  const GTM_ID = "G-3W17F67N7W";
  ```

- **CSS-in-JS**: The project uses Tailwind CSS for styling, which allows for writing CSS directly within JavaScript files.

- **Environment Variables**: The use of environment variables (e.g., `NEXT_PUBLIC_API_URL`) suggests a practice of keeping configuration separate from code, which is crucial for security and flexibility across different environments.

This technology stack was chosen to ensure that the application is fast, responsive, and maintainable. It also allows for easy scaling and integration with various services and APIs. The use of containerization with Docker further aids in consistent deployments across development, staging, and production environments.### Dependencies and Requirements

The application relies on a set of dependencies and environment variables that must be properly configured for the application to function correctly. Below are the instructions for setting up these dependencies and requirements.

#### Environment Variables

The application requires several environment variables to be set, which include API keys, client IDs, and URLs for various services. These should be set in your environment or a `.env` file in the root of your project:

```plaintext
NEXT_PUBLIC_GOOGLE_CLIENTID=<Your Google Client ID>
NEXT_PUBLIC_API_URL=<Your API URL>
NEXT_PUBLIC_FRONT_END_URL=<Your Frontend URL>
NEXT_PUBLIC_Fb_APPID=<Your Facebook App ID>
MISTRAL_API_KEY=<Your Mistral API Key>
apiKey=<Your API Key>
NEXT_PUBLIC_SPEECH_KEY=<Your Speech Service Key>
NEXT_PUBLIC_SPEECH_REGION=<Your Speech Service Region>
NEXT_PUBLIC_SPEECH_URL=<Your Speech Service URL>
NEXT_PUBLIC_AUDIO_URL=<Your Audio Service URL>
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<Your Stripe Public Key>
```

Replace the placeholders with the actual values provided by the respective service providers.

#### Docker

The application is containerized using Docker, which requires you to have Docker installed on your machine or server. The provided `Dockerfile` outlines the steps to create a Docker image for the application:

```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
```

To build the Docker image, run the following command in the terminal:

```bash
docker build -t <your-image-name> .
```

Replace `<your-image-name>` with the desired name for your Docker image.

#### Node.js and Yarn

The application is built using Node.js, and Yarn is used as the package manager. Ensure you have Node.js and Yarn installed on your machine. The `package.json` and `yarn.lock` files list all the necessary Node.js dependencies.

To install the dependencies, run:

```bash
yarn install
```

#### Next.js

The frontend of the application is built using Next.js. Ensure you have the Next.js CLI installed globally or use `npx` to run Next.js commands. To start the development server, run:

```bash
yarn dev
```

#### Stripe

Stripe is used for handling payments and subscriptions. You need to set up a Stripe account and obtain your public key, which is set as the `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` environment variable.

#### Speech Services

The application uses speech services for text-to-speech and speech-to-text functionalities. You need to configure the `NEXT_PUBLIC_SPEECH_KEY`, `NEXT_PUBLIC_SPEECH_REGION`, and `NEXT_PUBLIC_SPEECH_URL` with the values provided by your speech service provider.

#### CDN and Image Hosting

The application uses external services like Cloudflare, imagekit, and Google Cloud Storage for content distribution and image hosting. Ensure you have the necessary configurations and API keys set up for these services.

#### Database

The application may require a database service like MongoDB for storing user data and session information. Ensure you have a MongoDB instance set up and the connection string available in your environment variables.

#### Email Services

For sending emails for account verification, password resets, and user interaction, configure an email service provider like SendGrid or Mailgun and set the appropriate API keys in your environment variables.

#### OAuth Providers

If your application supports social logins, you need to configure OAuth providers like Google and Facebook and set the client IDs in the environment variables.

#### Analytics and Logging

Set up analytics services for tracking usage and logging services for monitoring the application. Ensure the necessary API keys and configurations are in place.

By following these instructions and ensuring all dependencies are correctly installed and configured, your application should be ready to run and serve users.

