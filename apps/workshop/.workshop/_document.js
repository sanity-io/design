var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../packages/@sanity/ui-workshop/src/runtime/_document.tsx
var document_exports = {};
__export(document_exports, {
  default: () => Document
});
module.exports = __toCommonJS(document_exports);
var import_react = __toESM(require("react"));

// ../../packages/@sanity/ui-workshop/src/runtime/_templates.ts
var main_css = `
html {
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
html,
body,
#root {
  height: 100%;
}
body {
  margin: 0;
}
#root {
  -webkit-font-smoothing: antialiased;
}
`;

// ../../packages/@sanity/ui-workshop/src/runtime/_document.tsx
function Document(props) {
  return /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "UTF-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    content: "IE=edge",
    httpEquiv: "X-UA-Compatible"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "msapplication-tap-highlight",
    content: "no"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, props.title || "Workshop"), /* @__PURE__ */ import_react.default.createElement("style", null, main_css)), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("div", {
    id: "root"
  }), /* @__PURE__ */ import_react.default.createElement("script", {
    type: "module",
    src: "/.workshop/main.tsx"
  })));
}
