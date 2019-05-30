(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PageScroll = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var Tween = {
    Linear: function Linear(t, b, c, d) {
      return c * t / d + b;
    },
    Quad: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
      }
    },
    Cubic: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    Quart: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    Quint: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    Sine: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    },
    Expo: {
      easeIn: function easeIn(t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    Circ: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    Elastic: {
      easeIn: function easeIn(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * 0.3;

        if (!a || a < Math.abs(c)) {
          s = p / 4;
          a = c;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOut: function easeOut(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * 0.3;

        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOut: function easeInOut(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (typeof p == "undefined") p = d * (0.3 * 1.5);

        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
      }
    },
    Back: {
      easeIn: function easeIn(t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOut: function easeOut(t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      }
    },
    Bounce: {
      easeIn: function easeIn(t, b, c, d) {
        return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t < d / 2) {
          return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
        } else {
          return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
      }
    }
  };
  var Tween$1 = (function (tween) {
    var _tween$split = tween.split("."),
        _tween$split2 = _slicedToArray(_tween$split, 2),
        name = _tween$split2[0],
        func = _tween$split2[1];

    if (!func) return Tween.Linear;
    return Tween[name][func];
  });

  var clamp = function clamp(current, min, max) {
    return Math.min(Math.max(min, current), max);
  };

  var PageScroll = function PageScroll(options) {
    var _this = this;

    _classCallCheck(this, PageScroll);

    this.touchInfo = {
      start: {
        pos: 0,
        timeStamp: 0,
        isScroll: false
      },
      move: {
        pos: 0,
        timeStamp: 0,
        isScroll: false
      }
    };
    this.currentClass = "";
    this.currentOffset = 0;
    this.prevOffset = 0;
    this.index = 0;
    this.animateTimer = 0;
    this.duration = 0.6;
    this.momentum = 1;
    this.tween = "Quad.easeOut";

    this.onScrollStart = function (event) {
      event.stopPropagation();
      event.preventDefault();
      if (_this.animateTimer) cancelAnimationFrame(_this.animateTimer);
      var timeStamp = event.timeStamp,
          touches = event.touches;
      var pageY = touches[0].pageY;
      _this.touchInfo.start = {
        pos: pageY,
        timeStamp: timeStamp,
        isScroll: true
      };
      _this.touchInfo.move.isScroll = false;
    };

    this.onScrolling = function (event) {
      if (!_this.touchInfo.start.isScroll) return;
      event.stopPropagation();
      event.preventDefault();
      var timeStamp = event.timeStamp,
          touches = event.touches;
      var pageY = touches[0].pageY;
      _this.touchInfo.move = {
        pos: pageY,
        timeStamp: timeStamp,
        isScroll: true
      };
      var tempOffset = _this.touchInfo.move.pos - _this.touchInfo.start.pos;
      _this.currentOffset = tempOffset + _this.prevOffset;
      _this.wrap.style.transform = "translate3d(0,".concat(_this.currentOffset, "px,0)");
    };

    this.onScrollEnd = function (event) {
      if (!_this.touchInfo.start.isScroll) return;
      event.stopPropagation();
      event.preventDefault();
      _this.touchInfo.start.isScroll = false;
      _this.prevOffset = _this.currentOffset;
      if (!_this.touchInfo.move.isScroll) _this.touchInfo.move.pos = _this.touchInfo.start.pos;
      var speed = (_this.touchInfo.move.pos - _this.touchInfo.start.pos) / (_this.touchInfo.move.timeStamp - _this.touchInfo.start.timeStamp);
      _this.index = clamp(Math.abs(speed) > _this.momentum ? speed > 0 ? --_this.index : ++_this.index : -Math.round((_this.prevOffset = _this.currentOffset) / window.innerHeight), 0, _this.pages.length - 1);

      _this.scrollTo();
    };

    this.scrollTo = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.index;
      if (_this.animateTimer) cancelAnimationFrame(_this.animateTimer);
      var startTime = Date.now();
      var duration = _this.duration;
      var startPos = _this.currentOffset;
      var endPos = index * -window.innerHeight - _this.prevOffset;

      var callback = function callback() {
        var currentTime = Date.now();
        var delta = (currentTime - startTime) / 1000;
        var offset = Tween$1(_this.tween)(delta, startPos, endPos, duration);
        _this.wrap.style.transform = "translate3d(0,".concat(offset, "px,0)");
        _this.prevOffset = _this.currentOffset = offset;

        if (delta >= duration) {
          cancelAnimationFrame(_this.animateTimer);
          var completedOffset = index * -window.innerHeight;
          _this.prevOffset = _this.currentOffset = completedOffset;
          _this.wrap.style.transform = "translate3d(0,".concat(completedOffset, "px,0)");
          _this.index = clamp(-Math.round(completedOffset / window.innerHeight), 0, _this.pages.length - 1);

          _this.setCurrent(_this.index);

          return;
        }

        _this.animateTimer = requestAnimationFrame(callback);
      };

      callback();
    };

    this.setCurrent = function (currentIndex) {
      _this.pages.forEach(function (item, index) {
        if (index === currentIndex) item.classList.add(_this.currentClass);else item.classList.remove(_this.currentClass);
      });
    };

    this.prev = function () {
      var index = clamp(--_this.index, 0, _this.pages.length - 1);

      _this.scrollTo(index);
    };

    this.next = function () {
      var index = clamp(++_this.index, 0, _this.pages.length - 1);

      _this.scrollTo(index);
    };

    var el = options.el,
        itemClass = options.itemClass,
        currentClass = options.currentClass;
    if (_typeof(el) === "object") this.wrap = el;else {
      var temp = document.querySelector(el);
      if (temp) this.wrap = temp;else throw new Error("el not found");
    }
    this.currentClass = currentClass;
    this.pages = Array.from(this.wrap.querySelectorAll(".".concat(itemClass)));
    this.pages.forEach(function (item, index) {
      if (index === 0) item.classList.add(currentClass);
      item.style.height = "".concat(window.innerHeight, "px");
    });
    this.wrap.addEventListener("touchstart", this.onScrollStart);
    this.wrap.addEventListener("touchmove", this.onScrolling);
    this.wrap.addEventListener("touchend", this.onScrollEnd);
  };

  return PageScroll;

}));
