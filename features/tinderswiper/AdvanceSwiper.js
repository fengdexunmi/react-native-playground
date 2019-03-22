import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { 
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Dimensions,
    Platform,
    BackHandler,
    TouchableOpacity,
    TouchableNativeFeedback
 } from "react-native";
import clamp from "clamp";

const has = Object.prototype.hasOwnProperty;

let SWIPER_THRESHOLD = 120;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
    },
    card: {
        felx: 1,
    },
    dot: {
        height: 5,
        width: 5,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
    },
    dotContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomPagination: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const {height: deviceHeight} = Dimensions.get('window');

export default class SwiperAnimated extends PureComponent {
    static propTypes = {
        children: PropTypes.array,
        index: PropTypes.number,
        style: PropTypes.any,
        loop: PropTypes.bool,
        swiper: PropTypes.bool,
        swiperThreshold: PropTypes.number,
        allowGestureTermination: PropTypes.bool,
        stack: PropTypes.bool,
        scaleOthers: PropTypes.bool,
        stackOffsetY: PropTypes.number,
        stackDepth: PropTypes.number,
        onClick: PropTypes.func,
        onRightSwipe: PropTypes.func,
        onLeftSwipe: PropTypes.func,
        renderCard: PropTypes.func,
        onRemoveCard: PropTypes.func,
        dragY: PropTypes.bool,
        smoothTransition: PropTypes.bool,
        tapToNext: PropTypes.bool,
        dragDownToBack: PropTypes.bool,
        backPressToBack: PropTypes.bool,
        swipeThroughStack: PropTypes.bool,
        onFirstBackPressed: PropTypes.func,
        renderHeader: PropTypes.func,
        showPagination: PropTypes.bool,
        paginationDotColor: PropTypes.string,
        paginationActiceDotColor: PropTypes.string,
        showPaginationBelow: PropTypes.bool,
        hidePaginationOnLast: PropTypes.bool,
        renderPagination: PropTypes.func,
        onFinish: PropTypes.func,
        uuid: PropTypes.string,
        swipeDirection: PropTypes.string, 
    };

    static defaultProps = {
        children: [],
        index: 0,
        loop: false,
        swiper: true,
        swiperThreshold: null,
        allowGestureTermination: false,
        stack: false,
        scaleOthers: true,
        stackOffsetY: 5,
        stackDepth: 5,
        onClick: () => {},
        onRightSwipe: () => {},
        onLeftSwipe: () => {},
        renderCard: null,
        onRemoveCard: () => {},
        dragY: true,
        smoothTransition: false,
        tapToNext: false,
        dragDownToBack: false,
        backPressToBack: true,
        swipeThroughStack: false,
        onFirstBackPressed: () => {},
        renderHeader: () => {},
        showPagination: true,
        paginationDotColor: '#C5C5C5',
        paginationActiceDotColor: '#4D4D4E',
        showPaginationBelow: false,
        hidePaginationOnLast: false,
        renderPagination: null,
        onFinish: () => {},
        uuid: 'Y8sivEVkWc0p',
        swipeDirection: 'right', 
    }

    constructor(props) {
        super(props);
        const {children, swiperThreshold, index} = this.props;
        SWIPER_THRESHOLD = swiperThreshold || SWIPER_THRESHOLD;

        this.currentIndex = {};
        this.guid = props.uuid;
        if (!this.currentIndex[this.guid]) {
            this.currentIndex[this.guid] = index;
        }

        this.pan = new Animated.ValueXY();
        this.valueX = 0;
        this.valueY = 0;

        this.enter = new Animated.Value(0.9);
        this.textAnim = new Animated.Value(0.8);

        this.state = {
            card: children[this.currentIndex[this.guid]],
        };

        this.lastX = 0;
        this.lastY = 0;

        this.cardAnimation = null;
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    getCurrentCard = () => this.props.children[this.currentIndex[this.guid]];

    handleStartShouldSetPanResponder = (e, gestureState) => {
        this.lastX = gestureState.moveX;
        this.lastY = gestureState.moveY;
        return false;
    };

    handleMoveShouldSetPanResponder = (e, gestureState) => {
        Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    }

    handlePanResponderGrant = () => {
        this.pan.setOffset({ x: this.valueX, y: this.valueY });
        this.pan.setValue({ x: 0, y: 0 });
    };

    handlePanResponderMove = () => Animated.event([
        null, { dx: this.pan.x, dy: this.props.dragY ? this.pan.y : new Animated.Value(0) },
    ]);

    handlePanResponderEnd = (e, { vx, vy, dx, dy}) => {
        const { card } = this.state;
        this.pan.flattenOffset();

        const {
            onRightSwipe,
            onLeftSwipe,
            onRemoveCard,
            onClick,
            tapToNext,
            stack,
            dragDownToBack,
            swipeDirection,
        } = this.props;

        let velocity;
        if (vx >= 0) {
            velocity = clamp(vx, 4, 6);
        } else if (vx < 0) {
            velocity = clamp(vx * -1, 4, 6) * -1;
        } else {
            velocity = dx < 0 ? -3 : 3;
        }

        let velocityY;
        if (vy >= 0) {
            velocityY = clamp(vy, 4.5, 10);
        } else if (vy < 0) {
            velocityY = clamp(vy * -1, 4.5, 19) * -1;
        } else {
            velocityY = dy < 0 ? -6 : 6;
        }

        if (dx === 0 && dy === 0) {
            onclick(card);
            if (tapToNext) {
                this.advanceState(velocity, vy, true);
            }
        }

        const accumulatedX = Math.abs(dx);

        if (dragDownToBack && accumulatedX < 20 && dy > SWIPER_THRESHOLD - 30) {
            this.advanceState(velocity, vy, false);
            return;
        }

        const panx = Math.abs(this.valueX);
        const panY = Math.abs(this.valueY);

        if ((!isNaN(panY) && panX > SWIPER_THRESHOLD) || (isNaN(panY) && panY < SWIPER_THRESHOLD)) {
            if (stack) {
                if (this.valueX > 0 && swipeDirection === 'right') {
                    onRightSwipe(card);
                } else {
                    onLeftSwipe(card);
                }
                this.advanceState(velocity, vy, true, accumulatedX, velocityY);
                return;
            }

            if (this.valueX > 0 && swipeDirection === 'right') {
                onRightSwipe(card);
                this.advanceState(velocity, vy, true);
            } else {
                onLeftSwipe(card);
                this.advanceState(this.currentIndex[this.guid]);
            }

            onRemoveCard(this.currentIndex[this.guid]);
        } else {
            this.resetPan();
        }
    };

    handleDirection = (isNext) => {
        if (!this.isComponentMounted) {
            return;
        }

        this.resetState();

        if (this.props.stack) {
            if ((this.props.dragDownToBack || this.props.backPressToBack) && !isNext) {
                if (this.currentIndex[this.guid] >0) {
                    this.currentIndex[this.guid] -= 1;

                    this.setState({
                        card: this.props.children[this.currentIndex[this.guid]],
                    })
                }
            } else {
                const total = this.props.children.length;
            }
        }
    }
}