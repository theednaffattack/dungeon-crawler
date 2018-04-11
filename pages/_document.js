import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// from: https://jsramblings.com/2017/11/27/using-styled-components-with-next-js.html
// the only demo that takes you through the full walk-through for styled components

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  // static getInitialProps({ renderPage }) {
  //   // Step 1: Create an instance of ServerStyleSheet
  //   const sheet = new ServerStyleSheet();
  //   const transform = App =>
  //     // Step 2: Retrieve styles from components in the page
	// 		 sheet.collectStyles(<App />)
  //     // Same as:
  //     // return <StyleSheetManager sheet={sheet.instance}>
  //     //    <App/>
  //     // </StyleSheetManager>
	// 	;
  //   // Step 3: Extract the styles as <style> tags
  //   const styleTags = sheet.getStyleElement();
  //   const page = renderPage(transform);
  //   // Step 4: Pass it on as a prop
  //   return { ...page, styleTags };
  // }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>Dungeon Crawlerrrrrrrr</title>
        </Head>
        {this.props.styleTags}

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
