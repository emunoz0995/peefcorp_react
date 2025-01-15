import { useMemo } from 'react';
import { create } from 'zustand';

const useModalStore = create((set, get) => ({
  isModalOpen: false,
  idOpen: null,
  fieldsDisabled: false,
  setIdOpen: (id) => set({ idOpen: id }),
  enableFields: () => set({ fieldsDisabled: false }),
  disableFields: () => set({ fieldsDisabled: true }),
  unselectId: () => set({ idOpen: null }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useToolbarStore = create((set) => ({
  isToolbarOpen: false,
  openToolbar: () => set({ isToolbarOpen: true }),
  closeToolbar: () => set({ isToolbarOpen: false }),
}));

export const useCollapsed = create((set) => ({
  isCollapsed: false,
  openCollapsed: () => set({ isCollapsed: true }),
  closeCollapsed: () => set({ isCollapsed: false }),
}));

export const useCollapsedLower = create((set) => ({
  isCollapsedLower: false,
  openCollapsedLower: () => set({ isCollapsedLower: true }),
  closeCollapsedLower: () => set({ isCollapsedLower: false }),
}));

export const useCollapsedMain = create((set) => ({
  isCollapsedMain: false,
  openCollapsedMain: () => set({ isCollapsedMain: true }),
  closeCollapsedMain: () => set({ isCollapsedMain: false }),
}));

export const useCollapsedUpper = create((set) => ({
  isCollapsedUpper: false,
  openCollapsedUpper: () => set({ isCollapsedUpper: true }),
  closeCollapsedUpper: () => set({ isCollapsedUpper: false }),
}));

export const useInputValue = create((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}));



export default useModalStore;
