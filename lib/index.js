'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('dotenv-parse-variables');

var DEFAULT_OPTIONS = {
  assignToProcessEnv: true,
  overrideProcessEnv: false
};

exports.default = function (env, options) {
  var envOptions = Object.assign({}, DEFAULT_OPTIONS, options || {});

  Object.keys(env).forEach(function (key) {
    debug('key "' + key + '" before type was ' + _typeof(env[key]));
    env[key] = parseKey(env[key], key);
    debug('key "' + key + '" after type was ' + _typeof(env[key]));

    if (envOptions.assignToProcessEnv === true) {
      if (envOptions.overrideProcessEnv === true) {
        process.env[key] = env[key] || process.env[key];
      } else {
        process.env[key] = process.env[key] || env[key];
      }
    }
  });

  return env;
};

function parseKey(value, key) {

  debug('parsing key ' + key + ' with value ' + value);

  // if the value is wrapped in bacticks e.g. (`value`) then just return its value
  if (value.toString().indexOf('`') === 0 && value.toString().lastIndexOf('`') === value.toString().length - 1) {
    debug('key ' + key + ' is wrapped in bacticks and will be ignored from parsing');
    return value.toString().substring(1, value.toString().length - 1);
  }

  // if the value ends in an asterisk then just return its value
  if (value.toString().lastIndexOf('*') === value.toString().length - 1 && value.toString().indexOf(',') === -1) {
    debug('key ' + key + ' ended in * and will be ignored from parsing');
    return value.toString().substring(0, value.toString().length - 1);
  }

  // Boolean
  if (value.toString().toLowerCase() === 'true' || value.toString().toLowerCase() === 'false') {
    debug('key ' + key + ' parsed as a Boolean');
    return value === 'true';
  }

  // Number
  if (!isNaN(value)) {
    debug('key ' + key + ' parsed as a Number');
    return Number(value);
  }

  // Array
  if (value.indexOf(',') !== -1) {
    debug('key ' + key + ' parsed as an Array');
    return value.split(',').map(parseKey);
  }

  return value;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsIkRlYnVnIiwiREVGQVVMVF9PUFRJT05TIiwiYXNzaWduVG9Qcm9jZXNzRW52Iiwib3ZlcnJpZGVQcm9jZXNzRW52IiwiZW52Iiwib3B0aW9ucyIsImVudk9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInBhcnNlS2V5IiwicHJvY2VzcyIsInZhbHVlIiwidG9TdHJpbmciLCJpbmRleE9mIiwibGFzdEluZGV4T2YiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwic3BsaXQiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFFBQVEsSUFBSUMsZUFBSixDQUFVLHdCQUFWLENBQWQ7O0FBRUEsSUFBTUMsa0JBQWtCO0FBQ3RCQyxzQkFBb0IsSUFERTtBQUV0QkMsc0JBQW9CO0FBRkUsQ0FBeEI7O2tCQUtlLFVBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUMvQixNQUFNQyxhQUFhQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlAsZUFBbEIsRUFBbUNJLFdBQVcsRUFBOUMsQ0FBbkI7O0FBRUFFLFNBQU9FLElBQVAsQ0FBWUwsR0FBWixFQUFpQk0sT0FBakIsQ0FBeUIsZUFBTztBQUM5Qlgsb0JBQWNZLEdBQWQsa0NBQTZDUCxJQUFJTyxHQUFKLENBQTdDO0FBQ0FQLFFBQUlPLEdBQUosSUFBV0MsU0FBU1IsSUFBSU8sR0FBSixDQUFULEVBQW1CQSxHQUFuQixDQUFYO0FBQ0FaLG9CQUFjWSxHQUFkLGlDQUE0Q1AsSUFBSU8sR0FBSixDQUE1Qzs7QUFFQSxRQUFJTCxXQUFXSixrQkFBWCxLQUFrQyxJQUF0QyxFQUE0QztBQUMxQyxVQUFJSSxXQUFXSCxrQkFBWCxLQUFrQyxJQUF0QyxFQUE0QztBQUMxQ1UsZ0JBQVFULEdBQVIsQ0FBWU8sR0FBWixJQUFtQlAsSUFBSU8sR0FBSixLQUFZRSxRQUFRVCxHQUFSLENBQVlPLEdBQVosQ0FBL0I7QUFDRCxPQUZELE1BRU87QUFDTEUsZ0JBQVFULEdBQVIsQ0FBWU8sR0FBWixJQUFtQkUsUUFBUVQsR0FBUixDQUFZTyxHQUFaLEtBQW9CUCxJQUFJTyxHQUFKLENBQXZDO0FBQ0Q7QUFDRjtBQUNGLEdBWkQ7O0FBY0EsU0FBT1AsR0FBUDtBQUVELEM7O0FBRUQsU0FBU1EsUUFBVCxDQUFrQkUsS0FBbEIsRUFBeUJILEdBQXpCLEVBQThCOztBQUU1QloseUJBQXFCWSxHQUFyQixvQkFBdUNHLEtBQXZDOztBQUVBO0FBQ0EsTUFBSUEsTUFBTUMsUUFBTixHQUFpQkMsT0FBakIsQ0FBeUIsR0FBekIsTUFBa0MsQ0FBbEMsSUFDQ0YsTUFBTUMsUUFBTixHQUFpQkUsV0FBakIsQ0FBNkIsR0FBN0IsTUFBc0NILE1BQU1DLFFBQU4sR0FBaUJHLE1BQWpCLEdBQTBCLENBRHJFLEVBQ3dFO0FBQ3RFbkIsbUJBQWFZLEdBQWI7QUFDQSxXQUFPRyxNQUFNQyxRQUFOLEdBQWlCSSxTQUFqQixDQUEyQixDQUEzQixFQUE4QkwsTUFBTUMsUUFBTixHQUFpQkcsTUFBakIsR0FBMEIsQ0FBeEQsQ0FBUDtBQUNEOztBQUVEO0FBQ0EsTUFBSUosTUFBTUMsUUFBTixHQUFpQkUsV0FBakIsQ0FBNkIsR0FBN0IsTUFBc0NILE1BQU1DLFFBQU4sR0FBaUJHLE1BQWpCLEdBQTBCLENBQWhFLElBQ0NKLE1BQU1DLFFBQU4sR0FBaUJDLE9BQWpCLENBQXlCLEdBQXpCLE1BQWtDLENBQUMsQ0FEeEMsRUFDMkM7QUFDekNqQixtQkFBYVksR0FBYjtBQUNBLFdBQU9HLE1BQU1DLFFBQU4sR0FBaUJJLFNBQWpCLENBQTJCLENBQTNCLEVBQThCTCxNQUFNQyxRQUFOLEdBQWlCRyxNQUFqQixHQUEwQixDQUF4RCxDQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJSixNQUFNQyxRQUFOLEdBQWlCSyxXQUFqQixPQUFtQyxNQUFuQyxJQUE2Q04sTUFBTUMsUUFBTixHQUFpQkssV0FBakIsT0FBbUMsT0FBcEYsRUFBNkY7QUFDM0ZyQixtQkFBYVksR0FBYjtBQUNBLFdBQU9HLFVBQVUsTUFBakI7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQ08sTUFBTVAsS0FBTixDQUFMLEVBQW1CO0FBQ2pCZixtQkFBYVksR0FBYjtBQUNBLFdBQU9XLE9BQU9SLEtBQVAsQ0FBUDtBQUNEOztBQUVEO0FBQ0EsTUFBSUEsTUFBTUUsT0FBTixDQUFjLEdBQWQsTUFBdUIsQ0FBQyxDQUE1QixFQUErQjtBQUM3QmpCLG1CQUFhWSxHQUFiO0FBQ0EsV0FBT0csTUFBTVMsS0FBTixDQUFZLEdBQVosRUFBaUJDLEdBQWpCLENBQXFCWixRQUFyQixDQUFQO0FBQ0Q7O0FBRUQsU0FBT0UsS0FBUDtBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuXG5jb25zdCBkZWJ1ZyA9IG5ldyBEZWJ1ZygnZG90ZW52LXBhcnNlLXZhcmlhYmxlcycpO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gIGFzc2lnblRvUHJvY2Vzc0VudjogdHJ1ZSxcbiAgb3ZlcnJpZGVQcm9jZXNzRW52OiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGVudiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBlbnZPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zIHx8IHt9KTtcblxuICBPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcbiAgICBkZWJ1Zyhga2V5IFwiJHtrZXl9XCIgYmVmb3JlIHR5cGUgd2FzICR7dHlwZW9mIGVudltrZXldfWApO1xuICAgIGVudltrZXldID0gcGFyc2VLZXkoZW52W2tleV0sIGtleSk7XG4gICAgZGVidWcoYGtleSBcIiR7a2V5fVwiIGFmdGVyIHR5cGUgd2FzICR7dHlwZW9mIGVudltrZXldfWApO1xuXG4gICAgaWYgKGVudk9wdGlvbnMuYXNzaWduVG9Qcm9jZXNzRW52ID09PSB0cnVlKSB7XG4gICAgICBpZiAoZW52T3B0aW9ucy5vdmVycmlkZVByb2Nlc3NFbnYgPT09IHRydWUpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnZba2V5XSA9IGVudltrZXldIHx8IHByb2Nlc3MuZW52W2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudltrZXldID0gcHJvY2Vzcy5lbnZba2V5XSB8fCBlbnZba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbnY7XG5cbn07XG5cbmZ1bmN0aW9uIHBhcnNlS2V5KHZhbHVlLCBrZXkpIHtcblxuICBkZWJ1ZyhgcGFyc2luZyBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHt2YWx1ZX1gKTtcblxuICAvLyBpZiB0aGUgdmFsdWUgaXMgd3JhcHBlZCBpbiBiYWN0aWNrcyBlLmcuIChgdmFsdWVgKSB0aGVuIGp1c3QgcmV0dXJuIGl0cyB2YWx1ZVxuICBpZiAodmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCdgJykgPT09IDBcbiAgICAmJiB2YWx1ZS50b1N0cmluZygpLmxhc3RJbmRleE9mKCdgJykgPT09IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIC0gMSkge1xuICAgIGRlYnVnKGBrZXkgJHtrZXl9IGlzIHdyYXBwZWQgaW4gYmFjdGlja3MgYW5kIHdpbGwgYmUgaWdub3JlZCBmcm9tIHBhcnNpbmdgKTtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5zdWJzdHJpbmcoMSwgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8vIGlmIHRoZSB2YWx1ZSBlbmRzIGluIGFuIGFzdGVyaXNrIHRoZW4ganVzdCByZXR1cm4gaXRzIHZhbHVlXG4gIGlmICh2YWx1ZS50b1N0cmluZygpLmxhc3RJbmRleE9mKCcqJykgPT09IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIC0gMVxuICAgICYmIHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignLCcpID09PSAtMSkge1xuICAgIGRlYnVnKGBrZXkgJHtrZXl9IGVuZGVkIGluICogYW5kIHdpbGwgYmUgaWdub3JlZCBmcm9tIHBhcnNpbmdgKTtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8vIEJvb2xlYW5cbiAgaWYgKHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJykge1xuICAgIGRlYnVnKGBrZXkgJHtrZXl9IHBhcnNlZCBhcyBhIEJvb2xlYW5gKTtcbiAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8vIE51bWJlclxuICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgIGRlYnVnKGBrZXkgJHtrZXl9IHBhcnNlZCBhcyBhIE51bWJlcmApO1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICB9XG5cbiAgLy8gQXJyYXlcbiAgaWYgKHZhbHVlLmluZGV4T2YoJywnKSAhPT0gLTEpIHtcbiAgICBkZWJ1Zyhga2V5ICR7a2V5fSBwYXJzZWQgYXMgYW4gQXJyYXlgKTtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJywnKS5tYXAocGFyc2VLZXkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xuXG59XG4iXX0=