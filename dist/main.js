(()=>{"use strict";const e=(()=>{let e=[];return{addProject:t=>{e.push(t)},getProjects:()=>e,updateProject:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t.id)return void e.splice(n,1,t)},deleteProject:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t)return void e.splice(n,1)},sortByName:e=>e.sort(((e,t)=>{const n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0})),getProjectById:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t)return e[n]}}})();function t(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}const a=(()=>{let e=[];return{addTask:t=>{e.push(t)},getTasks:()=>e,getTaskById:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t)return e[n]},updateTask:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t.id)return void e.splice(n,1,t)},deleteTask:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t)return void e.splice(n,1)},sortByDate:e=>e.sort(((e,a)=>{if(""===e.dueDate||""===a.dueDate){if(""===e.dueDate&&""===a.dueDate)return 0;if(""===e.dueDate)return 1;if(""===a.dueDate)return-1}!function(e,a){t(2,arguments);var r=n(e),o=n(a);r.getTime(),o.getTime()}(e.dueDate,a.dueDate)})),sortByName:e=>e.sort(((e,t)=>{const n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0}))}})();function r(e){t(1,arguments);var a=n(e);return!isNaN(a)}var o={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function i(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var d,c={date:i({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:i({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:i({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;a=e.formattingValues[i]||e.formattingValues[o]}else{var d=e.defaultWidth,c=r.width?String(r.width):e.defaultWidth;a=e.values[c]||e.values[d]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function l(e){return function(t,n){var a=String(t),r=n||{},o=r.width,i=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],d=a.match(i);if(!d)return null;var c,s=d[0],u=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(u)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(s))return n}(u):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(s))return n}(u),c=e.valueCallback?e.valueCallback(c):c,{value:c=r.valueCallback?r.valueCallback(c):c,rest:a.slice(s.length)}}}const m={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof o[e]?o[e]:1===t?o[e].one:o[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:c,formatRelative:function(e,t,n,a){return s[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(d={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(d.matchPattern);if(!r)return null;var o=r[0],i=n.match(d.parsePattern);if(!i)return null;var c=d.valueCallback?d.valueCallback(i[0]):i[0];return{value:c=a.valueCallback?a.valueCallback(c):c,rest:n.slice(o.length)}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function h(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function f(e,a){t(2,arguments);var r=n(e).getTime(),o=h(a);return new Date(r+o)}function g(e,n){t(2,arguments);var a=h(n);return f(e,-a)}function p(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const w=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return p("yy"===t?a%100:a,t.length)},y=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):p(n+1,2)},v=function(e,t){return p(e.getUTCDate(),t.length)},b=function(e,t){return p(e.getUTCHours()%12||12,t.length)},C=function(e,t){return p(e.getUTCHours(),t.length)},k=function(e,t){return p(e.getUTCMinutes(),t.length)},T=function(e,t){return p(e.getUTCSeconds(),t.length)},E=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return p(Math.floor(a*Math.pow(10,n-3)),t.length)};var D=864e5;function I(e){t(1,arguments);var a=1,r=n(e),o=r.getUTCDay(),i=(o<a?7:0)+o-a;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function j(e){t(1,arguments);var a=n(e),r=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=I(o),d=new Date(0);d.setUTCFullYear(r,0,4),d.setUTCHours(0,0,0,0);var c=I(d);return a.getTime()>=i.getTime()?r+1:a.getTime()>=c.getTime()?r:r-1}function M(e){t(1,arguments);var n=j(e),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=I(a);return r}var S=6048e5;function N(e,a){t(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,d=null==i?0:h(i),c=null==r.weekStartsOn?d:h(r.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=n(e),u=s.getUTCDay(),l=(u<c?7:0)+u-c;return s.setUTCDate(s.getUTCDate()-l),s.setUTCHours(0,0,0,0),s}function P(e,a){t(1,arguments);var r=n(e,a),o=r.getUTCFullYear(),i=a||{},d=i.locale,c=d&&d.options&&d.options.firstWeekContainsDate,s=null==c?1:h(c),u=null==i.firstWeekContainsDate?s:h(i.firstWeekContainsDate);if(!(u>=1&&u<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(o+1,0,u),l.setUTCHours(0,0,0,0);var m=N(l,a),f=new Date(0);f.setUTCFullYear(o,0,u),f.setUTCHours(0,0,0,0);var g=N(f,a);return r.getTime()>=m.getTime()?o+1:r.getTime()>=g.getTime()?o:o-1}function x(e,n){t(1,arguments);var a=n||{},r=a.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:h(o),d=null==a.firstWeekContainsDate?i:h(a.firstWeekContainsDate),c=P(e,n),s=new Date(0);s.setUTCFullYear(c,0,d),s.setUTCHours(0,0,0,0);var u=N(s,n);return u}var B=6048e5;function U(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=t||"";return n+String(r)+i+p(o,2)}function q(e,t){return e%60==0?(e>0?"-":"+")+p(Math.abs(e)/60,2):W(e,t)}function W(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+p(Math.floor(r/60),2)+n+p(r%60,2)}const Y={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return w(e,t)},Y:function(e,t,n,a){var r=P(e,a),o=r>0?r:1-r;return"YY"===t?p(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):p(o,t.length)},R:function(e,t){return p(j(e),t.length)},u:function(e,t){return p(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return p(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return p(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return y(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return p(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,a,r,o){var i=function(e,a){t(1,arguments);var r=n(e),o=N(r,a).getTime()-x(r,a).getTime();return Math.round(o/B)+1}(e,o);return"wo"===a?r.ordinalNumber(i,{unit:"week"}):p(i,a.length)},I:function(e,a,r){var o=function(e){t(1,arguments);var a=n(e),r=I(a).getTime()-M(a).getTime();return Math.round(r/S)+1}(e);return"Io"===a?r.ordinalNumber(o,{unit:"week"}):p(o,a.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v(e,t)},D:function(e,a,r){var o=function(e){t(1,arguments);var a=n(e),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var o=a.getTime(),i=r-o;return Math.floor(i/D)+1}(e);return"Do"===a?r.ordinalNumber(o,{unit:"dayOfYear"}):p(o,a.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return p(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return p(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return p(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return b(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):C(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):p(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):p(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):k(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):T(e,t)},S:function(e,t){return E(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return q(r);case"XXXX":case"XX":return W(r);case"XXXXX":case"XXX":default:return W(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return q(r);case"xxxx":case"xx":return W(r);case"xxxxx":case"xxx":default:return W(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+U(r,":");case"OOOO":default:return"GMT"+W(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+U(r,":");case"zzzz":default:return"GMT"+W(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return p(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return p((a._originalDate||e).getTime(),t.length)}};function O(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function A(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const z={p:A,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],o=a[2];if(!o)return O(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",O(r,t)).replace("{{time}}",A(o,t))}};function F(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var H=["D","DD"],L=["YY","YYYY"];function X(e){return-1!==H.indexOf(e)}function Q(e){return-1!==L.indexOf(e)}function G(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var R=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,J=/^'([^]*?)'?$/,Z=/''/g,_=/[a-zA-Z]/;function V(e,a,o){t(2,arguments);var i=String(a),d=o||{},c=d.locale||m,s=c.options&&c.options.firstWeekContainsDate,u=null==s?1:h(s),l=null==d.firstWeekContainsDate?u:h(d.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=c.options&&c.options.weekStartsOn,p=null==f?0:h(f),w=null==d.weekStartsOn?p:h(d.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var y=n(e);if(!r(y))throw new RangeError("Invalid time value");var v=F(y),b=g(y,v),C={firstWeekContainsDate:l,weekStartsOn:w,locale:c,_originalDate:y},k=i.match($).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,z[t])(e,c.formatLong,C):e})).join("").match(R).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return K(t);var r=Y[n];if(r)return!d.useAdditionalWeekYearTokens&&Q(t)&&G(t,a,e),!d.useAdditionalDayOfYearTokens&&X(t)&&G(t,a,e),r(b,t,c.localize,C);if(n.match(_))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return k}function K(e){return e.match(J)[1].replace(Z,"'")}const ee=(()=>{const e=(e,n)=>{n.map((n=>{t(e,n)}))},t=(e,t)=>{let n;e.matches("li")?(e.removeAttribute("id"),n=e):(n=document.createElement("li"),n.dataset.taskId=t.id,n.className="task-wrapper");const a=document.createElement("span");a.className="check-circle",n.appendChild(a);const r=document.createElement("i");r.className="check-mark fas fa-check",n.appendChild(r);const o=document.createElement("span");o.className="task-label",o.textContent=t.name,n.appendChild(o);const i=document.createElement("span");i.className="task-date",""!==t.dueDate?i.textContent=V(t.dueDate,"MM/dd/yyyy"):i.textContent="no due date",n.appendChild(i);const d=document.createElement("div");d.className="priority-level";const c=document.createElement("i");c.className=`${t.priority}-priority fab fa-font-awesome-flag`,d.appendChild(c),n.appendChild(d);const s=document.createElement("button");s.type="button",s.className="task-edit-btn",s.dataset.taskId=t.id;const u=document.createElement("i");u.className="far fa-edit",s.appendChild(u),n.appendChild(s),e.matches("li")||e.appendChild(n)},n=(e,t=null)=>{t&&(e.id="edit-task-container");const n=document.createElement("input");n.id="new-task-name",n.type="text",n.placeholder="Enter task name here",n.maxLength="40",t&&(n.value=t.name),e.appendChild(n);const a=document.createElement("div"),r=document.createElement("input");r.id="new-task-due-date",r.type="date",t&&""!==t.dueDate?r.value=V(t.dueDate,"yyyy-MM-dd"):r.value="",a.appendChild(r);const o=document.createElement("button");o.type="button",o.id="new-task-date-reset",o.textContent="Clear",a.appendChild(o),e.appendChild(a);const i=document.createElement("div");i.id="new-task-priority-wrapper",["low","medium","high"].map(((e,n)=>{const a=document.createElement("label"),r=document.createElement("input");r.type="radio",r.name="priority",r.value=e,t&&t.priority===e&&(r.checked=!0),0!==n||t||(r.checked=!0),a.appendChild(r);const o=document.createElement("i");o.className=`${e}-priority fab fa-font-awesome-flag`,a.appendChild(o),i.appendChild(a)})),e.appendChild(i);const d=document.createElement("div"),c=document.createElement("button");c.type="button",c.id="new-task-validate";const s=document.createElement("i");s.className="fas fa-check",c.appendChild(s),d.appendChild(c);const u=document.createElement("button");u.type="button",u.id="new-task-cancel";const l=document.createElement("i");l.className="fas fa-times",u.appendChild(l),d.appendChild(u),e.appendChild(d)},a=e=>{e.remove()};return{renderMain:e=>{const t=document.createElement("header"),n=document.createElement("i");n.className="far fa-check-circle",t.appendChild(n);const a=document.createElement("h1");a.textContent="My Todo",t.appendChild(a);const r=document.createElement("div");r.id="side-bar";const o=document.createElement("ul");o.id="category-btns",r.appendChild(o);const i=document.createElement("h2");i.textContent="Projects",r.appendChild(i);const d=document.createElement("ul");d.id="projects",r.appendChild(d);const c=document.createElement("div");c.id="add-project-container";const s=document.createElement("i");s.className="fas fa-plus",c.appendChild(s);const u=document.createElement("span");u.textContent="Add new project",c.appendChild(u),r.appendChild(c);const l=document.createElement("div");l.id="add-project-input";const m=document.createElement("input");m.type="text",m.placeholder="Enter project name",m.maxLength="30",l.appendChild(m);const h=document.createElement("button");h.type="button",h.id="project-validate";const f=document.createElement("i");f.className="fas fa-check",h.appendChild(f),l.appendChild(h);const g=document.createElement("button");g.type="button",g.id="project-cancel";const p=document.createElement("i");p.className="fas fa-times",g.appendChild(p),l.appendChild(g),r.appendChild(l);const w=document.createElement("div");w.id="content-area",e.appendChild(t),e.appendChild(r),e.appendChild(w)},populateSideBar:(e,t)=>{t.map((t=>{const n=document.createElement("li");if(t.projectId&&(n.dataset.projectId=t.projectId),t.icon1Class){const e=document.createElement("i");e.className=t.icon1Class,n.appendChild(e)}const a=document.createElement("span");if(a.textContent=t.label,n.appendChild(a),t.icon2Class){const e=document.createElement("button");e.className="delete-project";const a=document.createElement("i");a.className=t.icon2Class,e.appendChild(a),n.appendChild(e)}e.appendChild(n)}))},renderContentArea:(t,n,a,r=null)=>{if(r){const e=document.createElement("h2");e.id="content-label",e.textContent=r,t.appendChild(e)}n.map((n=>{const r=document.createElement("div");r.className="name-wrapper";const o=document.createElement("i");o.className="fas fa-tasks",r.appendChild(o);const i=document.createElement("h3");i.textContent=n.name,r.appendChild(i);const d=document.createElement("button");d.type="button",d.className="task-add-btn",d.textContent="+",d.dataset.projectId=n.id,r.appendChild(d);const c=document.createElement("ul");c.dataset.projectId=n.id;const s=a.filter((e=>e.projectId===n.id));e(c,s),t.appendChild(r),t.appendChild(c)})),r||(document.querySelector(".name-wrapper").style.marginTop="0.5em",document.querySelector(".name-wrapper i").style.fontSize="1.9em",document.querySelector(".name-wrapper h3").style.fontSize="2em")},showProjectInput:()=>{document.getElementById("add-project-input").style.display="block"},showAddProjectBtn:()=>{document.getElementById("add-project-container").style.display="block"},hideProjectInput:()=>{document.getElementById("add-project-input").style.display="none"},hideAddProjectBtn:()=>{document.getElementById("add-project-container").style.display="none"},createNewTask:(e,t)=>{const a=document.createElement("li");a.id="new-task-container",a.dataset.projectId=t,n(a),e.after(a)},renderTask:t,renderTaskList:e,renderNewTask:n,clearContainer:e=>{let t=e.firstElementChild;for(;t;)t.remove(),t=e.firstElementChild},deleteElement:a,createFadeOut:(e,t)=>{e.style.opacity="0",setTimeout((()=>{a(e)}),t)}}})();var te=36e5,ne={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},ae=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,re=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,oe=/^([+-])(\d{2})(?::?(\d{2}))?$/;function ie(e){var t,n={},a=e.split(ne.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?(n.date=null,t=a[0]):(n.date=a[0],t=a[1],ne.timeZoneDelimiter.test(n.date)&&(n.date=e.split(ne.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=ne.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function de(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:null};var r=a[1]&&parseInt(a[1]),o=a[2]&&parseInt(a[2]);return{year:null==o?r:100*o,restDateString:e.slice((a[1]||a[2]).length)}}function ce(e,t){if(null===t)return null;var n=e.match(ae);if(!n)return null;var a=!!n[4],r=se(n[1]),o=se(n[2])-1,i=se(n[3]),d=se(n[4]),c=se(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,d,c)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,d,c):new Date(NaN);var s=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(he[t]||(fe(e)?29:28))}(t,o,i)&&function(e,t){return t>=1&&t<=(fe(e)?366:365)}(t,r)?(s.setUTCFullYear(t,o,Math.max(r,i)),s):new Date(NaN)}function se(e){return e?parseInt(e):1}function ue(e){var t=e.match(re);if(!t)return null;var n=le(t[1]),a=le(t[2]),r=le(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,r)?n*te+6e4*a+1e3*r:NaN}function le(e){return e&&parseFloat(e.replace(",","."))||0}function me(e){if("Z"===e)return 0;var t=e.match(oe);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,r)?n*(a*te+6e4*r):NaN}var he=[31,null,31,30,31,30,31,31,30,31,30,31];function fe(e){return e%400==0||e%4==0&&e%100}const ge=(()=>{const r=t=>{const n=e.sortByName(e.getProjects());let a=[];n.length>0&&(n.map((e=>{const t={label:e.name,icon1Class:"fas fa-folder-open",icon2Class:"fas fa-trash-alt",projectId:e.id};a.push(t)})),ee.populateSideBar(t,a))},o=t=>{const n=e.sortByName(e.getProjects()),r=a.sortByDate(a.getTasks()),o=document.querySelectorAll("#category-btns span")[0].textContent;ee.renderContentArea(t,n,r,o)},i=(r,o,i,d)=>{const c=((e,a,r)=>{const o={start:a,end:r};return e.filter((e=>!(""===e.dueDate||!function(e,a){t(2,arguments);var r=a||{},o=n(e).getTime(),i=n(r.start).getTime(),d=n(r.end).getTime();if(!(i<=d))throw new RangeError("Invalid interval");return o>=i&&o<=d}(e.dueDate,o))))})(a.getTasks(),o,i),s=c.reduce(((e,t)=>(e.push(t.projectId),e)),[]).filter(((e,t,n)=>n.indexOf(e)===t)).reduce(((t,n)=>{const a=e.getProjectById(n);return t.push(a),t}),[]);ee.renderContentArea(r,s,c,d)},d=(t,n)=>{const r=[e.getProjectById(n)];let o=r[0].taskIds.reduce(((e,t)=>{const n=a.getTaskById(t);return e.push(n),e}),[]);o=a.sortByDate(o),ee.renderContentArea(t,r,o)},c=()=>{const t=document.getElementById("content-area"),n=document.getElementById("projects"),a=document.querySelector("#add-project-input input");if(""===a.value)return;const o=((e,t=[])=>({name:e=e,taskIds:t=t,id:Date.now()}))(a.value);e.addProject(o),a.value="",ee.hideProjectInput(),ee.showAddProjectBtn(),ee.clearContainer(n),r(n),w(),y(),ee.clearContainer(t),d(t,o.id),b(),C(),M(),S()},s=()=>{document.querySelector("#add-project-input input").value="",ee.hideProjectInput(),ee.showAddProjectBtn()},u=e=>{const n=document.getElementById("new-task-name").value;if(""===n)return;let a=document.getElementById("new-task-due-date").value;""!==a&&(a=function(e,n){t(1,arguments);var a=n||{},r=null==a.additionalDigits?2:h(a.additionalDigits);if(2!==r&&1!==r&&0!==r)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var o,i=ie(e);if(i.date){var d=de(i.date,r);o=ce(d.restDateString,d.year)}if(isNaN(o)||!o)return new Date(NaN);var c,s=o.getTime(),u=0;if(i.time&&(u=ue(i.time),isNaN(u)||null===u))return new Date(NaN);if(!i.timezone){var l=new Date(s+u),m=new Date(0);return m.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),m.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),m}return c=me(i.timezone),isNaN(c)?new Date(NaN):new Date(s+u+c)}(a));const r=document.querySelectorAll('#new-task-priority-wrapper input[type="radio"]');let o;for(let e=0;e<r.length;e++)r[e].checked&&(o=r[e].value);return((e,t="",n="",a="")=>({name:e=e,dueDate:t=t,priority:n=n,projectId:a=a,id:Date.now()}))(n,a,o,e)},l=()=>{const t=document.getElementById("new-task-container"),n=parseInt(t.dataset.projectId),r=u(n);if(!r)return;const o=document.querySelector(`#content-area ul[data-project-id="${n}"]`);a.addTask(r);const i=e.getProjectById(n);i.taskIds.push(r.id),e.updateProject(i);const d=a.sortByDate(i.taskIds.reduce(((e,t)=>(e.push(a.getTaskById(t)),e)),[]));ee.clearContainer(o),ee.deleteElement(t),ee.renderTaskList(o,d),S()},m=()=>{const e=document.getElementById("edit-task-container"),t=parseInt(e.dataset.taskId),n=a.getTaskById(t).projectId,r=u(n);r.id=t,a.updateTask(r),ee.clearContainer(e),ee.renderTask(e,r),S()},f=()=>{const e=document.getElementById("edit-task-container"),t=parseInt(e.dataset.taskId),n=a.getTaskById(t);ee.clearContainer(e),ee.renderTask(e,n)},g=(e,t,n)=>{e&&e.forEach((e=>{((e,t,n=[])=>({target:e=e,name:t=t,functions:n=n,assignEvent:()=>{e.addEventListener(t,(function(e){for(let t=0;t<n.length;t++)n[t](e)}))}}))(e,t,n).assignEvent()}))},p=()=>{const e=document.getElementById("content-area"),a=document.querySelectorAll("#category-btns li"),r=[()=>{ee.clearContainer(e)},b,C,M],d=[()=>{o(e)},()=>{(e=>{const t=(new Date).setHours(0,0,0,0),n=(new Date).setHours(23,59,59,999),a=document.querySelectorAll("#category-btns span")[1].textContent;i(e,t,n,a)})(e)},()=>{(e=>{const a=(new Date).setHours(0,0,0,0),r=function(e,a){t(2,arguments);var r=n(e),o=h(a);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}(a,6).setHours(23,59,59,999),o=document.querySelectorAll("#category-btns span")[2].textContent;i(e,a,r,o)})(e)}];a.forEach(((e,t)=>{g([e],"click",[...r.slice(0,1),d[t],...r.slice(1)])}))},w=()=>{const e=document.getElementById("content-area"),t=document.querySelectorAll("#projects span");g(t,"click",[()=>{ee.clearContainer(e)},t=>{const n=t.target.dataset.projectId||t.target.parentElement.dataset.projectId;d(e,parseInt(n))},b,C,M])},y=()=>{const t=document.querySelectorAll(".delete-project"),n=document.getElementById("content-area");g(t,"click",[t=>{const n=t.target.parentElement.parentElement.dataset.projectId;(t=>{e.getProjectById(t).taskIds.map((e=>a.deleteTask(e))),e.deleteProject(t),S()})(parseInt(n))},e=>{const t=parseInt(e.target.parentElement.parentElement.dataset.projectId),a=document.querySelector(`#projects li[data-project-id="${t}"]`);ee.deleteElement(a),ee.clearContainer(n)},()=>{o(n)}])},v=(e,t)=>{const n="click";g(e,n,[t,()=>{const e=document.getElementById("new-task-date-reset");g([e],n,[E])},()=>{const e=document.getElementById("new-task-validate");I(e)},()=>{const e=document.getElementById("new-task-cancel");j(e)},()=>{const e=document.querySelectorAll(".task-add-btn"),t=document.querySelectorAll(".task-edit-btn");k(e),k(t)}])},b=()=>{const e=document.querySelectorAll(".task-add-btn");v(e,(e=>{const t=parseInt(e.target.dataset.projectId),n=document.querySelector(`#content-area ul[data-project-id="${t}"]`);ee.createNewTask(n,t)}))},C=()=>{const e=document.querySelectorAll(".task-edit-btn");v(e,(e=>{const t=parseInt(e.target.parentElement.dataset.taskId),n=document.querySelector(`li[data-task-id="${t}"]`);ee.clearContainer(n),(e=>{const t=parseInt(e.dataset.taskId),n=a.getTaskById(t);ee.clearContainer(e),ee.renderNewTask(e,n)})(n)}))},k=e=>{e.forEach((e=>e.disabled=!0))},T=e=>{document.getElementById("new-task-name")||e.forEach((e=>e.disabled=!1))},E=()=>{document.getElementById("new-task-due-date").value=""},D=(e,t)=>{g([e],"click",[t,()=>{const e=document.querySelectorAll(".task-add-btn"),t=document.querySelectorAll(".task-edit-btn");T(e),T(t)},C,M])},I=e=>{const t=document.getElementById("new-task-container");D(e,t?l:m)},j=e=>{const t=document.getElementById("new-task-container");D(e,t?()=>{const e=document.getElementById("new-task-container");ee.deleteElement(e)}:f)},M=()=>{const t=document.querySelectorAll(".check-mark");g(t,"click",[t=>{const n=t.target.parentElement.dataset.taskId;(t=>{const n=a.getTaskById(t),r=e.getProjectById(n.projectId);for(let e=0;e<r.taskIds.length;e++)if(r.taskIds[e]===t){r.taskIds.splice(e,1);break}e.updateProject(r),a.deleteTask(t),S()})(parseInt(n))},e=>{const t=parseInt(e.target.parentElement.dataset.taskId),n=document.querySelector(`#content-area li[data-task-id="${t}"]`);ee.createFadeOut(n,350)}])},S=()=>{localStorage.getItem("projects")&&localStorage.removeItem("projects"),localStorage.getItem("tasks")&&localStorage.removeItem("tasks");let t=e.getProjects(),n=a.getTasks();localStorage.setItem("projects",JSON.stringify(t)),localStorage.setItem("tasks",JSON.stringify(n))};return{renderMain:e=>{ee.renderMain(e)},renderProjects:r,renderCategories:e=>{ee.populateSideBar(e,[{label:"All tasks",icon1Class:"fas fa-inbox"},{label:"Today",icon1Class:"fas fa-calendar-day"},{label:"Next 7 days",icon1Class:"fas fa-calendar-week"}])},renderAllTasks:o,assignInitialEvents:()=>{p(),w(),y(),(()=>{const e=document.getElementById("add-project-container"),t="click";g([e],t,[ee.hideAddProjectBtn,ee.showProjectInput,()=>{const e=document.getElementById("project-validate");g([e],t,[c])},()=>{const e=document.getElementById("project-cancel");g([e],t,[s])}])})(),b(),C(),M()},retrieveData:()=>{let r=JSON.parse(localStorage.getItem("projects"))||[],o=JSON.parse(localStorage.getItem("tasks"))||[];r.forEach((t=>{t.id=parseInt(t.id),t.taskIds=t.taskIds.map((e=>parseInt(e))),e.addProject(t)})),o.forEach((e=>{e.id=parseInt(e.id),e.projectId=parseInt(e.projectId),e.dueDate=function(e){if(t(1,arguments),"string"==typeof e){var a=e.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);return a?new Date(Date.UTC(+a[1],a[2]-1,+a[3],+a[4]-(a[9]||0)*("-"==a[8]?-1:1),+a[5]-(a[10]||0)*("-"==a[8]?-1:1),+a[6],+((a[7]||"0")+"00").substring(0,3))):new Date(NaN)}return n(e)}(e.dueDate),a.addTask(e)}))}}})();window.onload=e=>{try{ge.retrieveData()}catch(e){return e}const t=document.getElementById("main-container");ge.renderMain(t);const n=document.getElementById("category-btns"),a=document.getElementById("projects"),r=document.getElementById("content-area");ge.renderCategories(n),ge.renderProjects(a),ge.renderAllTasks(r),ge.assignInitialEvents()}})();