describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Application'; //'App - <%=targetname%>';  // TODO: switch back when https://github.com/TypeStrong/ts-loader/issues/152 is solved
    expect(subject).toEqual(result);
  });

  it('should have <body>', () => {
    let subject = element(by.tagName('body')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

});
