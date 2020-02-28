import {NightwatchTests} from 'nightwatch';

const test: NightwatchTests = {
  'Render test': (browser) => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .resizeWindow(1024, 768)
      .assert.screenshotIdenticalToBaseline('#app')
      .end();
  }
};

export default test;
