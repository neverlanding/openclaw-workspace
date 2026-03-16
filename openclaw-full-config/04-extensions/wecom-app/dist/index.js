import { homedir, tmpdir } from 'os';
import { join, extname, basename } from 'path';
import crypto, { createHmac } from 'crypto';
import N2, { stdout, stdin } from 'process';
import ot from 'readline';
import 'tty';
import { existsSync } from 'fs';
import 'util';
import { readFile, mkdir, writeFile, rename, unlink, readdir, stat } from 'fs/promises';
import { spawn } from 'child_process';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports$1, module) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input2) => {
      let string = "" + input2, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// ../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports$1, module) {
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x3, y2) {
        if (!y2) return `${CSI}${x3 + 1}G`;
        return `${CSI}${y2 + 1};${x3 + 1}H`;
      },
      move(x3, y2) {
        let ret = "";
        if (x3 < 0) ret += `${CSI}${-x3}D`;
        else if (x3 > 0) ret += `${CSI}${x3}C`;
        if (y2 < 0) ret += `${CSI}${-y2}A`;
        else if (y2 > 0) ret += `${CSI}${y2}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module.exports = { cursor, scroll, erase, beep };
  }
});

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_2) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
    const filtered = {};
    for (const k2 of validKeys) {
      filtered[k2] = obj[k2];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e2) {
      return obj[e2];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_2, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x3) => !!x3)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x3) => x3.status === "aborted";
var isDirty = (x3) => x3.status === "dirty";
var isValid = (x3) => x3.status === "valid";
var isAsync = (x3) => typeof Promise !== "undefined" && x3 instanceof Promise;

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input2) {
    return getParsedType(input2.data);
  }
  _getOrReturnCtx(input2, ctx) {
    return ctx || {
      common: input2.parent.common,
      data: input2.data,
      parsedType: getParsedType(input2.data),
      schemaErrorMap: this._def.errorMap,
      path: input2.path,
      parent: input2.parent
    };
  }
  _processInputParams(input2) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input2.parent.common,
        data: input2.data,
        parsedType: getParsedType(input2.data),
        schemaErrorMap: this._def.errorMap,
        path: input2.path,
        parent: input2.parent
      }
    };
  }
  _parseSync(input2) {
    const result = this._parse(input2);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input2) {
    const result = this._parse(input2);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = String(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input2.data.length < check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input2.data.length > check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input2.data.length > check.value;
        const tooSmall = input2.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input2.data);
        } catch {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input2.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input2.data = input2.data.trim();
      } else if (check.kind === "includes") {
        if (!input2.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input2.data = input2.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input2.data = input2.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input2.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input2.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input2.data, check.version)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input2.data, check.alg)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input2.data, check.version)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = Number(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input2.data < check.value : input2.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input2.data > check.value : input2.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input2.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input2) {
    if (this._def.coerce) {
      try {
        input2.data = BigInt(input2.data);
      } catch {
        return this._getInvalidInput(input2);
      }
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input2);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input2.data < check.value : input2.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input2.data > check.value : input2.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input2.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  _getInvalidInput(input2) {
    const ctx = this._getOrReturnCtx(input2);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = Boolean(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = new Date(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input2.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input2.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input2.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input2.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input2) {
    const ctx = this._getOrReturnCtx(input2);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input2) {
    const { ctx, status } = this._processInputParams(input2);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input2);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ; else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x3) => !!x3);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me2 = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me2._def.args.parseAsync(args, params).catch((e2) => {
          error.addIssue(makeArgsIssue(args, e2));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me2._def.returns._def.type.parseAsync(result, params).catch((e2) => {
          error.addIssue(makeReturnsIssue(result, e2));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me2 = this;
      return OK(function(...args) {
        const parsedArgs = me2._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me2._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input2) {
    if (input2.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input2.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input2) {
    if (typeof input2.data !== "string") {
      const ctx = this._getOrReturnCtx(input2);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input2.data)) {
      const ctx = this._getOrReturnCtx(input2);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input2.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input2) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input2);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input2.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input2.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input2.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input2) {
    const result = this._def.innerType._parse(input2);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;
var DEFAULT_ACCOUNT_ID = "default";
var WecomAppAccountSchema = external_exports.object({
  name: external_exports.string().optional(),
  enabled: external_exports.boolean().optional(),
  webhookPath: external_exports.string().optional(),
  token: external_exports.string().optional(),
  encodingAESKey: external_exports.string().optional(),
  receiveId: external_exports.string().optional(),
  // 自建应用特有字段
  corpId: external_exports.string().optional(),
  corpSecret: external_exports.string().optional(),
  agentId: external_exports.number().optional(),
  apiBaseUrl: external_exports.string().optional(),
  // 媒体文件大小限制 (MB)
  maxFileSizeMB: external_exports.number().optional(),
  // 入站媒体（图片/文件）落盘设置
  inboundMedia: external_exports.object({
    enabled: external_exports.boolean().optional(),
    dir: external_exports.string().optional(),
    maxBytes: external_exports.number().optional(),
    keepDays: external_exports.number().optional()
  }).optional(),
  // 语音发送策略（可选）：当遇到不支持的格式（如 wav/mp3）时，
  // - enabled=true 且系统存在 ffmpeg：自动转码为 amr 后再发送 voice
  // - 否则：降级为 file 发送（并可配合 caption 提示）
  voiceTranscode: external_exports.object({
    enabled: external_exports.boolean().optional(),
    prefer: external_exports.enum(["amr"]).optional()
  }).optional(),
  asr: external_exports.object({
    enabled: external_exports.boolean().optional(),
    appId: external_exports.string().optional(),
    secretId: external_exports.string().optional(),
    secretKey: external_exports.string().optional(),
    engineType: external_exports.string().optional(),
    timeoutMs: external_exports.number().int().positive().optional()
  }).optional(),
  // 其他字段
  welcomeText: external_exports.string().optional(),
  dmPolicy: external_exports.enum(["open", "pairing", "allowlist", "disabled"]).optional(),
  allowFrom: external_exports.array(external_exports.string()).optional()
});
WecomAppAccountSchema.extend({
  defaultAccount: external_exports.string().optional(),
  accounts: external_exports.record(WecomAppAccountSchema).optional()
});
var WecomAppConfigJsonSchema = {
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      enabled: { type: "boolean" },
      webhookPath: { type: "string" },
      token: { type: "string" },
      encodingAESKey: { type: "string" },
      receiveId: { type: "string" },
      corpId: { type: "string" },
      corpSecret: { type: "string" },
      agentId: { type: "number" },
      apiBaseUrl: { type: "string" },
      inboundMedia: {
        type: "object",
        additionalProperties: false,
        properties: {
          enabled: { type: "boolean" },
          dir: { type: "string" },
          maxBytes: { type: "number" },
          keepDays: { type: "number" }
        }
      },
      voiceTranscode: {
        type: "object",
        additionalProperties: false,
        properties: {
          enabled: { type: "boolean" },
          prefer: { type: "string", enum: ["amr"] }
        }
      },
      asr: {
        type: "object",
        additionalProperties: false,
        properties: {
          enabled: { type: "boolean" },
          appId: { type: "string" },
          secretId: { type: "string" },
          secretKey: { type: "string" },
          engineType: { type: "string" },
          timeoutMs: { type: "number" }
        }
      },
      welcomeText: { type: "string" },
      dmPolicy: { type: "string", enum: ["open", "pairing", "allowlist", "disabled"] },
      allowFrom: { type: "array", items: { type: "string" } },
      maxFileSizeMB: { type: "number" },
      defaultAccount: { type: "string" },
      accounts: {
        type: "object",
        additionalProperties: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            enabled: { type: "boolean" },
            webhookPath: { type: "string" },
            token: { type: "string" },
            encodingAESKey: { type: "string" },
            receiveId: { type: "string" },
            corpId: { type: "string" },
            corpSecret: { type: "string" },
            agentId: { type: "number" },
            apiBaseUrl: { type: "string" },
            inboundMedia: {
              type: "object",
              additionalProperties: false,
              properties: {
                enabled: { type: "boolean" },
                dir: { type: "string" },
                maxBytes: { type: "number" },
                keepDays: { type: "number" }
              }
            },
            asr: {
              type: "object",
              additionalProperties: false,
              properties: {
                enabled: { type: "boolean" },
                appId: { type: "string" },
                secretId: { type: "string" },
                secretKey: { type: "string" },
                engineType: { type: "string" },
                timeoutMs: { type: "number" }
              }
            },
            welcomeText: { type: "string" },
            dmPolicy: { type: "string", enum: ["open", "pairing", "allowlist", "disabled"] },
            allowFrom: { type: "array", items: { type: "string" } },
            groupPolicy: { type: "string", enum: ["open", "allowlist", "disabled"] },
            groupAllowFrom: { type: "array", items: { type: "string" } },
            requireMention: { type: "boolean" },
            maxFileSizeMB: { type: "number" }
          }
        }
      }
    }
  }
};
function normalizeAccountId(raw) {
  const trimmed = String(raw ?? "").trim();
  return trimmed || DEFAULT_ACCOUNT_ID;
}
function listConfiguredAccountIds(cfg) {
  const accounts = cfg.channels?.["wecom-app"]?.accounts;
  if (!accounts || typeof accounts !== "object") return [];
  return Object.keys(accounts).filter(Boolean);
}
function listWecomAppAccountIds(cfg) {
  const ids = listConfiguredAccountIds(cfg);
  if (ids.length === 0) return [DEFAULT_ACCOUNT_ID];
  return ids.sort((a, b) => a.localeCompare(b));
}
function resolveDefaultWecomAppAccountId(cfg) {
  const wecomAppConfig = cfg.channels?.["wecom-app"];
  if (wecomAppConfig?.defaultAccount?.trim()) return wecomAppConfig.defaultAccount.trim();
  const ids = listWecomAppAccountIds(cfg);
  if (ids.includes(DEFAULT_ACCOUNT_ID)) return DEFAULT_ACCOUNT_ID;
  return ids[0] ?? DEFAULT_ACCOUNT_ID;
}
function resolveAccountConfig(cfg, accountId) {
  const accounts = cfg.channels?.["wecom-app"]?.accounts;
  if (!accounts || typeof accounts !== "object") return void 0;
  return accounts[accountId];
}
function mergeWecomAppAccountConfig(cfg, accountId) {
  const base = cfg.channels?.["wecom-app"] ?? {};
  const { accounts: _ignored, defaultAccount: _ignored2, ...baseConfig } = base;
  const account = resolveAccountConfig(cfg, accountId) ?? {};
  return { ...baseConfig, ...account };
}
function resolveWecomAppAccount(params) {
  const accountId = normalizeAccountId(params.accountId);
  const baseEnabled = params.cfg.channels?.["wecom-app"]?.enabled !== false;
  const merged = mergeWecomAppAccountConfig(params.cfg, accountId);
  const enabled = baseEnabled && merged.enabled !== false;
  const isDefaultAccount = accountId === DEFAULT_ACCOUNT_ID;
  const token = merged.token?.trim() || (isDefaultAccount ? process.env.WECOM_APP_TOKEN?.trim() : void 0) || void 0;
  const encodingAESKey = merged.encodingAESKey?.trim() || (isDefaultAccount ? process.env.WECOM_APP_ENCODING_AES_KEY?.trim() : void 0) || void 0;
  const receiveId = merged.receiveId?.trim() ?? "";
  const corpId = merged.corpId?.trim() || (isDefaultAccount ? process.env.WECOM_APP_CORP_ID?.trim() : void 0) || void 0;
  const corpSecret = merged.corpSecret?.trim() || (isDefaultAccount ? process.env.WECOM_APP_CORP_SECRET?.trim() : void 0) || void 0;
  let envAgentId;
  if (isDefaultAccount && process.env.WECOM_APP_AGENT_ID) {
    const parsed = parseInt(process.env.WECOM_APP_AGENT_ID, 10);
    if (!Number.isNaN(parsed)) {
      envAgentId = parsed;
    }
  }
  const agentId = merged.agentId ?? envAgentId;
  const apiBaseUrl = merged.apiBaseUrl?.trim() || (isDefaultAccount ? process.env.WECOM_APP_API_BASE_URL?.trim() : void 0) || void 0;
  const configured = Boolean(token && encodingAESKey);
  const canSendActive = Boolean(corpId && corpSecret && agentId);
  return {
    accountId,
    name: merged.name?.trim() || void 0,
    enabled,
    configured,
    token,
    encodingAESKey,
    receiveId,
    corpId,
    corpSecret,
    agentId,
    canSendActive,
    config: { ...merged, apiBaseUrl }
  };
}
function resolveDmPolicy(config) {
  return config.dmPolicy ?? "pairing";
}
function resolveAllowFrom(config) {
  return config.allowFrom ?? [];
}
var DEFAULT_WECOM_APP_API_BASE_URL = "https://qyapi.weixin.qq.com";
function resolveApiBaseUrl(config) {
  const raw = (config.apiBaseUrl ?? "").trim();
  if (!raw) return DEFAULT_WECOM_APP_API_BASE_URL;
  return raw.replace(/\/+$/, "");
}
var DEFAULT_INBOUND_MEDIA_DIR = join(homedir(), ".openclaw", "media", "wecom-app", "inbound");
var DEFAULT_INBOUND_MEDIA_MAX_BYTES = 10 * 1024 * 1024;
var DEFAULT_INBOUND_MEDIA_KEEP_DAYS = 7;
function resolveInboundMediaEnabled(config) {
  if (typeof config.inboundMedia?.enabled === "boolean") return config.inboundMedia.enabled;
  return true;
}
function resolveInboundMediaDir(config) {
  return (config.inboundMedia?.dir ?? "").trim() || DEFAULT_INBOUND_MEDIA_DIR;
}
function resolveInboundMediaMaxBytes(config) {
  const v = config.inboundMedia?.maxBytes;
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : DEFAULT_INBOUND_MEDIA_MAX_BYTES;
}
function resolveInboundMediaKeepDays(config) {
  const v = config.inboundMedia?.keepDays;
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : DEFAULT_INBOUND_MEDIA_KEEP_DAYS;
}
function resolveWecomAppASRCredentials(config) {
  const asr = config.asr;
  if (!asr?.enabled) return void 0;
  if (!asr.appId || !asr.secretId || !asr.secretKey) return void 0;
  return {
    appId: asr.appId,
    secretId: asr.secretId,
    secretKey: asr.secretKey,
    engineType: asr.engineType,
    timeoutMs: asr.timeoutMs
  };
}

// ../../packages/shared/src/logger/logger.ts
function createLogger(prefix, opts) {
  const logFn = opts?.log ?? console.log;
  const errorFn = opts?.error ?? console.error;
  return {
    debug: (msg) => logFn(`[${prefix}] [DEBUG] ${msg}`),
    info: (msg) => logFn(`[${prefix}] ${msg}`),
    warn: (msg) => logFn(`[${prefix}] [WARN] ${msg}`),
    error: (msg) => errorFn(`[${prefix}] [ERROR] ${msg}`)
  };
}

// ../../packages/shared/src/policy/dm-policy.ts
function checkDmPolicy(params) {
  const { dmPolicy, senderId, allowFrom = [] } = params;
  switch (dmPolicy) {
    case "open":
      return { allowed: true };
    case "pairing":
      return { allowed: true };
    case "allowlist":
      if (allowFrom.includes(senderId)) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: `sender ${senderId} not in DM allowlist`
      };
    default:
      return { allowed: true };
  }
}

// ../../packages/shared/src/media/media-parser.ts
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([
  "mp3",
  "wav",
  "ogg",
  "m4a",
  "amr",
  "flac",
  "aac",
  "wma"
]);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "flv",
  "wmv",
  "m4v"
]);
var NON_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  // 文档
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "csv",
  "ppt",
  "pptx",
  "txt",
  "md",
  "rtf",
  "odt",
  "ods",
  // 压缩包
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  "tgz",
  "bz2",
  // 音频
  ...AUDIO_EXTENSIONS,
  // 视频
  ...VIDEO_EXTENSIONS,
  // 数据
  "json",
  "xml",
  "yaml",
  "yml"
]);
Array.from(NON_IMAGE_EXTENSIONS).join("|");

// ../../packages/shared/src/cron/index.ts
var CRON_HIDDEN_PROMPT = `
When creating or updating a cron task, use the main session's last route as the delivery target.
- Do not ask the user for userId/chatId
- sessionTarget="isolated"
- payload.kind="agentTurn"
- payload.deliver=true
- Do not set payload.channel/to (fall back to last route automatically)
- Do not call the message tool to send`;
var CRON_TRIGGER_KEYWORDS = [
  "\u5B9A\u65F6",
  "\u63D0\u9192",
  "\u6BCF\u5206\u949F",
  "\u6BCF\u5C0F\u65F6",
  "\u6BCF\u5929",
  "\u6BCF\u5468",
  "\u51E0\u70B9",
  "\u65E9\u4E0A",
  "\u665A\u4E0A",
  "\u5DE5\u4F5C\u65E5",
  "cron",
  "remind",
  "reminder",
  "schedule",
  "scheduled",
  "every minute",
  "every hour",
  "every day",
  "daily",
  "every week",
  "weekly",
  "weekday",
  "workday",
  "morning",
  "evening"
];
var CRON_TRIGGER_PATTERNS = [
  /提醒我/u,
  /帮我定时/u,
  /每.+提醒/u,
  /每天.+发/u,
  /remind me/iu,
  /set (a )?reminder/iu,
  /every .+ remind/iu,
  /every day .+ (send|post|notify)/iu,
  /schedule .+ (reminder|message|notification)/iu
];
var CRON_EXCLUDE_PATTERNS = [
  /是什么意思/u,
  /区别/u,
  /为什么/u,
  /\bhelp\b/iu,
  /文档/u,
  /怎么用/u,
  /what does|what's|meaning of/iu,
  /difference/iu,
  /why/iu,
  /\bdocs?\b/iu,
  /documentation/iu,
  /how to/iu,
  /usage/iu
];
function shouldInjectCronHiddenPrompt(text) {
  const normalized = text.trim();
  if (!normalized) return false;
  const lowered = normalized.toLowerCase();
  for (const pattern of CRON_EXCLUDE_PATTERNS) {
    if (pattern.test(lowered)) return false;
  }
  for (const keyword of CRON_TRIGGER_KEYWORDS) {
    if (lowered.includes(keyword.toLowerCase())) return true;
  }
  return CRON_TRIGGER_PATTERNS.some((pattern) => pattern.test(normalized));
}
function appendCronHiddenPrompt(text) {
  if (!shouldInjectCronHiddenPrompt(text)) return text;
  if (text.includes(CRON_HIDDEN_PROMPT)) return text;
  return `${text}

${CRON_HIDDEN_PROMPT}`;
}

// ../../packages/shared/src/asr/errors.ts
var ASRError = class extends Error {
  constructor(message, kind, provider, retryable = false) {
    super(message);
    this.kind = kind;
    this.provider = provider;
    this.retryable = retryable;
    this.name = "ASRError";
  }
};
var ASRTimeoutError = class extends ASRError {
  constructor(provider, timeoutMs) {
    super(`ASR request timeout after ${timeoutMs}ms`, "timeout", provider, true);
    this.timeoutMs = timeoutMs;
    this.name = "ASRTimeoutError";
  }
};
var ASRAuthError = class extends ASRError {
  constructor(provider, message, status) {
    super(message, "auth", provider, false);
    this.status = status;
    this.name = "ASRAuthError";
  }
};
var ASRRequestError = class extends ASRError {
  constructor(provider, message, status) {
    super(message, "request", provider, true);
    this.status = status;
    this.name = "ASRRequestError";
  }
};
var ASRResponseParseError = class extends ASRError {
  constructor(provider, bodySnippet) {
    super("ASR response is not valid JSON", "response_parse", provider, false);
    this.bodySnippet = bodySnippet;
    this.name = "ASRResponseParseError";
  }
};
var ASRServiceError = class extends ASRError {
  constructor(provider, message, serviceCode) {
    super(message, "service", provider, false);
    this.serviceCode = serviceCode;
    this.name = "ASRServiceError";
  }
};
var ASREmptyResultError = class extends ASRError {
  constructor(provider) {
    super("ASR returned empty transcript", "empty_result", provider, false);
    this.name = "ASREmptyResultError";
  }
};

// ../../packages/shared/src/asr/tencent-flash.ts
var ASR_FLASH_HOST = "asr.cloud.tencent.com";
var ASR_FLASH_PATH_PREFIX = "/asr/flash/v1";
var ASR_FLASH_URL_PREFIX = `https://${ASR_FLASH_HOST}${ASR_FLASH_PATH_PREFIX}`;
var ASR_PROVIDER = "tencent-flash";
function encodeQueryValue(value) {
  return encodeURIComponent(value).replace(/%20/g, "+").replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}
function buildSignedQuery(params) {
  return Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${encodeURIComponent(key)}=${encodeQueryValue(value)}`).join("&");
}
function extractTranscript(payload) {
  const items = Array.isArray(payload.flash_result) ? payload.flash_result : [];
  const lines = [];
  for (const item of items) {
    if (typeof item?.text === "string" && item.text.trim()) {
      lines.push(item.text.trim());
      continue;
    }
    const sentenceList = Array.isArray(item?.sentence_list) ? item.sentence_list : [];
    for (const sentence of sentenceList) {
      if (typeof sentence?.text === "string" && sentence.text.trim()) {
        lines.push(sentence.text.trim());
      }
    }
  }
  return lines.join("\n").trim();
}
async function transcribeTencentFlash(params) {
  const { audio, config } = params;
  const timestamp = Math.floor(Date.now() / 1e3).toString();
  const engineType = config.engineType ?? "16k_zh";
  const voiceFormat = config.voiceFormat ?? "silk";
  const query = buildSignedQuery({
    engine_type: engineType,
    secretid: config.secretId,
    timestamp,
    voice_format: voiceFormat
  });
  const signText = `POST${ASR_FLASH_HOST}${ASR_FLASH_PATH_PREFIX}/${config.appId}?${query}`;
  const authorization = createHmac("sha1", config.secretKey).update(signText).digest("base64");
  const url = `${ASR_FLASH_URL_PREFIX}/${config.appId}?${query}`;
  const timeoutMs = config.timeoutMs ?? 3e4;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/octet-stream"
      },
      body: audio,
      signal: controller.signal
    });
    const bodyText = await response.text();
    let payload;
    try {
      payload = JSON.parse(bodyText);
    } catch {
      throw new ASRResponseParseError(ASR_PROVIDER, bodyText.slice(0, 300));
    }
    if (!response.ok) {
      const message = payload.message ?? `HTTP ${response.status}`;
      if (response.status === 401 || response.status === 403) {
        throw new ASRAuthError(
          ASR_PROVIDER,
          `Tencent Flash ASR authentication failed: ${message}`,
          response.status
        );
      }
      throw new ASRRequestError(
        ASR_PROVIDER,
        `Tencent Flash ASR request failed: ${message}`,
        response.status
      );
    }
    if (payload.code !== 0) {
      throw new ASRServiceError(
        ASR_PROVIDER,
        `Tencent Flash ASR failed: ${payload.message ?? "unknown error"} (code=${payload.code})`,
        payload.code
      );
    }
    const transcript = extractTranscript(payload);
    if (!transcript) {
      throw new ASREmptyResultError(ASR_PROVIDER);
    }
    return transcript;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new ASRTimeoutError(ASR_PROVIDER, timeoutMs);
    }
    if (error instanceof ASRResponseParseError || error instanceof ASRAuthError || error instanceof ASRRequestError || error instanceof ASRServiceError || error instanceof ASREmptyResultError || error instanceof ASRTimeoutError) {
      throw error;
    }
    throw new ASRRequestError(
      ASR_PROVIDER,
      `Tencent Flash ASR request failed: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

// ../../node_modules/.pnpm/@clack+core@1.0.1/node_modules/@clack/core/dist/index.mjs
var import_picocolors = __toESM(require_picocolors());
var import_sisteransi = __toESM(require_src());
function B(t, e2, s) {
  if (!s.some((u) => !u.disabled)) return t;
  const i = t + e2, r = Math.max(s.length - 1, 0), n = i < 0 ? r : i > r ? 0 : i;
  return s[n].disabled ? B(n, e2 < 0 ? -1 : 1, s) : n;
}
var at = (t) => t === 161 || t === 164 || t === 167 || t === 168 || t === 170 || t === 173 || t === 174 || t >= 176 && t <= 180 || t >= 182 && t <= 186 || t >= 188 && t <= 191 || t === 198 || t === 208 || t === 215 || t === 216 || t >= 222 && t <= 225 || t === 230 || t >= 232 && t <= 234 || t === 236 || t === 237 || t === 240 || t === 242 || t === 243 || t >= 247 && t <= 250 || t === 252 || t === 254 || t === 257 || t === 273 || t === 275 || t === 283 || t === 294 || t === 295 || t === 299 || t >= 305 && t <= 307 || t === 312 || t >= 319 && t <= 322 || t === 324 || t >= 328 && t <= 331 || t === 333 || t === 338 || t === 339 || t === 358 || t === 359 || t === 363 || t === 462 || t === 464 || t === 466 || t === 468 || t === 470 || t === 472 || t === 474 || t === 476 || t === 593 || t === 609 || t === 708 || t === 711 || t >= 713 && t <= 715 || t === 717 || t === 720 || t >= 728 && t <= 731 || t === 733 || t === 735 || t >= 768 && t <= 879 || t >= 913 && t <= 929 || t >= 931 && t <= 937 || t >= 945 && t <= 961 || t >= 963 && t <= 969 || t === 1025 || t >= 1040 && t <= 1103 || t === 1105 || t === 8208 || t >= 8211 && t <= 8214 || t === 8216 || t === 8217 || t === 8220 || t === 8221 || t >= 8224 && t <= 8226 || t >= 8228 && t <= 8231 || t === 8240 || t === 8242 || t === 8243 || t === 8245 || t === 8251 || t === 8254 || t === 8308 || t === 8319 || t >= 8321 && t <= 8324 || t === 8364 || t === 8451 || t === 8453 || t === 8457 || t === 8467 || t === 8470 || t === 8481 || t === 8482 || t === 8486 || t === 8491 || t === 8531 || t === 8532 || t >= 8539 && t <= 8542 || t >= 8544 && t <= 8555 || t >= 8560 && t <= 8569 || t === 8585 || t >= 8592 && t <= 8601 || t === 8632 || t === 8633 || t === 8658 || t === 8660 || t === 8679 || t === 8704 || t === 8706 || t === 8707 || t === 8711 || t === 8712 || t === 8715 || t === 8719 || t === 8721 || t === 8725 || t === 8730 || t >= 8733 && t <= 8736 || t === 8739 || t === 8741 || t >= 8743 && t <= 8748 || t === 8750 || t >= 8756 && t <= 8759 || t === 8764 || t === 8765 || t === 8776 || t === 8780 || t === 8786 || t === 8800 || t === 8801 || t >= 8804 && t <= 8807 || t === 8810 || t === 8811 || t === 8814 || t === 8815 || t === 8834 || t === 8835 || t === 8838 || t === 8839 || t === 8853 || t === 8857 || t === 8869 || t === 8895 || t === 8978 || t >= 9312 && t <= 9449 || t >= 9451 && t <= 9547 || t >= 9552 && t <= 9587 || t >= 9600 && t <= 9615 || t >= 9618 && t <= 9621 || t === 9632 || t === 9633 || t >= 9635 && t <= 9641 || t === 9650 || t === 9651 || t === 9654 || t === 9655 || t === 9660 || t === 9661 || t === 9664 || t === 9665 || t >= 9670 && t <= 9672 || t === 9675 || t >= 9678 && t <= 9681 || t >= 9698 && t <= 9701 || t === 9711 || t === 9733 || t === 9734 || t === 9737 || t === 9742 || t === 9743 || t === 9756 || t === 9758 || t === 9792 || t === 9794 || t === 9824 || t === 9825 || t >= 9827 && t <= 9829 || t >= 9831 && t <= 9834 || t === 9836 || t === 9837 || t === 9839 || t === 9886 || t === 9887 || t === 9919 || t >= 9926 && t <= 9933 || t >= 9935 && t <= 9939 || t >= 9941 && t <= 9953 || t === 9955 || t === 9960 || t === 9961 || t >= 9963 && t <= 9969 || t === 9972 || t >= 9974 && t <= 9977 || t === 9979 || t === 9980 || t === 9982 || t === 9983 || t === 10045 || t >= 10102 && t <= 10111 || t >= 11094 && t <= 11097 || t >= 12872 && t <= 12879 || t >= 57344 && t <= 63743 || t >= 65024 && t <= 65039 || t === 65533 || t >= 127232 && t <= 127242 || t >= 127248 && t <= 127277 || t >= 127280 && t <= 127337 || t >= 127344 && t <= 127373 || t === 127375 || t === 127376 || t >= 127387 && t <= 127404 || t >= 917760 && t <= 917999 || t >= 983040 && t <= 1048573 || t >= 1048576 && t <= 1114109;
var lt = (t) => t === 12288 || t >= 65281 && t <= 65376 || t >= 65504 && t <= 65510;
var ht = (t) => t >= 4352 && t <= 4447 || t === 8986 || t === 8987 || t === 9001 || t === 9002 || t >= 9193 && t <= 9196 || t === 9200 || t === 9203 || t === 9725 || t === 9726 || t === 9748 || t === 9749 || t >= 9800 && t <= 9811 || t === 9855 || t === 9875 || t === 9889 || t === 9898 || t === 9899 || t === 9917 || t === 9918 || t === 9924 || t === 9925 || t === 9934 || t === 9940 || t === 9962 || t === 9970 || t === 9971 || t === 9973 || t === 9978 || t === 9981 || t === 9989 || t === 9994 || t === 9995 || t === 10024 || t === 10060 || t === 10062 || t >= 10067 && t <= 10069 || t === 10071 || t >= 10133 && t <= 10135 || t === 10160 || t === 10175 || t === 11035 || t === 11036 || t === 11088 || t === 11093 || t >= 11904 && t <= 11929 || t >= 11931 && t <= 12019 || t >= 12032 && t <= 12245 || t >= 12272 && t <= 12287 || t >= 12289 && t <= 12350 || t >= 12353 && t <= 12438 || t >= 12441 && t <= 12543 || t >= 12549 && t <= 12591 || t >= 12593 && t <= 12686 || t >= 12688 && t <= 12771 || t >= 12783 && t <= 12830 || t >= 12832 && t <= 12871 || t >= 12880 && t <= 19903 || t >= 19968 && t <= 42124 || t >= 42128 && t <= 42182 || t >= 43360 && t <= 43388 || t >= 44032 && t <= 55203 || t >= 63744 && t <= 64255 || t >= 65040 && t <= 65049 || t >= 65072 && t <= 65106 || t >= 65108 && t <= 65126 || t >= 65128 && t <= 65131 || t >= 94176 && t <= 94180 || t === 94192 || t === 94193 || t >= 94208 && t <= 100343 || t >= 100352 && t <= 101589 || t >= 101632 && t <= 101640 || t >= 110576 && t <= 110579 || t >= 110581 && t <= 110587 || t === 110589 || t === 110590 || t >= 110592 && t <= 110882 || t === 110898 || t >= 110928 && t <= 110930 || t === 110933 || t >= 110948 && t <= 110951 || t >= 110960 && t <= 111355 || t === 126980 || t === 127183 || t === 127374 || t >= 127377 && t <= 127386 || t >= 127488 && t <= 127490 || t >= 127504 && t <= 127547 || t >= 127552 && t <= 127560 || t === 127568 || t === 127569 || t >= 127584 && t <= 127589 || t >= 127744 && t <= 127776 || t >= 127789 && t <= 127797 || t >= 127799 && t <= 127868 || t >= 127870 && t <= 127891 || t >= 127904 && t <= 127946 || t >= 127951 && t <= 127955 || t >= 127968 && t <= 127984 || t === 127988 || t >= 127992 && t <= 128062 || t === 128064 || t >= 128066 && t <= 128252 || t >= 128255 && t <= 128317 || t >= 128331 && t <= 128334 || t >= 128336 && t <= 128359 || t === 128378 || t === 128405 || t === 128406 || t === 128420 || t >= 128507 && t <= 128591 || t >= 128640 && t <= 128709 || t === 128716 || t >= 128720 && t <= 128722 || t >= 128725 && t <= 128727 || t >= 128732 && t <= 128735 || t === 128747 || t === 128748 || t >= 128756 && t <= 128764 || t >= 128992 && t <= 129003 || t === 129008 || t >= 129292 && t <= 129338 || t >= 129340 && t <= 129349 || t >= 129351 && t <= 129535 || t >= 129648 && t <= 129660 || t >= 129664 && t <= 129672 || t >= 129680 && t <= 129725 || t >= 129727 && t <= 129733 || t >= 129742 && t <= 129755 || t >= 129760 && t <= 129768 || t >= 129776 && t <= 129784 || t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141;
var O = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
var y = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var L = /\t{1,1000}/y;
var P = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var M = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var ct = /\p{M}+/gu;
var ft = { limit: 1 / 0, ellipsis: "" };
var X = (t, e2 = {}, s = {}) => {
  const i = e2.limit ?? 1 / 0, r = e2.ellipsis ?? "", n = e2?.ellipsisWidth ?? (r ? X(r, ft, s).width : 0), u = s.ansiWidth ?? 0, a = s.controlWidth ?? 0, l = s.tabWidth ?? 8, E = s.ambiguousWidth ?? 1, g = s.emojiWidth ?? 2, m = s.fullWidthWidth ?? 2, A = s.regularWidth ?? 1, V2 = s.wideWidth ?? 2;
  let h = 0, o = 0, p = t.length, v = 0, F = false, d2 = p, b = Math.max(0, i - n), C2 = 0, w = 0, c = 0, f = 0;
  t: for (; ; ) {
    if (w > C2 || o >= p && o > h) {
      const ut2 = t.slice(C2, w) || t.slice(h, o);
      v = 0;
      for (const Y of ut2.replaceAll(ct, "")) {
        const $ = Y.codePointAt(0) || 0;
        if (lt($) ? f = m : ht($) ? f = V2 : E !== A && at($) ? f = E : f = A, c + f > b && (d2 = Math.min(d2, Math.max(C2, h) + v)), c + f > i) {
          F = true;
          break t;
        }
        v += Y.length, c += f;
      }
      C2 = w = 0;
    }
    if (o >= p) break;
    if (M.lastIndex = o, M.test(t)) {
      if (v = M.lastIndex - o, f = v * A, c + f > b && (d2 = Math.min(d2, o + Math.floor((b - c) / A))), c + f > i) {
        F = true;
        break;
      }
      c += f, C2 = h, w = o, o = h = M.lastIndex;
      continue;
    }
    if (O.lastIndex = o, O.test(t)) {
      if (c + u > b && (d2 = Math.min(d2, o)), c + u > i) {
        F = true;
        break;
      }
      c += u, C2 = h, w = o, o = h = O.lastIndex;
      continue;
    }
    if (y.lastIndex = o, y.test(t)) {
      if (v = y.lastIndex - o, f = v * a, c + f > b && (d2 = Math.min(d2, o + Math.floor((b - c) / a))), c + f > i) {
        F = true;
        break;
      }
      c += f, C2 = h, w = o, o = h = y.lastIndex;
      continue;
    }
    if (L.lastIndex = o, L.test(t)) {
      if (v = L.lastIndex - o, f = v * l, c + f > b && (d2 = Math.min(d2, o + Math.floor((b - c) / l))), c + f > i) {
        F = true;
        break;
      }
      c += f, C2 = h, w = o, o = h = L.lastIndex;
      continue;
    }
    if (P.lastIndex = o, P.test(t)) {
      if (c + g > b && (d2 = Math.min(d2, o)), c + g > i) {
        F = true;
        break;
      }
      c += g, C2 = h, w = o, o = h = P.lastIndex;
      continue;
    }
    o += 1;
  }
  return { width: F ? b : c, index: F ? d2 : p, truncated: F, ellipsed: F && i >= n };
};
var pt = { limit: 1 / 0, ellipsis: "", ellipsisWidth: 0 };
var S = (t, e2 = {}) => X(t, pt, e2).width;
var W = "\x1B";
var Z = "\x9B";
var Ft = 39;
var j = "\x07";
var Q = "[";
var dt = "]";
var tt = "m";
var U = `${dt}8;;`;
var et = new RegExp(`(?:\\${Q}(?<code>\\d+)m|\\${U}(?<uri>.*)${j})`, "y");
var mt = (t) => {
  if (t >= 30 && t <= 37 || t >= 90 && t <= 97) return 39;
  if (t >= 40 && t <= 47 || t >= 100 && t <= 107) return 49;
  if (t === 1 || t === 2) return 22;
  if (t === 3) return 23;
  if (t === 4) return 24;
  if (t === 7) return 27;
  if (t === 8) return 28;
  if (t === 9) return 29;
  if (t === 0) return 0;
};
var st = (t) => `${W}${Q}${t}${tt}`;
var it = (t) => `${W}${U}${t}${j}`;
var gt = (t) => t.map((e2) => S(e2));
var G = (t, e2, s) => {
  const i = e2[Symbol.iterator]();
  let r = false, n = false, u = t.at(-1), a = u === void 0 ? 0 : S(u), l = i.next(), E = i.next(), g = 0;
  for (; !l.done; ) {
    const m = l.value, A = S(m);
    a + A <= s ? t[t.length - 1] += m : (t.push(m), a = 0), (m === W || m === Z) && (r = true, n = e2.startsWith(U, g + 1)), r ? n ? m === j && (r = false, n = false) : m === tt && (r = false) : (a += A, a === s && !E.done && (t.push(""), a = 0)), l = E, E = i.next(), g += m.length;
  }
  u = t.at(-1), !a && u !== void 0 && u.length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
};
var vt = (t) => {
  const e2 = t.split(" ");
  let s = e2.length;
  for (; s > 0 && !(S(e2[s - 1]) > 0); ) s--;
  return s === e2.length ? t : e2.slice(0, s).join(" ") + e2.slice(s).join("");
};
var Et = (t, e2, s = {}) => {
  if (s.trim !== false && t.trim() === "") return "";
  let i = "", r, n;
  const u = t.split(" "), a = gt(u);
  let l = [""];
  for (const [h, o] of u.entries()) {
    s.trim !== false && (l[l.length - 1] = (l.at(-1) ?? "").trimStart());
    let p = S(l.at(-1) ?? "");
    if (h !== 0 && (p >= e2 && (s.wordWrap === false || s.trim === false) && (l.push(""), p = 0), (p > 0 || s.trim === false) && (l[l.length - 1] += " ", p++)), s.hard && a[h] > e2) {
      const v = e2 - p, F = 1 + Math.floor((a[h] - v - 1) / e2);
      Math.floor((a[h] - 1) / e2) < F && l.push(""), G(l, o, e2);
      continue;
    }
    if (p + a[h] > e2 && p > 0 && a[h] > 0) {
      if (s.wordWrap === false && p < e2) {
        G(l, o, e2);
        continue;
      }
      l.push("");
    }
    if (p + a[h] > e2 && s.wordWrap === false) {
      G(l, o, e2);
      continue;
    }
    l[l.length - 1] += o;
  }
  s.trim !== false && (l = l.map((h) => vt(h)));
  const E = l.join(`
`), g = E[Symbol.iterator]();
  let m = g.next(), A = g.next(), V2 = 0;
  for (; !m.done; ) {
    const h = m.value, o = A.value;
    if (i += h, h === W || h === Z) {
      et.lastIndex = V2 + 1;
      const F = et.exec(E)?.groups;
      if (F?.code !== void 0) {
        const d2 = Number.parseFloat(F.code);
        r = d2 === Ft ? void 0 : d2;
      } else F?.uri !== void 0 && (n = F.uri.length === 0 ? void 0 : F.uri);
    }
    const p = r ? mt(r) : void 0;
    o === `
` ? (n && (i += it("")), r && p && (i += st(p))) : h === `
` && (r && p && (i += st(r)), n && (i += it(n))), V2 += h.length, m = A, A = g.next();
  }
  return i;
};
function K(t, e2, s) {
  return String(t).normalize().replaceAll(`\r
`, `
`).split(`
`).map((i) => Et(i, e2, s)).join(`
`);
}
var At = ["up", "down", "left", "right", "space", "enter", "cancel"];
var _ = { actions: new Set(At), aliases: /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["", "cancel"], ["escape", "cancel"]]), withGuide: true };
function H(t, e2) {
  if (typeof t == "string") return _.aliases.get(t) === e2;
  for (const s of t) if (s !== void 0 && H(s, e2)) return true;
  return false;
}
function _t(t, e2) {
  if (t === e2) return;
  const s = t.split(`
`), i = e2.split(`
`), r = Math.max(s.length, i.length), n = [];
  for (let u = 0; u < r; u++) s[u] !== i[u] && n.push(u);
  return { lines: n, numLinesBefore: s.length, numLinesAfter: i.length, numLines: r };
}
globalThis.process.platform.startsWith("win");
var z = /* @__PURE__ */ Symbol("clack:cancel");
function Ct(t) {
  return t === z;
}
function T(t, e2) {
  const s = t;
  s.isTTY && s.setRawMode(e2);
}
var rt = (t) => "columns" in t && typeof t.columns == "number" ? t.columns : 80;
var nt = (t) => "rows" in t && typeof t.rows == "number" ? t.rows : 20;
function xt(t, e2, s, i = s) {
  const r = rt(t ?? stdout);
  return K(e2, r - s.length, { hard: true, trim: false }).split(`
`).map((n, u) => `${u === 0 ? i : s}${n}`).join(`
`);
}
var x = class {
  input;
  output;
  _abortSignal;
  rl;
  opts;
  _render;
  _track = false;
  _prevFrame = "";
  _subscribers = /* @__PURE__ */ new Map();
  _cursor = 0;
  state = "initial";
  error = "";
  value;
  userInput = "";
  constructor(e2, s = true) {
    const { input: i = stdin, output: r = stdout, render: n, signal: u, ...a } = e2;
    this.opts = a, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = n.bind(this), this._track = s, this._abortSignal = u, this.input = i, this.output = r;
  }
  unsubscribe() {
    this._subscribers.clear();
  }
  setSubscriber(e2, s) {
    const i = this._subscribers.get(e2) ?? [];
    i.push(s), this._subscribers.set(e2, i);
  }
  on(e2, s) {
    this.setSubscriber(e2, { cb: s });
  }
  once(e2, s) {
    this.setSubscriber(e2, { cb: s, once: true });
  }
  emit(e2, ...s) {
    const i = this._subscribers.get(e2) ?? [], r = [];
    for (const n of i) n.cb(...s), n.once && r.push(() => i.splice(i.indexOf(n), 1));
    for (const n of r) n();
  }
  prompt() {
    return new Promise((e2) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted) return this.state = "cancel", this.close(), e2(z);
        this._abortSignal.addEventListener("abort", () => {
          this.state = "cancel", this.close();
        }, { once: true });
      }
      this.rl = ot.createInterface({ input: this.input, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), this.rl.prompt(), this.opts.initialUserInput !== void 0 && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), T(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), T(this.input, false), e2(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), T(this.input, false), e2(z);
      });
    });
  }
  _isActionKey(e2, s) {
    return e2 === "	";
  }
  _setValue(e2) {
    this.value = e2, this.emit("value", this.value);
  }
  _setUserInput(e2, s) {
    this.userInput = e2 ?? "", this.emit("userInput", this.userInput), s && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
  }
  _clearUserInput() {
    this.rl?.write(null, { ctrl: true, name: "u" }), this._setUserInput("");
  }
  onKeypress(e2, s) {
    if (this._track && s.name !== "return" && (s.name && this._isActionKey(e2, s) && this.rl?.write(null, { ctrl: true, name: "h" }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), this.state === "error" && (this.state = "active"), s?.name && (!this._track && _.aliases.has(s.name) && this.emit("cursor", _.aliases.get(s.name)), _.actions.has(s.name) && this.emit("cursor", s.name)), e2 && (e2.toLowerCase() === "y" || e2.toLowerCase() === "n") && this.emit("confirm", e2.toLowerCase() === "y"), this.emit("key", e2?.toLowerCase(), s), s?.name === "return") {
      if (this.opts.validate) {
        const i = this.opts.validate(this.value);
        i && (this.error = i instanceof Error ? i.message : i, this.state = "error", this.rl?.write(this.userInput));
      }
      this.state !== "error" && (this.state = "submit");
    }
    H([e2, s?.name, s?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), T(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const e2 = K(this._prevFrame, process.stdout.columns, { hard: true, trim: false }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, e2 * -1));
  }
  render() {
    const e2 = K(this._render(this) ?? "", process.stdout.columns, { hard: true, trim: false });
    if (e2 !== this._prevFrame) {
      if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
      else {
        const s = _t(this._prevFrame, e2), i = nt(this.output);
        if (this.restoreCursor(), s) {
          const r = Math.max(0, s.numLinesAfter - i), n = Math.max(0, s.numLinesBefore - i);
          let u = s.lines.find((a) => a >= r);
          if (u === void 0) {
            this._prevFrame = e2;
            return;
          }
          if (s.lines.length === 1) {
            this.output.write(import_sisteransi.cursor.move(0, u - n)), this.output.write(import_sisteransi.erase.lines(1));
            const a = e2.split(`
`);
            this.output.write(a[u]), this._prevFrame = e2, this.output.write(import_sisteransi.cursor.move(0, a.length - u - 1));
            return;
          } else if (s.lines.length > 1) {
            if (r < n) u = r;
            else {
              const l = u - n;
              l > 0 && this.output.write(import_sisteransi.cursor.move(0, l));
            }
            this.output.write(import_sisteransi.erase.down());
            const a = e2.split(`
`).slice(u);
            this.output.write(a.join(`
`)), this._prevFrame = e2;
            return;
          }
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(e2), this.state === "initial" && (this.state = "active"), this._prevFrame = e2;
    }
  }
};
var kt = class extends x {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(e2) {
    super(e2, false), this.value = !!e2.initialValue, this.on("userInput", () => {
      this.value = this._value;
    }), this.on("confirm", (s) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = s, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var Wt = class extends x {
  options;
  cursor = 0;
  get _selectedValue() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._selectedValue.value;
  }
  constructor(e2) {
    super(e2, false), this.options = e2.options;
    const s = this.options.findIndex(({ value: r }) => r === e2.initialValue), i = s === -1 ? 0 : s;
    this.cursor = this.options[i].disabled ? B(i, 1, this.options) : i, this.changeValue(), this.on("cursor", (r) => {
      switch (r) {
        case "left":
        case "up":
          this.cursor = B(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = B(this.cursor, 1, this.options);
          break;
      }
      this.changeValue();
    });
  }
};
var $t = class extends x {
  get userInputWithCursor() {
    if (this.state === "submit") return this.userInput;
    const e2 = this.userInput;
    if (this.cursor >= e2.length) return `${this.userInput}\u2588`;
    const s = e2.slice(0, this.cursor), [i, ...r] = e2.slice(this.cursor);
    return `${s}${import_picocolors.default.inverse(i)}${r.join("")}`;
  }
  get cursor() {
    return this._cursor;
  }
  constructor(e2) {
    super({ ...e2, initialUserInput: e2.initialUserInput ?? e2.initialValue }), this.on("userInput", (s) => {
      this._setValue(s);
    }), this.on("finalize", () => {
      this.value || (this.value = e2.defaultValue), this.value === void 0 && (this.value = "");
    });
  }
};

// ../../node_modules/.pnpm/@clack+prompts@1.0.1/node_modules/@clack/prompts/dist/index.mjs
var import_picocolors2 = __toESM(require_picocolors());
__toESM(require_src());
function me() {
  return N2.platform !== "win32" ? N2.env.TERM !== "linux" : !!N2.env.CI || !!N2.env.WT_SESSION || !!N2.env.TERMINUS_SUBLIME || N2.env.ConEmuTask === "{cmd::Cmder}" || N2.env.TERM_PROGRAM === "Terminus-Sublime" || N2.env.TERM_PROGRAM === "vscode" || N2.env.TERM === "xterm-256color" || N2.env.TERM === "alacritty" || N2.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var et2 = me();
var C = (t, r) => et2 ? t : r;
var Rt = C("\u25C6", "*");
var dt2 = C("\u25A0", "x");
var $t2 = C("\u25B2", "x");
var V = C("\u25C7", "o");
var ht2 = C("\u250C", "T");
var d = C("\u2502", "|");
var x2 = C("\u2514", "\u2014");
var Q2 = C("\u25CF", ">");
var H2 = C("\u25CB", " ");
var rt2 = C("\u2500", "-");
var mt2 = C("\u256E", "+");
var Wt2 = C("\u251C", "+");
var pt2 = C("\u256F", "+");
var W2 = (t) => {
  switch (t) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(Rt);
    case "cancel":
      return import_picocolors2.default.red(dt2);
    case "error":
      return import_picocolors2.default.yellow($t2);
    case "submit":
      return import_picocolors2.default.green(V);
  }
};
var vt2 = (t) => {
  switch (t) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(d);
    case "cancel":
      return import_picocolors2.default.red(d);
    case "error":
      return import_picocolors2.default.yellow(d);
    case "submit":
      return import_picocolors2.default.green(d);
  }
};
var pe = (t) => t === 161 || t === 164 || t === 167 || t === 168 || t === 170 || t === 173 || t === 174 || t >= 176 && t <= 180 || t >= 182 && t <= 186 || t >= 188 && t <= 191 || t === 198 || t === 208 || t === 215 || t === 216 || t >= 222 && t <= 225 || t === 230 || t >= 232 && t <= 234 || t === 236 || t === 237 || t === 240 || t === 242 || t === 243 || t >= 247 && t <= 250 || t === 252 || t === 254 || t === 257 || t === 273 || t === 275 || t === 283 || t === 294 || t === 295 || t === 299 || t >= 305 && t <= 307 || t === 312 || t >= 319 && t <= 322 || t === 324 || t >= 328 && t <= 331 || t === 333 || t === 338 || t === 339 || t === 358 || t === 359 || t === 363 || t === 462 || t === 464 || t === 466 || t === 468 || t === 470 || t === 472 || t === 474 || t === 476 || t === 593 || t === 609 || t === 708 || t === 711 || t >= 713 && t <= 715 || t === 717 || t === 720 || t >= 728 && t <= 731 || t === 733 || t === 735 || t >= 768 && t <= 879 || t >= 913 && t <= 929 || t >= 931 && t <= 937 || t >= 945 && t <= 961 || t >= 963 && t <= 969 || t === 1025 || t >= 1040 && t <= 1103 || t === 1105 || t === 8208 || t >= 8211 && t <= 8214 || t === 8216 || t === 8217 || t === 8220 || t === 8221 || t >= 8224 && t <= 8226 || t >= 8228 && t <= 8231 || t === 8240 || t === 8242 || t === 8243 || t === 8245 || t === 8251 || t === 8254 || t === 8308 || t === 8319 || t >= 8321 && t <= 8324 || t === 8364 || t === 8451 || t === 8453 || t === 8457 || t === 8467 || t === 8470 || t === 8481 || t === 8482 || t === 8486 || t === 8491 || t === 8531 || t === 8532 || t >= 8539 && t <= 8542 || t >= 8544 && t <= 8555 || t >= 8560 && t <= 8569 || t === 8585 || t >= 8592 && t <= 8601 || t === 8632 || t === 8633 || t === 8658 || t === 8660 || t === 8679 || t === 8704 || t === 8706 || t === 8707 || t === 8711 || t === 8712 || t === 8715 || t === 8719 || t === 8721 || t === 8725 || t === 8730 || t >= 8733 && t <= 8736 || t === 8739 || t === 8741 || t >= 8743 && t <= 8748 || t === 8750 || t >= 8756 && t <= 8759 || t === 8764 || t === 8765 || t === 8776 || t === 8780 || t === 8786 || t === 8800 || t === 8801 || t >= 8804 && t <= 8807 || t === 8810 || t === 8811 || t === 8814 || t === 8815 || t === 8834 || t === 8835 || t === 8838 || t === 8839 || t === 8853 || t === 8857 || t === 8869 || t === 8895 || t === 8978 || t >= 9312 && t <= 9449 || t >= 9451 && t <= 9547 || t >= 9552 && t <= 9587 || t >= 9600 && t <= 9615 || t >= 9618 && t <= 9621 || t === 9632 || t === 9633 || t >= 9635 && t <= 9641 || t === 9650 || t === 9651 || t === 9654 || t === 9655 || t === 9660 || t === 9661 || t === 9664 || t === 9665 || t >= 9670 && t <= 9672 || t === 9675 || t >= 9678 && t <= 9681 || t >= 9698 && t <= 9701 || t === 9711 || t === 9733 || t === 9734 || t === 9737 || t === 9742 || t === 9743 || t === 9756 || t === 9758 || t === 9792 || t === 9794 || t === 9824 || t === 9825 || t >= 9827 && t <= 9829 || t >= 9831 && t <= 9834 || t === 9836 || t === 9837 || t === 9839 || t === 9886 || t === 9887 || t === 9919 || t >= 9926 && t <= 9933 || t >= 9935 && t <= 9939 || t >= 9941 && t <= 9953 || t === 9955 || t === 9960 || t === 9961 || t >= 9963 && t <= 9969 || t === 9972 || t >= 9974 && t <= 9977 || t === 9979 || t === 9980 || t === 9982 || t === 9983 || t === 10045 || t >= 10102 && t <= 10111 || t >= 11094 && t <= 11097 || t >= 12872 && t <= 12879 || t >= 57344 && t <= 63743 || t >= 65024 && t <= 65039 || t === 65533 || t >= 127232 && t <= 127242 || t >= 127248 && t <= 127277 || t >= 127280 && t <= 127337 || t >= 127344 && t <= 127373 || t === 127375 || t === 127376 || t >= 127387 && t <= 127404 || t >= 917760 && t <= 917999 || t >= 983040 && t <= 1048573 || t >= 1048576 && t <= 1114109;
var ge = (t) => t === 12288 || t >= 65281 && t <= 65376 || t >= 65504 && t <= 65510;
var fe = (t) => t >= 4352 && t <= 4447 || t === 8986 || t === 8987 || t === 9001 || t === 9002 || t >= 9193 && t <= 9196 || t === 9200 || t === 9203 || t === 9725 || t === 9726 || t === 9748 || t === 9749 || t >= 9800 && t <= 9811 || t === 9855 || t === 9875 || t === 9889 || t === 9898 || t === 9899 || t === 9917 || t === 9918 || t === 9924 || t === 9925 || t === 9934 || t === 9940 || t === 9962 || t === 9970 || t === 9971 || t === 9973 || t === 9978 || t === 9981 || t === 9989 || t === 9994 || t === 9995 || t === 10024 || t === 10060 || t === 10062 || t >= 10067 && t <= 10069 || t === 10071 || t >= 10133 && t <= 10135 || t === 10160 || t === 10175 || t === 11035 || t === 11036 || t === 11088 || t === 11093 || t >= 11904 && t <= 11929 || t >= 11931 && t <= 12019 || t >= 12032 && t <= 12245 || t >= 12272 && t <= 12287 || t >= 12289 && t <= 12350 || t >= 12353 && t <= 12438 || t >= 12441 && t <= 12543 || t >= 12549 && t <= 12591 || t >= 12593 && t <= 12686 || t >= 12688 && t <= 12771 || t >= 12783 && t <= 12830 || t >= 12832 && t <= 12871 || t >= 12880 && t <= 19903 || t >= 19968 && t <= 42124 || t >= 42128 && t <= 42182 || t >= 43360 && t <= 43388 || t >= 44032 && t <= 55203 || t >= 63744 && t <= 64255 || t >= 65040 && t <= 65049 || t >= 65072 && t <= 65106 || t >= 65108 && t <= 65126 || t >= 65128 && t <= 65131 || t >= 94176 && t <= 94180 || t === 94192 || t === 94193 || t >= 94208 && t <= 100343 || t >= 100352 && t <= 101589 || t >= 101632 && t <= 101640 || t >= 110576 && t <= 110579 || t >= 110581 && t <= 110587 || t === 110589 || t === 110590 || t >= 110592 && t <= 110882 || t === 110898 || t >= 110928 && t <= 110930 || t === 110933 || t >= 110948 && t <= 110951 || t >= 110960 && t <= 111355 || t === 126980 || t === 127183 || t === 127374 || t >= 127377 && t <= 127386 || t >= 127488 && t <= 127490 || t >= 127504 && t <= 127547 || t >= 127552 && t <= 127560 || t === 127568 || t === 127569 || t >= 127584 && t <= 127589 || t >= 127744 && t <= 127776 || t >= 127789 && t <= 127797 || t >= 127799 && t <= 127868 || t >= 127870 && t <= 127891 || t >= 127904 && t <= 127946 || t >= 127951 && t <= 127955 || t >= 127968 && t <= 127984 || t === 127988 || t >= 127992 && t <= 128062 || t === 128064 || t >= 128066 && t <= 128252 || t >= 128255 && t <= 128317 || t >= 128331 && t <= 128334 || t >= 128336 && t <= 128359 || t === 128378 || t === 128405 || t === 128406 || t === 128420 || t >= 128507 && t <= 128591 || t >= 128640 && t <= 128709 || t === 128716 || t >= 128720 && t <= 128722 || t >= 128725 && t <= 128727 || t >= 128732 && t <= 128735 || t === 128747 || t === 128748 || t >= 128756 && t <= 128764 || t >= 128992 && t <= 129003 || t === 129008 || t >= 129292 && t <= 129338 || t >= 129340 && t <= 129349 || t >= 129351 && t <= 129535 || t >= 129648 && t <= 129660 || t >= 129664 && t <= 129672 || t >= 129680 && t <= 129725 || t >= 129727 && t <= 129733 || t >= 129742 && t <= 129755 || t >= 129760 && t <= 129768 || t >= 129776 && t <= 129784 || t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141;
var At2 = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
var it2 = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var nt2 = /\t{1,1000}/y;
var wt = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var at2 = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var Fe = /\p{M}+/gu;
var ye = { limit: 1 / 0, ellipsis: "" };
var jt = (t, r = {}, s = {}) => {
  const i = r.limit ?? 1 / 0, a = r.ellipsis ?? "", o = r?.ellipsisWidth ?? (a ? jt(a, ye, s).width : 0), u = s.ansiWidth ?? 0, l = s.controlWidth ?? 0, n = s.tabWidth ?? 8, c = s.ambiguousWidth ?? 1, g = s.emojiWidth ?? 2, F = s.fullWidthWidth ?? 2, p = s.regularWidth ?? 1, E = s.wideWidth ?? 2;
  let $ = 0, m = 0, h = t.length, y2 = 0, f = false, v = h, S2 = Math.max(0, i - o), I2 = 0, B2 = 0, A = 0, w = 0;
  t: for (; ; ) {
    if (B2 > I2 || m >= h && m > $) {
      const _2 = t.slice(I2, B2) || t.slice($, m);
      y2 = 0;
      for (const D2 of _2.replaceAll(Fe, "")) {
        const T2 = D2.codePointAt(0) || 0;
        if (ge(T2) ? w = F : fe(T2) ? w = E : c !== p && pe(T2) ? w = c : w = p, A + w > S2 && (v = Math.min(v, Math.max(I2, $) + y2)), A + w > i) {
          f = true;
          break t;
        }
        y2 += D2.length, A += w;
      }
      I2 = B2 = 0;
    }
    if (m >= h) break;
    if (at2.lastIndex = m, at2.test(t)) {
      if (y2 = at2.lastIndex - m, w = y2 * p, A + w > S2 && (v = Math.min(v, m + Math.floor((S2 - A) / p))), A + w > i) {
        f = true;
        break;
      }
      A += w, I2 = $, B2 = m, m = $ = at2.lastIndex;
      continue;
    }
    if (At2.lastIndex = m, At2.test(t)) {
      if (A + u > S2 && (v = Math.min(v, m)), A + u > i) {
        f = true;
        break;
      }
      A += u, I2 = $, B2 = m, m = $ = At2.lastIndex;
      continue;
    }
    if (it2.lastIndex = m, it2.test(t)) {
      if (y2 = it2.lastIndex - m, w = y2 * l, A + w > S2 && (v = Math.min(v, m + Math.floor((S2 - A) / l))), A + w > i) {
        f = true;
        break;
      }
      A += w, I2 = $, B2 = m, m = $ = it2.lastIndex;
      continue;
    }
    if (nt2.lastIndex = m, nt2.test(t)) {
      if (y2 = nt2.lastIndex - m, w = y2 * n, A + w > S2 && (v = Math.min(v, m + Math.floor((S2 - A) / n))), A + w > i) {
        f = true;
        break;
      }
      A += w, I2 = $, B2 = m, m = $ = nt2.lastIndex;
      continue;
    }
    if (wt.lastIndex = m, wt.test(t)) {
      if (A + g > S2 && (v = Math.min(v, m)), A + g > i) {
        f = true;
        break;
      }
      A += g, I2 = $, B2 = m, m = $ = wt.lastIndex;
      continue;
    }
    m += 1;
  }
  return { width: f ? S2 : A, index: f ? v : h, truncated: f, ellipsed: f && i >= o };
};
var Ee = { limit: 1 / 0, ellipsis: "", ellipsisWidth: 0 };
var M2 = (t, r = {}) => jt(t, Ee, r).width;
var ot2 = "\x1B";
var Gt = "\x9B";
var ve = 39;
var Ct2 = "\x07";
var kt2 = "[";
var Ae = "]";
var Vt2 = "m";
var St = `${Ae}8;;`;
var Ht = new RegExp(`(?:\\${kt2}(?<code>\\d+)m|\\${St}(?<uri>.*)${Ct2})`, "y");
var we = (t) => {
  if (t >= 30 && t <= 37 || t >= 90 && t <= 97) return 39;
  if (t >= 40 && t <= 47 || t >= 100 && t <= 107) return 49;
  if (t === 1 || t === 2) return 22;
  if (t === 3) return 23;
  if (t === 4) return 24;
  if (t === 7) return 27;
  if (t === 8) return 28;
  if (t === 9) return 29;
  if (t === 0) return 0;
};
var Ut = (t) => `${ot2}${kt2}${t}${Vt2}`;
var Kt = (t) => `${ot2}${St}${t}${Ct2}`;
var Ce = (t) => t.map((r) => M2(r));
var It2 = (t, r, s) => {
  const i = r[Symbol.iterator]();
  let a = false, o = false, u = t.at(-1), l = u === void 0 ? 0 : M2(u), n = i.next(), c = i.next(), g = 0;
  for (; !n.done; ) {
    const F = n.value, p = M2(F);
    l + p <= s ? t[t.length - 1] += F : (t.push(F), l = 0), (F === ot2 || F === Gt) && (a = true, o = r.startsWith(St, g + 1)), a ? o ? F === Ct2 && (a = false, o = false) : F === Vt2 && (a = false) : (l += p, l === s && !c.done && (t.push(""), l = 0)), n = c, c = i.next(), g += F.length;
  }
  u = t.at(-1), !l && u !== void 0 && u.length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
};
var Se = (t) => {
  const r = t.split(" ");
  let s = r.length;
  for (; s > 0 && !(M2(r[s - 1]) > 0); ) s--;
  return s === r.length ? t : r.slice(0, s).join(" ") + r.slice(s).join("");
};
var Ie = (t, r, s = {}) => {
  if (s.trim !== false && t.trim() === "") return "";
  let i = "", a, o;
  const u = t.split(" "), l = Ce(u);
  let n = [""];
  for (const [$, m] of u.entries()) {
    s.trim !== false && (n[n.length - 1] = (n.at(-1) ?? "").trimStart());
    let h = M2(n.at(-1) ?? "");
    if ($ !== 0 && (h >= r && (s.wordWrap === false || s.trim === false) && (n.push(""), h = 0), (h > 0 || s.trim === false) && (n[n.length - 1] += " ", h++)), s.hard && l[$] > r) {
      const y2 = r - h, f = 1 + Math.floor((l[$] - y2 - 1) / r);
      Math.floor((l[$] - 1) / r) < f && n.push(""), It2(n, m, r);
      continue;
    }
    if (h + l[$] > r && h > 0 && l[$] > 0) {
      if (s.wordWrap === false && h < r) {
        It2(n, m, r);
        continue;
      }
      n.push("");
    }
    if (h + l[$] > r && s.wordWrap === false) {
      It2(n, m, r);
      continue;
    }
    n[n.length - 1] += m;
  }
  s.trim !== false && (n = n.map(($) => Se($)));
  const c = n.join(`
`), g = c[Symbol.iterator]();
  let F = g.next(), p = g.next(), E = 0;
  for (; !F.done; ) {
    const $ = F.value, m = p.value;
    if (i += $, $ === ot2 || $ === Gt) {
      Ht.lastIndex = E + 1;
      const f = Ht.exec(c)?.groups;
      if (f?.code !== void 0) {
        const v = Number.parseFloat(f.code);
        a = v === ve ? void 0 : v;
      } else f?.uri !== void 0 && (o = f.uri.length === 0 ? void 0 : f.uri);
    }
    const h = a ? we(a) : void 0;
    m === `
` ? (o && (i += Kt("")), a && h && (i += Ut(h))) : $ === `
` && (a && h && (i += Ut(a)), o && (i += Kt(o))), E += $.length, F = p, p = g.next();
  }
  return i;
};
function J2(t, r, s) {
  return String(t).normalize().replaceAll(`\r
`, `
`).split(`
`).map((i) => Ie(i, r, s)).join(`
`);
}
var be = (t, r, s, i, a) => {
  let o = r, u = 0;
  for (let l = s; l < i; l++) {
    const n = t[l];
    if (o = o - n.length, u++, o <= a) break;
  }
  return { lineCount: o, removals: u };
};
var X2 = (t) => {
  const { cursor: r, options: s, style: i } = t, a = t.output ?? process.stdout, o = rt(a), u = t.columnPadding ?? 0, l = t.rowPadding ?? 4, n = o - u, c = nt(a), g = import_picocolors2.default.dim("..."), F = t.maxItems ?? Number.POSITIVE_INFINITY, p = Math.max(c - l, 0), E = Math.max(Math.min(F, p), 5);
  let $ = 0;
  r >= E - 3 && ($ = Math.max(Math.min(r - E + 3, s.length - E), 0));
  let m = E < s.length && $ > 0, h = E < s.length && $ + E < s.length;
  const y2 = Math.min($ + E, s.length), f = [];
  let v = 0;
  m && v++, h && v++;
  const S2 = $ + (m ? 1 : 0), I2 = y2 - (h ? 1 : 0);
  for (let A = S2; A < I2; A++) {
    const w = J2(i(s[A], A === r), n, { hard: true, trim: false }).split(`
`);
    f.push(w), v += w.length;
  }
  if (v > p) {
    let A = 0, w = 0, _2 = v;
    const D2 = r - S2, T2 = (Y, L2) => be(f, _2, Y, L2, p);
    m ? ({ lineCount: _2, removals: A } = T2(0, D2), _2 > p && ({ lineCount: _2, removals: w } = T2(D2 + 1, f.length))) : ({ lineCount: _2, removals: w } = T2(D2 + 1, f.length), _2 > p && ({ lineCount: _2, removals: A } = T2(0, D2))), A > 0 && (m = true, f.splice(0, A)), w > 0 && (h = true, f.splice(f.length - w, w));
  }
  const B2 = [];
  m && B2.push(g);
  for (const A of f) for (const w of A) B2.push(w);
  return h && B2.push(g), B2;
};
var Re = (t) => {
  const r = t.active ?? "Yes", s = t.inactive ?? "No";
  return new kt({ active: r, inactive: s, signal: t.signal, input: t.input, output: t.output, initialValue: t.initialValue ?? true, render() {
    const i = t.withGuide ?? _.withGuide, a = `${i ? `${import_picocolors2.default.gray(d)}
` : ""}${W2(this.state)}  ${t.message}
`, o = this.value ? r : s;
    switch (this.state) {
      case "submit": {
        const u = i ? `${import_picocolors2.default.gray(d)}  ` : "";
        return `${a}${u}${import_picocolors2.default.dim(o)}`;
      }
      case "cancel": {
        const u = i ? `${import_picocolors2.default.gray(d)}  ` : "";
        return `${a}${u}${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(o))}${i ? `
${import_picocolors2.default.gray(d)}` : ""}`;
      }
      default: {
        const u = i ? `${import_picocolors2.default.cyan(d)}  ` : "", l = i ? import_picocolors2.default.cyan(x2) : "";
        return `${a}${u}${this.value ? `${import_picocolors2.default.green(Q2)} ${r}` : `${import_picocolors2.default.dim(H2)} ${import_picocolors2.default.dim(r)}`}${t.vertical ? i ? `
${import_picocolors2.default.cyan(d)}  ` : `
` : ` ${import_picocolors2.default.dim("/")} `}${this.value ? `${import_picocolors2.default.dim(H2)} ${import_picocolors2.default.dim(s)}` : `${import_picocolors2.default.green(Q2)} ${s}`}
${l}
`;
      }
    }
  } }).prompt();
};
var Ne = (t = "", r) => {
  (process.stdout).write(`${import_picocolors2.default.gray(x2)}  ${import_picocolors2.default.red(t)}

`);
};
var We = (t = "", r) => {
  (process.stdout).write(`${import_picocolors2.default.gray(ht2)}  ${t}
`);
};
var Le = (t = "", r) => {
  (process.stdout).write(`${import_picocolors2.default.gray(d)}
${import_picocolors2.default.gray(x2)}  ${t}

`);
};
var Ge = (t) => import_picocolors2.default.dim(t);
var ke = (t, r, s) => {
  const i = { hard: true, trim: false }, a = J2(t, r, i).split(`
`), o = a.reduce((n, c) => Math.max(M2(c), n), 0), u = a.map(s).reduce((n, c) => Math.max(M2(c), n), 0), l = r - (u - o);
  return J2(t, l, i);
};
var Ve = (t = "", r = "", s) => {
  const i = N2.stdout, o = Ge, u = ["", ...ke(t, rt(i) - 6, o).split(`
`).map(o), ""], l = M2(r), n = Math.max(u.reduce((p, E) => {
    const $ = M2(E);
    return $ > p ? $ : p;
  }, 0), l) + 2, c = u.map((p) => `${import_picocolors2.default.gray(d)}  ${p}${" ".repeat(n - M2(p))}${import_picocolors2.default.gray(d)}`).join(`
`), g = `${import_picocolors2.default.gray(d)}
` , F = Wt2 ;
  i.write(`${g}${import_picocolors2.default.green(V)}  ${import_picocolors2.default.reset(r)} ${import_picocolors2.default.gray(rt2.repeat(Math.max(n - l - 1, 1)) + mt2)}
${c}
${import_picocolors2.default.gray(F + rt2.repeat(n + 2) + pt2)}
`);
};
import_picocolors2.default.magenta;
var lt2 = (t, r) => t.includes(`
`) ? t.split(`
`).map((s) => r(s)).join(`
`) : r(t);
var Je = (t) => {
  const r = (s, i) => {
    const a = s.label ?? String(s.value);
    switch (i) {
      case "disabled":
        return `${import_picocolors2.default.gray(H2)} ${lt2(a, import_picocolors2.default.gray)}${s.hint ? ` ${import_picocolors2.default.dim(`(${s.hint ?? "disabled"})`)}` : ""}`;
      case "selected":
        return `${lt2(a, import_picocolors2.default.dim)}`;
      case "active":
        return `${import_picocolors2.default.green(Q2)} ${a}${s.hint ? ` ${import_picocolors2.default.dim(`(${s.hint})`)}` : ""}`;
      case "cancelled":
        return `${lt2(a, (o) => import_picocolors2.default.strikethrough(import_picocolors2.default.dim(o)))}`;
      default:
        return `${import_picocolors2.default.dim(H2)} ${lt2(a, import_picocolors2.default.dim)}`;
    }
  };
  return new Wt({ options: t.options, signal: t.signal, input: t.input, output: t.output, initialValue: t.initialValue, render() {
    const s = t.withGuide ?? _.withGuide, i = `${W2(this.state)}  `, a = `${vt2(this.state)}  `, o = xt(t.output, t.message, a, i), u = `${s ? `${import_picocolors2.default.gray(d)}
` : ""}${o}
`;
    switch (this.state) {
      case "submit": {
        const l = s ? `${import_picocolors2.default.gray(d)}  ` : "", n = xt(t.output, r(this.options[this.cursor], "selected"), l);
        return `${u}${n}`;
      }
      case "cancel": {
        const l = s ? `${import_picocolors2.default.gray(d)}  ` : "", n = xt(t.output, r(this.options[this.cursor], "cancelled"), l);
        return `${u}${n}${s ? `
${import_picocolors2.default.gray(d)}` : ""}`;
      }
      default: {
        const l = s ? `${import_picocolors2.default.cyan(d)}  ` : "", n = s ? import_picocolors2.default.cyan(x2) : "", c = u.split(`
`).length, g = s ? 2 : 1;
        return `${u}${l}${X2({ output: t.output, cursor: this.cursor, options: this.options, maxItems: t.maxItems, columnPadding: l.length, rowPadding: c + g, style: (F, p) => r(F, F.disabled ? "disabled" : p ? "active" : "inactive") }).join(`
${l}`)}
${n}
`;
      }
    }
  } }).prompt();
};
`${import_picocolors2.default.gray(d)}  `;
var Ze = (t) => new $t({ validate: t.validate, placeholder: t.placeholder, defaultValue: t.defaultValue, initialValue: t.initialValue, output: t.output, signal: t.signal, input: t.input, render() {
  const r = t?.withGuide ?? _.withGuide, s = `${`${r ? `${import_picocolors2.default.gray(d)}
` : ""}${W2(this.state)}  `}${t.message}
`, i = t.placeholder ? import_picocolors2.default.inverse(t.placeholder[0]) + import_picocolors2.default.dim(t.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), a = this.userInput ? this.userInputWithCursor : i, o = this.value ?? "";
  switch (this.state) {
    case "error": {
      const u = this.error ? `  ${import_picocolors2.default.yellow(this.error)}` : "", l = r ? `${import_picocolors2.default.yellow(d)}  ` : "", n = r ? import_picocolors2.default.yellow(x2) : "";
      return `${s.trim()}
${l}${a}
${n}${u}
`;
    }
    case "submit": {
      const u = o ? `  ${import_picocolors2.default.dim(o)}` : "", l = r ? import_picocolors2.default.gray(d) : "";
      return `${s}${l}${u}`;
    }
    case "cancel": {
      const u = o ? `  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(o))}` : "", l = r ? import_picocolors2.default.gray(d) : "";
      return `${s}${l}${u}${o.trim() ? `
${l}` : ""}`;
    }
    default: {
      const u = r ? `${import_picocolors2.default.cyan(d)}  ` : "", l = r ? import_picocolors2.default.cyan(x2) : "";
      return `${s}${u}${a}
${l}
`;
    }
  }
} }).prompt();
var PROJECT_REPO = "https://github.com/BytePioneer-AI/openclaw-china";
var GUIDES_BASE = "https://github.com/BytePioneer-AI/openclaw-china/tree/main/doc/guides";
var OPENCLAW_HOME = join(homedir(), ".openclaw");
var DEFAULT_PLUGIN_PATH = join(OPENCLAW_HOME, "extensions");
var LEGACY_PLUGIN_PATH = join(OPENCLAW_HOME, "plugins");
var CONFIG_FILE_PATH = join(OPENCLAW_HOME, "openclaw.json");
var ANSI_RESET = "\x1B[0m";
var ANSI_LINK = "\x1B[1;4;96m";
var ANSI_BORDER = "\x1B[92m";
var CHANNEL_ORDER = [
  "dingtalk",
  "qqbot",
  "wecom",
  "wecom-app",
  "feishu-china"
];
var CHANNEL_DISPLAY_LABELS = {
  dingtalk: "DingTalk\uFF08\u9489\u9489\uFF09",
  "feishu-china": "Feishu\uFF08\u98DE\u4E66\uFF09",
  wecom: "WeCom\uFF08\u4F01\u4E1A\u5FAE\u4FE1-\u667A\u80FD\u673A\u5668\u4EBA\uFF09",
  "wecom-app": "WeCom App\uFF08\u81EA\u5EFA\u5E94\u7528-\u53EF\u63A5\u5165\u5FAE\u4FE1\uFF09",
  qqbot: "QQBot\uFF08QQ \u673A\u5668\u4EBA\uFF09"
};
var CHANNEL_GUIDE_LINKS = {
  dingtalk: `${GUIDES_BASE}/dingtalk/configuration.md`,
  "feishu-china": "https://github.com/BytePioneer-AI/openclaw-china/blob/main/README.md",
  wecom: `${GUIDES_BASE}/wecom/configuration.md`,
  "wecom-app": `${GUIDES_BASE}/wecom-app/configuration.md`,
  qqbot: `${GUIDES_BASE}/qqbot/configuration.md`
};
var CHINA_CLI_STATE_KEY = /* @__PURE__ */ Symbol.for("@openclaw-china/china-cli-state");
var PromptCancelledError = class extends Error {
  constructor() {
    super("prompt-cancelled");
  }
};
function isChannelId(value) {
  return typeof value === "string" && CHANNEL_ORDER.includes(value);
}
function getChinaCliState() {
  const root = globalThis;
  const cached = root[CHINA_CLI_STATE_KEY];
  if (isRecord(cached)) {
    const channels = cached.channels;
    const cliRegistered = cached.cliRegistered;
    if (channels instanceof Set && typeof cliRegistered === "boolean") {
      return {
        channels,
        cliRegistered
      };
    }
  }
  const created = {
    channels: /* @__PURE__ */ new Set(),
    cliRegistered: false
  };
  root[CHINA_CLI_STATE_KEY] = created;
  return created;
}
function normalizeChannels(channels) {
  const selected = channels && channels.length > 0 ? channels : CHANNEL_ORDER;
  const unique = /* @__PURE__ */ new Set();
  for (const channelId of selected) {
    if (isChannelId(channelId)) {
      unique.add(channelId);
    }
  }
  return CHANNEL_ORDER.filter((channelId) => unique.has(channelId));
}
function getInstalledChannels(state) {
  return CHANNEL_ORDER.filter((channelId) => state.channels.has(channelId));
}
function guardCancel(value) {
  if (Ct(value)) {
    Ne("\u5DF2\u53D6\u6D88\u914D\u7F6E\u3002");
    throw new PromptCancelledError();
  }
  return value;
}
function warn(text) {
  stdout.write(`
[warn] ${text}
`);
}
function section(title) {
  stdout.write(`
${title}
`);
}
function resolvePluginPath() {
  if (existsSync(DEFAULT_PLUGIN_PATH)) {
    return DEFAULT_PLUGIN_PATH;
  }
  if (existsSync(LEGACY_PLUGIN_PATH)) {
    return LEGACY_PLUGIN_PATH;
  }
  return DEFAULT_PLUGIN_PATH;
}
function renderReadyMessage() {
  return [
    `${ANSI_BORDER}\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501${ANSI_RESET}`,
    "  OpenClaw China Channels \u5DF2\u5C31\u7EEA!",
    `${ANSI_BORDER}\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501${ANSI_RESET}`,
    "",
    "\u63D2\u4EF6\u8DEF\u5F84:",
    `  ${resolvePluginPath()}`,
    "",
    "\u914D\u7F6E\u6587\u4EF6:",
    `  ${CONFIG_FILE_PATH}`,
    "",
    "\u66F4\u65B0\u63D2\u4EF6:",
    "  openclaw plugins update <plugin-id>",
    "",
    "\u9879\u76EE\u4ED3\u5E93:",
    `  ${ANSI_LINK}${PROJECT_REPO}${ANSI_RESET}`,
    "",
    "\u2B50 \u5982\u679C\u8FD9\u4E2A\u9879\u76EE\u5BF9\u4F60\u6709\u5E2E\u52A9\uFF0C\u8BF7\u7ED9\u6211\u4EEC\u4E00\u4E2A Star\uFF01\u2B50",
    "",
    "\u4E0B\u4E00\u6B65:",
    "  openclaw gateway --port 18789 --verbose",
    ""
  ].join("\n");
}
function showReadyMessage() {
  stdout.write(`
${renderReadyMessage()}
`);
}
function showGuideLink(channelId) {
  const url = CHANNEL_GUIDE_LINKS[channelId];
  Ve(`\u914D\u7F6E\u6587\u6863\uFF1A${url}`, "Docs");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function resolveWriteConfig(runtime2) {
  if (!isRecord(runtime2)) {
    return void 0;
  }
  const config = runtime2.config;
  if (!isRecord(config)) {
    return void 0;
  }
  if (typeof config.writeConfigFile !== "function") {
    return void 0;
  }
  return config.writeConfigFile;
}
function isCommandLike(value) {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.command === "function" && typeof value.description === "function" && typeof value.action === "function";
}
function toTrimmedString(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const trimmed = value.trim();
  return trimmed || void 0;
}
function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function toBoolean(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function toNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function cloneConfig(cfg) {
  try {
    return structuredClone(cfg);
  } catch {
    return JSON.parse(JSON.stringify(cfg));
  }
}
function getChannelConfig(cfg, channelId) {
  const channels = isRecord(cfg.channels) ? cfg.channels : {};
  const existing = channels[channelId];
  return isRecord(existing) ? existing : {};
}
function getPreferredAccountConfig(channelCfg) {
  const accounts = channelCfg.accounts;
  if (!isRecord(accounts)) {
    return void 0;
  }
  const defaultAccountId = toTrimmedString(channelCfg.defaultAccount);
  if (defaultAccountId) {
    const preferred = accounts[defaultAccountId];
    if (isRecord(preferred)) {
      return preferred;
    }
  }
  for (const value of Object.values(accounts)) {
    if (isRecord(value)) {
      return value;
    }
  }
  return void 0;
}
function hasTokenPair(channelCfg) {
  if (hasNonEmptyString(channelCfg.token) && hasNonEmptyString(channelCfg.encodingAESKey)) {
    return true;
  }
  const accountCfg = getPreferredAccountConfig(channelCfg);
  return Boolean(
    accountCfg && hasNonEmptyString(accountCfg.token) && hasNonEmptyString(accountCfg.encodingAESKey)
  );
}
function isChannelConfigured(cfg, channelId) {
  const channelCfg = getChannelConfig(cfg, channelId);
  switch (channelId) {
    case "dingtalk":
      return hasNonEmptyString(channelCfg.clientId) && hasNonEmptyString(channelCfg.clientSecret);
    case "feishu-china":
      return hasNonEmptyString(channelCfg.appId) && hasNonEmptyString(channelCfg.appSecret);
    case "qqbot":
      return hasNonEmptyString(channelCfg.appId) && hasNonEmptyString(channelCfg.clientSecret);
    case "wecom":
    case "wecom-app":
      return hasTokenPair(channelCfg);
    default:
      return false;
  }
}
function withConfiguredSuffix(cfg, channelId) {
  const base = CHANNEL_DISPLAY_LABELS[channelId];
  return isChannelConfigured(cfg, channelId) ? `${base}\uFF08\u5DF2\u914D\u7F6E\uFF09` : base;
}
function mergeChannelConfig(cfg, channelId, patch) {
  const channels = isRecord(cfg.channels) ? { ...cfg.channels } : {};
  const existing = getChannelConfig(cfg, channelId);
  channels[channelId] = {
    ...existing,
    ...patch,
    enabled: true
  };
  return {
    ...cfg,
    channels
  };
}
var SetupPrompter = class {
  async askText(params) {
    const { label, required = false, defaultValue } = params;
    while (true) {
      const value = String(
        guardCancel(
          await Ze({
            message: label,
            initialValue: defaultValue
          })
        )
      ).trim();
      if (value) {
        return value;
      }
      if (defaultValue) {
        return defaultValue;
      }
      if (!required) {
        return "";
      }
      warn("\u8BE5\u5B57\u6BB5\u4E3A\u5FC5\u586B\u9879\u3002");
    }
  }
  async askSecret(params) {
    const { label, existingValue, required = true } = params;
    return this.askText({
      label,
      required,
      defaultValue: existingValue
    });
  }
  async askConfirm(label, defaultValue = true) {
    return Boolean(
      guardCancel(
        await Re({
          message: label,
          initialValue: defaultValue
        })
      )
    );
  }
  async askNumber(params) {
    const { label, min, defaultValue } = params;
    while (true) {
      const raw = String(
        guardCancel(
          await Ze({
            message: label,
            initialValue: defaultValue !== void 0 ? String(defaultValue) : void 0
          })
        )
      ).trim();
      const parsed = Number.parseInt(raw, 10);
      if (Number.isFinite(parsed) && (min === void 0 || parsed >= min)) {
        return parsed;
      }
      warn(`\u8BF7\u8F93\u5165\u6709\u6548\u6574\u6570${min !== void 0 ? `\uFF08>= ${min}\uFF09` : ""}\u3002`);
    }
  }
  async askSelect(message, options, defaultValue) {
    const initial = options.some((opt) => opt.value === defaultValue) ? defaultValue : options[0]?.value;
    const selectOptions = options.map((option) => ({
      value: option.value,
      label: option.label
    }));
    return guardCancel(
      await Je({
        message,
        options: selectOptions,
        initialValue: initial
      })
    );
  }
};
async function configureDingtalk(prompter, cfg) {
  section("\u914D\u7F6E DingTalk\uFF08\u9489\u9489\uFF09");
  showGuideLink("dingtalk");
  const existing = getChannelConfig(cfg, "dingtalk");
  const clientId = await prompter.askText({
    label: "DingTalk clientId\uFF08AppKey\uFF09",
    defaultValue: toTrimmedString(existing.clientId),
    required: true
  });
  const clientSecret = await prompter.askSecret({
    label: "DingTalk clientSecret\uFF08AppSecret\uFF09",
    existingValue: toTrimmedString(existing.clientSecret),
    required: true
  });
  const enableAICard = await prompter.askConfirm(
    "\u542F\u7528 AI Card \u6D41\u5F0F\u56DE\u590D\uFF08\u63A8\u8350\u5173\u95ED\uFF0C\u4F7F\u7528\u975E\u6D41\u5F0F\uFF09",
    toBoolean(existing.enableAICard, false)
  );
  return mergeChannelConfig(cfg, "dingtalk", {
    clientId,
    clientSecret,
    enableAICard
  });
}
async function configureFeishu(prompter, cfg) {
  section("\u914D\u7F6E Feishu\uFF08\u98DE\u4E66\uFF09");
  showGuideLink("feishu-china");
  const existing = getChannelConfig(cfg, "feishu-china");
  const appId = await prompter.askText({
    label: "Feishu appId",
    defaultValue: toTrimmedString(existing.appId),
    required: true
  });
  const appSecret = await prompter.askSecret({
    label: "Feishu appSecret",
    existingValue: toTrimmedString(existing.appSecret),
    required: true
  });
  const sendMarkdownAsCard = await prompter.askConfirm(
    "\u4EE5\u5361\u7247\u5F62\u5F0F\u53D1\u9001 Markdown",
    toBoolean(existing.sendMarkdownAsCard, true)
  );
  return mergeChannelConfig(cfg, "feishu-china", {
    appId,
    appSecret,
    sendMarkdownAsCard
  });
}
async function configureWecom(prompter, cfg) {
  section("\u914D\u7F6E WeCom\uFF08\u4F01\u4E1A\u5FAE\u4FE1-\u667A\u80FD\u673A\u5668\u4EBA\uFF09");
  showGuideLink("wecom");
  const existing = getChannelConfig(cfg, "wecom");
  const webhookPath = await prompter.askText({
    label: "Webhook \u8DEF\u5F84\uFF08\u9700\u4E0E\u4F01\u4E1A\u5FAE\u4FE1\u540E\u53F0\u914D\u7F6E\u4E00\u81F4\uFF0C\u9ED8\u8BA4 /wecom\uFF09",
    defaultValue: toTrimmedString(existing.webhookPath) ?? "/wecom",
    required: true
  });
  const token = await prompter.askSecret({
    label: "WeCom token",
    existingValue: toTrimmedString(existing.token),
    required: true
  });
  const encodingAESKey = await prompter.askSecret({
    label: "WeCom encodingAESKey",
    existingValue: toTrimmedString(existing.encodingAESKey),
    required: true
  });
  return mergeChannelConfig(cfg, "wecom", {
    webhookPath,
    token,
    encodingAESKey
  });
}
async function configureWecomApp(prompter, cfg) {
  section("\u914D\u7F6E WeCom App\uFF08\u81EA\u5EFA\u5E94\u7528-\u53EF\u63A5\u5165\u5FAE\u4FE1\uFF09");
  showGuideLink("wecom-app");
  const existing = getChannelConfig(cfg, "wecom-app");
  const existingAsr = isRecord(existing.asr) ? existing.asr : {};
  const webhookPath = await prompter.askText({
    label: "Webhook \u8DEF\u5F84\uFF08\u9700\u4E0E\u4F01\u4E1A\u5FAE\u4FE1\u540E\u53F0\u914D\u7F6E\u4E00\u81F4\uFF0C\u9ED8\u8BA4 /wecom-app\uFF09",
    defaultValue: toTrimmedString(existing.webhookPath) ?? "/wecom-app",
    required: true
  });
  const token = await prompter.askSecret({
    label: "WeCom App token",
    existingValue: toTrimmedString(existing.token),
    required: true
  });
  const encodingAESKey = await prompter.askSecret({
    label: "WeCom App encodingAESKey",
    existingValue: toTrimmedString(existing.encodingAESKey),
    required: true
  });
  const patch = {
    webhookPath,
    token,
    encodingAESKey
  };
  const corpId = await prompter.askText({
    label: "corpId",
    defaultValue: toTrimmedString(existing.corpId),
    required: true
  });
  const corpSecret = await prompter.askSecret({
    label: "corpSecret",
    existingValue: toTrimmedString(existing.corpSecret),
    required: true
  });
  const agentId = await prompter.askNumber({
    label: "agentId",
    min: 1,
    defaultValue: toNumber(existing.agentId)
  });
  patch.corpId = corpId;
  patch.corpSecret = corpSecret;
  patch.agentId = agentId;
  const asrEnabled = await prompter.askConfirm(
    "\u542F\u7528 ASR\uFF08\u652F\u6301\u5165\u7AD9\u8BED\u97F3\u81EA\u52A8\u8F6C\u6587\u5B57\uFF09",
    toBoolean(existingAsr.enabled, false)
  );
  const asr = {
    enabled: asrEnabled
  };
  if (asrEnabled) {
    Ve(
      [
        "ASR \u5F00\u901A\u65B9\u5F0F\u8BF7\u67E5\u770B\u914D\u7F6E\u6587\u6863\uFF1A\u6B65\u9AA4\u4E03\uFF08\u53EF\u9009\uFF09\uFF1A\u5F00\u542F\u8BED\u97F3\u8F6C\u6587\u672C\uFF08ASR\uFF09",
        "https://github.com/BytePioneer-AI/openclaw-china/blob/main/doc/guides/wecom-app/configuration.md"
      ].join("\n"),
      "\u63D0\u793A"
    );
    asr.appId = await prompter.askText({
      label: "ASR appId\uFF08\u817E\u8BAF\u4E91\uFF09",
      defaultValue: toTrimmedString(existingAsr.appId),
      required: true
    });
    asr.secretId = await prompter.askSecret({
      label: "ASR secretId\uFF08\u817E\u8BAF\u4E91\uFF09",
      existingValue: toTrimmedString(existingAsr.secretId),
      required: true
    });
    asr.secretKey = await prompter.askSecret({
      label: "ASR secretKey\uFF08\u817E\u8BAF\u4E91\uFF09",
      existingValue: toTrimmedString(existingAsr.secretKey),
      required: true
    });
  }
  patch.asr = asr;
  return mergeChannelConfig(cfg, "wecom-app", patch);
}
async function configureQQBot(prompter, cfg) {
  section("\u914D\u7F6E QQBot\uFF08QQ \u673A\u5668\u4EBA\uFF09");
  showGuideLink("qqbot");
  const existing = getChannelConfig(cfg, "qqbot");
  const existingAsr = isRecord(existing.asr) ? existing.asr : {};
  const appId = await prompter.askText({
    label: "QQBot appId",
    defaultValue: toTrimmedString(existing.appId),
    required: true
  });
  const clientSecret = await prompter.askSecret({
    label: "QQBot clientSecret",
    existingValue: toTrimmedString(existing.clientSecret),
    required: true
  });
  Ve(
    "QQ \u7684 Markdown \u4F53\u9A8C\u5F88\u597D\uFF0C\u4F46\u9700\u8981\u5148\u7533\u8BF7\u5F00\u901A\uFF0C\u8BE6\u60C5\u8BF7\u67E5\u770B\u914D\u7F6E\u6587\u6863\u3002",
    "\u63D0\u793A"
  );
  const markdownSupport = await prompter.askConfirm(
    "\u542F\u7528 Markdown \u652F\u6301",
    toBoolean(existing.markdownSupport, false)
  );
  const asrEnabled = await prompter.askConfirm(
    "\u542F\u7528 ASR\uFF08\u652F\u6301\u5165\u7AD9\u8BED\u97F3\u81EA\u52A8\u8F6C\u6587\u5B57\uFF09",
    toBoolean(existingAsr.enabled, false)
  );
  const asr = {
    enabled: asrEnabled
  };
  if (asrEnabled) {
    Ve("ASR \u5F00\u901A\u65B9\u5F0F\u8BE6\u60C5\u8BF7\u67E5\u770B\u914D\u7F6E\u6587\u6863\u3002", "\u63D0\u793A");
    asr.appId = await prompter.askText({
      label: "ASR appId\uFF08\u817E\u8BAF\u4E91\uFF09",
      defaultValue: toTrimmedString(existingAsr.appId),
      required: true
    });
    asr.secretId = await prompter.askSecret({
      label: "ASR secretId\uFF08\u817E\u8BAF\u4E91\uFF09",
      existingValue: toTrimmedString(existingAsr.secretId),
      required: true
    });
    asr.secretKey = await prompter.askSecret({
      label: "ASR secretKey\uFF08\u817E\u8BAF\u4E91\uFF09",
      existingValue: toTrimmedString(existingAsr.secretKey),
      required: true
    });
  }
  return mergeChannelConfig(cfg, "qqbot", {
    appId,
    clientSecret,
    markdownSupport,
    asr
  });
}
async function configureSingleChannel(channel, prompter, cfg) {
  switch (channel) {
    case "dingtalk":
      return configureDingtalk(prompter, cfg);
    case "feishu-china":
      return configureFeishu(prompter, cfg);
    case "wecom":
      return configureWecom(prompter, cfg);
    case "wecom-app":
      return configureWecomApp(prompter, cfg);
    case "qqbot":
      return configureQQBot(prompter, cfg);
    default:
      return cfg;
  }
}
async function runChinaSetup(params) {
  if (!stdin.isTTY || !stdout.isTTY) {
    params.logger.error?.("\u4EA4\u4E92\u5F0F\u914D\u7F6E\u9700\u8981\u5728 TTY \u7EC8\u7AEF\u4E2D\u8FD0\u884C\u3002");
    return;
  }
  const prompter = new SetupPrompter();
  const touched = /* @__PURE__ */ new Set();
  let next = cloneConfig(params.initialConfig);
  try {
    We("OpenClaw China \u914D\u7F6E\u5411\u5BFC");
    Ve(
      [
        "\u4F7F\u7528\u65B9\u5411\u952E\u9009\u62E9\uFF0C\u6309 Enter \u786E\u8BA4\u3002",
        `\u9879\u76EE\u4ED3\u5E93\uFF1A${ANSI_LINK}${PROJECT_REPO}${ANSI_RESET}`
      ].join("\n"),
      "\u6B22\u8FCE"
    );
    if (params.availableChannels.length === 0) {
      params.logger.error?.("\u672A\u68C0\u6D4B\u5230\u53EF\u914D\u7F6E\u7684 China \u6E20\u9053\u63D2\u4EF6\u3002");
      return;
    }
    const channelOptions = params.availableChannels.map((channelId, index) => ({
      key: index === 0 ? "recommended" : "",
      value: channelId,
      label: withConfiguredSuffix(next, channelId)
    }));
    const defaultChannel = channelOptions[0]?.value ?? "save";
    let continueLoop = true;
    while (continueLoop) {
      const selected = await prompter.askSelect(
        "\u8BF7\u9009\u62E9\u8981\u914D\u7F6E\u7684\u6E20\u9053",
        [
          ...channelOptions,
          { key: "", value: "save", label: "\u4FDD\u5B58\u5E76\u9000\u51FA" },
          { key: "", value: "cancel", label: "\u4E0D\u4FDD\u5B58\u5E76\u9000\u51FA" }
        ],
        defaultChannel
      );
      if (selected === "cancel") {
        Ne("\u5DF2\u53D6\u6D88\uFF0C\u672A\u5199\u5165\u4EFB\u4F55\u914D\u7F6E\u3002");
        return;
      }
      if (selected === "save") {
        break;
      }
      next = await configureSingleChannel(selected, prompter, next);
      touched.add(selected);
      Ve(`\u5DF2\u5B8C\u6210\uFF1A${CHANNEL_DISPLAY_LABELS[selected]}`, "\u5B8C\u6210");
      continueLoop = await prompter.askConfirm("\u7EE7\u7EED\u914D\u7F6E\u5176\u4ED6\u6E20\u9053", true);
    }
    if (touched.size === 0) {
      Ne("\u672A\u8FDB\u884C\u4EFB\u4F55\u4FEE\u6539\u3002");
      return;
    }
    Ve(
      `\u5DF2\u914D\u7F6E\u6E20\u9053\uFF1A${Array.from(touched).map((channelId) => CHANNEL_DISPLAY_LABELS[channelId]).join(", ")}`,
      "\u6458\u8981"
    );
    if (!params.writeConfig) {
      params.logger.error?.("\u65E0\u6CD5\u4FDD\u5B58\u914D\u7F6E\uFF1A\u5F53\u524D\u8FD0\u884C\u65F6\u672A\u63D0\u4F9B\u914D\u7F6E\u5199\u5165\u80FD\u529B\u3002");
      return;
    }
    await params.writeConfig(next);
    Le("\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002");
    showReadyMessage();
  } catch (err) {
    if (err instanceof PromptCancelledError) {
      return;
    }
    throw err;
  }
}
function registerChinaSetupCli(api, opts) {
  const state = getChinaCliState();
  for (const channelId of normalizeChannels(opts?.channels)) {
    state.channels.add(channelId);
  }
  if (state.cliRegistered || typeof api.registerCli !== "function") {
    return;
  }
  state.cliRegistered = true;
  const writeConfig = resolveWriteConfig(api.runtime);
  const fallbackLogger = {
    info: (message) => stdout.write(`${message}
`),
    warn: (message) => warn(message),
    error: (message) => warn(message)
  };
  api.registerCli(
    (ctx) => {
      if (!isCommandLike(ctx.program)) {
        const logger = ctx.logger ?? api.logger ?? fallbackLogger;
        logger.error?.("\u65E0\u6CD5\u6CE8\u518C china \u547D\u4EE4\uFF1ACLI program \u5B9E\u4F8B\u65E0\u6548\u3002");
        return;
      }
      const root = ctx.program.command("china").description("OpenClaw China \u63D2\u4EF6\u547D\u4EE4");
      root.command("setup").description("\u4E2D\u56FD\u6E20\u9053\u4EA4\u4E92\u5F0F\u914D\u7F6E\u5411\u5BFC").action(async () => {
        const logger = ctx.logger ?? api.logger ?? fallbackLogger;
        const availableChannels = getInstalledChannels(state);
        await runChinaSetup({
          initialConfig: isRecord(ctx.config) ? ctx.config : {},
          writeConfig,
          logger,
          availableChannels
        });
      });
      root.command("about").description("\u663E\u793A\u9879\u76EE\u4FE1\u606F").action(() => {
        const installed = getInstalledChannels(state);
        We("OpenClaw China \u6E20\u9053\u63D2\u4EF6");
        Ve(
          installed.length > 0 ? `\u5F53\u524D\u5DF2\u5B89\u88C5\u6E20\u9053\uFF1A${installed.map((channelId) => CHANNEL_DISPLAY_LABELS[channelId]).join("\u3001")}` : "OpenClaw China \u6E20\u9053\u63D2\u4EF6",
          "\u5173\u4E8E"
        );
        Le(PROJECT_REPO);
        showReadyMessage();
      });
    },
    { commands: ["china"] }
  );
}

// ../../packages/shared/src/cli/install-hint.ts
var PROJECT_REPO2 = "https://github.com/BytePioneer-AI/openclaw-china";
var INSTALL_SETUP_COMMAND = "openclaw china setup";
var START_GATEWAY_COMMAND = "openclaw gateway --port 18789 --verbose";
var ANSI_RESET2 = "\x1B[0m";
var ANSI_BOLD = "\x1B[1m";
var ANSI_LINK2 = "\x1B[1;4;96m";
var ANSI_BORDER2 = "\x1B[92m";
var SUPPORTED_CHANNELS = [
  "dingtalk",
  "feishu-china",
  "wecom",
  "wecom-app",
  "qqbot"
];
var CHINA_INSTALL_HINT_SHOWN_KEY = /* @__PURE__ */ Symbol.for("@openclaw-china/china-install-hint-shown");
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasAnyEnabledChinaChannel(config) {
  if (!isRecord2(config)) {
    return false;
  }
  const channels = config.channels;
  if (!isRecord2(channels)) {
    return false;
  }
  return SUPPORTED_CHANNELS.some((channelId) => {
    const channelConfig = channels[channelId];
    return isRecord2(channelConfig) && channelConfig.enabled === true;
  });
}
function hasShownInstallHint() {
  const root = globalThis;
  return root[CHINA_INSTALL_HINT_SHOWN_KEY] === true;
}
function markInstallHintShown() {
  const root = globalThis;
  root[CHINA_INSTALL_HINT_SHOWN_KEY] = true;
}
function showChinaInstallHint(api) {
  if (hasShownInstallHint() || hasAnyEnabledChinaChannel(api.config)) {
    return;
  }
  markInstallHintShown();
  const lines = [
    `${ANSI_BORDER2}\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501${ANSI_RESET2}`,
    "  OpenClaw China Channels \u5DF2\u5C31\u7EEA!",
    `${ANSI_BORDER2}\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501${ANSI_RESET2}`,
    "",
    "\u9879\u76EE\u4ED3\u5E93:",
    `  ${ANSI_LINK2}${PROJECT_REPO2}${ANSI_RESET2}`,
    "",
    "\u2B50 \u5982\u679C\u8FD9\u4E2A\u9879\u76EE\u5BF9\u4F60\u6709\u5E2E\u52A9\uFF0C\u8BF7\u7ED9\u6211\u4EEC\u4E00\u4E2A Star\uFF01\u2B50",
    "",
    "\u4E0B\u4E00\u6B65\uFF08\u914D\u7F6E\u5F15\u5BFC\uFF09:",
    "  1. \u8FD0\u884C\u4EA4\u4E92\u5F0F\u914D\u7F6E\u5411\u5BFC",
    `     ${ANSI_BOLD}${INSTALL_SETUP_COMMAND}${ANSI_RESET2}`,
    "  2. \u6309\u63D0\u793A\u586B\u5199\u6E20\u9053\u51ED\u636E\u5E76\u4FDD\u5B58\u914D\u7F6E",
    "  3. \u542F\u52A8\u7F51\u5173\u5E76\u89C2\u5BDF\u65E5\u5FD7",
    `     ${START_GATEWAY_COMMAND}`
  ];
  if (api.logger?.info) {
    for (const line of lines) {
      api.logger.info(line);
    }
    return;
  }
  if (api.logger?.warn) {
    for (const line of lines) {
      api.logger.warn(line);
    }
  }
}
function decodeEncodingAESKey(encodingAESKey) {
  const trimmed = encodingAESKey.trim();
  if (!trimmed) throw new Error("encodingAESKey missing");
  const withPadding = trimmed.endsWith("=") ? trimmed : `${trimmed}=`;
  const key = Buffer.from(withPadding, "base64");
  if (key.length !== 32) {
    throw new Error(`invalid encodingAESKey (expected 32 bytes after base64 decode, got ${key.length})`);
  }
  return key;
}
var WECOM_PKCS7_BLOCK_SIZE = 32;
function pkcs7Pad(buf, blockSize) {
  const mod = buf.length % blockSize;
  const pad = mod === 0 ? blockSize : blockSize - mod;
  return Buffer.concat([buf, Buffer.alloc(pad, pad)]);
}
function pkcs7Unpad(buf, blockSize) {
  if (buf.length === 0) throw new Error("invalid pkcs7 payload");
  const pad = buf[buf.length - 1];
  if (!pad || pad < 1 || pad > blockSize || pad > buf.length) {
    throw new Error("invalid pkcs7 padding");
  }
  for (let i = 1; i <= pad; i += 1) {
    if (buf[buf.length - i] !== pad) {
      throw new Error("invalid pkcs7 padding");
    }
  }
  return buf.subarray(0, buf.length - pad);
}
function sha1Hex(input2) {
  return crypto.createHash("sha1").update(input2).digest("hex");
}
function computeWecomAppMsgSignature(params) {
  const parts = [params.token, params.timestamp, params.nonce, params.encrypt].map((value) => String(value ?? "")).sort();
  return sha1Hex(parts.join(""));
}
function verifyWecomAppSignature(params) {
  const expected = computeWecomAppMsgSignature({
    token: params.token,
    timestamp: params.timestamp,
    nonce: params.nonce,
    encrypt: params.encrypt
  });
  return expected === params.signature;
}
function decryptWecomAppEncrypted(params) {
  const aesKey = decodeEncodingAESKey(params.encodingAESKey);
  const iv = aesKey.subarray(0, 16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, iv);
  decipher.setAutoPadding(false);
  const decryptedPadded = Buffer.concat([
    decipher.update(Buffer.from(params.encrypt, "base64")),
    decipher.final()
  ]);
  const decrypted = pkcs7Unpad(decryptedPadded, WECOM_PKCS7_BLOCK_SIZE);
  if (decrypted.length < 20) {
    throw new Error(`invalid decrypted payload (expected at least 20 bytes, got ${decrypted.length})`);
  }
  const msgLen = decrypted.readUInt32BE(16);
  const msgStart = 20;
  const msgEnd = msgStart + msgLen;
  if (msgEnd > decrypted.length) {
    throw new Error(`invalid decrypted msg length (msgEnd=${msgEnd}, payloadLength=${decrypted.length})`);
  }
  const msg = decrypted.subarray(msgStart, msgEnd).toString("utf8");
  const receiveId = params.receiveId ?? "";
  if (receiveId) {
    const trailing = decrypted.subarray(msgEnd).toString("utf8");
    if (trailing !== receiveId) {
      throw new Error(`receiveId mismatch (expected "${receiveId}", got "${trailing}")`);
    }
  }
  return msg;
}
function encryptWecomAppPlaintext(params) {
  const aesKey = decodeEncodingAESKey(params.encodingAESKey);
  const iv = aesKey.subarray(0, 16);
  const random16 = crypto.randomBytes(16);
  const msg = Buffer.from(params.plaintext ?? "", "utf8");
  const msgLen = Buffer.alloc(4);
  msgLen.writeUInt32BE(msg.length, 0);
  const receiveId = Buffer.from(params.receiveId ?? "", "utf8");
  const raw = Buffer.concat([random16, msgLen, msg, receiveId]);
  const padded = pkcs7Pad(raw, WECOM_PKCS7_BLOCK_SIZE);
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
  cipher.setAutoPadding(false);
  const encrypted = Buffer.concat([cipher.update(padded), cipher.final()]);
  return encrypted.toString("base64");
}
var DOWNLOAD_TIMEOUT = 12e4;
function formatDateDir(d2 = /* @__PURE__ */ new Date()) {
  const yyyy = d2.getFullYear();
  const mm = String(d2.getMonth() + 1).padStart(2, "0");
  const dd = String(d2.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function isProbablyInWecomTmpDir(p) {
  try {
    const base = join(tmpdir(), "wecom-app-media");
    const norm = (s) => s.replace(/\\/g, "/").toLowerCase();
    return norm(p).includes(norm(base));
  } catch {
    return false;
  }
}
async function finalizeInboundMedia(account, filePath) {
  const p = String(filePath ?? "").trim();
  if (!p) return p;
  if (!isProbablyInWecomTmpDir(p)) return p;
  const baseDir = resolveInboundMediaDir(account.config ?? {});
  const datedDir = join(baseDir, formatDateDir());
  await mkdir(datedDir, { recursive: true });
  const name = basename(p);
  const dest = join(datedDir, name);
  try {
    await rename(p, dest);
    return dest;
  } catch {
    try {
      await unlink(p);
    } catch {
    }
    return p;
  }
}
async function pruneInboundMediaDir2(account) {
  const baseDir = resolveInboundMediaDir(account.config ?? {});
  const keepDays = resolveInboundMediaKeepDays(account.config ?? {});
  if (keepDays < 0) return;
  const now = Date.now();
  const cutoff = now - keepDays * 24 * 60 * 60 * 1e3;
  let entries;
  try {
    entries = await readdir(baseDir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry)) continue;
    const dirPath = join(baseDir, entry);
    let st3;
    try {
      st3 = await stat(dirPath);
    } catch {
      continue;
    }
    if (!st3.isDirectory()) continue;
    const dirTime = st3.mtimeMs || st3.ctimeMs || 0;
    if (dirTime >= cutoff) continue;
    let files = [];
    try {
      files = await readdir(dirPath);
    } catch {
      continue;
    }
    for (const f of files) {
      const fp = join(dirPath, f);
      try {
        const fst = await stat(fp);
        if (fst.isFile() && (fst.mtimeMs || fst.ctimeMs || 0) < cutoff) {
          await unlink(fp);
        }
      } catch {
      }
    }
  }
}
var FileSizeLimitError2 = class _FileSizeLimitError extends Error {
  actualSize;
  limitSize;
  msgType;
  constructor(actualSize, limitSize, msgType) {
    super(`File size ${actualSize} bytes exceeds limit ${limitSize} bytes for ${msgType}`);
    this.name = "FileSizeLimitError";
    this.actualSize = actualSize;
    this.limitSize = limitSize;
    this.msgType = msgType;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _FileSizeLimitError);
    }
  }
};
var TimeoutError = class _TimeoutError extends Error {
  timeoutMs;
  constructor(timeoutMs) {
    super(`Download timed out after ${timeoutMs}ms`);
    this.name = "TimeoutError";
    this.timeoutMs = timeoutMs;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _TimeoutError);
    }
  }
};
var accessTokenCache = /* @__PURE__ */ new Map();
var ACCESS_TOKEN_TTL_MS = 7200 * 1e3 - 5 * 60 * 1e3;
function buildWecomApiUrl(account, pathWithQuery) {
  const normalizedPath = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
  return `${resolveApiBaseUrl(account.config)}${normalizedPath}`;
}
function stripMarkdown(text) {
  let result = text;
  result = result.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, lang, code) => {
    const trimmedCode = code.trim();
    if (!trimmedCode) return "";
    const langLabel = lang ? `[${lang}]
` : "";
    const indentedCode = trimmedCode.split("\n").map((line) => `    ${line}`).join("\n");
    return `
${langLabel}${indentedCode}
`;
  });
  result = result.replace(/^#{1,6}\s+(.+)$/gm, "\u3010$1\u3011");
  result = result.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/__(.*?)__/g, "$1").replace(/(?<![\w/])_(.+?)_(?![\w/])/g, "$1");
  result = result.replace(/^[-*]\s+/gm, "\xB7 ");
  result = result.replace(/^(\d+)\.\s+/gm, "$1. ");
  result = result.replace(/`([^`]+)`/g, "$1");
  result = result.replace(/~~(.*?)~~/g, "$1");
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
  result = result.replace(/!\[([^\]]*)\]\([^)]+\)/g, "[\u56FE\u7247: $1]");
  result = result.replace(
    /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)*)/g,
    (_match, header, body) => {
      const headerCells = header.split("|").map((c) => c.trim()).filter(Boolean);
      const rows = body.trim().split("\n").map(
        (row) => row.split("|").map((c) => c.trim()).filter(Boolean)
      );
      const colWidths = headerCells.map((h, i) => {
        const maxRowWidth = Math.max(...rows.map((r) => (r[i] || "").length));
        return Math.max(h.length, maxRowWidth);
      });
      const formattedHeader = headerCells.map((h, i) => h.padEnd(colWidths[i])).join("  ");
      const formattedRows = rows.map(
        (row) => headerCells.map(
          (_2, i) => (row[i] || "").padEnd(colWidths[i])
        ).join("  ")
      ).join("\n");
      return `${formattedHeader}
${formattedRows}
`;
    }
  );
  result = result.replace(/^>\s?/gm, "");
  result = result.replace(/^[-*_]{3,}$/gm, "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result.trim();
}
async function getAccessToken(account) {
  if (!account.corpId || !account.corpSecret) {
    throw new Error("corpId or corpSecret not configured");
  }
  const key = `${account.corpId}:${account.agentId ?? "default"}`;
  const cached = accessTokenCache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.token;
  }
  const url = buildWecomApiUrl(
    account,
    `/cgi-bin/gettoken?corpid=${encodeURIComponent(account.corpId)}&corpsecret=${encodeURIComponent(account.corpSecret)}`
  );
  const resp = await fetch(url);
  const data = await resp.json();
  if (data.errcode !== void 0 && data.errcode !== 0) {
    throw new Error(`gettoken failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`);
  }
  if (!data.access_token) {
    throw new Error("gettoken returned empty access_token");
  }
  accessTokenCache.set(key, {
    token: data.access_token,
    expiresAt: Date.now() + ACCESS_TOKEN_TTL_MS
  });
  return data.access_token;
}
function clearAccessTokenCache(account) {
  const key = `${account.corpId}:${account.agentId ?? "default"}`;
  accessTokenCache.delete(key);
}
function clearAllAccessTokenCache() {
  accessTokenCache.clear();
}
var MIME_EXT_MAP = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/bmp": ".bmp",
  "application/pdf": ".pdf",
  "text/plain": ".txt"
};
function pickExtFromMime(mimeType) {
  const t = (mimeType ?? "").split(";")[0]?.trim().toLowerCase();
  return t && MIME_EXT_MAP[t] || "";
}
function parseContentDispositionFilename(headerValue) {
  const v = String(headerValue ?? "");
  if (!v) return void 0;
  const m1 = v.match(/filename\*=UTF-8''([^;]+)/i);
  if (m1?.[1]) {
    try {
      return decodeURIComponent(m1[1].trim().replace(/^"|"$/g, ""));
    } catch {
      return m1[1].trim().replace(/^"|"$/g, "");
    }
  }
  const m2 = v.match(/filename=([^;]+)/i);
  if (m2?.[1]) return m2[1].trim().replace(/^"|"$/g, "");
  return void 0;
}
function getWecomTempDir() {
  return join(tmpdir(), "wecom-app-media");
}
async function downloadWecomMediaToFile(account, mediaId, opts) {
  const raw = String(mediaId ?? "").trim();
  if (!raw) return { ok: false, error: "mediaId/url is empty" };
  const isHttp = raw.startsWith("http://") || raw.startsWith("https://");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT);
  let resp;
  let contentType;
  let filenameFromHeader;
  try {
    if (isHttp) {
      resp = await fetch(raw, { signal: controller.signal });
      if (!resp.ok) {
        return { ok: false, error: `download failed: HTTP ${resp.status}` };
      }
      contentType = resp.headers.get("content-type") || void 0;
      filenameFromHeader = void 0;
    } else {
      if (!account.corpId || !account.corpSecret) {
        return { ok: false, error: "Account not configured for media download (missing corpId/corpSecret)" };
      }
      const safeMediaId = raw;
      const token = await getAccessToken(account);
      const url = buildWecomApiUrl(
        account,
        `/cgi-bin/media/get?access_token=${encodeURIComponent(token)}&media_id=${encodeURIComponent(safeMediaId)}`
      );
      resp = await fetch(url, { signal: controller.signal });
      if (!resp.ok) {
        return { ok: false, error: `media/get failed: HTTP ${resp.status}` };
      }
      contentType = resp.headers.get("content-type") || void 0;
      const cd = resp.headers.get("content-disposition");
      filenameFromHeader = parseContentDispositionFilename(cd);
      if ((contentType ?? "").includes("application/json")) {
        try {
          const j2 = await resp.json();
          return { ok: false, error: `media/get returned json: errcode=${j2?.errcode} errmsg=${j2?.errmsg}` };
        } catch (err) {
          return { ok: false, error: err instanceof Error ? err.message : String(err) };
        }
      }
    }
    const contentLength = resp.headers.get("content-length");
    if (contentLength && opts.maxBytes > 0) {
      const declaredSize = parseInt(contentLength, 10);
      if (!Number.isNaN(declaredSize) && declaredSize > opts.maxBytes) {
        throw new FileSizeLimitError2(declaredSize, opts.maxBytes, "media");
      }
    }
    const reader = resp.body?.getReader();
    if (!reader) {
      return { ok: false, error: "Response body is not readable" };
    }
    const chunks = [];
    let totalSize = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalSize += value.length;
      if (opts.maxBytes > 0 && totalSize > opts.maxBytes) {
        reader.cancel();
        throw new FileSizeLimitError2(totalSize, opts.maxBytes, "media");
      }
      chunks.push(value);
    }
    const buf = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    const baseDir = (opts.dir ?? "").trim() || getWecomTempDir();
    await mkdir(baseDir, { recursive: true });
    const prefix = (opts.prefix ?? "media").trim() || "media";
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const extFromMime = pickExtFromMime(contentType);
    const extFromName = filenameFromHeader ? extname(filenameFromHeader) : isHttp ? extname(raw.split("?")[0] || "") : "";
    const ext = extFromName || extFromMime || ".bin";
    const filename = `${prefix}_${timestamp}_${randomSuffix}${ext}`;
    const outPath = join(baseDir, filename);
    await writeFile(outPath, buf);
    return {
      ok: true,
      path: outPath,
      mimeType: contentType,
      size: buf.length,
      filename
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new TimeoutError(DOWNLOAD_TIMEOUT);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
async function sendWecomAppMessage(account, target, message) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const text = stripMarkdown(message);
  const payload = {
    msgtype: "text",
    agentid: account.agentId,
    text: { content: text },
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
async function sendWecomAppMarkdownMessage(account, target, markdownContent) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const payload = {
    msgtype: "markdown",
    agentid: account.agentId,
    markdown: { content: markdownContent },
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
var MIME_TYPE_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".webp": "image/webp"
};
function getMimeType2(filename, contentType) {
  if (contentType) {
    return contentType.split(";")[0].trim();
  }
  const ext = filename.toLowerCase().match(/\.[^.]+$/)?.[0];
  return MIME_TYPE_MAP[ext || ""] || "image/jpeg";
}
async function downloadImage(imageUrl) {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    console.log(`[wecom-app] \u4F7F\u7528 HTTP fetch \u4E0B\u8F7D: ${imageUrl}`);
    const resp = await fetch(imageUrl);
    if (!resp.ok) {
      throw new Error(`Download image failed: HTTP ${resp.status}`);
    }
    const arrayBuffer = await resp.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      contentType: resp.headers.get("content-type") || void 0
    };
  } else {
    console.log(`[wecom-app] \u4F7F\u7528 fs \u8BFB\u53D6\u672C\u5730\u6587\u4EF6: ${imageUrl}`);
    const fs = await import('fs');
    const buffer = await fs.promises.readFile(imageUrl);
    return {
      buffer,
      contentType: void 0
      // 本地文件不提供 Content-Type，依赖扩展名推断
    };
  }
}
async function uploadImageMedia(account, imageBuffer, filename = "image.jpg", contentType) {
  if (!account.canSendActive) {
    throw new Error("Account not configured for active sending");
  }
  const token = await getAccessToken(account);
  const mimeType = getMimeType2(filename, contentType);
  const boundary = `----FormBoundary${Date.now()}`;
  const header = Buffer.from(
    `--${boundary}\r
Content-Disposition: form-data; name="media"; filename="${filename}"\r
Content-Type: ${mimeType}\r
\r
`
  );
  const footer = Buffer.from(`\r
--${boundary}--\r
`);
  const body = Buffer.concat([header, imageBuffer, footer]);
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/media/upload?access_token=${encodeURIComponent(token)}&type=image`),
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      }
    }
  );
  const data = await resp.json();
  if (data.errcode !== void 0 && data.errcode !== 0) {
    throw new Error(`Upload image failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`);
  }
  if (!data.media_id) {
    throw new Error("Upload image returned empty media_id");
  }
  return data.media_id;
}
async function sendWecomAppImageMessage(account, target, mediaId) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const payload = {
    msgtype: "image",
    agentid: account.agentId,
    image: { media_id: mediaId },
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
async function downloadAndSendImage(account, target, imageUrl) {
  try {
    console.log(`[wecom-app] Downloading image from: ${imageUrl}`);
    const { buffer: imageBuffer, contentType } = await downloadImage(imageUrl);
    console.log(`[wecom-app] Image downloaded, size: ${imageBuffer.length} bytes, contentType: ${contentType || "unknown"}`);
    const extMatch = imageUrl.match(/\.([^.]+)$/);
    const ext = extMatch ? `.${extMatch[1]}` : ".jpg";
    const filename = `image${ext}`;
    console.log(`[wecom-app] Uploading image to WeCom media API, filename: ${filename}`);
    const mediaId = await uploadImageMedia(account, imageBuffer, filename, contentType);
    console.log(`[wecom-app] Image uploaded, media_id: ${mediaId}`);
    console.log(`[wecom-app] Sending image to target:`, target);
    const result = await sendWecomAppImageMessage(account, target, mediaId);
    console.log(`[wecom-app] Image sent, ok: ${result.ok}, msgid: ${result.msgid}, errcode: ${result.errcode}, errmsg: ${result.errmsg}`);
    return result;
  } catch (err) {
    console.error(`[wecom-app] downloadAndSendImage error:`, err);
    return {
      ok: false,
      errcode: -1,
      errmsg: err instanceof Error ? err.message : String(err)
    };
  }
}
var VOICE_MIME_TYPE_MAP = {
  ".amr": "audio/amr",
  ".speex": "audio/speex",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav"
};
function getVoiceMimeType(filename, contentType) {
  if (contentType) {
    return contentType.split(";")[0].trim();
  }
  const ext = filename.toLowerCase().match(/\.[^.]+$/)?.[0];
  return VOICE_MIME_TYPE_MAP[ext || ""] || "audio/amr";
}
async function uploadVoiceMedia(account, voiceBuffer, filename = "voice.amr", contentType) {
  if (!account.canSendActive) {
    throw new Error("Account not configured for active sending");
  }
  const token = await getAccessToken(account);
  const mimeType = getVoiceMimeType(filename, contentType);
  const boundary = `----FormBoundary${Date.now()}`;
  const header = Buffer.from(
    `--${boundary}\r
Content-Disposition: form-data; name="media"; filename="${filename}"\r
Content-Type: ${mimeType}\r
\r
`
  );
  const footer = Buffer.from(`\r
--${boundary}--\r
`);
  const body = Buffer.concat([header, voiceBuffer, footer]);
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/media/upload?access_token=${encodeURIComponent(token)}&type=voice`),
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      }
    }
  );
  const data = await resp.json();
  if (data.errcode !== void 0 && data.errcode !== 0) {
    throw new Error(`Upload voice failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`);
  }
  if (!data.media_id) {
    throw new Error("Upload voice returned empty media_id");
  }
  return data.media_id;
}
async function sendWecomAppVoiceMessage(account, target, mediaId) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const payload = {
    msgtype: "voice",
    agentid: account.agentId,
    voice: { media_id: mediaId },
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
async function downloadVoice(voiceUrl) {
  if (voiceUrl.startsWith("http://") || voiceUrl.startsWith("https://")) {
    console.log(`[wecom-app] \u4F7F\u7528 HTTP fetch \u4E0B\u8F7D\u8BED\u97F3: ${voiceUrl}`);
    const resp = await fetch(voiceUrl);
    if (!resp.ok) {
      throw new Error(`Download voice failed: HTTP ${resp.status}`);
    }
    const arrayBuffer = await resp.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      contentType: resp.headers.get("content-type") || void 0
    };
  } else {
    console.log(`[wecom-app] \u4F7F\u7528 fs \u8BFB\u53D6\u672C\u5730\u8BED\u97F3\u6587\u4EF6: ${voiceUrl}`);
    const fs = await import('fs');
    const buffer = await fs.promises.readFile(voiceUrl);
    return {
      buffer,
      contentType: void 0
      // 本地文件不提供 Content-Type，依赖扩展名推断
    };
  }
}
async function downloadAndSendVoice(account, target, voiceUrl) {
  try {
    console.log(`[wecom-app] Downloading voice from: ${voiceUrl}`);
    const voiceExt = (voiceUrl.split("?")[0].match(/\.([^.]+)$/)?.[1] || "").toLowerCase();
    if (voiceExt === "wav") {
      console.warn(`[wecom-app] Voice format is .wav; WeCom usually expects .amr/.speex. Consider converting to .amr before sending.`);
    }
    const { buffer: voiceBuffer, contentType } = await downloadVoice(voiceUrl);
    console.log(`[wecom-app] Voice downloaded, size: ${voiceBuffer.length} bytes, contentType: ${contentType || "unknown"}`);
    const extMatch = voiceUrl.match(/\.([^.]+)$/);
    const ext = extMatch ? `.${extMatch[1]}` : ".amr";
    const filename = `voice${ext}`;
    console.log(`[wecom-app] Uploading voice to WeCom media API, filename: ${filename}`);
    const mediaId = await uploadVoiceMedia(account, voiceBuffer, filename, contentType);
    console.log(`[wecom-app] Voice uploaded, media_id: ${mediaId}`);
    console.log(`[wecom-app] Sending voice to target:`, target);
    const result = await sendWecomAppVoiceMessage(account, target, mediaId);
    console.log(`[wecom-app] Voice sent, ok: ${result.ok}, msgid: ${result.msgid}, errcode: ${result.errcode}, errmsg: ${result.errmsg}`);
    return result;
  } catch (err) {
    console.error(`[wecom-app] downloadAndSendVoice error:`, err);
    const rawMsg = err instanceof Error ? err.message : String(err);
    const voiceExt = (voiceUrl.split("?")[0].match(/\.([^.]+)$/)?.[1] || "").toLowerCase();
    const hint = voiceExt === "wav" ? "WeCom voice usually requires .amr/.speex. Your file is .wav; please convert to .amr and retry. (e.g., ffmpeg -i in.wav -ar 8000 -ac 1 -c:a amr_nb out.amr)" : "";
    return {
      ok: false,
      errcode: -1,
      errmsg: hint ? `${rawMsg} | hint: ${hint}` : rawMsg
    };
  }
}
async function uploadMedia(account, buffer, filename = "file.bin", contentType, type = "file") {
  if (!account.canSendActive) {
    throw new Error("Account not configured for active sending");
  }
  const token = await getAccessToken(account);
  const boundary = `----FormBoundary${Date.now()}`;
  const header = Buffer.from(
    `--${boundary}\r
Content-Disposition: form-data; name="media"; filename="${filename}"\r
Content-Type: ${contentType || "application/octet-stream"}\r
\r
`
  );
  const footer = Buffer.from(`\r
--${boundary}--\r
`);
  const body = Buffer.concat([header, buffer, footer]);
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/media/upload?access_token=${encodeURIComponent(token)}&type=${type}`),
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      }
    }
  );
  const data = await resp.json();
  if (data.errcode !== void 0 && data.errcode !== 0) {
    throw new Error(`Upload ${type} failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`);
  }
  if (!data.media_id) {
    throw new Error(`Upload ${type} returned empty media_id`);
  }
  return data.media_id;
}
async function sendWecomAppFileMessage(account, target, mediaId) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const payload = {
    msgtype: "file",
    agentid: account.agentId,
    file: { media_id: mediaId },
    safe: 0,
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
async function sendWecomAppVideoMessage(account, target, mediaId) {
  if (!account.canSendActive) {
    return {
      ok: false,
      errcode: -1,
      errmsg: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const token = await getAccessToken(account);
  const payload = {
    msgtype: "video",
    agentid: account.agentId,
    video: { media_id: mediaId },
    touser: target.userId
  };
  const resp = await fetch(
    buildWecomApiUrl(account, `/cgi-bin/message/send?access_token=${encodeURIComponent(token)}`),
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await resp.json();
  return {
    ok: data.errcode === 0,
    errcode: data.errcode,
    errmsg: data.errmsg,
    invaliduser: data.invaliduser,
    invalidparty: data.invalidparty,
    invalidtag: data.invalidtag,
    msgid: data.msgid
  };
}
async function downloadFile(fileUrl) {
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    console.log(`[wecom-app] \u4F7F\u7528 HTTP fetch \u4E0B\u8F7D\u6587\u4EF6: ${fileUrl}`);
    const resp = await fetch(fileUrl);
    if (!resp.ok) {
      throw new Error(`Download file failed: HTTP ${resp.status}`);
    }
    const arrayBuffer = await resp.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      contentType: resp.headers.get("content-type") || void 0
    };
  } else {
    console.log(`[wecom-app] \u4F7F\u7528 fs \u8BFB\u53D6\u672C\u5730\u6587\u4EF6: ${fileUrl}`);
    const fs = await import('fs');
    const buffer = await fs.promises.readFile(fileUrl);
    return {
      buffer,
      contentType: void 0
      // 本地文件不提供 Content-Type，依赖扩展名推断
    };
  }
}
async function downloadAndSendFile(account, target, fileUrl) {
  try {
    console.log(`[wecom-app] Downloading file from: ${fileUrl}`);
    const { buffer: fileBuffer, contentType } = await downloadFile(fileUrl);
    console.log(`[wecom-app] File downloaded, size: ${fileBuffer.length} bytes, contentType: ${contentType || "unknown"}`);
    let filename = "file.bin";
    try {
      if (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://")) {
        const path = await import('path');
        const base = path.basename(fileUrl);
        if (base && base !== "." && base !== "/") {
          filename = base;
        }
      } else {
        const u = new URL(fileUrl);
        const base = u.pathname.split("/").filter(Boolean).pop();
        if (base) filename = base;
      }
    } catch {
    }
    if (!/\.[A-Za-z0-9]{1,10}$/.test(filename)) {
      const extMatch = fileUrl.split("?")[0].match(/\.([^.]+)$/);
      const ext = extMatch ? `.${extMatch[1]}` : ".bin";
      filename = `file${ext}`;
    }
    console.log(`[wecom-app] Uploading file to WeCom media API, filename: ${filename}`);
    const mediaId = await uploadMedia(account, fileBuffer, filename, contentType, "file");
    console.log(`[wecom-app] File uploaded, media_id: ${mediaId}`);
    console.log(`[wecom-app] Sending file to target:`, target);
    const result = await sendWecomAppFileMessage(account, target, mediaId);
    console.log(`[wecom-app] File sent, ok: ${result.ok}, msgid: ${result.msgid}, errcode: ${result.errcode}, errmsg: ${result.errmsg}`);
    return result;
  } catch (err) {
    console.error(`[wecom-app] downloadAndSendFile error:`, err);
    return {
      ok: false,
      errcode: -1,
      errmsg: err instanceof Error ? err.message : String(err)
    };
  }
}
async function downloadAndSendVideo(account, target, videoUrl) {
  try {
    console.log(`[wecom-app] Downloading video from: ${videoUrl}`);
    const { buffer: videoBuffer, contentType } = await downloadFile(videoUrl);
    console.log(`[wecom-app] Video downloaded, size: ${videoBuffer.length} bytes, contentType: ${contentType || "unknown"}`);
    let filename = "video.mp4";
    try {
      if (!videoUrl.startsWith("http://") && !videoUrl.startsWith("https://")) {
        const path = await import('path');
        const base = path.basename(videoUrl);
        if (base && base !== "." && base !== "/") {
          filename = base;
        }
      } else {
        const u = new URL(videoUrl);
        const base = u.pathname.split("/").filter(Boolean).pop();
        if (base) filename = base;
      }
    } catch {
    }
    if (!/\.[A-Za-z0-9]{1,10}$/.test(filename)) {
      const extMatch = videoUrl.split("?")[0].match(/\.([^.]+)$/);
      const ext = extMatch ? `.${extMatch[1]}` : ".mp4";
      filename = `video${ext}`;
    }
    console.log(`[wecom-app] Uploading video to WeCom media API, filename: ${filename}`);
    const mediaId = await uploadMedia(account, videoBuffer, filename, contentType, "video");
    console.log(`[wecom-app] Video uploaded, media_id: ${mediaId}`);
    console.log(`[wecom-app] Sending video to target:`, target);
    const result = await sendWecomAppVideoMessage(account, target, mediaId);
    console.log(`[wecom-app] Video sent, ok: ${result.ok}, msgid: ${result.msgid}, errcode: ${result.errcode}, errmsg: ${result.errmsg}`);
    return result;
  } catch (err) {
    console.error(`[wecom-app] downloadAndSendVideo error:`, err);
    return {
      ok: false,
      errcode: -1,
      errmsg: err instanceof Error ? err.message : String(err)
    };
  }
}

// src/bot.ts
function resolveVoiceFormat(msg, savedPath) {
  const declared = String(msg.Format ?? "").trim().toLowerCase();
  if (declared === "amr" || declared === "speex") return declared;
  const lowerPath = savedPath.toLowerCase();
  if (lowerPath.endsWith(".speex")) return "speex";
  if (lowerPath.endsWith(".amr")) return "amr";
  return "silk";
}
function formatASRErrorLog(err) {
  if (err instanceof ASRError) {
    return JSON.stringify({
      kind: err.kind,
      provider: err.provider,
      retryable: err.retryable,
      message: err.message
    });
  }
  return JSON.stringify({
    message: err instanceof Error ? err.message : String(err)
  });
}
var VOICE_ASR_FALLBACK_TEXT = "\u5F53\u524D\u8BED\u97F3\u529F\u80FD\u672A\u542F\u52A8\u6216\u8BC6\u522B\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
var VOICE_ASR_ERROR_MAX_LENGTH = 500;
function trimTextForReply(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
function buildVoiceASRFallbackReply(errorMessage) {
  const detail = errorMessage?.trim();
  if (!detail) return VOICE_ASR_FALLBACK_TEXT;
  return `${VOICE_ASR_FALLBACK_TEXT}

\u63A5\u53E3\u9519\u8BEF\uFF1A${trimTextForReply(detail, VOICE_ASR_ERROR_MAX_LENGTH)}`;
}
function normalizeLocationValue(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}
function extractWecomAppContent(msg) {
  const msgtype = String(msg.msgtype ?? msg.MsgType ?? "").toLowerCase();
  if (msgtype === "text") {
    const content = msg.text?.content ?? msg.Content;
    return typeof content === "string" ? content : "";
  }
  if (msgtype === "voice") {
    const content = msg.voice?.content ?? msg.Recognition;
    return typeof content === "string" ? content : "[voice]";
  }
  if (msgtype === "mixed") {
    const items = msg.mixed?.msg_item;
    if (Array.isArray(items)) {
      return items.map((item) => {
        if (!item || typeof item !== "object") return "";
        const typed = item;
        const t = String(typed.msgtype ?? "").toLowerCase();
        if (t === "text") return String(typed.text?.content ?? "");
        if (t === "image") return `[image] ${String(typed.image?.url ?? "").trim()}`.trim();
        return t ? `[${t}]` : "";
      }).filter((part) => Boolean(part && part.trim())).join("\n");
    }
    return "[mixed]";
  }
  if (msgtype === "image") {
    const url = String(msg.image?.url ?? msg.PicUrl ?? "").trim();
    return url ? `[image] ${url}` : "[image]";
  }
  if (msgtype === "file") {
    const url = String(msg.file?.url ?? "").trim();
    return url ? `[file] ${url}` : "[file]";
  }
  if (msgtype === "location") {
    const payload = msg;
    const location = payload.location;
    const lat = normalizeLocationValue(
      location?.latitude ?? location?.lat ?? payload.Location_X ?? payload.Latitude
    );
    const lon = normalizeLocationValue(
      location?.longitude ?? location?.lng ?? payload.Location_Y ?? payload.Longitude
    );
    const label = normalizeLocationValue(
      location?.label ?? location?.address ?? location?.name ?? payload.Label ?? payload.Poiname
    );
    const scale = normalizeLocationValue(
      location?.scale ?? location?.precision ?? payload.Scale ?? payload.Precision
    );
    const parts = [];
    if (lat && lon) parts.push(`${lat},${lon}`);
    if (label) parts.push(label);
    if (scale) parts.push(`scale=${scale}`);
    return parts.length ? `[location] ${parts.join(" ")}` : "[location]";
  }
  if (msgtype === "event") {
    const eventtype = String(
      msg.event?.eventtype ?? msg.Event ?? ""
    ).trim();
    return eventtype ? `[event] ${eventtype}` : "[event]";
  }
  if (msgtype === "stream") {
    const id = String(msg.stream?.id ?? "").trim();
    return id ? `[stream_refresh] ${id}` : "[stream_refresh]";
  }
  return msgtype ? `[${msgtype}]` : "";
}
async function enrichInboundContentWithMedia(params) {
  const { account, msg, logger } = params;
  const msgtype = String(msg.msgtype ?? msg.MsgType ?? "").toLowerCase();
  const accountConfig = account?.config ?? {};
  const enabled = resolveInboundMediaEnabled(accountConfig);
  const maxBytes = resolveInboundMediaMaxBytes(accountConfig);
  const mediaPaths = [];
  let asrErrorMessage;
  const makeResult = (text) => ({
    text,
    mediaPaths,
    asrErrorMessage,
    cleanup: async () => {
      try {
        await pruneInboundMediaDir2(account);
      } catch {
      }
    }
  });
  if (!enabled) {
    return makeResult(extractWecomAppContent(msg));
  }
  if (msgtype === "image") {
    try {
      const mediaId = String(msg.MediaId ?? "").trim();
      if (mediaId) {
        const saved = await downloadWecomMediaToFile(account, mediaId, { maxBytes, prefix: "img" });
        if (saved.ok && saved.path) {
          const finalPath = await finalizeInboundMedia(account, saved.path);
          mediaPaths.push(finalPath);
          return makeResult(`[image] saved:${finalPath}`);
        }
        return makeResult(`[image] (save failed) ${saved.error ?? ""}`.trim());
      }
      const url = String(msg.image?.url ?? msg.PicUrl ?? "").trim();
      if (url) {
        try {
          const saved = await downloadWecomMediaToFile(account, url, { maxBytes, prefix: "img" });
          if (saved.ok && saved.path) {
            const finalPath = await finalizeInboundMedia(account, saved.path);
            mediaPaths.push(finalPath);
            return makeResult(`[image] saved:${finalPath}`);
          }
        } catch {
        }
      }
      return makeResult(extractWecomAppContent(msg));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return makeResult(`[image] (download error: ${errorMsg})`);
    }
  }
  if (msgtype === "file") {
    try {
      const mediaId = String(msg.MediaId ?? msg.mediaid ?? "").trim();
      if (mediaId) {
        const saved = await downloadWecomMediaToFile(account, mediaId, { maxBytes, prefix: "file" });
        if (saved.ok && saved.path) {
          const finalPath = await finalizeInboundMedia(account, saved.path);
          mediaPaths.push(finalPath);
          return makeResult(`[file] saved:${finalPath}`);
        }
        return makeResult(`[file] (save failed) ${saved.error ?? ""}`.trim());
      }
      return makeResult(extractWecomAppContent(msg));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return makeResult(`[file] (download error: ${errorMsg})`);
    }
  }
  if (msgtype === "voice") {
    try {
      const mediaId = String(msg.MediaId ?? "").trim();
      const recognition = String(msg.Recognition ?? "").trim();
      const asrCredentials = resolveWecomAppASRCredentials(accountConfig);
      if (mediaId) {
        const saved = await downloadWecomMediaToFile(account, mediaId, { maxBytes, prefix: "voice" });
        if (saved.ok && saved.path) {
          const finalPath = await finalizeInboundMedia(account, saved.path);
          mediaPaths.push(finalPath);
          if (asrCredentials) {
            try {
              const audio = await readFile(finalPath);
              const asrConfig = {
                appId: asrCredentials.appId,
                secretId: asrCredentials.secretId,
                secretKey: asrCredentials.secretKey,
                voiceFormat: resolveVoiceFormat(msg, finalPath)
              };
              if (asrCredentials.engineType) {
                asrConfig.engineType = asrCredentials.engineType;
              }
              if (typeof asrCredentials.timeoutMs === "number") {
                asrConfig.timeoutMs = asrCredentials.timeoutMs;
              }
              const transcript = await transcribeTencentFlash({
                audio,
                config: asrConfig
              });
              const safeTranscript = transcript.trim();
              if (safeTranscript) {
                return makeResult(`[voice] saved:${finalPath}
[recognition] ${safeTranscript}`);
              }
            } catch (err) {
              asrErrorMessage = err instanceof Error ? err.message : String(err);
              logger?.warn(
                `[voice-asr] transcription failed accountId=${account.accountId} msgId=${String(msg.msgid ?? msg.MsgId ?? "")} detail=${formatASRErrorLog(err)}`
              );
            }
          }
          if (recognition) {
            return makeResult(`[voice] saved:${finalPath}
[recognition] ${recognition}`);
          }
          return makeResult(`[voice] saved:${finalPath}`);
        }
        if (recognition) {
          return makeResult(`[voice] (save failed) ${saved.error ?? ""}
[recognition] ${recognition}`.trim());
        }
        return makeResult(`[voice] (save failed) ${saved.error ?? ""}`.trim());
      }
      if (recognition) {
        return makeResult(`[voice]
[recognition] ${recognition}`);
      }
      return makeResult(extractWecomAppContent(msg));
    } catch (err) {
      const recognition = String(msg.Recognition ?? "").trim();
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (recognition) {
        return makeResult(`[voice] (download error: ${errorMsg})
[recognition] ${recognition}`);
      }
      return makeResult(`[voice] (download error: ${errorMsg})`);
    }
  }
  if (msgtype === "mixed") {
    try {
      const items = msg.mixed?.msg_item;
      if (!Array.isArray(items)) return makeResult(extractWecomAppContent(msg));
      const parts = [];
      for (const item of items) {
        if (!item || typeof item !== "object") continue;
        const typed = item;
        const t = String(typed.msgtype ?? "").toLowerCase();
        if (t === "text") {
          const c = String(typed.text?.content ?? "").trim();
          if (c) parts.push(c);
          continue;
        }
        if (t === "image") {
          const mediaId = String(typed.image?.media_id ?? typed.MediaId ?? typed.media_id ?? "").trim();
          if (mediaId) {
            try {
              const saved = await downloadWecomMediaToFile(account, mediaId, { maxBytes, prefix: "img" });
              if (saved.ok && saved.path) {
                const finalPath = await finalizeInboundMedia(account, saved.path);
                mediaPaths.push(finalPath);
                parts.push(`[image] saved:${finalPath}`);
              } else {
                const url = String(typed.image?.url ?? "").trim();
                parts.push(url ? `[image] ${url}` : "[image]");
              }
            } catch (imgErr) {
              const url = String(typed.image?.url ?? "").trim();
              parts.push(url ? `[image] ${url}` : "[image]");
            }
          } else {
            const url = String(typed.image?.url ?? "").trim();
            parts.push(url ? `[image] ${url}` : "[image]");
          }
          continue;
        }
        if (t) parts.push(`[${t}]`);
      }
      const text = parts.filter(Boolean).join("\n") || "[mixed]";
      return makeResult(text);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return makeResult(`[mixed] (processing error: ${errorMsg})`);
    }
  }
  return makeResult(extractWecomAppContent(msg));
}
function resolveSenderId(msg) {
  const userid = msg.from?.userid?.trim() ?? msg.FromUserName?.trim();
  return userid || "unknown";
}
function resolveChatId(msg, senderId) {
  return senderId;
}
async function buildInboundBody(params) {
  const enriched = await enrichInboundContentWithMedia({
    account: params.account,
    msg: params.msg,
    logger: params.logger
  });
  return { text: enriched.text, asrErrorMessage: enriched.asrErrorMessage, cleanup: enriched.cleanup };
}
async function dispatchWecomAppMessage(params) {
  const { cfg, account, msg, core, hooks } = params;
  const safeCfg = cfg ?? {};
  const logger = createLogger("wecom-app", { log: params.log, error: params.error });
  const senderId = resolveSenderId(msg);
  const chatId = resolveChatId(msg, senderId);
  const accountConfig = account?.config ?? {};
  const dmPolicy = resolveDmPolicy(accountConfig);
  const allowFrom = resolveAllowFrom(accountConfig);
  const policyResult = checkDmPolicy({
    dmPolicy,
    senderId,
    allowFrom
  });
  if (!policyResult.allowed) {
    logger.debug(`policy rejected: ${policyResult.reason}`);
    return;
  }
  const channel = core.channel;
  if (!channel?.routing?.resolveAgentRoute || !channel.reply?.dispatchReplyWithBufferedBlockDispatcher) {
    logger.debug("core routing or buffered dispatcher missing, skipping dispatch");
    return;
  }
  const route = channel.routing.resolveAgentRoute({
    cfg: safeCfg,
    channel: "wecom-app",
    accountId: account.accountId,
    peer: { kind: "dm", id: chatId }
  });
  const { text: rawBody, asrErrorMessage, cleanup } = await buildInboundBody({ account, msg, logger });
  const fromLabel = `user:${senderId}`;
  if (asrErrorMessage) {
    hooks.onChunk(buildVoiceASRFallbackReply(asrErrorMessage));
    await cleanup();
    return;
  }
  const storePath = channel.session?.resolveStorePath?.(safeCfg.session?.store, {
    agentId: route.agentId
  });
  const previousTimestamp = channel.session?.readSessionUpdatedAt ? channel.session.readSessionUpdatedAt({
    storePath,
    sessionKey: route.sessionKey
  }) ?? void 0 : void 0;
  const envelopeOptions = channel.reply?.resolveEnvelopeFormatOptions ? channel.reply.resolveEnvelopeFormatOptions(safeCfg) : void 0;
  const body = channel.reply?.formatAgentEnvelope ? channel.reply.formatAgentEnvelope({
    channel: "WeCom App",
    from: fromLabel,
    previousTimestamp,
    envelope: envelopeOptions,
    body: rawBody
  }) : rawBody;
  const msgid = msg.msgid ?? msg.MsgId ?? void 0;
  const from = `wecom-app:user:${senderId}`;
  const to = `user:${senderId}`;
  const ctxPayload = channel.reply?.finalizeInboundContext ? channel.reply.finalizeInboundContext({
    Body: body,
    RawBody: rawBody,
    CommandBody: rawBody,
    From: from,
    To: to,
    SessionKey: route.sessionKey,
    AccountId: route.accountId ?? account.accountId,
    ChatType: "direct",
    ConversationLabel: fromLabel,
    SenderName: senderId,
    SenderId: senderId,
    Provider: "wecom-app",
    Surface: "wecom-app",
    MessageSid: msgid,
    OriginatingChannel: "wecom-app",
    OriginatingTo: to
  }) : {
    Body: body,
    RawBody: rawBody,
    CommandBody: rawBody,
    From: from,
    To: to,
    SessionKey: route.sessionKey,
    AccountId: route.accountId ?? account.accountId,
    ChatType: "direct",
    ConversationLabel: fromLabel,
    SenderName: senderId,
    SenderId: senderId,
    Provider: "wecom-app",
    Surface: "wecom-app",
    MessageSid: msgid,
    OriginatingChannel: "wecom-app",
    OriginatingTo: to
  };
  const ctxTo = typeof ctxPayload.To === "string" && ctxPayload.To.trim() ? ctxPayload.To.trim() : void 0;
  const ctxOriginatingTo = typeof ctxPayload.OriginatingTo === "string" && ctxPayload.OriginatingTo.trim() ? ctxPayload.OriginatingTo.trim() : void 0;
  const stableTo = ctxOriginatingTo ?? ctxTo ?? to;
  ctxPayload.To = stableTo;
  ctxPayload.OriginatingTo = stableTo;
  ctxPayload.SenderId = senderId;
  ctxPayload.SenderName = senderId;
  ctxPayload.ConversationLabel = fromLabel;
  ctxPayload.CommandAuthorized = true;
  let cronBase = "";
  if (typeof ctxPayload.RawBody === "string" && ctxPayload.RawBody) {
    cronBase = ctxPayload.RawBody;
  } else if (typeof ctxPayload.Body === "string" && ctxPayload.Body) {
    cronBase = ctxPayload.Body;
  } else if (typeof ctxPayload.CommandBody === "string" && ctxPayload.CommandBody) {
    cronBase = ctxPayload.CommandBody;
  }
  if (cronBase) {
    const nextCron = appendCronHiddenPrompt(cronBase);
    if (nextCron !== cronBase) {
      ctxPayload.BodyForAgent = nextCron;
    }
  }
  if (channel.session?.recordInboundSession && storePath) {
    const mainSessionKeyRaw = route?.mainSessionKey;
    const mainSessionKey = typeof mainSessionKeyRaw === "string" && mainSessionKeyRaw.trim() ? mainSessionKeyRaw : void 0;
    const updateLastRoute = {
      sessionKey: mainSessionKey ?? route.sessionKey,
      channel: "wecom-app",
      to: stableTo,
      accountId: route.accountId ?? account.accountId
    };
    const recordSessionKeyRaw = ctxPayload.SessionKey ?? route.sessionKey;
    const recordSessionKey = typeof recordSessionKeyRaw === "string" && recordSessionKeyRaw.trim() ? recordSessionKeyRaw : route.sessionKey;
    await channel.session.recordInboundSession({
      storePath,
      sessionKey: recordSessionKey,
      ctx: ctxPayload,
      updateLastRoute,
      onRecordError: (err) => {
        logger.error(`wecom-app: failed updating session meta: ${String(err)}`);
      }
    });
  }
  const tableMode = channel.text?.resolveMarkdownTableMode ? channel.text.resolveMarkdownTableMode({ cfg: safeCfg, channel: "wecom-app", accountId: account.accountId }) : void 0;
  await channel.reply.dispatchReplyWithBufferedBlockDispatcher({
    ctx: ctxPayload,
    cfg: safeCfg,
    dispatcherOptions: {
      deliver: async (payload) => {
        const rawText = payload.text ?? "";
        if (!rawText.trim()) return;
        const converted = channel.text?.convertMarkdownTables && tableMode ? channel.text.convertMarkdownTables(rawText, tableMode) : rawText;
        hooks.onChunk(converted);
      },
      onError: (err, info) => {
        hooks.onError?.(err);
        logger.error(`${info.kind} reply failed: ${String(err)}`);
      }
    }
  });
  await cleanup();
}

// src/runtime.ts
var runtime = null;
function setWecomAppRuntime(next) {
  runtime = next;
}
function getWecomAppRuntime() {
  if (!runtime) {
    throw new Error("WeCom App runtime not initialized. Make sure the plugin is properly registered with Moltbot.");
  }
  return runtime;
}
function tryGetWecomAppRuntime() {
  return runtime;
}

// src/monitor.ts
var webhookTargets = /* @__PURE__ */ new Map();
var streams = /* @__PURE__ */ new Map();
var msgidToStreamId = /* @__PURE__ */ new Map();
var STREAM_TTL_MS = 10 * 60 * 1e3;
var STREAM_MAX_BYTES = 512e3;
function normalizeWebhookPath(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return "/";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) return withSlash.slice(0, -1);
  return withSlash;
}
function pruneStreams() {
  const cutoff = Date.now() - STREAM_TTL_MS;
  for (const [id, state] of streams.entries()) {
    if (state.updatedAt < cutoff) {
      streams.delete(id);
    }
  }
  for (const [msgid, id] of msgidToStreamId.entries()) {
    if (!streams.has(id)) {
      msgidToStreamId.delete(msgid);
    }
  }
}
function truncateUtf8Bytes(text, maxBytes) {
  const buf = Buffer.from(text, "utf8");
  if (buf.length <= maxBytes) return text;
  const slice = buf.subarray(buf.length - maxBytes);
  return slice.toString("utf8");
}
function splitMessageByBytes(text, maxBytes = 2048) {
  const result = [];
  let current = "";
  let currentBytes = 0;
  for (const char of text) {
    const charBytes = Buffer.byteLength(char, "utf8");
    if (currentBytes + charBytes > maxBytes && current.length > 0) {
      result.push(current);
      current = char;
      currentBytes = charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }
  if (current.length > 0) {
    result.push(current);
  }
  return result;
}
function jsonOk(res, body) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(JSON.stringify(body));
}
async function readRawBody(req, maxBytes) {
  const chunks = [];
  let total = 0;
  return await new Promise((resolve) => {
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        resolve({ ok: false, error: "payload too large" });
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        if (!raw.trim()) {
          resolve({ ok: false, error: "empty payload" });
          return;
        }
        resolve({ ok: true, raw });
      } catch (err) {
        resolve({ ok: false, error: err instanceof Error ? err.message : String(err) });
      }
    });
    req.on("error", (err) => {
      resolve({ ok: false, error: err instanceof Error ? err.message : String(err) });
    });
  });
}
function parseXmlBody(xml) {
  const result = {};
  const cdataRegex = /<([\w:-]+)><!\[CDATA\[([\s\S]*?)\]\]><\/\1>/g;
  let match;
  while ((match = cdataRegex.exec(xml)) !== null) {
    const [, key, value] = match;
    result[key] = value;
  }
  const simpleRegex = /<([\w:-]+)>([^<]*)<\/\1>/g;
  while ((match = simpleRegex.exec(xml)) !== null) {
    const [, key, value] = match;
    if (!result[key]) {
      result[key] = value;
    }
  }
  return result;
}
function isXmlFormat(raw) {
  const trimmed = raw.trim();
  return trimmed.startsWith("<") && trimmed.endsWith(">");
}
function buildEncryptedJsonReply(params) {
  const plaintext = JSON.stringify(params.plaintextJson ?? {});
  const encrypt = encryptWecomAppPlaintext({
    encodingAESKey: params.account.encodingAESKey ?? "",
    receiveId: params.account.receiveId ?? "",
    plaintext
  });
  const msgsignature = computeWecomAppMsgSignature({
    token: params.account.token ?? "",
    timestamp: params.timestamp,
    nonce: params.nonce,
    encrypt
  });
  return {
    encrypt,
    msgsignature,
    timestamp: params.timestamp,
    nonce: params.nonce
  };
}
function resolveQueryParams(req) {
  const url = new URL(req.url ?? "/", "http://localhost");
  return url.searchParams;
}
function resolvePath(req) {
  const url = new URL(req.url ?? "/", "http://localhost");
  return normalizeWebhookPath(url.pathname || "/");
}
function resolveSignatureParam(params) {
  return params.get("msg_signature") ?? params.get("msgsignature") ?? params.get("signature") ?? "";
}
function buildStreamPlaceholderReply(streamId) {
  return {
    msgtype: "stream",
    stream: {
      id: streamId,
      finish: false,
      content: "\u7A0D\u7B49~"
    }
  };
}
function buildStreamReplyFromState(state) {
  const content = truncateUtf8Bytes(state.content, STREAM_MAX_BYTES);
  return {
    msgtype: "stream",
    stream: {
      id: state.streamId,
      finish: state.finished,
      content
    }
  };
}
function createStreamId() {
  return crypto.randomBytes(16).toString("hex");
}
function parseWecomAppPlainMessage(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    const xmlData = parseXmlBody(trimmed);
    return {
      msgtype: xmlData.MsgType,
      MsgType: xmlData.MsgType,
      msgid: xmlData.MsgId,
      MsgId: xmlData.MsgId,
      content: xmlData.Content,
      Content: xmlData.Content,
      from: xmlData.FromUserName ? { userid: xmlData.FromUserName } : void 0,
      FromUserName: xmlData.FromUserName,
      ToUserName: xmlData.ToUserName,
      CreateTime: xmlData.CreateTime ? Number(xmlData.CreateTime) : void 0,
      AgentID: xmlData.AgentID ? Number(xmlData.AgentID) : void 0,
      // image fields
      PicUrl: xmlData.PicUrl,
      MediaId: xmlData.MediaId,
      image: xmlData.PicUrl ? { url: xmlData.PicUrl } : void 0,
      // voice fields
      Recognition: xmlData.Recognition,
      Format: xmlData.Format,
      // location fields (MsgType=location)
      Location_X: xmlData.Location_X,
      Location_Y: xmlData.Location_Y,
      Scale: xmlData.Scale,
      Label: xmlData.Label,
      Poiname: xmlData.Poiname,
      // location event fields (Event=LOCATION)
      Latitude: xmlData.Latitude,
      Longitude: xmlData.Longitude,
      Precision: xmlData.Precision,
      location: xmlData.Location_X || xmlData.Location_Y || xmlData.Label || xmlData.Scale ? {
        latitude: xmlData.Location_X,
        longitude: xmlData.Location_Y,
        label: xmlData.Label || xmlData.Poiname,
        scale: xmlData.Scale
      } : void 0,
      // 事件类型
      Event: xmlData.Event
    };
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}
function resolveInboundAgentId(msg) {
  const raw = msg.AgentID ?? msg.AgentId ?? msg.agentid ?? msg.agentId ?? msg.agent_id;
  if (raw === void 0 || raw === null) return void 0;
  const parsed = typeof raw === "number" ? raw : Number.parseInt(String(raw), 10);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function decryptWecomAppCandidates(params) {
  const results = [];
  for (const candidate of params.candidates) {
    if (!candidate.account.encodingAESKey) continue;
    try {
      const plaintext = decryptWecomAppEncrypted({
        encodingAESKey: candidate.account.encodingAESKey,
        receiveId: candidate.account.receiveId,
        encrypt: params.encrypt
      });
      const msg = parseWecomAppPlainMessage(plaintext);
      const agentId = resolveInboundAgentId(msg);
      results.push({ target: candidate, plaintext, msg, agentId });
    } catch {
    }
  }
  return results;
}
function selectDecryptedTarget(params) {
  if (params.candidates.length === 1) return params.candidates[0];
  const matchedByAgentId = params.candidates.filter((candidate) => {
    const inboundAgentId = candidate.agentId;
    return typeof inboundAgentId === "number" && candidate.target.account.agentId === inboundAgentId;
  });
  if (matchedByAgentId.length === 1) return matchedByAgentId[0];
  const accountIds = params.candidates.map((candidate) => candidate.target.account.accountId).join(", ");
  params.logger.warn(`multiple wecom-app accounts matched signature; using first match (accounts: ${accountIds})`);
  return params.candidates[0];
}
function appendStreamContent(state, nextText) {
  const content = state.content ? `${state.content}

${nextText}`.trim() : nextText.trim();
  state.content = truncateUtf8Bytes(content, STREAM_MAX_BYTES);
  state.updatedAt = Date.now();
}
function buildLogger(target) {
  return createLogger("wecom-app", {
    log: target.runtime.log,
    error: target.runtime.error
  });
}
function registerWecomAppWebhookTarget(target) {
  const key = normalizeWebhookPath(target.path);
  const normalizedTarget = { ...target, path: key };
  const existing = webhookTargets.get(key) ?? [];
  const next = [...existing, normalizedTarget];
  webhookTargets.set(key, next);
  return () => {
    const updated = (webhookTargets.get(key) ?? []).filter((entry) => entry !== normalizedTarget);
    if (updated.length > 0) webhookTargets.set(key, updated);
    else webhookTargets.delete(key);
  };
}
async function handleWecomAppWebhookRequest(req, res) {
  pruneStreams();
  const path = resolvePath(req);
  const targets = webhookTargets.get(path);
  if (!targets || targets.length === 0) return false;
  const query = resolveQueryParams(req);
  const timestamp = query.get("timestamp") ?? "";
  const nonce = query.get("nonce") ?? "";
  const signature = resolveSignatureParam(query);
  const primary = targets[0];
  const logger = buildLogger(primary);
  if (req.method === "GET") {
    const echostr = query.get("echostr") ?? "";
    if (!timestamp || !nonce || !signature || !echostr) {
      res.statusCode = 400;
      res.end("missing query params");
      return true;
    }
    const signatureMatched2 = targets.filter((candidate) => {
      if (!candidate.account.token) return false;
      return verifyWecomAppSignature({
        token: candidate.account.token,
        timestamp,
        nonce,
        encrypt: echostr,
        signature
      });
    });
    if (signatureMatched2.length === 0) {
      res.statusCode = 401;
      res.end("unauthorized");
      return true;
    }
    const decryptable2 = signatureMatched2.filter((candidate) => Boolean(candidate.account.encodingAESKey));
    if (decryptable2.length === 0) {
      res.statusCode = 401;
      res.end("unauthorized");
      return true;
    }
    const decryptedCandidates2 = decryptWecomAppCandidates({
      candidates: decryptable2,
      encrypt: echostr
    });
    if (decryptedCandidates2.length === 0) {
      res.statusCode = 400;
      res.end("decrypt failed");
      return true;
    }
    const selected2 = selectDecryptedTarget({ candidates: decryptedCandidates2, logger });
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(selected2.plaintext);
    return true;
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST");
    res.end("Method Not Allowed");
    return true;
  }
  if (!timestamp || !nonce || !signature) {
    res.statusCode = 400;
    res.end("missing query params");
    return true;
  }
  const body = await readRawBody(req, 1024 * 1024);
  if (!body.ok || !body.raw) {
    res.statusCode = body.error === "payload too large" ? 413 : 400;
    res.end(body.error ?? "invalid payload");
    return true;
  }
  const rawBody = body.raw;
  let encrypt = "";
  let msgSignature = signature;
  let msgTimestamp = timestamp;
  let msgNonce = nonce;
  if (isXmlFormat(rawBody)) {
    const xmlData = parseXmlBody(rawBody);
    encrypt = xmlData.Encrypt ?? "";
    msgSignature = xmlData.MsgSignature ?? signature;
    msgTimestamp = xmlData.TimeStamp ?? timestamp;
    msgNonce = xmlData.Nonce ?? nonce;
    logger.info(`[wecom-app] inbound xml parsed: hasEncrypt=${Boolean(encrypt)}, msg_signature=${msgSignature ? "yes" : "no"}`);
  } else {
    try {
      const record = JSON.parse(rawBody);
      encrypt = String(record.encrypt ?? record.Encrypt ?? "");
    } catch {
      res.statusCode = 400;
      res.end("invalid payload format");
      return true;
    }
  }
  if (!encrypt) {
    res.statusCode = 400;
    res.end("missing encrypt");
    return true;
  }
  const signatureMatched = targets.filter((candidate) => {
    if (!candidate.account.token) return false;
    return verifyWecomAppSignature({
      token: candidate.account.token,
      timestamp: msgTimestamp,
      nonce: msgNonce,
      encrypt,
      signature: msgSignature
    });
  });
  if (signatureMatched.length === 0) {
    res.statusCode = 401;
    res.end("unauthorized");
    return true;
  }
  const decryptable = signatureMatched.filter((candidate) => Boolean(candidate.account.encodingAESKey));
  if (decryptable.length === 0) {
    res.statusCode = 500;
    res.end("wecom-app not configured");
    return true;
  }
  const decryptedCandidates = decryptWecomAppCandidates({
    candidates: decryptable,
    encrypt
  });
  if (decryptedCandidates.length === 0) {
    res.statusCode = 400;
    res.end("decrypt failed");
    return true;
  }
  const selected = selectDecryptedTarget({ candidates: decryptedCandidates, logger });
  const target = selected.target;
  if (!target.account.configured || !target.account.token || !target.account.encodingAESKey) {
    res.statusCode = 500;
    res.end("wecom-app not configured");
    return true;
  }
  selected.plaintext;
  const msg = selected.msg;
  try {
    const mt3 = String(msg?.msgtype ?? msg?.MsgType ?? "");
    const mid = String(msg?.MediaId ?? msg?.media_id ?? msg?.image?.media_id ?? "");
    const pic = String(msg?.PicUrl ?? msg?.image?.url ?? "");
    logger.info(`[wecom-app] inbound msg parsed: msgtype=${mt3} MediaId=${mid ? "yes" : "no"} PicUrl=${pic ? "yes" : "no"}`);
  } catch {
  }
  target.statusSink?.({ lastInboundAt: Date.now() });
  const msgtype = String(msg.msgtype ?? msg.MsgType ?? "").toLowerCase();
  const msgid = msg.msgid ?? msg.MsgId ? String(msg.msgid ?? msg.MsgId) : void 0;
  if (msgtype === "stream") {
    const streamId2 = String(msg.stream?.id ?? "").trim();
    const state = streamId2 ? streams.get(streamId2) : void 0;
    const reply = state ? buildStreamReplyFromState(state) : buildStreamReplyFromState({
      streamId: streamId2 || "unknown",
      finished: true,
      content: ""
    });
    jsonOk(
      res,
      buildEncryptedJsonReply({
        account: target.account,
        plaintextJson: reply,
        nonce: msgNonce,
        timestamp: msgTimestamp
      })
    );
    return true;
  }
  if (msgid && msgidToStreamId.has(msgid)) {
    const streamId2 = msgidToStreamId.get(msgid) ?? "";
    const reply = buildStreamPlaceholderReply(streamId2);
    jsonOk(
      res,
      buildEncryptedJsonReply({
        account: target.account,
        plaintextJson: reply,
        nonce: msgNonce,
        timestamp: msgTimestamp
      })
    );
    return true;
  }
  if (msgtype === "event") {
    const eventtype = String(
      msg.event?.eventtype ?? msg.Event ?? ""
    ).toLowerCase();
    if (eventtype === "enter_chat" || eventtype === "subscribe") {
      const welcome = target.account.config.welcomeText?.trim();
      if (welcome && target.account.canSendActive) {
        const senderId2 = msg.from?.userid?.trim() ?? msg.FromUserName?.trim();
        if (senderId2) {
          sendWecomAppMessage(target.account, { userId: senderId2 }, welcome).catch((err) => {
            logger.error(`failed to send welcome message: ${String(err)}`);
          });
        }
      }
      jsonOk(
        res,
        buildEncryptedJsonReply({
          account: target.account,
          plaintextJson: {},
          nonce: msgNonce,
          timestamp: msgTimestamp
        })
      );
      return true;
    }
    jsonOk(
      res,
      buildEncryptedJsonReply({
        account: target.account,
        plaintextJson: {},
        nonce: msgNonce,
        timestamp: msgTimestamp
      })
    );
    return true;
  }
  const streamId = createStreamId();
  if (msgid) msgidToStreamId.set(msgid, streamId);
  streams.set(streamId, {
    streamId,
    msgid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    started: false,
    finished: false,
    content: ""
  });
  const core = tryGetWecomAppRuntime();
  const senderId = msg.from?.userid?.trim() ?? msg.FromUserName?.trim();
  const chatid = msg.chatid?.trim();
  if (core) {
    const state = streams.get(streamId);
    if (state) state.started = true;
    const hooks = {
      onChunk: (text) => {
        const current = streams.get(streamId);
        if (!current) return;
        appendStreamContent(current, text);
        target.statusSink?.({ lastOutboundAt: Date.now() });
      },
      onError: (err) => {
        const current = streams.get(streamId);
        if (current) {
          current.error = err instanceof Error ? err.message : String(err);
          current.content = current.content || `Error: ${current.error}`;
          current.finished = true;
          current.updatedAt = Date.now();
        }
        logger.error(`wecom-app agent failed: ${String(err)}`);
      }
    };
    dispatchWecomAppMessage({
      cfg: target.config,
      account: target.account,
      msg,
      core,
      hooks,
      log: target.runtime.log,
      error: target.runtime.error
    }).then(async () => {
      const current = streams.get(streamId);
      if (current) {
        current.finished = true;
        current.updatedAt = Date.now();
        if (target.account.canSendActive && (senderId || chatid) && current.content.trim()) {
          try {
            const formattedText = stripMarkdown(current.content);
            const chunks = splitMessageByBytes(formattedText, 2048);
            for (const chunk of chunks) {
              await sendWecomAppMessage(
                target.account,
                chatid ? { chatid } : { userId: senderId },
                chunk
              );
            }
            logger.info(`\u4E3B\u52A8\u53D1\u9001\u5B8C\u6210: streamId=${streamId}, \u5171 ${chunks.length} \u6BB5`);
          } catch (err) {
            logger.error(`\u4E3B\u52A8\u53D1\u9001\u5931\u8D25: ${String(err)}`);
          }
        }
      }
    }).catch((err) => {
      const current = streams.get(streamId);
      if (current) {
        current.error = err instanceof Error ? err.message : String(err);
        current.content = current.content || `Error: ${current.error}`;
        current.finished = true;
        current.updatedAt = Date.now();
      }
      logger.error(`wecom-app agent failed: ${String(err)}`);
    });
  } else {
    const state = streams.get(streamId);
    if (state) {
      state.finished = true;
      state.updatedAt = Date.now();
    }
  }
  const placeholderReply = buildStreamPlaceholderReply(streamId);
  jsonOk(
    res,
    buildEncryptedJsonReply({
      account: target.account,
      plaintextJson: placeholderReply,
      nonce: msgNonce,
      timestamp: msgTimestamp
    })
  );
  return true;
}
async function hasFfmpeg() {
  return new Promise((resolve) => {
    const p = spawn("ffmpeg", ["-version"], { stdio: "ignore" });
    p.on("error", () => resolve(false));
    p.on("exit", (code) => resolve(code === 0));
  });
}
async function transcodeToAmr(params) {
  const args = ["-y", "-i", params.inputPath, "-ar", "8000", "-ac", "1", "-c:a", "amr_nb", params.outputPath];
  await new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr?.on("data", (d2) => err += String(d2));
    p.on("error", (e2) => reject(e2));
    p.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`ffmpeg transcode failed (code=${code}): ${err.slice(0, 2e3)}`));
    });
  });
}

