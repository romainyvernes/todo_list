(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}const n=e=>({name:e=e,dueDate:"",priority:"",projectId:"",notes:"",id:Date.now()}),a=(()=>{let n=[];return{addTask:e=>{n.push(e)},getTasks:()=>n,getTaskById:e=>{for(let t=0;t<n.length;t++)if(n[t].id==e)return n[t]},updateTask:e=>{for(let t=0;t<n.length;t++)if(n[t].id===e.id)return void n.splice(t,1,e)},deleteTask:e=>{for(let t=0;t<n.length;t++)if(n[t].id===e)return void n.splice(t,1)},sortByDate:n=>n.sort(((n,a)=>{if(""===n.dueDate||""===a.dueDate){if(""===n.dueDate&&""===a.dueDate)return 0;if(""===n.dueDate)return 1;if(""===a.dueDate)return-1}!function(n,a){e(2,arguments);var r=t(n),o=t(a);r.getTime(),o.getTime()}(n.dueDate,a.dueDate)})),sortByName:e=>e.sort(((e,t)=>{const n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0}))}})(),r=e=>({name:e=e,taskIds:[],id:Date.now()}),o=(()=>{let e=[];return{addProject:t=>{e.push(t)},getProjects:()=>e,updateProject:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t.id)return void e.splice(n,1,t)},deleteProject:t=>{for(let n=0;n<e.length;n++)if(e[n].id===t)return void e.splice(n,1)},sortByName:e=>e.sort(((e,t)=>{const n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0})),getProjectById:t=>{for(let n=0;n<e.length;n++)if(e[n].id==t)return e[n]}}})(),i=r("Write script");o.addProject(i);const d=n("Buy binder"),s=n("Do research");function c(n){e(1,arguments);var a=t(n);return!isNaN(a)}d.projectId=i.id,s.projectId=i.id,s.id=s.id+1,s.dueDate=new Date(2021,3,8),a.addTask(d),a.addTask(s),i.taskIds.push(d.id,s.id),setTimeout((()=>{const e=r("Do homework");o.addProject(e);const t=n("Write English essay"),i=n("Study math exam");i.id=i.id+1,i.projectId=e.id,i.dueDate=new Date(2021,3,11),a.addTask(i),e.taskIds.push(i.id),t.projectId=e.id,t.dueDate=new Date(2021,3,10),a.addTask(t),e.taskIds.push(t.id)}),10);var u={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function l(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var m,h={date:l({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:l({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:l({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},f={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function g(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;a=e.formattingValues[i]||e.formattingValues[o]}else{var d=e.defaultWidth,s=r.width?String(r.width):e.defaultWidth;a=e.values[s]||e.values[d]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function p(e){return function(t,n){var a=String(t),r=n||{},o=r.width,i=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],d=a.match(i);if(!d)return null;var s,c=d[0],u=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(u)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(c))return n}(u):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(c))return n}(u),s=e.valueCallback?e.valueCallback(s):s,{value:s=r.valueCallback?r.valueCallback(s):s,rest:a.slice(c.length)}}}const w={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof u[e]?u[e]:1===t?u[e].one:u[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:h,formatRelative:function(e,t,n,a){return f[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:g({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:g({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:g({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:g({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:g({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(m={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(m.matchPattern);if(!r)return null;var o=r[0],i=n.match(m.parsePattern);if(!i)return null;var d=m.valueCallback?m.valueCallback(i[0]):i[0];return{value:d=a.valueCallback?a.valueCallback(d):d,rest:n.slice(o.length)}}),era:p({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:p({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:p({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:p({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:p({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function y(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function v(n,a){e(2,arguments);var r=t(n).getTime(),o=y(a);return new Date(r+o)}function b(t,n){e(2,arguments);var a=y(n);return v(t,-a)}function C(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const T=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return C("yy"===t?a%100:a,t.length)},E=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):C(n+1,2)},D=function(e,t){return C(e.getUTCDate(),t.length)},M=function(e,t){return C(e.getUTCHours()%12||12,t.length)},P=function(e,t){return C(e.getUTCHours(),t.length)},k=function(e,t){return C(e.getUTCMinutes(),t.length)},x=function(e,t){return C(e.getUTCSeconds(),t.length)},j=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return C(Math.floor(a*Math.pow(10,n-3)),t.length)};var U=864e5;function S(n){e(1,arguments);var a=1,r=t(n),o=r.getUTCDay(),i=(o<a?7:0)+o-a;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function N(n){e(1,arguments);var a=t(n),r=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=S(o),d=new Date(0);d.setUTCFullYear(r,0,4),d.setUTCHours(0,0,0,0);var s=S(d);return a.getTime()>=i.getTime()?r+1:a.getTime()>=s.getTime()?r:r-1}function B(t){e(1,arguments);var n=N(t),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=S(a);return r}var I=6048e5;function W(n,a){e(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,d=null==i?0:y(i),s=null==r.weekStartsOn?d:y(r.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),u=c.getUTCDay(),l=(u<s?7:0)+u-s;return c.setUTCDate(c.getUTCDate()-l),c.setUTCHours(0,0,0,0),c}function Y(n,a){e(1,arguments);var r=t(n,a),o=r.getUTCFullYear(),i=a||{},d=i.locale,s=d&&d.options&&d.options.firstWeekContainsDate,c=null==s?1:y(s),u=null==i.firstWeekContainsDate?c:y(i.firstWeekContainsDate);if(!(u>=1&&u<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(o+1,0,u),l.setUTCHours(0,0,0,0);var m=W(l,a),h=new Date(0);h.setUTCFullYear(o,0,u),h.setUTCHours(0,0,0,0);var f=W(h,a);return r.getTime()>=m.getTime()?o+1:r.getTime()>=f.getTime()?o:o-1}function q(t,n){e(1,arguments);var a=n||{},r=a.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:y(o),d=null==a.firstWeekContainsDate?i:y(a.firstWeekContainsDate),s=Y(t,n),c=new Date(0);c.setUTCFullYear(s,0,d),c.setUTCHours(0,0,0,0);var u=W(c,n);return u}var O=6048e5;function A(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=t||"";return n+String(r)+i+C(o,2)}function H(e,t){return e%60==0?(e>0?"-":"+")+C(Math.abs(e)/60,2):L(e,t)}function L(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+C(Math.floor(r/60),2)+n+C(r%60,2)}const z={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return T(e,t)},Y:function(e,t,n,a){var r=Y(e,a),o=r>0?r:1-r;return"YY"===t?C(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):C(o,t.length)},R:function(e,t){return C(N(e),t.length)},u:function(e,t){return C(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return C(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return C(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return E(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return C(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(n,a,r,o){var i=function(n,a){e(1,arguments);var r=t(n),o=W(r,a).getTime()-q(r,a).getTime();return Math.round(o/O)+1}(n,o);return"wo"===a?r.ordinalNumber(i,{unit:"week"}):C(i,a.length)},I:function(n,a,r){var o=function(n){e(1,arguments);var a=t(n),r=S(a).getTime()-B(a).getTime();return Math.round(r/I)+1}(n);return"Io"===a?r.ordinalNumber(o,{unit:"week"}):C(o,a.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):D(e,t)},D:function(n,a,r){var o=function(n){e(1,arguments);var a=t(n),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var o=a.getTime(),i=r-o;return Math.floor(i/U)+1}(n);return"Do"===a?r.ordinalNumber(o,{unit:"dayOfYear"}):C(o,a.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return C(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return C(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return C(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return M(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):P(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):C(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):C(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):k(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):x(e,t)},S:function(e,t){return j(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return H(r);case"XXXX":case"XX":return L(r);case"XXXXX":case"XXX":default:return L(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return H(r);case"xxxx":case"xx":return L(r);case"xxxxx":case"xxx":default:return L(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+A(r,":");case"OOOO":default:return"GMT"+L(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+A(r,":");case"zzzz":default:return"GMT"+L(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return C(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return C((a._originalDate||e).getTime(),t.length)}};function F(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function X(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const Q={p:X,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],o=a[2];if(!o)return F(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",F(r,t)).replace("{{time}}",X(o,t))}};function G(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var R=["D","DD"],J=["YY","YYYY"];function _(e){return-1!==R.indexOf(e)}function V(e){return-1!==J.indexOf(e)}function K(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var $=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ee=/^'([^]*?)'?$/,te=/''/g,ne=/[a-zA-Z]/;function ae(e){return e.match(ee)[1].replace(te,"'")}const re={renderMain:e=>{const t=document.createElement("header"),n=document.createElement("i");n.className="far fa-check-circle",t.appendChild(n);const a=document.createElement("h1");a.textContent="My Todo",t.appendChild(a);const r=document.createElement("div");r.id="side-bar";const o=document.createElement("ul");o.id="category-btns",r.appendChild(o);const i=document.createElement("h2");i.textContent="Projects",r.appendChild(i);const d=document.createElement("ul");d.id="projects",r.appendChild(d);const s=document.createElement("div");s.id="add-project-container";const c=document.createElement("i");c.className="fas fa-plus",s.appendChild(c);const u=document.createElement("span");u.textContent="Add new project",s.appendChild(u),r.appendChild(s);const l=document.createElement("div");l.id="add-project-input";const m=document.createElement("input");m.type="text",m.placeholder="Enter project name",m.maxLength="30",l.appendChild(m);const h=document.createElement("button");h.type="button",h.id="project-validate";const f=document.createElement("i");f.className="fas fa-check",h.appendChild(f),l.appendChild(h);const g=document.createElement("button");g.type="button",g.id="project-cancel";const p=document.createElement("i");p.className="fas fa-times",g.appendChild(p),l.appendChild(g),r.appendChild(l);const w=document.createElement("div");w.id="content-area",e.appendChild(t),e.appendChild(r),e.appendChild(w)},populateSideBar:(e,t)=>{t.map((t=>{const n=document.createElement("li");if(t.projectId&&(n.dataset.projectId=t.projectId),t.iconClass){const e=document.createElement("i");e.className=t.iconClass,n.appendChild(e)}const a=document.createElement("span");a.textContent=t.label,n.appendChild(a),e.appendChild(n)}))},renderContentArea:(n,a,r)=>{a.map((a=>{const o=document.createElement("div");o.className="name-wrapper";const i=document.createElement("i");i.className="fas fa-tasks",o.appendChild(i);const d=document.createElement("h2");d.textContent=a.name,o.appendChild(d);const s=document.createElement("button");s.type="button",s.className="task-add-btn",s.textContent="+",o.appendChild(s);const u=document.createElement("ul");r.filter((e=>e.projectId===a.id)).map((n=>{const a=document.createElement("li"),r=document.createElement("span");r.className="check-circle",a.appendChild(r);const o=document.createElement("span");o.className="task-label",o.textContent=n.name,a.appendChild(o);const i=document.createElement("span");i.className="task-date",""!==n.dueDate?i.textContent=function(n,a,r){e(2,arguments);var o=String(a),i=r||{},d=i.locale||w,s=d.options&&d.options.firstWeekContainsDate,u=null==s?1:y(s),l=null==i.firstWeekContainsDate?u:y(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=d.options&&d.options.weekStartsOn,h=null==m?0:y(m),f=null==i.weekStartsOn?h:y(i.weekStartsOn);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var g=t(n);if(!c(g))throw new RangeError("Invalid time value");var p=G(g),v=b(g,p),C={firstWeekContainsDate:l,weekStartsOn:f,locale:d,_originalDate:g};return o.match(Z).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,Q[t])(e,d.formatLong,C):e})).join("").match($).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return ae(e);var r=z[t];if(r)return!i.useAdditionalWeekYearTokens&&V(e)&&K(e,a,n),!i.useAdditionalDayOfYearTokens&&_(e)&&K(e,a,n),r(v,e,d.localize,C);if(t.match(ne))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("")}(n.dueDate,"MM/dd/yyyy"):i.textContent="no due date",a.appendChild(i);const d=document.createElement("div");d.className="priority-level";const s=document.createElement("i");s.className="priority-flag fab fa-font-awesome-flag",s.dataset.color="green",d.appendChild(s),a.appendChild(d);const l=document.createElement("i");l.className="far fa-edit edit-icon",a.appendChild(l),u.appendChild(a)})),n.appendChild(o),n.appendChild(u)}))},showProjectInput:()=>{document.getElementById("add-project-input").style.display="block"},showAddProjectBtn:()=>{document.getElementById("add-project-container").style.display="block"},hideProjectInput:()=>{document.getElementById("add-project-input").style.display="none"},hideAddProjectBtn:()=>{document.getElementById("add-project-container").style.display="none"}},oe=(()=>{let e=[];return{createEvent:(t,n,a)=>{const r=((e,t,n)=>({target:e=e,name:t=t,functions:n=n}))(t,n,a);console.log(a),e.push(r)},assignEvents:()=>{e.map((e=>{e.target.addEventListener(e.name,(t=>{e.functions.map((e=>e()))}))}))}}})(),ie=(()=>{const n=()=>{const e=document.getElementById("projects"),t=o.sortByName(o.getProjects());let n=[];t.length>0&&(t.map((e=>{const t={label:e.name,iconClass:"fas fa-folder-open",projectId:e.id};n.push(t)})),re.populateSideBar(e,n))},i=()=>{const e=document.getElementById("content-area"),t=o.sortByName(o.getProjects()),n=a.sortByDate(a.getTasks());re.renderContentArea(e,t,n)},d=(n,r)=>{const i=document.getElementById("content-area"),d=((n,a,r)=>{const o={start:a,end:r};return n.filter((n=>!(""===n.dueDate||!function(n,a){e(2,arguments);var r=a||{},o=t(n).getTime(),i=t(r.start).getTime(),d=t(r.end).getTime();if(!(i<=d))throw new RangeError("Invalid interval");return o>=i&&o<=d}(n.dueDate,o))))})(a.getTasks(),n,r),s=d.reduce(((e,t)=>(e.push(t.projectId),e)),[]).filter(((e,t,n)=>n.indexOf(e)===t)).reduce(((e,t)=>{const n=o.getProjectById(t);return e.push(n),e}),[]);re.renderContentArea(i,s,d)},s=()=>{const e=(new Date).setHours(0,0,0,0),t=(new Date).setHours(23,59,59,999);d(e,t)},c=()=>{const n=(new Date).setHours(0,0,0,0),a=function(n,a){e(2,arguments);var r=t(n),o=y(a);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}(n,6).setHours(23,59,59,999);d(n,a)},u=e=>{const t=document.getElementById("content-area"),n=[o.getProjectById(e)];let r=n[0].taskIds.reduce(((e,t)=>{const n=a.getTaskById(t);return e.push(n),e}),[]);r=a.sortByDate(r),re.renderContentArea(t,n,r)},l=e=>{let t=e.firstElementChild;for(;t;)t.remove(),t=e.firstElementChild},m=()=>{const e=document.getElementById("content-area"),t=document.getElementById("projects"),a=document.querySelector("#add-project-input input");if(""===a.value)return;const i=r(a.value);o.addProject(i),a.value="",re.hideProjectInput(),re.showAddProjectBtn(),l(t),n(),l(e),u(i.id)},h=()=>{document.querySelector("#add-project-input input").value="",re.hideProjectInput(),re.showAddProjectBtn()};return{renderMain:()=>{const e=document.getElementById("main-container");re.renderMain(e)},renderProjects:n,renderCategories:()=>{const e=document.getElementById("category-btns");re.populateSideBar(e,[{label:"All tasks",iconClass:"fas fa-inbox"},{label:"Today",iconClass:"fas fa-calendar-day"},{label:"Next 7 days",iconClass:"fas fa-calendar-week"}])},renderAllTasks:i,assignEvents:()=>{(()=>{const e=document.getElementById("content-area"),t=document.querySelectorAll("#category-btns li"),n=()=>{l(e)},a="click",r=t[0];oe.createEvent(r,a,[n,i]);const o=t[1];oe.createEvent(o,a,[n,s]);const d=t[2];oe.createEvent(d,a,[n,c]),oe.assignEvents()})(),(()=>{const e=document.getElementById("content-area"),t=document.querySelectorAll("#projects li"),n=()=>{l(e)},a="click";t.forEach((e=>{oe.createEvent(e,a,[n,()=>{u(e.dataset.projectId)}])}));const r=document.getElementById("add-project-container");oe.createEvent(r,a,[re.hideAddProjectBtn,re.showProjectInput]);const o=document.getElementById("project-validate");oe.createEvent(o,a,[m]);const i=document.getElementById("project-cancel");oe.createEvent(i,a,[h])})(),oe.assignEvents()}}})();window.onload=e=>{ie.renderMain(),ie.renderCategories(),setTimeout((()=>{ie.renderProjects(),ie.assignEvents(),ie.renderAllTasks()}),11)}})();