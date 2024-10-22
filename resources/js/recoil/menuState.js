// recoil/menuState.js
import { atom } from 'recoil';

// Define the atom for expand/collapse state
export const menuState = atom({
  key: 'menuState', // unique ID (with respect to other atoms/selectors)
  default: true, // true means expanded by default
});
export const menuFormState = atom({
  key: 'menuFormState', // unique ID (with respect to other atoms/selectors)
  default: {
      menuId: '55A65B',
      depth: 1,
      parentData: 'system management',
      name: 'system management',
  }, // default value (aka initial value)
});
