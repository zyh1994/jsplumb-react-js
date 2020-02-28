import State from 'demo/state';

declare var process: {
  env: {
    BUILD: {
      DATE: string
    }
  }
};

interface ILoadedState extends State.All {
  BUILD_DATE: string;
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState) as ILoadedState;

    if (process.env.BUILD.DATE === state.BUILD_DATE) {
      return {
        drawerSettings: state.drawerSettings,
        tabSettings: state.tabSettings,
        tabs: state.tabs
      };
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: State.All) => {
  try {
    localStorage.setItem('state', JSON.stringify({
      BUILD_DATE: process.env.BUILD.DATE,
      drawerSettings: state.drawerSettings,
      tabSettings: state.tabSettings,
      tabs: state.tabs
    }));
  } catch (err) {
    console.error(err); // tslint:disable-line:no-console
  }
};
