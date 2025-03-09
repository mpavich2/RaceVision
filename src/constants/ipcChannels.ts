export enum IpcChannels {
  OPEN_SPECIFIC_WINDOW = 'open-specific-window',
  IS_WINDOW_OPEN = 'is-window-open',
  WINDOW_OPEN_STATUS = 'window-open-status',
  RESET_WINDOW_POSITIONS = 'reset-window-positions',
  RESET_SPECIFIC_WINDOW_POSITION = 'reset-specific-window-position',
  DARK_MODE_TOGGLE = 'dark-mode-toggle',

  SET_OPACITY = 'set-opacity',
  RECEIVE_OPACITY_UPDATE = 'opacityUpdate',

  SET_IS_DRAGGABLE = 'set-draggable',
  RECEIVE_DRAGGABLE_UPDATE = 'dragUpdate',

  IRACING_SESSION_INFO = 'sessionInfoUpdate',
  IRACING_TELEMETRY_INFO = 'telemetryUpdate',

  GET_USER_SETTINGS = 'userSettings',
}