// src/channel.ts
var BARE_USER_ID_RE = /^[a-z0-9][a-z0-9._@-]{0,63}$/;
var EXPLICIT_USER_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._@-]{0,63}$/;
function looksLikeEmail(raw) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}
function parseDirectTarget(rawTarget) {
  let raw = String(rawTarget ?? "").trim();
  if (!raw) return null;
  if (raw.startsWith("wecom-app:")) {
    raw = raw.slice("wecom-app:".length);
  }
  let accountId;
  if (!looksLikeEmail(raw)) {
    const atIdx = raw.lastIndexOf("@");
    if (atIdx > 0 && atIdx < raw.length - 1) {
      const candidate = raw.slice(atIdx + 1);
      if (!/[:/]/.test(candidate)) {
        accountId = candidate;
        raw = raw.slice(0, atIdx);
      }
    }
  }
  if (raw.startsWith("group:")) return null;
  const explicitUserPrefix = raw.startsWith("user:");
  if (explicitUserPrefix) raw = raw.slice(5);
  const userId = raw.trim();
  if (!userId) return null;
  if (/\s/.test(userId)) return null;
  if (!explicitUserPrefix && !BARE_USER_ID_RE.test(userId)) return null;
  if (explicitUserPrefix && !EXPLICIT_USER_ID_RE.test(userId)) return null;
  return { accountId, userId };
}
function detectMediaType2(filePath, mimeType) {
  if (mimeType) {
    const mime = mimeType.split(";")[0].trim().toLowerCase();
    if (mime.includes("svg")) {
      return "file";
    }
    if (mime.startsWith("image/")) {
      return "image";
    }
    if (mime === "audio/wav" || mime === "audio/x-wav") {
      return "file";
    }
    if (mime.startsWith("audio/") || mime === "audio/amr") {
      return "voice";
    }
    if (mime.startsWith("video/") && (mime === "video/mp4" || mime === "video/mpeg")) {
      return "video";
    }
  }
  const ext = filePath.toLowerCase().split("?")[0].split(".").pop();
  if (!ext) {
    return "file";
  }
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  if (imageExts.includes(ext)) {
    return "image";
  }
  if (ext === "svg") {
    return "file";
  }
  const voiceExts = ["amr", "speex", "mp3"];
  if (voiceExts.includes(ext)) {
    return "voice";
  }
  if (ext === "wav") {
    return "file";
  }
  if (ext === "mp4") {
    return "video";
  }
  return "file";
}
var meta = {
  id: "wecom-app",
  label: "WeCom App",
  selectionLabel: "WeCom Self-built App (\u4F01\u5FAE\u81EA\u5EFA\u5E94\u7528)",
  docsPath: "/channels/wecom-app",
  docsLabel: "wecom-app",
  blurb: "\u4F01\u4E1A\u5FAE\u4FE1\u81EA\u5EFA\u5E94\u7528\uFF0C\u652F\u6301\u4E3B\u52A8\u53D1\u9001\u6D88\u606F",
  aliases: ["qywx-app", "\u4F01\u5FAE\u81EA\u5EFA\u5E94\u7528", "\u4F01\u4E1A\u5FAE\u4FE1\u81EA\u5EFA\u5E94\u7528"],
  order: 84
};
var unregisterHooks = /* @__PURE__ */ new Map();
var wecomAppPlugin = {
  id: "wecom-app",
  meta: {
    ...meta
  },
  capabilities: {
    chatTypes: ["direct"],
    media: true,
    reactions: false,
    threads: false,
    edit: false,
    reply: true,
    polls: false,
    /** 自建应用支持主动发送 */
    activeSend: true
  },
  messaging: {
    normalizeTarget: (raw) => {
      const parsed = parseDirectTarget(raw);
      if (!parsed) return void 0;
      return `user:${parsed.userId}${parsed.accountId ? `@${parsed.accountId}` : ""}`;
    },
    targetResolver: {
      looksLikeId: (raw, normalized) => {
        const candidate = (normalized ?? raw).trim();
        return Boolean(parseDirectTarget(candidate));
      },
      hint: "Use WeCom UserID only: user:<userid> (optional @accountId). Do not use display names."
    },
    formatTargetDisplay: (params) => {
      const parsed = parseDirectTarget(params.target);
      if (!parsed) return params.display?.trim() || params.target;
      return `user:${parsed.userId}`;
    }
  },
  configSchema: WecomAppConfigJsonSchema,
  reload: { configPrefixes: ["channels.wecom-app"] },
  config: {
    listAccountIds: (cfg) => listWecomAppAccountIds(cfg),
    resolveAccount: (cfg, accountId) => resolveWecomAppAccount({ cfg, accountId }),
    defaultAccountId: (cfg) => resolveDefaultWecomAppAccountId(cfg),
    setAccountEnabled: (params) => {
      const accountId = params.accountId ?? DEFAULT_ACCOUNT_ID;
      const useAccount = Boolean(params.cfg.channels?.["wecom-app"]?.accounts?.[accountId]);
      if (!useAccount) {
        return {
          ...params.cfg,
          channels: {
            ...params.cfg.channels,
            "wecom-app": {
              ...params.cfg.channels?.["wecom-app"] ?? {},
              enabled: params.enabled
            }
          }
        };
      }
      return {
        ...params.cfg,
        channels: {
          ...params.cfg.channels,
          "wecom-app": {
            ...params.cfg.channels?.["wecom-app"] ?? {},
            accounts: {
              ...params.cfg.channels?.["wecom-app"]?.accounts ?? {},
              [accountId]: {
                ...params.cfg.channels?.["wecom-app"]?.accounts?.[accountId] ?? {},
                enabled: params.enabled
              }
            }
          }
        }
      };
    },
    deleteAccount: (params) => {
      const accountId = params.accountId ?? DEFAULT_ACCOUNT_ID;
      const next = { ...params.cfg };
      const current = next.channels?.["wecom-app"];
      if (!current) return next;
      if (accountId === DEFAULT_ACCOUNT_ID) {
        const { accounts: _ignored, defaultAccount: _ignored2, ...rest } = current;
        next.channels = {
          ...next.channels,
          "wecom-app": { ...rest, enabled: false }
        };
        return next;
      }
      const accounts = { ...current.accounts ?? {} };
      delete accounts[accountId];
      next.channels = {
        ...next.channels,
        "wecom-app": {
          ...current,
          accounts: Object.keys(accounts).length > 0 ? accounts : void 0
        }
      };
      return next;
    },
    isConfigured: (account) => account.configured,
    describeAccount: (account) => ({
      accountId: account.accountId,
      name: account.name,
      enabled: account.enabled,
      configured: account.configured,
      canSendActive: account.canSendActive,
      webhookPath: account.config.webhookPath ?? "/wecom-app"
    }),
    resolveAllowFrom: (params) => {
      const account = resolveWecomAppAccount({ cfg: params.cfg, accountId: params.accountId });
      return resolveAllowFrom(account.config);
    },
    formatAllowFrom: (params) => params.allowFrom.map((entry) => String(entry).trim()).filter(Boolean).map((entry) => entry.toLowerCase())
  },
  /**
   * 目录解析 - 用于将 wecom-app:XXX 格式的 target 解析为可投递目标
   *
   * 支持的输入格式：
   * - "wecom-app:user:xxx" → { channel: "wecom-app", to: "xxx" }
   * - "user:xxx" → { channel: "wecom-app", to: "xxx" }
   * - "xxx" (仅小写 ID 风格) → { channel: "wecom-app", to: "xxx" }
   * - 带 accountId: "user:xxx@account1" → { channel: "wecom-app", accountId: "account1", to: "xxx" }
   */
  directory: {
    /**
     * 检查此通道是否可以解析给定的目标格式
     * 用于框架层判断是否调用 resolveTarget
     */
    canResolve: (params) => {
      return Boolean(parseDirectTarget(params.target));
    },
    /**
     * 解析单个目标地址
     * 将各种格式的 target 解析为可用的投递对象
     * 
     * IMPORTANT: 返回的 `to` 字段必须是纯 ID（不含 user:/group: 前缀），
     * 因为 OpenClaw 框架会用这个值来匹配 inbound context 中的 From/To 字段。
     * 
     * 例如：如果 inbound context 的 From 是 "wecom-app:user:CaiHongYu"，
     * 那么 resolveTarget 必须返回 { channel: "wecom-app", to: "CaiHongYu" }，
     * 而不是 { channel: "wecom-app", to: "user:CaiHongYu" }。
     */
    resolveTarget: (params) => {
      const parsed = parseDirectTarget(params.target);
      if (!parsed) return null;
      return { channel: "wecom-app", accountId: parsed.accountId, to: parsed.userId };
    },
    /**
     * 批量解析多个目标地址
     * 用于框架层批量发送消息
     */
    resolveTargets: (params) => {
      const results = [];
      for (const target of params.targets) {
        const resolved = wecomAppPlugin.directory.resolveTarget({
          cfg: params.cfg,
          target
        });
        if (resolved) {
          results.push(resolved);
        }
      }
      return results;
    },
    /**
     * 获取此通道支持的目标格式说明
     * 用于帮助信息和错误提示
     * 
     * 注意：虽然支持多种输入格式，但 resolveTarget 返回的 `to` 字段
     * 始终是纯 ID（不含前缀），以便框架正确匹配 inbound context。
     */
    getTargetFormats: () => [
      "wecom-app:user:<userId>",
      "user:<userId>",
      "<userid-lowercase>"
    ]
  },
  /**
   * 主动发送消息 (自建应用特有功能)
   */
  outbound: {
    deliveryMode: "direct",
    /**
     * 主动发送文本消息
     */
    sendText: async (params) => {
      const account = resolveWecomAppAccount({ cfg: params.cfg, accountId: params.accountId });
      if (!account.canSendActive) {
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error: new Error("Account not configured for active sending (missing corpId, corpSecret, or agentId)")
        };
      }
      const parsed = parseDirectTarget(params.to);
      if (!parsed) {
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error: new Error(`Unsupported target for WeCom App: ${params.to}`)
        };
      }
      const target = { userId: parsed.userId };
      try {
        const result = await sendWecomAppMessage(account, target, params.text);
        return {
          channel: "wecom-app",
          ok: result.ok,
          messageId: result.msgid ?? "",
          error: result.ok ? void 0 : new Error(result.errmsg ?? "send failed")
        };
      } catch (err) {
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error: err instanceof Error ? err : new Error(String(err))
        };
      }
    },
    /**
     * 发送媒体消息（支持图片、语音、文件）
     * OpenClaw outbound 适配器要求的接口
     */
    sendMedia: async (params) => {
      console.log(`[wecom-app] sendMedia called: to=${params.to}, mediaUrl=${params.mediaUrl}`);
      const account = resolveWecomAppAccount({
        cfg: params.cfg,
        accountId: params.accountId
      });
      console.log(`[wecom-app] Account resolved: canSendActive=${account.canSendActive}`);
      if (!account.canSendActive) {
        const error = new Error("Account not configured for active sending (missing corpId, corpSecret, or agentId)");
        console.error(`[wecom-app] sendMedia error:`, error.message);
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error
        };
      }
      const parsed = parseDirectTarget(params.to);
      if (!parsed) {
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error: new Error(`Unsupported target for WeCom App: ${params.to}`)
        };
      }
      const target = { userId: parsed.userId };
      console.log(`[wecom-app] Target parsed:`, target);
      const mediaType = detectMediaType2(params.mediaUrl, params.mimeType);
      console.log(`[wecom-app] Detected media type: ${mediaType}, file: ${params.mediaUrl}`);
      try {
        let result;
        if (mediaType === "image") {
          console.log(`[wecom-app] Routing to downloadAndSendImage`);
          result = await downloadAndSendImage(account, target, params.mediaUrl);
        } else if (mediaType === "voice") {
          console.log(`[wecom-app] Routing to downloadAndSendVoice`);
          const voiceUrl = params.mediaUrl;
          const ext = (voiceUrl.split("?")[0].match(/\.([^.]+)$/)?.[1] || "").toLowerCase();
          const likelyUnsupported = ext === "wav" || ext === "mp3";
          const transcodeEnabled = Boolean(account.config.voiceTranscode?.enabled);
          if (likelyUnsupported && transcodeEnabled) {
            const can = await hasFfmpeg();
            if (can) {
              try {
                if (!voiceUrl.startsWith("http://") && !voiceUrl.startsWith("https://")) {
                  const os = await import('os');
                  const path = await import('path');
                  const fs = await import('fs');
                  const out = path.join(os.tmpdir(), `wecom-app-voice-${Date.now()}.amr`);
                  console.log(`[wecom-app] voiceTranscode: ffmpeg available, transcoding ${voiceUrl} -> ${out}`);
                  await transcodeToAmr({ inputPath: voiceUrl, outputPath: out });
                  result = await downloadAndSendVoice(account, target, out);
                  try {
                    await fs.promises.unlink(out);
                  } catch {
                  }
                } else {
                  console.warn(`[wecom-app] voiceTranscode enabled but mediaUrl is remote; fallback to file send (download once is not implemented yet)`);
                  result = await downloadAndSendFile(account, target, voiceUrl);
                }
              } catch (e2) {
                console.warn(`[wecom-app] voiceTranscode failed; fallback to file send:`, e2);
                result = await downloadAndSendFile(account, target, voiceUrl);
              }
            } else {
              console.warn(`[wecom-app] voiceTranscode enabled but ffmpeg not found; fallback to file send`);
              result = await downloadAndSendFile(account, target, voiceUrl);
            }
          } else if (likelyUnsupported) {
            console.log(`[wecom-app] Voice format .${ext} likely unsupported; fallback to file send`);
            result = await downloadAndSendFile(account, target, voiceUrl);
          } else {
            result = await downloadAndSendVoice(account, target, voiceUrl);
          }
        } else if (mediaType === "video") {
          console.log(`[wecom-app] Routing to downloadAndSendVideo`);
          result = await downloadAndSendVideo(account, target, params.mediaUrl);
        } else {
          if (params.text?.trim()) {
            try {
              console.log(`[wecom-app] Sending caption text before file: ${params.text}`);
              await sendWecomAppMessage(account, target, params.text);
            } catch (err) {
              console.warn(`[wecom-app] Failed to send caption before file:`, err);
            }
          }
          console.log(`[wecom-app] Routing to downloadAndSendFile`);
          result = await downloadAndSendFile(account, target, params.mediaUrl);
        }
        console.log(`[wecom-app] Media send returned: ok=${result.ok}, msgid=${result.msgid}, errcode=${result.errcode}, errmsg=${result.errmsg}`);
        return {
          channel: "wecom-app",
          ok: result.ok,
          messageId: result.msgid ?? "",
          error: result.ok ? void 0 : new Error(result.errmsg ?? "send failed")
        };
      } catch (err) {
        console.error(`[wecom-app] sendMedia catch error:`, err);
        return {
          channel: "wecom-app",
          ok: false,
          messageId: "",
          error: err instanceof Error ? err : new Error(String(err))
        };
      }
    }
  },
  gateway: {
    startAccount: async (ctx) => {
      ctx.setStatus?.({ accountId: ctx.accountId });
      if (ctx.runtime) {
        const candidate = ctx.runtime;
        if (candidate.channel?.routing?.resolveAgentRoute && candidate.channel?.reply?.dispatchReplyFromConfig) {
          setWecomAppRuntime(ctx.runtime);
        }
      }
      const account = resolveWecomAppAccount({ cfg: ctx.cfg, accountId: ctx.accountId });
      if (!account.configured) {
        ctx.log?.info(`[wecom-app] account ${ctx.accountId} not configured; webhook not registered`);
        ctx.setStatus?.({ accountId: ctx.accountId, running: false, configured: false });
        return;
      }
      const path = (account.config.webhookPath ?? "/wecom-app").trim();
      const unregister = registerWecomAppWebhookTarget({
        account,
        config: ctx.cfg ?? {},
        runtime: {
          log: ctx.log?.info ?? console.log,
          error: ctx.log?.error ?? console.error
        },
        path,
        statusSink: (patch) => ctx.setStatus?.({ accountId: ctx.accountId, ...patch })
      });
      const existing = unregisterHooks.get(ctx.accountId);
      if (existing) existing();
      unregisterHooks.set(ctx.accountId, unregister);
      ctx.log?.info(`[wecom-app] webhook registered at ${path} for account ${ctx.accountId} (canSendActive=${account.canSendActive})`);
      ctx.setStatus?.({
        accountId: ctx.accountId,
        running: true,
        configured: true,
        canSendActive: account.canSendActive,
        webhookPath: path,
        lastStartAt: Date.now()
      });
      try {
        await new Promise((resolve) => {
          if (ctx.abortSignal?.aborted) {
            resolve();
            return;
          }
          if (!ctx.abortSignal) {
            return;
          }
          ctx.abortSignal.addEventListener("abort", () => resolve(), { once: true });
        });
      } finally {
        const current = unregisterHooks.get(ctx.accountId);
        if (current === unregister) {
          unregisterHooks.delete(ctx.accountId);
        }
        unregister();
        ctx.setStatus?.({ accountId: ctx.accountId, running: false, lastStopAt: Date.now() });
      }
    },
    stopAccount: async (ctx) => {
      const unregister = unregisterHooks.get(ctx.accountId);
      if (unregister) {
        unregister();
        unregisterHooks.delete(ctx.accountId);
      }
      ctx.setStatus?.({ accountId: ctx.accountId, running: false, lastStopAt: Date.now() });
    }
  }
};

