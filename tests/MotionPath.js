(function() {
  document.addEventListener('DOMContentLoaded', function(e) {
    var MotionPath;
    MotionPath = window.mojs.MotionPath;
    return describe('MotionPath ::', function() {
      var ns;
      ns = 'http://www.w3.org/2000/svg';
      describe('enviroment ::', function() {
        it('SVG should be supported', function() {
          var isSVG;
          isSVG = !!(typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg").createSVGRect : void 0);
          return expect(isSVG).toBeTruthy();
        });
        it('SVG path should have getTotalLength method', function() {
          var path;
          path = document.createElementNS(ns, "path");
          return expect(path.getTotalLength).toBeDefined();
        });
        it('SVG path should have getPointAtLength method', function() {
          var path;
          path = document.createElementNS(ns, "path");
          return expect(path.getPointAtLength).toBeDefined();
        });
        it('document.querySelector should be defined', function() {
          return expect(document.querySelector).toBeDefined();
        });
        it('style propety should be defined on DOM node', function() {
          var div, path;
          path = document.createElementNS(ns, "path");
          div = document.createElement('div');
          expect(path.style).toBeDefined();
          return expect(div.style).toBeDefined();
        });
        it('transforms should be supported', function() {
          var isTransforms;
          isTransforms = function() {
            var div, i, isProp, prefixes, trS;
            trS = "transform WebkitTransform MozTransform OTransform msTransform";
            prefixes = trS.split(" ");
            i = 0;
            while (i < prefixes.length) {
              div = document.createElement("div");
              isProp = div.style[prefixes[i]] !== 'undefined';
              if (isProp) {
                return prefixes[i];
              }
              i++;
            }
            return false;
          };
          return expect(isTransforms()).toBeTruthy();
        });
        return it('HTML el should have offsetWidth/offsetHeight propety', function() {
          var div;
          div = document.createElement('div');
          expect(div.offsetWidth).toBeDefined();
          return expect(div.offsetHeight).toBeDefined();
        });
      });
      describe('defaults ::', function() {
        var el, mp;
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el
        });
        it('delay should be defined', function() {
          return expect(mp.delay).toBeDefined();
        });
        it('TWEEN should be defined', function() {
          return expect(mp.T).toBeDefined();
        });
        it('helpers should be defined', function() {
          return expect(mp.h).toBeDefined();
        });
        it('resize should be defined', function() {
          return expect(mp.resize).toBeDefined();
        });
        it('duration should be defined', function() {
          return expect(mp.duration).toBeDefined();
        });
        it('offsetX should be defined', function() {
          return expect(mp.offsetX).toBeDefined();
        });
        it('isReverse should be defined', function() {
          return expect(mp.isReverse).toBeDefined();
        });
        it('offsetY should be defined', function() {
          return expect(mp.offsetY).toBeDefined();
        });
        it('isAngle should be defined', function() {
          return expect(mp.isAngle).toBeDefined();
        });
        it('isRunLess should be defined', function() {
          return expect(mp.isRunLess).toBeDefined();
        });
        it('easing should be defined', function() {
          expect(mp.easing).toBeDefined();
          return expect(mp.easings).toBeDefined();
        });
        it('yoyo should be defined', function() {
          return expect(mp.yoyo).toBeDefined();
        });
        return it('repeat should be defined', function() {
          return expect(mp.repeat).toBeDefined();
        });
      });
      return describe('functionality ::', function() {
        var coords, div;
        div = document.createElement('div');
        describe('fill ::', function() {
          var container, size;
          container = document.createElement('div');
          div = document.createElement('div');
          size = 200;
          container.style.width = "" + size + "px";
          container.style.height = "" + size + "px";
          container.style.position = 'absolute';
          container.style.top = '-100%';
          container.setAttribute('id', 'js-container');
          document.body.appendChild(container);
          it('container could be specified by selector or DOM node', function() {
            var mp;
            mp = new MotionPath({
              path: 'M0,0 L500,0',
              el: div,
              fill: {
                container: '#js-container'
              }
            });
            return expect(mp.container instanceof HTMLElement).toBe(true);
          });
          it('if fill is specified it should have container, fillRule, cSize', function() {
            var mp;
            mp = new MotionPath({
              path: 'M0,0 L500,0',
              el: div,
              fill: {
                container: container
              }
            });
            expect(mp.container).toBeDefined();
            expect(mp.fillRule).toBeDefined();
            return expect(mp.cSize).toBeDefined();
          });
          it('if fillRule is "all" it should keep container\'s size', function() {
            var isCompleted, isFilled, mp;
            isFilled = false;
            isCompleted = false;
            mp = new MotionPath({
              path: 'M0,0 L500,500',
              el: div,
              duration: 50,
              fill: {
                container: container
              },
              all: true,
              onComplete: function() {
                var args, height, isHeight, isWidth, width;
                args = mp.el.style.transform.split(/(translate\()|\,|\)/);
                width = parseInt(args[2], 10);
                height = parseInt(args[4], 10);
                isWidth = width === container.offsetWidth;
                isHeight = height === container.offsetHeight;
                isFilled = isWidth && isHeight;
                return isCompleted = true;
              }
            });
            waitsFor((function() {
              return isCompleted;
            }), '', 100);
            return runs(function() {
              return expect(isFilled).toBe(true);
            });
          });
          it("if fillRule is \"width\" it should keep container\'s width and set \"height\" with aspect ratio", function() {
            var isCompleted, isFilled, mp;
            isFilled = false;
            isCompleted = false;
            mp = new MotionPath({
              path: 'M0,0 L500,250',
              el: div,
              duration: 50,
              fill: {
                container: container,
                fillRule: 'width'
              },
              all: true,
              onComplete: function() {
                var args, height, isHeight, isWidth, width;
                args = mp.el.style.transform.split(/(translate\()|\,|\)/);
                width = parseInt(args[2], 10);
                height = parseInt(args[4], 10);
                isWidth = width === container.offsetWidth;
                isHeight = height === (width / 2);
                isFilled = isWidth && isHeight;
                return isCompleted = true;
              }
            });
            waitsFor((function() {
              return isCompleted;
            }), '', 100);
            return runs(function() {
              return expect(isFilled).toBe(true);
            });
          });
          return it("if fillRule is \"height\" it should keep container\'s height and set \"width\" with aspect ratio", function() {
            var isCompleted, isFilled, mp;
            isFilled = false;
            isCompleted = false;
            mp = new MotionPath({
              path: 'M0,0 L250,500',
              el: div,
              duration: 50,
              fill: {
                container: container,
                fillRule: 'height'
              },
              all: true,
              onComplete: function() {
                var args, height, isHeight, isWidth, width;
                args = mp.el.style.transform.split(/(translate\()|\,|\)/);
                width = parseInt(args[2], 10);
                height = parseInt(args[4], 10);
                isWidth = width === (height / 2);
                isHeight = height === container.offsetHeight;
                isFilled = isWidth && isHeight;
                return isCompleted = true;
              }
            });
            waitsFor((function() {
              return isCompleted;
            }), '', 100);
            return runs(function() {
              return expect(isFilled).toBe(true);
            });
          });
        });
        coords = 'M0.55859375,593.527344L0.55859375,593.527344';
        describe('offsets ::', function() {
          describe('angleOffset ::', function() {
            it('angleOffset should work with positive angles', function() {
              var isEqual, mp;
              coords = 'M0,0 L10,0 L10,10';
              isEqual = false;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                angleOffset: 90,
                isAngle: true,
                onComplete: function() {
                  return isEqual = mp.angle === 180;
                }
              });
              waitsFor((function() {
                return isEqual;
              }), 'isEqual should be true', 100);
              return runs(function() {
                return expect(isEqual).toBe(true);
              });
            });
            it('angleOffset should work with negative angles', function() {
              var isEqual, mp;
              coords = 'M0,0 L10,0 L10,10';
              isEqual = false;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                angleOffset: -90,
                isAngle: true,
                onComplete: function() {
                  return isEqual = mp.angle === 0;
                }
              });
              waitsFor((function() {
                return isEqual;
              }), 'isEqual should be true', 100);
              return runs(function() {
                return expect(isEqual).toBe(true);
              });
            });
            it('angleOffset should be evaluated if a function', function() {
              var isFunction, mp;
              coords = 'M0,0 L10,0 L10,10';
              isFunction = false;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                angleOffset: function(angle) {
                  isFunction = true;
                  return angle;
                }
              });
              waitsFor((function() {
                return isFunction;
              }), 'isFunction should be true', 100);
              return runs(function() {
                return expect(isFunction).toBe(true);
              });
            });
            it('angleOffset should get current angle', function() {
              var angleSum1, angleSum2, isOnAngle, mp;
              coords = 'M0,0 L10,0 L10,10';
              isOnAngle = false;
              angleSum1 = 0;
              angleSum2 = 0;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                isAngle: true,
                angleOffset: function(angle) {
                  angleSum1 += angle;
                  angleSum2 += mp.angle;
                  return angle;
                },
                onComplete: function() {
                  return isOnAngle = angleSum1 === angleSum2;
                }
              });
              waitsFor((function() {
                return isOnAngle;
              }), '', 100);
              return runs(function() {
                return expect(isOnAngle).toBe(true);
              });
            });
            it('angleOffset should set current angle', function() {
              var angleShift, currAngle, isAnglesArray, isCompleted, isSet, mp;
              coords = 'M0,0 L10,0 L10,10';
              isSet = false;
              isCompleted = false;
              currAngle = 0;
              isAnglesArray = [];
              angleShift = 5;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                angleOffset: function(angle) {
                  currAngle = angle;
                  return angle + angleShift;
                },
                onUpdate: function() {
                  return isAnglesArray.push(currAngle + angleShift === mp.angle);
                },
                onComplete: function() {
                  var i, isSetItem, _i, _len;
                  for (i = _i = 0, _len = isAnglesArray.length; _i < _len; i = ++_i) {
                    isSetItem = isAnglesArray[i];
                    if (!isSetItem) {
                      isSet = true;
                    }
                    isCompleted = true;
                    return;
                  }
                  return isCompleted = true;
                }
              });
              waitsFor((function() {
                return isCompleted;
              }), '', 100);
              return runs(function() {
                return expect(isSet).toBe(false);
              });
            });
            return it('angleOffset should get current progress as second parameter', function() {
              var isProgress, mp, proc;
              coords = 'M0,0 L10,0 L10,10';
              isProgress = false;
              proc = -1;
              mp = new MotionPath({
                path: coords,
                el: div,
                duration: 50,
                angleOffset: function(angle, progress) {
                  proc = progress;
                  return angle;
                },
                onComplete: function() {
                  return isProgress = proc === 1;
                }
              });
              waitsFor((function() {
                return isProgress;
              }), '', 100);
              return runs(function() {
                return expect(isProgress).toBe(true);
              });
            });
          });
          it('should work with positive offsetX', function() {
            var isEquial, mp, x;
            coords = 'M0,0 L0,10';
            x = 0;
            isEquial = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              offsetX: 10,
              duration: 50,
              isAngle: true,
              onComplete: function() {
                x = div.style.transform.split(/(translate\()|,|\)/)[2];
                return isEquial = parseInt(x, 10) === 10;
              }
            });
            waitsFor((function() {
              return isEquial;
            }), 'isOnUpdate should be changed to true', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should work with negative offsetX', function() {
            var isEquial, mp, x;
            coords = 'M0,0 L0,10';
            x = 0;
            isEquial = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              offsetX: -10,
              duration: 50,
              onComplete: function() {
                x = div.style.transform.split(/(translate\()|,|\)/)[2];
                x = parseInt(x, 10);
                return isEquial = x === -10;
              }
            });
            waitsFor((function() {
              return isEquial;
            }), 'isOnUpdate should be changed to true', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should work with positive offsetY', function() {
            var isEquial, mp, y;
            coords = 'M0,0 L10,0';
            y = 0;
            isEquial = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              offsetY: 10,
              duration: 50,
              onComplete: function() {
                y = div.style.transform.split(/(translate\()|,|\)/)[4];
                y = parseInt(y, 10);
                return isEquial = y === 10;
              }
            });
            waitsFor((function() {
              return isEquial;
            }), 'isEquial should be changed to true', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should work with negative offsetY', function() {
            var isEquial, mp, y;
            coords = 'M0,0 L10,0';
            y = 0;
            isEquial = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              offsetY: -10,
              duration: 50,
              onComplete: function() {
                y = div.style.transform.split(/(translate\()|,|\)/)[4];
                return isEquial = parseInt(y, 10) === -10;
              }
            });
            waitsFor((function() {
              return isEquial;
            }), 'isEquial should be changed to true', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should calculate current angle', function() {
            var angle, detect, isEquial, isEquial2, mp;
            coords = 'M0,0 L10,0 L10,10';
            angle = 0;
            isEquial = false;
            isEquial2 = false;
            detect = {};
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 50,
              isAngle: true,
              onUpdate: function() {
                if (detect.firstAngle == null) {
                  detect.firstAngle = mp.angle;
                }
                return isEquial2 = detect.firstAngle === 0;
              },
              onComplete: function() {
                return isEquial = mp.angle === 90;
              }
            });
            waitsFor((function() {
              return isEquial;
            }), 'isEquial should be changed to true', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should calculate current angle with isReverse', function() {
            var angle, detect, isEquial, isEquial2, mp;
            coords = 'M0,0 L10,0 L10,10';
            angle = 0;
            isEquial = false;
            isEquial2 = false;
            detect = {};
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 50,
              isAngle: true,
              isReverse: true,
              onUpdate: function() {
                if (detect.firstAngle == null) {
                  detect.firstAngle = mp.angle;
                }
                return isEquial2 = detect.firstAngle === 90;
              },
              onComplete: function() {
                return isEquial = mp.angle === 0;
              }
            });
            waitsFor((function() {
              return isEquial && isEquial2;
            }), '', 100);
            return runs(function() {
              return expect(isEquial).toBe(true);
            });
          });
          it('should have transform-origin', function() {
            var isComplete, mp;
            coords = 'M0,0 L10,0 L10,10';
            isComplete = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 50,
              transformOrigin: '50% 50%',
              onComplete: function() {
                return isComplete = true;
              }
            });
            waitsFor((function() {
              return isComplete;
            }), '', 100);
            return runs(function() {
              return expect(mp.el.style.transformOrigin.length >= 1).toBe(true);
            });
          });
          return it('transform-origin could be a function', function() {
            var isAngle, isComplete, isProgress, mp;
            coords = 'M0,0 L10,0 L10,10';
            isComplete = false;
            isAngle = false;
            isProgress = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 50,
              transformOrigin: function(angle, proc) {
                var isFunction;
                isFunction = true;
                isAngle = angle != null;
                isProgress = proc != null;
                return '50% 50%';
              },
              onComplete: function() {
                return isComplete = true;
              }
            });
            waitsFor((function() {
              return isComplete;
            }), '', 100);
            return runs(function() {
              return expect(isAngle && isProgress).toBe(true);
            });
          });
        });
        describe('setProgress function ::', function() {
          return it('should have own function for setting up current progress', function() {
            var mp, pos;
            div = document.createElement('div');
            mp = new MotionPath({
              path: 'M0,0 L500,0',
              el: div,
              isRunLess: true
            });
            mp.setProgress(.5);
            pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
            return expect(pos).toBe(250);
          });
        });
        describe('preset position ::', function() {
          it('should preset initial position by default if isRunLess', function() {
            var mp, pos;
            div = document.createElement('div');
            mp = new MotionPath({
              path: 'M50,0 L500,0',
              el: div,
              isRunLess: true
            });
            pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
            return expect(pos).toBe(50);
          });
          return it('should not set initial position if isPresetPosition is false', function() {
            var mp, pos;
            div = document.createElement('div');
            mp = new MotionPath({
              path: 'M50,0 L500,0',
              el: div,
              isRunLess: true,
              isPresetPosition: false
            });
            pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
            return expect(pos).toBe(50);
          });
        });
        describe('path option ::', function() {
          it('should have a getPath method', function() {
            var mp;
            mp = new MotionPath({
              path: coords,
              el: div
            });
            return expect(mp.getPath).toBeDefined();
          });
          it('getPath should return a path when was specified by coordinates', function() {
            var mp;
            mp = new MotionPath({
              path: coords,
              el: div
            });
            return expect(mp.getPath() instanceof SVGElement).toBe(true);
          });
          it('getPath should return a path when it was specified by SVG path', function() {
            var mp, path;
            path = document.createElementNS(ns, 'path');
            mp = new MotionPath({
              path: path,
              el: div
            });
            return expect(mp.getPath() instanceof SVGElement).toBe(true);
          });
          return it('getPath should return a path when it was specified selector', function() {
            var id, mp, path, svg;
            id = 'js-path';
            svg = document.createElementNS(ns, 'svg');
            path = document.createElementNS(ns, 'path');
            path.setAttribute('id', id);
            path.setAttribute('class', id);
            svg.appendChild(path);
            document.body.appendChild(svg);
            mp = new MotionPath({
              path: "#" + id,
              el: div
            });
            expect(mp.getPath() instanceof SVGElement).toBe(true);
            mp = new MotionPath({
              path: "." + id,
              el: div
            });
            return expect(mp.getPath() instanceof SVGElement).toBe(true);
          });
        });
        describe('el option ::', function() {
          it('should return an el when it was specified by selector', function() {
            var id, mp;
            id = 'js-el';
            div = document.createElement('div');
            div.setAttribute('id', id);
            div.setAttribute('class', id);
            document.body.appendChild(div);
            mp = new MotionPath({
              path: coords,
              el: "#" + id
            });
            expect(mp.el instanceof HTMLElement).toBe(true);
            mp = new MotionPath({
              path: coords,
              el: "." + id
            });
            return expect(mp.el instanceof HTMLElement).toBe(true);
          });
          return it('getPath should return an el when an element was passed', function() {
            var mp;
            div = document.createElement('div');
            mp = new MotionPath({
              path: coords,
              el: div
            });
            return expect(mp.el instanceof HTMLElement).toBe(true);
          });
        });
        describe('run ability ::', function() {
          it('should not run with isRunLess option passed', function() {
            var isDelayed, isStarted, mp;
            isStarted = false;
            isDelayed = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              isRunLess: true,
              duration: 50,
              onStart: function() {
                console.log('a');
                return isStarted = true;
              }
            });
            setTimeout((function() {
              return isDelayed = true;
            }), 70);
            waitsFor((function() {
              return isDelayed;
            }), 'isDelayed should be true', 100);
            return runs(function() {
              return expect(isStarted).toBe(false);
            });
          });
          return it('run call should extend defaults', function() {
            var isComplete, mp;
            div = document.createElement('div');
            coords = 'M0,0 L500,00';
            isComplete = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              isRunLess: true,
              duration: 50,
              r: true
            });
            mp.run({
              onComplete: function() {
                return isComplete = true;
              },
              path: 'M0,0 L600,00'
            });
            waitsFor((function() {
              return isComplete;
            }), 'isComplete should be true', 100);
            return runs(function() {
              var pos;
              pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
              return expect(pos).toBe(600);
            });
          });
        });
        return describe('callbacks ::', function() {
          it('onStart callback should work', function() {
            var isOnStart, mp;
            isOnStart = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              onStart: function() {
                return isOnStart = true;
              }
            });
            waitsFor((function() {
              return isOnStart;
            }), 'isOnStart should be changed to true', 50);
            return runs(function() {
              return expect(isOnStart).toBe(true);
            });
          });
          it('onComplete callback should work', function() {
            var isOnComplete, mp;
            isOnComplete = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 5,
              onComplete: function() {
                return isOnComplete = true;
              }
            });
            waitsFor((function() {
              return isOnComplete;
            }), 'isOnComplete should be true', 100);
            return runs(function() {
              return expect(isOnComplete).toBe(true);
            });
          });
          it('onUpdate callback should work', function() {
            var isOnUpdate, mp;
            isOnUpdate = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 5,
              onUpdate: function() {
                return isOnUpdate = true;
              }
            });
            waitsFor((function() {
              return isOnUpdate;
            }), 'isOnUpdate should be changed to true', 100);
            return runs(function() {
              return expect(isOnUpdate).toBe(true);
            });
          });
          return it('onUpdate callback should have "progress" argument', function() {
            var isOnUpdate, mp;
            isOnUpdate = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              duration: 5,
              onUpdate: function(progress) {
                if (progress != null) {
                  return isOnUpdate = true;
                }
              }
            });
            waitsFor((function() {
              return isOnUpdate;
            }), 'isOnUpdate should be changed to true', 100);
            return runs(function() {
              return expect(isOnUpdate).toBe(true);
            });
          });
        });
      });
    });
  });

}).call(this);
