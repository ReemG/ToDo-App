import { ToDoPage } from './app.po';

describe('to-do App', () => {
  let page: ToDoPage;

  beforeEach(() => {
    page = new ToDoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
