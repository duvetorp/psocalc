import Head from "next/head";
import { TranslationProvider } from "@/context/TranslationContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AreaProvider } from "@/context/AreaContext";
import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Psoriasis App - Hantera Din Hud</title>
        <meta
          name="description"
          content="Få en exakt PASI, zPASI och BSA-beräkning för psoriasis. Använd vår interaktiva app för att spåra din hudhälsa."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TranslationProvider>
        <AreaProvider>
          <LanguageSwitcher />
          <Component {...pageProps} />
        </AreaProvider>
      </TranslationProvider>
    </>
  );
}
