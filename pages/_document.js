import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="description" content="سويكا - سوق الأسماك الإلكتروني" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
