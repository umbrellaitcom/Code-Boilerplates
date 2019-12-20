import { resetAndAbortOn, createNetworkReducer, MutationState, QueryState } from '~/utils/redux';

export type NetworkState = {
  queries: {
    [key: string]: QueryState<unknown>;
  };
  mutations: {
    [key: string]: MutationState;
  };
};

const networkReducer = createNetworkReducer({
  resetOn: resetAndAbortOn,
});

export { networkReducer };
