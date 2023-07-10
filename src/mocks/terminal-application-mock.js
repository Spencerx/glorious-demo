export const terminalApplicationInstanceMock = {
  minimize: jest.fn(),
  maximize: jest.fn(),
  element: '<div>Something</div>',
  type: 'terminal'
};

export const TerminalApplicationMock = jest.fn((containerEl, { inanimate, id } = {}) => {
  return {
    ...terminalApplicationInstanceMock,
    inanimate,
    id
  };
});
