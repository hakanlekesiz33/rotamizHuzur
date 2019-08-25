import React from 'react';
import Document, {Head,Main,NextScript} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
         <Head>
          <meta name="description" content="Rotamız Huzur güncel gezilerimizi ve günlük hayattaki deneyimlerimizi anlattığımız"></meta>
          <meta name="keywords" content="rotamız huzur, gezi yazıları, gezelim görelim, türkiyede gezilecek en iyi yerler, en iyi gezi deneyimleri"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
