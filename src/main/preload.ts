// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: string, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },
    async invoke(channel: string, ...args: any[]) {
      return ipcRenderer.invoke(channel, args);
    },
    on(channel: string, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: string, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// import { contextBridge, ipcRenderer } from "electron/renderer"

// contextBridge.exposeInMainWorld("electronAPI", {
//   openWindow: (window: string) =>
//     ipcRenderer.send("open-specific-window", window),
//   setOpacity: (opacity: number) => ipcRenderer.send("set-opacity", opacity),
//   receiveOpacity: (callback: any) =>
//     ipcRenderer.on("opacityUpdate", (_event, opacity) => callback(opacity)),
//   setIsDraggable: (isDraggable: boolean) =>
//     ipcRenderer.send("set-draggable", isDraggable),
//   receiveIsDraggable: (callback: any) =>
//     ipcRenderer.on("dragUpdate", (_event, isDraggable) =>
//       callback(isDraggable)
//     ),
// })
