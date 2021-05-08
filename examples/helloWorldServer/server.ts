import express from 'express';

import Page from './src/components/page/page'

// Create Express server
const app = express();

app.get('/', async (_req, res) => {
  const page = new Page();
  const content = await page.render({user: 'hans'});
  res.send(content)
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