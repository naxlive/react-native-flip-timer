

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex; }

const React = _interopDefault(require('react'));
const reactNative = require('react-native');
const PropTypes = _interopDefault(require('prop-types'));
const MatrixMath = _interopDefault(require('react-native/Libraries/Utilities/MatrixMath'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

const style = reactNative.StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  numberWrapper: {
    backgroundColor: '#333333',
    margin: 3,
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
  card: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1f1f1f',
    overflow: 'hidden',
  },
  overflowContainer: {
    overflow: 'hidden',
  },
  number: {
    fontWeight: '700',
    color: '#cccccc',
  },
  flipCard: {
    position: 'absolute',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: '#333333',
    borderColor: '#1f1f1f',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circle: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: '#333333',
  },
});

/* eslint-disable no-bitwise, radix, no-param-reassign */
const { createIdentityMatrix } = MatrixMath;
const { multiplyInto } = MatrixMath;
/**
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX
 * */

function rotateXMatrix(matrix, deg) {
  const rad = Math.PI / 180 * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1];
  multiplyInto(matrix, matrix, rotate);
}
/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective
 * */


function perspectiveMatrix(matrix, value) {
  const perspective = createIdentityMatrix();
  MatrixMath.reusePerspectiveCommand(perspective, value);
  multiplyInto(matrix, matrix, perspective);
}
/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
 * */


function translateMatrix(matrix, origin) {
  const { x } = origin;
  const { y } = origin;
  const { z } = origin;
  const translate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  multiplyInto(matrix, translate, matrix);
}

function untranslateMatrix(matrix, origin) {
  const { x } = origin;
  const { y } = origin;
  const { z } = origin;
  const unTranslate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(unTranslate, -x, -y, -z);
  multiplyInto(matrix, matrix, unTranslate);
}

function formatTime(hours, minutes, seconds) {
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return {
    hours,
    minutes,
    seconds,
  };
}

function formatNumberToTime(number) {
  const secNum = parseInt(number);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const seconds = secNum - hours * 3600 - minutes * 60;
  return formatTime(hours, minutes, seconds);
}

function addTime(hours, minutes, seconds) {
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);
  seconds -= 1;

  if (seconds < 0) {
    minutes -= 1;
    seconds = 59;
  }

  if (minutes < 0) {
    hours -= 1;
    minutes = 59;
  }

  return formatTime(hours, minutes, seconds);
}

const TransformUtil = {
  createIdentityMatrix,
  multiplyInto,
  rotateXMatrix,
  perspectiveMatrix,
  translateMatrix,
  untranslateMatrix,
  formatNumberToTime,
  addTime,
};

function FlipCard(_ref) {
  const { setRef } = _ref;
  const { type } = _ref;
  const { size } = _ref;
  const { number } = _ref;
  const { flipCardStyle } = _ref;
  const { numberStyle } = _ref;
  return React.createElement(reactNative.Animated.View, {
    ref: setRef,
    style: [style.flipCard, type === 'front' ? {
      top: 0,
      borderTopLeftRadius: size / 10,
      borderTopRightRadius: size / 10,
      borderBottomWidth: 0.5,
    } : {
      top: '50%',
      borderBottomLeftRadius: size / 10,
      borderBottomRightRadius: size / 10,
      borderTopWidth: 0.5,
    }, flipCardStyle],
  }, React.createElement(reactNative.View, {
    style: style.overflowContainer,
  }, React.createElement(reactNative.Text, {
    style: [style.number, {
      transform: [type === 'front' ? {
        translateY: size * 0.3,
      } : {
        translateY: -size * 0.3,
      }],
      fontSize: size / 1.5,
      lineHeight: size / 1.5,
    }, numberStyle],
  }, number)));
}

