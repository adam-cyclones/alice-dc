import { AlicePage } from './app.po';

describe('alice App', () => {
  let page: AlicePage;

  beforeEach(() => {
    page = new AlicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
