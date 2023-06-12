const getDataFiles = (
  folderName: string,
  gluestackConfigImportPath: string
) => {
  const splitPath = folderName.split('/');
  if (splitPath[1] === 'src') {
    splitPath.splice(1, 1);
  }
  const importPath = splitPath.join('/');
  const document = `
  import * as React from 'react';
  import { Html, Head, Main, NextScript } from 'next/document';
  import { AppRegistry } from 'react-native-web';
  import { flush } from '@gluestack-style/react';
  
  function Document() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  
  Document.getInitialProps = async ({ renderPage }: any) => {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = await renderPage();
    const styles = [getStyleElement(), ...flush()];
    return { ...page, styles: React.Children.toArray(styles) };
  };
  
  export default Document;
  `;
  const providerContent = `// app/providers.tsx
"use client";

import { GluestackUIProvider } from "../components";
import { config } from "../../gluestack-ui.config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GluestackUIProvider config={config.theme}>{children}</GluestackUIProvider>
  );
}
`;

  const nextConfig = `
  /** @type {import('next').NextConfig} */
  const { withGluestackUI } = require('@gluestack/ui-next-adapter');
  
  const nextConfig = {
    reactStrictMode: true,
  };
  
  module.exports = withGluestackUI(nextConfig);
  `;

  const app = `
  import '@/styles/globals.css';
  import type { AppProps } from 'next/app';
  import { GluestackUIProvider } from '../${importPath.slice(2)}';
  import { config } from '${gluestackConfigImportPath}/gluestack-ui.config';
  
  export default function App({ Component, pageProps }: AppProps) {
    return (
      <GluestackUIProvider config={config.theme}>
        <Component {...pageProps} />
      </GluestackUIProvider>
    );
  }
  `;
  const layoutContent = `import "./globals.css";
  import { Inter } from "next/font/google";
  import { Providers } from "./providers";
  
  const inter = Inter({ subsets: ["latin"] });
  
  export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }
  `;
  return { document, nextConfig, app, providerContent, layoutContent };
};

export { getDataFiles };