FlipCard.defaultProps = {
  flipCardStyle: {},
  numberStyle: {},
};
FlipCard.propTypes = {
  setRef: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

function Card(_ref) {
  const { type } = _ref;
  const { size } = _ref;
  const { number } = _ref;
  const { cardStyle } = _ref;
  const { numberStyle } = _ref;
  return React.createElement(reactNative.View, {
    style: [style.card, type === 'upper' ? {
      borderBottomWidth: 0.5,
    } : {
      borderTopWidth: 0.5,
    }, cardStyle],
  }, React.createElement(reactNative.Text, {
    style: [style.number, {
      transform: [type === 'upper' ? {
        translateY: size * 0.3,
      } : {
        translateY: -size * 0.3,
      }],
      fontSize: size / 1.5,
      lineHeight: size / 1.5,
    }, numberStyle],
  }, number));
}

Card.defaultProps = {
  cardStyle: {},
  numberStyle: {},
};
Card.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

const _Dimensions$get = reactNative.Dimensions.get('window');
const { width } = _Dimensions$get;

const NumberCard =
/* #__PURE__ */
(function (_React$Component) {
  _inheritsLoose(NumberCard, _React$Component);

  function NumberCard(props) {
    let _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), 'setFrontRef', (ref) => {
      _this.frontRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), 'setBackRef', (ref) => {
      _this.backRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), 'animateTick', () => {
      _this.rotateFront.setValue(0);

      _this.rotateBack.setValue(-180);

      reactNative.Animated.parallel([reactNative.Animated.timing(_this.rotateFront, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }), reactNative.Animated.timing(_this.rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })]).start();
    });

    _defineProperty(_assertThisInitialized(_this), 'transformRef', (ref, deg, y) => {
      const { perspective } = _this.props;
      const matrix = TransformUtil.createIdentityMatrix();
      TransformUtil.translateMatrix(matrix, {
        x: 0,
        y,
        z: 0,
      });
      TransformUtil.perspectiveMatrix(matrix, perspective);
      TransformUtil.rotateXMatrix(matrix, deg);
      TransformUtil.untranslateMatrix(matrix, {
        x: 0,
        y,
        z: 0,
      });

      if (ref) {
        ref.setNativeProps({
          style: {
            transform: [{
              matrix,
            }],
          },
        });
      }
    });

    _this.rotateFront = new reactNative.Animated.Value(0);
    _this.rotateBack = new reactNative.Animated.Value(-180);
    _this.frontRef = null;
    _this.backRef = null;
    return _this;
  }

  const _proto = NumberCard.prototype;

  _proto.componentDidMount = function componentDidMount() {
    const _this2 = this;

    const { size } = this.props;
    this.animateTick();
    this.rotateFront.addListener((_ref) => {
      const { value } = _ref;

      _this2.transformRef(_this2.frontRef, value, size * 0.3);
    });
    this.rotateBack.addListener((_ref2) => {
      const { value } = _ref2;

      _this2.transformRef(_this2.backRef, value, -size * 0.3);
    });
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    const { number } = this.props;

    if (nextProps.number !== number) {
      this.animateTick();
    }

    return true;
  };

  _proto.render = function render() {
    const _this$props = this.props;
    const { number } = _this$props;
    const { previousNumber } = _this$props;
    const { size } = _this$props;
    const { numberWrapperStyle } = _this$props;
    const { cardStyle } = _this$props;
    const { flipCardStyle } = _this$props;
    const { numberStyle } = _this$props;
    return React.createElement(reactNative.View, {
      style: [style.numberWrapper, {
        width: size * 0.8,
        height: size * 1.2,
        borderRadius: size / 10,
      }, numberWrapperStyle],
    }, React.createElement(Card, {
      type: 'upper',
      size,
      number,
      cardStyle,
      numberStyle,
    }), React.createElement(Card, {
      type: 'lower',
      size,
      number: previousNumber,
      cardStyle,
      numberStyle,
    }), React.createElement(FlipCard, {
      setRef: this.setFrontRef,
      type: 'front',
      size,
      number: previousNumber,
      flipCardStyle,
      numberStyle,
    }), React.createElement(FlipCard, {
      setRef: this.setBackRef,
      type: 'back',
      size,
      number,
      flipCardStyle,
      numberStyle,
    }));
  };

  return NumberCard;
}(React.Component));

NumberCard.defaultProps = {
  size: width / 6,
  perspective: 250,
};
NumberCard.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  previousNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perspective: PropTypes.number,
  size: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

/* eslint-disable no-param-reassign, radix */

