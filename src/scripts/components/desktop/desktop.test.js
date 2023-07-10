import { Desktop } from './desktop';
import { EditorApplication } from '../editor-application/editor-application';
import { TerminalApplication } from '../terminal-application/terminal-application';
import { EditorApplicationMock } from '@mocks/editor-application-mock';
import { TerminalApplicationMock } from '@mocks/terminal-application-mock';

jest.mock('../editor-application/editor-application');
EditorApplication.mockImplementation(EditorApplicationMock);

jest.mock('../terminal-application/terminal-application');
TerminalApplication.mockImplementation(TerminalApplicationMock);

describe('Desktop Component', () => {

  jest.useFakeTimers();

  function instantiateDesktop(){
    const container = document.createElement('div');
    return new Desktop(container);
  }

  it('should build desktop on instantiate', () => {
    const desktop = instantiateDesktop();
    expect(desktop.element.classList[0]).toEqual('desktop');
  });

  it('should open an application', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const application = desktop.openApplication('editor');
    expect(desktop.openApplications[0]).toEqual(application);
  });

  it('should instantiate an editor application when first opening it', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const options = {some: 'option'};
    desktop.openApplication('editor', options);
    expect(EditorApplication).toHaveBeenCalledWith(desktop.element, options);
  });

  it('should instantiate a terminal application when first opening it', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const options = {some: 'option'};
    desktop.openApplication('terminal', options);
    expect(TerminalApplication).toHaveBeenCalledWith(desktop.element, options);
  });

  it('should not instantiate an application when that application was already open', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    desktop.openApplication('editor');
    desktop.openApplication('terminal');
    desktop.openApplication('editor');
    expect(EditorApplication).not.toHaveBeenCalledTimes(1);
  });

  it('should optionally instantiate an application more than once', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    desktop.openApplication('editor', { id: 'editor1' });
    desktop.openApplication('editor', { id: 'editor2' });
    desktop.openApplication('editor', { id: 'editor1' });
    desktop.openApplication('editor', { id: 'editor2' });
    expect(EditorApplication).toHaveBeenCalledTimes(2);
  });

  it('should append the application element to the desktop when opening it', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const options = {some: 'option'};
    const application = desktop.openApplication('terminal', options);
    expect(desktop.element.appendChild).toHaveBeenCalledWith(application.element);
  });

  it('should minimize all open applications', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const editor = desktop.openApplication('editor');
    const terminal = desktop.openApplication('terminal');
    desktop.minimizeAllApplications();
    expect(editor.minimize).toHaveBeenCalled();
    expect(terminal.minimize).toHaveBeenCalled();
  });

  it('should optionally execute complete callback when minimization ends', () => {
    const onComplete = jest.fn();
    const desktop = instantiateDesktop();
    desktop.minimizeAllApplications(onComplete);
    expect(setTimeout).toHaveBeenCalledWith(onComplete, 750);
  });

  it('should maximize some application', () => {
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const application = desktop.openApplication('editor');
    desktop.maximizeApplication(application);
    expect(application.maximize).toHaveBeenCalled();
  });

  it('should execute complete callback when maximization ends', () => {
    const onComplete = jest.fn();
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const application = desktop.openApplication('editor');
    desktop.maximizeApplication(application, onComplete);
    expect(setTimeout).toHaveBeenCalledWith(onComplete, 750);
  });

  it('should execute complete callback instantly when maximizing inanimate applications', () => {
    const onComplete = jest.fn();
    const desktop = instantiateDesktop();
    spyOn(desktop.element, 'appendChild');
    const application = desktop.openApplication('editor', { inanimate: true });
    desktop.maximizeApplication(application, onComplete);
    expect(onComplete).toHaveBeenCalled();
    expect(setTimeout).not.toHaveBeenCalled();
  });
});
