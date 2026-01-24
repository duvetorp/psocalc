import Head from "next/head";
import { TranslationProvider } from "@/context/TranslationContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AreaProvider } from "@/context/AreaContext";
import "@/styles/globals.css";
import { assetPath } from "@/lib/assetPath";

export default function MyApp({ Component, pageProps }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <>
      <Head>
        <link rel="icon" href={assetPath("/favicon.ico")} />
        <title>Psoriasis App - Hantera Din Hud</title>
        <meta
          name="description"
          content="Få en exakt PASI, zPASI och BSA-beräkning för psoriasis. Använd vår interaktiva app för att spåra din hudhälsa."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --base-path: "${basePath}";
          --bg-image: url("${basePath}/images/background.webp");
          --body-front-image: url("${basePath}/images/bodies-2.svg");
          --body-back-image: url("${basePath}/images/male_back.svg");
        }
      `}</style>
      <TranslationProvider>
        <AreaProvider>
          <LanguageSwitcher />
          <Component {...pageProps} />
        </AreaProvider>
      </TranslationProvider>
    </>
  );
}
