export type Settings = {
  serverAddress: string | undefined;
};

let state: Settings = {
  serverAddress: undefined
};

export const settingsStore = {
  getState: (): Settings => state,
  setState: (partial: Partial<Settings>) => {
    state = { ...state, ...partial };
  }
};