import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(immer((set, get) => ({
  bears: 0,

  postListRef: null,

  setPostListRef: (ref) => set(state => {state.postListRef = ref}),
  updateAimateWishListIcon: (func) => set(state => {state.func4 = func}),


  increasePopulation: () => set(state => { state.bears += 1; }),

  removeAllBears: () => set({ bears: 0 }),

  updateBears: (newBears) => set({ bears: newBears }),
})));

export default useStore;