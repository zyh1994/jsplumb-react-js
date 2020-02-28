import defaultState from 'demo/defaultState';
export default function drawers(state, action) {
    if (state === void 0) { state = defaultState.drawers; }
    switch (action.type) {
        default:
            return state;
    }
}
