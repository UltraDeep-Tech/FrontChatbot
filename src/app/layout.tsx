"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./Navbar";
import ChatBox from "@/app/ChatBox";
import QueryWrapper from "./QueryWrapper";
import AuthGaurd from "@/components/AuthGaurd";
import useAuthStore from "@/store/authStore";
import Head from "next/head";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ChatBoxForMobiles from "@/components/ChatBox/ForMobiles";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();


  const stripePromise = loadStripe(
    "pk_test_51OWjBbDODE91yh2VuuSSboA01exGis2j0mDDJGgwR0j7623nLIitqdTkaTsyMIrmXTR71oaptFs9AhMHH7OnpBGv00iaQ0J8sQ"
  );

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isVerifyPage = pathname === "/verifytoken";
  const isProfile = pathname === "/userProfile";
  const isTerms = pathname === "/Terms";
  const isPrivacy = pathname === "/Privacy";
  const isForget = pathname === "/forget";
  const isResetPassword = pathname === "/resetpassword";

  const user = useAuthStore(state => state.user);
  const GTM_ID = 'G-3W17F67N7W'
  return (
    <html lang="en">
      {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'report-sample' 'nonce-UniTG9dtIeAiLYqxvmTXCg' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' https://accounts.google.com;"></meta> */}
      <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '386089217663705');
          fbq('track', 'PageView');
        `,

      }} />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=386089217663705&ev=PageView&noscript=1" />
      </noscript>
      <Script src="https://accounts.google.com/gsi/client" />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
      <Head>
        <link rel="icon" href="/asdf.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" as="..." />
        {/* @ts-ignore */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin as="..." />
        <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet" as="..." />
        
      </Head>

      <Elements stripe={stripePromise}>
        <QueryWrapper>
          <AuthGaurd>
          <body className="h-screen bg-gradient-to-b border-b-2 to-[#1a012b] from-[#111111] text-white flex flex-col relative overflow-hidden">
  {/* Video de fondo */}
  <img className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-10" src="/images/pikaso_embed.png"
  >
  </img>

  {!isLoginPage && !isRegisterPage && !isVerifyPage && !isForget && !isResetPassword && <Navbar />}
  
  <div className="relative rounded-xl p-4 mt-2 bg-heart-pattern md:flex md:flex-row md:justify-between flex-grow h-full overflow-hidden">
    {!isLoginPage && !isRegisterPage && !isVerifyPage && !isProfile && !isTerms && !isPrivacy && !isForget && !isResetPassword && (user && <ChatBox />)}
    <ChatBoxForMobiles />
    {children}
  </div>
</body>

          </AuthGaurd>
        </QueryWrapper>
      </Elements>
    </html>
  );
}
