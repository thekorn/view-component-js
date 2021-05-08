import express from 'express';

import Page from './src/components/page/page'

// Create Express server
const app = express();

app.get('/', (_req, res) => {
  const page = new Page();
  res.send(page.render())
});

(async () => {
  try {
    // Start server
    app.listen(
      3002,
      '127.0.0.1',
      () => {
        console.log(`App is running at http://127.0.0.1:3002 in ${app.get('env')} mode`);
        console.log('Press CTRL-C to stop\n');
      },
    );
  } catch (err) {
    console.log(err);
  }
})();