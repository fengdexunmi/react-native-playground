import { connect } from "react-redux"; 
import { bindActionCreators } from "redux";
import { actionCreators as pomodoroActions } from "../../reducer";
import Timer from "./presenter";


function mapStateToProps(state) {
    const { isPlaying, elapsedTime, timerDuration } = state;
    return {
        isPlaying,
        elapsedTime,
        timerDuration
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startTimer: bindActionCreators(pomodoroActions.startTimer, dispatch),
        restartTimer: bindActionCreators(pomodoroActions.restartTimer, dispatch),
        addSecond: bindActionCreators(pomodoroActions.addSecond, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