// src/send.ts
function normalizeTarget(target, type) {
  let normalized = target.trim();
  const channelPrefix = "wecom-app:";
  if (normalized.startsWith(channelPrefix)) {
    normalized = normalized.slice(channelPrefix.length);
  }
  if (type === "user" && normalized.startsWith("user:")) {
    return normalized;
  }
  if (normalized.startsWith("user:")) {
    normalized = normalized.slice(5);
  }
  return `user:${normalized}`;
}
function parseTarget(target) {
  if (target.startsWith("user:")) {
    return { userId: target.slice(5) };
  }
  return { userId: target };
}
async function sendWecomDM(account, userId, options) {
  if (!account.canSendActive) {
    return {
      ok: false,
      error: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  const normalizedTarget = normalizeTarget(userId, "user");
  const target = parseTarget(normalizedTarget);
  return sendMessage(account, target, options);
}
async function sendMessage(account, target, options) {
  const results = [];
  if (options.text?.trim()) {
    try {
      const textResult = await sendWecomAppMessage(account, target, options.text);
      results.push({
        ok: textResult.ok,
        msgid: textResult.msgid,
        error: textResult.ok ? void 0 : textResult.errmsg
      });
    } catch (err) {
      results.push({
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
  if (options.mediaPath?.trim()) {
    try {
      const mediaResult = await downloadAndSendImage(account, target, options.mediaPath);
      results.push({
        ok: mediaResult.ok,
        msgid: mediaResult.msgid,
        error: mediaResult.ok ? void 0 : mediaResult.errmsg
      });
    } catch (err) {
      results.push({
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
  if (results.length === 0) {
    return {
      ok: false,
      error: "No content to send (need text or mediaPath)"
    };
  }
  const allOk = results.every((r) => r.ok);
  const errors = results.filter((r) => r.error).map((r) => r.error);
  const msgids = results.filter((r) => r.msgid).map((r) => r.msgid);
  return {
    ok: allOk,
    msgid: msgids.join(",") || void 0,
    error: errors.length > 0 ? errors.join("; ") : void 0
  };
}
async function sendWecom(account, target, options) {
  if (!account.canSendActive) {
    return {
      ok: false,
      error: "Account not configured for active sending (missing corpId, corpSecret, or agentId)"
    };
  }
  let normalizedTarget = target.trim();
  const channelPrefix = "wecom-app:";
  if (normalizedTarget.startsWith(channelPrefix)) {
    normalizedTarget = normalizedTarget.slice(channelPrefix.length);
  }
  const parsedTarget = parseTarget(normalizedTarget);
  return sendMessage(account, parsedTarget, options);
}

// index.ts
var plugin = {
  id: "wecom-app",
  name: "WeCom App",
  description: "\u4F01\u4E1A\u5FAE\u4FE1\u81EA\u5EFA\u5E94\u7528\u63D2\u4EF6\uFF0C\u652F\u6301\u4E3B\u52A8\u53D1\u9001\u6D88\u606F",
  configSchema: {
    type: "object",
    additionalProperties: false,
    properties: {}
  },
  register(api) {
    registerChinaSetupCli(api, { channels: ["wecom-app"] });
    showChinaInstallHint(api);
    if (api.runtime) {
      setWecomAppRuntime(api.runtime);
    }
    api.registerChannel({ plugin: wecomAppPlugin });
    if (api.registerHttpHandler) {
      api.registerHttpHandler(handleWecomAppWebhookRequest);
    }
  }
};
var index_default = plugin;

export { DEFAULT_ACCOUNT_ID, clearAccessTokenCache, clearAllAccessTokenCache, index_default as default, downloadAndSendImage, getAccessToken, getWecomAppRuntime, normalizeTarget, parseTarget, sendWecom, sendWecomAppImageMessage, sendWecomAppMarkdownMessage, sendWecomAppMessage, sendWecomDM, setWecomAppRuntime, stripMarkdown, wecomAppPlugin };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map