function FlipNumber(_ref) {
  const { overrideWrapperStyle } = _ref;
  let { number } = _ref;
  const { unit } = _ref;
  const { size } = _ref;
  const { perspective } = _ref;
  const { numberWrapperStyle } = _ref;
  const { cardStyle } = _ref;
  const { flipCardStyle } = _ref;
  const { numberStyle } = _ref;
  number = parseInt(number);
  let previousNumber = number - 1;

  if (unit !== 'hours') {
    previousNumber = previousNumber === -1 ? 59 : previousNumber;
  } else {
    previousNumber = previousNumber === -1 ? 23 : previousNumber;
  }

  number = number < 10 ? `0${number}` : number;
  previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;
  const numberSplit = number.toString().split('');
  const previousNumberSplit = previousNumber.toString().split('');
  return React.createElement(reactNative.View, {
    style: [style.wrapper, overrideWrapperStyle],
  }, React.createElement(NumberCard, {
    number: numberSplit[0],
    previousNumber: previousNumberSplit[0],
    size,
    perspective,
    numberWrapperStyle,
    cardStyle,
    flipCardStyle,
    numberStyle,
  }), React.createElement(NumberCard, {
    number: numberSplit[1],
    previousNumber: previousNumberSplit[1],
    size,
    perspective,
    numberWrapperStyle,
    cardStyle,
    flipCardStyle,
    numberStyle,
  }));
}

FlipNumber.defaultProps = {
  unit: 'seconds',
};
FlipNumber.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  size: PropTypes.number,
  perspective: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

function Separator(props) {
  const _props$separatorOverr = props.separatorOverrideStyle;
  const { separatorOverrideStyle } = _props$separatorOverr;
  const { overrideCircle } = _props$separatorOverr;
  return React.createElement(reactNative.View, {
    style: [style.separator, separatorOverrideStyle],
  }, React.createElement(reactNative.View, {
    style: [style.circle, overrideCircle],
  }), React.createElement(reactNative.View, {
    style: [style.circle, overrideCircle],
  }));
}

const Timer =
/* #__PURE__ */
(function (_React$Component) {
  _inheritsLoose(Timer, _React$Component);

  function Timer() {
    let _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), 'state', {
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    _defineProperty(_assertThisInitialized(_this), 'updateTime', () => {
      const _this$state = _this.state;
      const { hours } = _this$state;
      const { minutes } = _this$state;
      const { seconds } = _this$state;
      const newState = TransformUtil.addTime(hours, minutes, seconds);

      _this.setState(prevState => _extends({}, prevState, newState));
    });

    return _this;
  }

  const _proto = Timer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    const _this2 = this;

    const _this$props = this.props;
    const { time } = _this$props;
    const { play } = _this$props;

    const _TransformUtils$forma = TransformUtil.formatNumberToTime(time);
    const { hours } = _TransformUtils$forma;
    const { minutes } = _TransformUtils$forma;
    const { seconds } = _TransformUtils$forma;

    this.setState({
      hours,
      minutes,
      seconds,
    }, () => {
      if (play) {
        _this2.timer = setInterval(() => _this2.updateTime(), 1000);
      }
    });
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    const _this3 = this;

    const { play } = this.props;

    if (nextProps.play !== play) {
      if (nextProps.play) {
        this.timer = setInterval(() => _this3.updateTime(), 1000);
      } else {
        clearInterval(this.timer);
      }
    }

    return true;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timer);
  };

  _proto.render = function render() {
    const _this$props2 = this.props;
    const { wrapperStyle } = _this$props2;
    const { flipNumberProps } = _this$props2;
    const { separatorOverrideStyle } = _this$props2;
    const _this$state2 = this.state;
    const { hours } = _this$state2;
    const { minutes } = _this$state2;
    const { seconds } = _this$state2;
    return React.createElement(reactNative.View, {
      style: [style.wrapper, wrapperStyle],
    }, !!hours && React.createElement(FlipNumber, _extends({
      number: hours,
      unit: 'hours',
    }, flipNumberProps)), React.createElement(Separator, {
      separatorOverrideStyle,
    }), !!minutes && React.createElement(FlipNumber, _extends({
      number: minutes,
      unit: 'minutes',
    }, flipNumberProps)), React.createElement(Separator, {
      separatorOverrideStyle,
    }), !!seconds && React.createElement(FlipNumber, _extends({
      number: seconds,
      unit: 'seconds',
    }, flipNumberProps)));
  };

  return Timer;
}(React.Component));

Timer.defaultProps = {
  play: true,
  wrapperStyle: {},
};
Timer.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  play: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  separatorOverrideStyle: PropTypes.object,
  flipNumberProps: PropTypes.shape({
    size: PropTypes.number,
    perspective: PropTypes.number,
    numberWrapperStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    flipCardStyle: PropTypes.object,
    numberStyle: PropTypes.object,
  }),
};

exports.Timer = Timer;
exports.FlipNumber = FlipNumber;
// # sourceMappingURL=react-native-flip-timer.cjs.js.map
