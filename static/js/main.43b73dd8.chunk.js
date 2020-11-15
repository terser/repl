(this["webpackJsonptry.terser.org"]=this["webpackJsonptry.terser.org"]||[]).push([[0],{19:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return evalOptions}));var options="// edit terser options\n{\n  module: true,\n  compress: {},\n  mangle: {},\n  output: {},\n  parse: {},\n  rename: {},\n}",evalOptions=function evalOptions(opts){return eval("(".concat(opts||options,")"))};__webpack_exports__.a=options},20:function(e,r,t){e.exports={message:"App_message__2vrzR",error:"App_error__1umzI",container:"App_container__1MQN3"}},28:function(e,r,t){e.exports={container:"Header_container__7YgNF"}},36:function(e,r,t){},37:function(e,r,t){},44:function(e,r,t){},45:function(e,r,t){"use strict";t.r(r);var o=t(0),n=t(4),a=t.n(n),i=t(24),s=t.n(i),c=t(11),l=t(12),p=t(14),u=t(13),d=t(22),h=t.n(d),_=t(25),f=t(48),v=t(47),m=t(15),j=t(18),O=t.n(j),b=t(10),g=t.n(b);t(35),t(36),t(37),t(38),t(39),t(40);var M={autoCloseBrackets:!0,keyMap:"sublime",lineNumbers:!0,matchBrackets:!0,mode:"javascript",showCursorWhenSelecting:!0,styleActiveLine:!0,tabWidth:2},x=function(e){Object(p.a)(t,e);var r=Object(u.a)(t);function t(){var e;Object(c.a)(this,t);for(var o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=r.call.apply(r,[this].concat(n))).state={isFocused:!1},e._codeMirror=null,e._textAreaRef=null,e._onChange=function(r,t){"setValue"!==t.origin&&e.props.onChange(r.getValue())},e._setTextAreaRef=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e._textAreaRef=r},e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){this._codeMirror=g.a.fromTextArea(this._textAreaRef,Object(m.a)(Object(m.a)({},M),this.props.options)),this._codeMirror.setOption("theme",this.props.theme),this._codeMirror.on("change",this._onChange),this._codeMirror.setValue(this.props.value||"")}},{key:"UNSAFE_componentWillMount",value:function(){this._codeMirror&&this._codeMirror.toTextArea()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){if(e.value&&e.value!==this.props.value&&this._codeMirror.getValue()!==e.value)if(e.preserveScrollPosition){var r=this._codeMirror.getScrollInfo();this._codeMirror.setValue(e.value),this._codeMirror.scrollTo(r.left,r.top)}else this._codeMirror.setValue(e.value);else e.value||this._codeMirror.setValue("");for(var t in e.options)e.options.hasOwnProperty(t)&&this._updateOption(t,e.options[t])}},{key:"focus",value:function(){this._codeMirror&&this._codeMirror.focus()}},{key:"render",value:function(){return Object(o.jsx)("textarea",{autoComplete:"off",autoFocus:this.props.autoFocus,defaultValue:this.props.value,ref:this._setTextAreaRef,placeholder:this.props.placeholder})}},{key:"_updateOption",value:function(e,r){this._codeMirror.getOption(e)!==r&&this._codeMirror.setOption(e,r)}}]),t}(n.Component);x.defaultProps={autoFocus:!1,preserveScrollPosition:!1,onChange:null,options:{},placeholder:null,value:null,theme:"default"};var w=x,S=t(8),y=t.n(S),k=function(e){var r=e.className,t=e.onChange,n=e.options,a=e.placeholder,i=e.code,s=e.fileSize,c=e.info,l=e.errorMessage,p=e.theme,u=O()(y.a.container,r),d=O()(y.a.info,y.a.sharedBox),h=O()(y.a.error,y.a.sharedBox);return Object(o.jsxs)("div",{className:u,children:[Object(o.jsxs)("div",{className:y.a.codeMirror,children:[Object(o.jsx)(w,{onChange:t,options:Object(m.a)(Object(m.a)({},n),{},{readOnly:null==t}),placeholder:a,preserveScrollPosition:null==t,value:i,theme:p}),n.fileSize&&Object(o.jsxs)("div",{className:y.a.fileSize,children:[s," bytes"]})]}),c&&Object(o.jsx)("pre",{className:d,children:c}),l&&Object(o.jsx)("pre",{className:h,children:l})]})};k.defaultProps={className:null,onChange:null,options:{},placeholder:null,code:null,fileSize:null};var P=k,C=function(e){return new Blob([e],{type:"text/plain"}).size},N=t(19),z=t(9),A=t.n(z),R=function(e){Object(p.a)(t,e);var r=Object(u.a)(t);function t(){var e;Object(c.a)(this,t);for(var o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=r.call.apply(r,[this].concat(n))).state={optionsCode:N.a,code:"// write or paste code here\n\n",minified:"// terser's ouput will be shown here",terserOptions:Object(N.b)(),rawSize:0,minifiedSize:0},e.options={lineWrapping:!0,fileSize:!0},e._updateCode=function(r){e.setState({code:r,rawSize:C(r)}),e._minifyToState(r)},e._updateTerserOptions=function(r){try{var t=Object(N.b)(r);e.setState({terserOptions:t,optionsErrorMessage:null})}catch(o){e.setState({optionsErrorMessage:o.message})}e._minify(e.state.code)},e._minifyToState=Object(f.a)((function(r){return e._minify(r,e._persistState)}),500),e._minify=function(){var r=Object(_.a)(h.a.mark((function r(t,o){var n,a;return h.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=Object(v.a)(e.state.terserOptions),r.prev=1,r.next=4,e.props.terser.minify(t,n);case 4:(a=r.sent).error?e.setState({errorMessage:a.error.message}):e.setState({minified:a.code,minifiedSize:C(a.code),errorMessage:null}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),e.setState({errorMessage:r.t0.message});case 11:case"end":return r.stop()}}),r,null,[[1,8]])})));return function(e,t){return r.apply(this,arguments)}}(),e}return Object(l.a)(t,[{key:"render",value:function(){return Object(o.jsx)("div",{className:A.a.container,children:Object(o.jsx)("div",{className:A.a.wrapperPanels,children:Object(o.jsxs)("div",{className:A.a.panels,children:[Object(o.jsxs)("div",{className:A.a.verticalSplit,children:[Object(o.jsx)(P,{className:A.a.codeMirrorPanelOptions,code:this.state.optionsCode,onChange:this._updateTerserOptions,options:{lineWrapping:!0},theme:"paraiso-light",errorMessage:this.state.optionsErrorMessage,placeholder:"Edit terser config here"}),Object(o.jsx)(P,{className:A.a.codeMirrorPanelInput,code:this.state.code,onChange:this._updateCode,options:this.options,fileSize:this.state.rawSize,theme:"paraiso-light",errorMessage:this.state.errorMessage,placeholder:"Write or paste code here"})]}),Object(o.jsx)(P,{className:A.a.codeMirrorPanel,code:this.state.minified,options:this.options,fileSize:this.state.minifiedSize,theme:"paraiso-dark",placeholder:"Terser output will be shown here"})]})})})}}]),t}(n.Component),T=t(28),B=t.n(T),E=function(){return Object(o.jsx)("div",{className:B.a.container,children:Object(o.jsx)("header",{children:Object(o.jsxs)("a",{href:"https://terser.org",children:[Object(o.jsx)("img",{src:"https://terser.org/img/terser-square-logo.png",alt:"Terser logo"}),Object(o.jsx)("h2",{children:"terser"})]})})})},W=t(20),V=t.n(W),I=function(e){Object(p.a)(t,e);var r=Object(u.a)(t);function t(){var e;Object(c.a)(this,t);for(var o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=r.call.apply(r,[this].concat(n))).state={error:null},e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){window.Terser||this.setState({error:new Error("Could not load Terser from jsdelivr")})}},{key:"render",value:function(){var e=this.state.error,r=e?Object(o.jsx)("div",{className:V.a.message+" "+V.a.error,children:(null===e||void 0===e?void 0:e.message)||"An error has occurred"}):Object(o.jsx)(R,{terser:window.Terser});return Object(o.jsxs)("div",{className:V.a.container,children:[Object(o.jsx)(E,{}),r]})}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(44);s.a.render(Object(o.jsx)(I,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,r,t){e.exports={container:"CodeMirrorPanel_container__3QpkM",sharedBox:"CodeMirrorPanel_sharedBox__PB0Sj",codeMirror:"CodeMirrorPanel_codeMirror__vmJpw",info:"CodeMirrorPanel_info__5WIzp",error:"CodeMirrorPanel_error__2t1ti",fileSize:"CodeMirrorPanel_fileSize__h3Hkc"}},9:function(e,r,t){e.exports={container:"Repl_container__SliIm",wrapperPanels:"Repl_wrapperPanels__M5Uvu",panels:"Repl_panels__ZhGDg",verticalSplit:"Repl_verticalSplit__2Vo9P",codeMirrorPanel:"Repl_codeMirrorPanel__3kO2i",codeMirrorPanelOptions:"Repl_codeMirrorPanelOptions__haEox",codeMirrorPanelInput:"Repl_codeMirrorPanelInput__2EBx4"}}},[[45,1,2]]]);
//# sourceMappingURL=main.43b73dd8.chunk.js.map