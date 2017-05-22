(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$.extend(KhanUtil,{PiecewiseFunction:function(t){t=$.extend(!0,{INTERVAL_WIDTH:2,fnArray:[],rangeArray:[],_paths:{}},t),$.extend(this,t),_.bindAll(this),this.length=function(){return this.fnArray.length},this.width=function(){var t=this.length();return this.rangeArray[t-1][1]-this.rangeArray[0][0]},this.toTextArray=function(t){return t||(t=this.fnArray),_.map(t,function(t){return t.text()})},this._shiftArray=function(){var t=this.INTERVAL_WIDTH;return _.map(this.rangeArray,function(i,n){return Math.floor(i[0]/t)*t})},this._shiftFnArray=function(){var t=this._shiftArray();return _.map(this.fnArray,function(i,n){return i.scale(1,-t[n])})},this.derivative=function(t){return t||(t=this.fnArray),_.map(t,function(t,i){return t.derivative()})},this.translate=function(t,i){t&&(this.rangeArray=_.map(this.rangeArray,function(i){return _.map(i,function(i){return i+t})})),i&&(this.fnArray=_.map(this.fnArray,function(t){var n=t.add(i);return n}))},this.calibrate=function(){var t=this.rangeArray[0][0],i=this.INTERVAL_WIDTH,n=this.fnArray[0].evalOf(0);_.each(this.fnArray,function(t){var e=t.evalOf(0),r=t.evalOf(i);n=Math.min(n,e,r)}),this.translate(-t+2,-n)},this.slice=function(t,i){if(t>=i)return null;var n=function(n){return n.slice(t,i)};return new KhanUtil.PiecewiseFunction({fnArray:n(this.fnArray),rangeArray:n(this.rangeArray)})},this.concat=function(t){var i=this.fnArray.concat(t.fnArray),n=t.rangeArray[0][0],e=this.rangeArray[this.rangeArray.length-1][1],r=_.map(t.rangeArray,function(t){return _.map(t,function(t){return t-n+e})}),a=this.rangeArray.concat(r);return new KhanUtil.PiecewiseFunction({fnArray:i,rangeArray:a})},this.matches=function(t,i){var n=this.fnArray,e=t.fnArray;i&&(n=this.derivative(),e=t.derivative()),n=this.toTextArray(n),e=this.toTextArray(e);var r=e.length,a=n.length-r;if(0>a)return null;var s=[];return _.times(a+1,function(t){_.isEqual(n.slice(t,t+r),e)&&s.push(t)}),s},this.trimRangeArrayEnds=function(t){if(0!==t){var i=this.length(),n=this.INTERVAL_WIDTH*t;this.rangeArray[0][0]+=n,this.rangeArray[i-1][1]+=n-this.INTERVAL_WIDTH}},this._makePlotArray=function(t){return t||(t=this.fnArray),_.map(t,function(t,i){return function(i){return t.evalOf(i)}})},this._plotEndpoints=function(t,i,n){var e,r=this._shiftFnArray();i&&(e=r,r=this.derivative(r));var a=[],s=[],o=[],h=null,l=null,c=null,u=this.rangeArray.length;_.each(this.rangeArray,function(t,p){var f,v=r[p];i&&(f=e[p]),_.each(t,function(t,e){var r=v.evalOf(t),d=i?f.evalOf(t):null;p>0&&0===e&&(r!==l||t!==h?(s.push([h,l]),a.push([t,r])):d===c&&t===h||o.push([t,r])),0!==p||0!==e||n||a.push([t,r]),p!==u-1||1!==e||n||s.push([t,r]),h=t,l=r,c=d})}),i&&(a=o.concat(a).concat(s),s=[]);var p=this;this._paths.emptyEndpoints=this.graphie.style({stroke:t,strokeWidth:3,fill:"#FFFFFF"},function(){return p.graphie.plotEndpointCircles(a)}),this._paths.filledEndpoints=this.graphie.style({stroke:t,strokeWidth:3,fill:t},function(){return p.graphie.plotEndpointCircles(s)})},this._plotSegments=function(t,i){var n=this._shiftFnArray();i&&(n=this.derivative(n));var e=this._makePlotArray(n),r=this;this._paths.segments=this.graphie.style({stroke:t,strokeWidth:3},function(){return r.graphie.plotPiecewise(e,r.rangeArray)})},this.plot=function(t){t=$.extend(!0,{color:KhanUtil.GREEN,plotDerivative:!1,omitEnds:!1},t),this.graphie=t.graphie||KhanUtil.currentGraph,this._plotSegments(t.color,t.plotDerivative),this._plotEndpoints(t.color,t.plotDerivative,t.omitEnds)},this.translatePlot=function(t,i){var n=this.graphie.scaleVector([t,i]);_.each(this._paths,function(t){t.translate(n[0],n[1])})},this.hide=function(t){this.hidden||(t=t||100,_.each(this._paths,function(i){0!==i.length&&i.animate({"fill-opacity":0,opacity:0},t)}),this.hidden=!0)},this.show=function(t){this.hidden&&(t=t||100,_.each(this._paths,function(i){0!==i.length&&i.animate({"fill-opacity":1,opacity:1},t)}),this.hidden=!1)},this.toFront=function(){_.each(this._paths,function(t){t.toFront()})},this.cleanup=function(){_.each(this._paths,function(t){t.remove()}),this._paths={}}},PiecewiseFunctionGenerator:{_init:function(){_.bindAll(KhanUtil.PiecewiseFunctionGenerator)}(),_isInRange:function(t,i){return!(i<=t[0]||i>=t[1])},_scramble:function(t){var i=[];return _.times(t,function(n){var e=KhanUtil.randRangeExclude(0,t-1,i);i.push(e)}),i},curveTypes:{line:{params:{m:[-1,-.5,0,.5,1]},generate:function(t,i){var n=[i,t];return new KhanUtil.Polynomial(0,1,n)}},curve:{params:{isLeftCurve:[!0,!1],m:[-1,1]},generate:function(t,i,n,e){n=t?n-i*e:n;var r=t?e:0;i/=e;var a=[Math.pow(r,2)*i+n,-2*r*i,i];return new KhanUtil.Polynomial(0,2,a)}}},makeCombinations:function(){var t=function(t){var i=[];return _.each(t,function(t,n){var e=[[n]];_.each(t.params,function(t){e.push(t)}),i.push(e)}),i},i=function(t,n,e){if(e===n.length)return void r.push(t);for(var a=n[e],s=0;s<a.length;s++)t.push(a[s]),i(t.slice(),n,e+1),t.pop()},n=function(){var n=t(e.curveTypes);_.each(n,function(t){i([],t,0)})},e=this,r=[];return n(),r},_randomY:function(t,i){return KhanUtil.randRangeExclude(t[0],t[1],t.concat(i))},generate:function(t){t=$.extend(!0,{INTERVAL_WIDTH:2,YLIMS:[],numSegments:1,startVal:null,prevSegment:null,breakIndex:null},t),this.combinations||(this.combinations=this.makeCombinations());var i=this,n=t.YLIMS,e=t.INTERVAL_WIDTH,r=function(i){return i.evalOf(t.INTERVAL_WIDTH)},a=function(t,a){null==t&&(t=null==a?i._randomY(n):r(a));for(var s=i._scramble(i.combinations.length),o=0;o<s.length;o++){var h=i.combinations[s[o]].slice(),l=i.curveTypes[h[0]];h.push(t),h.push(e);var c=l.generate.apply(null,h.slice(1)),u=r(c);if(i._isInRange(n,u)){if(a){var p=a.evalOf(0),f=a.subtract(p).text(),v=c.subtract(t).text();if(f===v)continue}return c}}return null},s=function(){for(var e=[],r=t.startVal,s=t.prevSegment;e.length<t.numSegments;){var o=e.length;t.breakIndex&&o===t.breakIndex&&(r=i._randomY(n,[r]));var h=a(r,s);h||(e=[],s=t.prevSegment,r=t.startVal),e.push(h),s=h,r=null}return e},o=s(),h=[];return _.each(o,function(i,n){var e=n*t.INTERVAL_WIDTH;h.push([e,e+t.INTERVAL_WIDTH])}),new KhanUtil.PiecewiseFunction({fnArray:o,rangeArray:h})}},VisualizingDerivativesProblem:function(t){t=$.extend(!0,{XLIMS:[0,14],YLIMS:[-2,4],GRAPH_LIMS:[[],[]],INTERVAL_WIDTH:2,problem:null,graph:null,nIntervals:7,nProblemIntervals:1,offset:.5,breakIndex:3,noSolution:!1,moveDerivative:!0,fnColor:KhanUtil.BLUE,derivColor:KhanUtil.RED},t),$.extend(this,t),this._setAxisLims=function(){var t=this.INTERVAL_WIDTH,i=this.nIntervals;this.XLIMS=[0,t*i],this.YLIMS=[-t,2*t];var n=function(t,i){return[t[0]-i,t[1]+i]};this.GRAPH_LIMS=[n(this.XLIMS,t),n(this.YLIMS,1)]},this._invalidParams=function(t,i,n){var e=i+n>t.length();return!(t&&null!==i&&0!==n&&!e)},this.chooseProblemStart=function(t,i,n){var e=t-(i+Math.ceil(n));return KhanUtil.randRange(0,e)},this.matchesToProblemRanges=function(t,i,n){var e=this.INTERVAL_WIDTH;return _.map(t,function(t){var r=t+n,a=r+i;return _.map([r,a],function(t){return e*t})})},this.generateProblem=function(t,i,n,e){if(n+=0===e?0:1,this._invalidParams(t,i,n))return null;var r=i+n,a=t.slice(i,r);return a.trimRangeArrayEnds(e),a},this.generateBogusProblem=function(t,i,n,e){if(n+=0===e?0:1,this._invalidParams(t,i,n))return null;for(var r,a=KhanUtil.PiecewiseFunctionGenerator,s=0,o=!1;!o;){if(1===n)r=a.generate({nIntervals:1,INTERVAL_WIDTH:this.INTERVAL_WIDTH,YLIMS:this.YLIMS});else{var h=KhanUtil.randRange(1,n-1),l=n-h,c=i+h,u=t.slice(i,c),p=u.length(),f=u.fnArray[p-1];r=a.generate({numSegments:l,prevSegment:f,INTERVAL_WIDTH:this.INTERVAL_WIDTH,YLIMS:this.YLIMS}),r=u.concat(r)}var v=t.matches(r,!0);if(v.length||(o=!0),s>50)return null;s++}return r.trimRangeArrayEnds(e),r},this.initSlidingWindow=function(t){this.graphie.addMouseLayer();var i=t.problem,n=this.GRAPH_LIMS[0],e=this.GRAPH_LIMS[1],r=n[0]+1,a=n[1]-1,s=e[0],o=e[1],h=o-s,l=this.graphie.addRectGraph({x:r,y:s,width:i.width(),height:h,normalStyle:{area:{"fill-opacity":.08,fill:t.color},edges:{"stroke-width":0},points:{opacity:0}},hoverStyle:{area:{"fill-opacity":.14,fill:t.color},points:{opacity:0}},fixed:{edges:[!0,!0,!0,!0],points:[!0,!0,!0,!0]},constraints:{constrainX:!1,constrainY:!0,xmin:r,xmax:a},onMove:function(t,n){i.translatePlot(t,n),i.toFront()},snapX:1}),c=20;l.doHide=function(){l.hide(c),i.hide(c),t.onHide()},l.doShow=function(){l.show(c),i.show(c),t.onShow()},l.toFront(),i.toFront();var u=r+-i.rangeArray[0][0];i.translatePlot(u,0),l.startRange=[r,r+i.width()],this.slidingWindow=l},this.init=function(){var t=KhanUtil.PiecewiseFunctionGenerator;this._setAxisLims(),this.graph=t.generate({numSegments:this.nIntervals,breakIndex:this.breakIndex,INTERVAL_WIDTH:this.INTERVAL_WIDTH,YLIMS:this.YLIMS});var i=this.nProblemIntervals,n=this.offset,e=this.chooseProblemStart(this.graph.length(),i,n);if(this.noSolution){if(this.problem=this.generateBogusProblem(this.graph,e,i,n),null===this.problem)return void this.init()}else this.problem=this.generateProblem(this.graph,e,i,n);var r=this.graph.matches(this.problem,!0);this.problemRanges=this.matchesToProblemRanges(r,i,n)};var i=function(t,i){var n=KhanUtil.currentGraph,e=t[0],r=t[1],a=e[1]-e[0],s=r[1]-r[0],o=480;i=$.extend({tickOpacity:.6,labelOpacity:.6,xpixels:o,ypixels:o*s/a,xdivisions:a,ydivisions:s,labels:!0,unityLabels:!0,range:"undefined"==typeof t?[[-10,10],[-10,10]]:t},i),i.scale=[i.xpixels/a,i.ypixels/s],i.gridStep=[a/i.xdivisions,s/i.ydivisions],n.xpixels=i.xpixels,n.ypixels=i.ypixels,n.range=i.range,n.scale=i.scale,n.graphInit(i)};this.render=function(t){i(this.GRAPH_LIMS,{}),this.graphie=KhanUtil.currentGraph;var n=this.derivColor;this.moveDerivative?(this.graph.plot({color:this.fnColor,graphie:this.graphie}),this.problem.plot({color:this.derivColor,plotDerivative:!0,omitEnds:!1,graphie:this.graphie})):(this.graph.plot({color:this.derivColor,plotDerivative:!0,graphie:this.graphie}),this.problem.plot({color:this.fnColor,omitEnds:!0,graphie:this.graphie}),n=this.fnColor);var e=".sol.no-solution :checkbox";return this.initSlidingWindow({problem:this.problem,color:n,onHide:function(){$(e).attr("checked",!0)},onShow:function(){$(e).attr("checked",!1)}}),this.bindNoSolutionHide(e),this.slidingWindow},this.resetCurrentGraph=function(){KhanUtil.currentGraph=this.graphie},this.hints=function(){var t=[];this.hintproblems=[];var i=this.moveDerivative,n=this;_.each(this.problem.fnArray,function(e,r){var a=r>0?i18n._("next"):i18n._("first");e=e.derivative();var s,o=e.coefs.length;if(1===o){var h="<code>"+e.coefs[0]+"</code>";s=i?i18n._("The %(nth)s section of the derivative has a constant value of %(val)s, so it corresponds to an original function with a constant <b>slope</b> of %(val)s.",{nth:a,val:h}):i18n._("The %(nth)s section of the antiderivative has a constant slope of %(val)s, so it corresponds to an original function that has a constant value of %(val)s.",{nth:a,val:h})}else if(2===o){var l,h=e.evalOf(0)+e.evalOf(n.INTERVAL_WIDTH);l=h>=0?e.coefs[1]>0?i18n._("increasing and positive"):i18n._("decreasing and positive"):e.coefs[1]>0?i18n._("increasing and negative"):i18n._("decreasing and negative"),s=i?i18n._("The %(nth)s section of the derivative is %(inc)s, so it corresponds to an original function whose <b>slope</b> is %(inc)s.",{nth:a,inc:l}):i18n._("The %(nth)s section of the antiderivative has a %(inc)s slope, so it corresponds to an original function that is %(inc)s.",{nth:a,inc:l})}var c=n.problem.slice(r,r+1);c.calibrate(),n.hintproblems.push(c),t.push("<p>"+s+"</p><div class='clearfix'> <div class='graphie vis-deriv-hint-graph' id='orig"+r+"'>   PROBLEM.showHint("+r+", "+i+");</div><div class='graphie vis-deriv-hint-graph' id='orig"+r+"'> PROBLEM.showHint("+r+", "+!i+");</div> </div>")});var e;if(this.noSolution)e=i18n._("Because these sections do not appear next to each other in the graph of <code>f(x)</code>, there is no solution."),t.push("<p>"+e+"</p>"),t.push("<div class='graphie'> PROBLEM.showNoAnswer(); </div>");else{var r=this.problemRanges.map(function(t){return"<code>x \\in ["+t.join(", ")+"]</code>"}).join(" and "),a=i?"f'(x)":"F(x)";e=i18n._("The function in the window corresponds to <code>%(fnVar)s</code> where %(solution)s.",{fnVar:a,solution:r});var s=this.problemRanges[0][0];t.push("<p>"+e+"</p>"),t.push("<div class='graphie'> PROBLEM.showAnswer("+s+"); </div>")}return t};var n=function(t,i){var n=KhanUtil.currentGraph,e=t[0],r=t[1],a=e[1]-e[0],s=r[1]-r[0],o=480/18*Math.abs(t[0][1]-t[0][0]);return i=$.extend({xpixels:o,ypixels:o*s/a,xdivisions:a,ydivisions:s,labels:!0,unityLabels:!0,range:t},i),i.scale=[i.xpixels/a,i.ypixels/s],i.gridStep=[a/i.xdivisions,s/i.ydivisions],n.xpixels=i.xpixels,n.ypixels=i.ypixels,n.range=i.range,n.scale=i.scale,n.graphInit(i),n};this.showHint=function(t,i){var e,r=this.hintproblems[t];i?(e=n([[1,5],[-3,3]],{axisOpacity:1,labelOpacity:.01,tickOpacity:.01}),r.plot({color:this.derivColor,plotDerivative:!0,omitEnds:!1,graphie:e})):(e=n([[1,5],[-3,3]],{axisOpacity:.01,labelOpacity:.01,tickOpacity:.01}),r.plot({color:this.fnColor,omitEnds:!0,graphie:e})),this.resetCurrentGraph()},this.showAnswer=function(t){this.slidingWindow.doShow(),this.slidingWindow.moveTo(t,0),this.resetCurrentGraph()},this.showNoAnswer=function(){this.slidingWindow.doHide(),this.resetCurrentGraph()},this.bindNoSolutionHide=function(t){var i=!1,n=this.slidingWindow;$("body").on("click",t,function(){i=!i,i?n.doHide():n.doShow()})},this.init()}});
},{}]},{},[1]);
