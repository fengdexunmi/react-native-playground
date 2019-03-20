
/**
 * Actions
 */
const START_TIMER = "START_TIMER";
const RESTART_TIMER = "RESTART_TIMER";
const ADD_SECOND = "ADD_SECOND";

/** Action Creators */
function startTimer() {
    return {
        type: START_TIMER
    };
}

function restartTimer() {
    return {
        type: RESTART_TIMER
    };
}

function addSecond() {
    return {
        type: ADD_SECOND
    };
}

const TIMER_DURATION = 1500;

const initialState = {
    isPlaying: false,
    elapsedTime: 0,
    timerDuration: TIMER_DURATION
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case START_TIMER:
            return applyStartTimer(state, action);
        case RESTART_TIMER:
            return applyRestartTimer(state, action);
        case ADD_SECOND:
            return applyAddSecond(state, action);
        default:
            return state;
    }
}

function applyStartTimer(state, action) {
    console.log('applyStartTimer');
    return {
        ...state,
        isPlaying: true,
        elapsedTime: 0
    };
}

function applyRestartTimer(state, action) {
    console.log('applyRestartTimer');
    return {
        ...state,
        isPlaying: false,
        elapsedTime: 0
    };
}

function applyAddSecond(state, action) {
    console.log('applyAddSecond ' + state);
    const { elapsedTime } = state;
    if (elapsedTime < TIMER_DURATION) {
        return {
            ...state,
            elapsedTime: elapsedTime + 1
        };
    } else {
        return {
            ...state,
            isPlaying: false
        };
    }
}

const actionCreators = {
    startTimer,
    restartTimer,
    addSecond
};

export { actionCreators };

export default reducer;
