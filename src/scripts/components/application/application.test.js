import { Application } from './application';

jest.useFakeTimers();

describe('Application Component', () => {

  it('should have a default id', () => {
    const application = new Application('editor');
    expect(application.id).toEqual('_default');
  });

  it('should optionally have a custom id', () => {
    const id = 'editor3';
    const application = new Application('editor', { id });
    expect(application.id).toEqual(id);
  });

  it('should instantiate application from application type', () => {
    const application = new Application('editor');
    expect(application.element.classList.length).toEqual(1);
    expect(application.element.classList[0]).toEqual('editor-application');
  });

  it('should have a topbar', () => {
    const application = new Application('editor');
    const topbar = application.element.querySelector('application-topbar');
    expect(topbar).toBeDefined();
  });

  it('should have a title container', () => {
    const application = new Application('editor');
    const titleContainer = application.element.querySelector('[data-title-container]');
    expect(titleContainer).toBeDefined();
  });

  it('should have a content container', () => {
    const application = new Application('editor');
    const contentContainer = application.element.querySelector('[data-content-container]');
    expect(contentContainer).toBeDefined();
  });

  it('should minimum height option subtract application top bar height', () => {
    const minHeight = '300px';
    const application = new Application('editor', { minHeight });
    const contentContainer = application.element.querySelector('[data-content-container]');
    expect(contentContainer.style.minHeight).toEqual('274px');
  });

  it('should allow window title option', () => {
    const windowTitle = 'Atom';
    const application = new Application('editor', { windowTitle });
    const titleContainer = application.element.querySelector('[data-title-container]');
    expect(titleContainer.innerText).toEqual(windowTitle);
  });

  it('should add content', () => {
    const content = document.createElement('h1');
    const application = new Application('editor');
    content.innerText = 'Some content.';
    application.addContent(content);
    expect(application.element.querySelector('h1')).toEqual(content);
  });

  it('should maximize', () => {
    const application = new Application('editor');
    application.maximize();
    expect(application.isMaximized).toEqual(true);
  });

  it('should set maximized look on maximize', () => {
    const application = new Application('editor');
    const applicationElement = application.element.querySelector('[data-application]');
    application.maximize();
    expect(applicationElement.classList.contains('application-minimized')).toEqual(false);
    expect(applicationElement.classList.contains('application-maximized')).toEqual(true);
  });

  it('should minimize', () => {
    const application = new Application('editor');
    application.minimize();
    expect(application.isMaximized).toEqual(false);
  });

  it('should set minimized look on minimize', () => {
    const application = new Application('editor');
    const applicationElement = application.element.querySelector('[data-application]');
    application.minimize();
    expect(applicationElement.classList.contains('application-minimized')).toEqual(true);
    expect(applicationElement.classList.contains('application-maximized')).toEqual(false);
  });

  it('should optionally set application as inanimate', () => {
    const application = new Application('editor', { inanimate: true });
    const applicationElement = application.element.querySelector('[data-application]');
    expect(applicationElement.classList.contains('application-inanimate')).toEqual(true);
  });
});
