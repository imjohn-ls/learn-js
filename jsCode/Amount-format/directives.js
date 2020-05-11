/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/*指令命名：uiXxxx*/
/**
 *@author yoyo.liu
 * @param {Object} window
 * @param {Object} vx
 * 输入金额 v-amout
 */
(function(window, vx, undefined) {'use strict';
	function toChineseCash(sAmount) {
		var value = toStdAmount(sAmount);
		if (value.indexOf('.') != value.lastIndexOf('.'))
			return '金额输入有误';
		var sCN_Num = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
		var unit = new Array('元', '万', '亿', '万');
		var subunit = new Array('拾', '佰', '仟');
		var sCNzero = '零';
		var result = "";
		var iDotIndex = value.indexOf('.');
		var sBeforeDot = value.slice(0, iDotIndex);
		var sAfterDot = value.slice(iDotIndex);
		var len = 0;
		len = sBeforeDot.length;
		var i = 0, j = 0, k = 0;
		// j is use to subunit,k is use to unit
		var oldC = '3';
		var cc = '0';
		result = unit[0] + result;
		var oldHasN = false;
		var hasN = false;
		var allZero = true;
		for (var i = 0; i < len; i++) {
			if (j == 0 && i != 0) {
				if (!hasN) {
					if ((k % 2) == 0)
						result = result.slice(1);
				} else {
					if (oldC == '0')
						result = sCNzero + result;
				}
				result = unit[k] + result;
				oldHasN = hasN;
				hasN = false;
			}
			cc = sBeforeDot.charAt(len - i - 1);
			if (oldC == '0' && cc != oldC) {
				if (hasN)
					result = sCNzero + result;
			}
			if (cc != '0') {
				if (j != 0) {
					result = subunit[j - 1] + result;
				}
				var dig = '0';
				dig = sCN_Num[cc];

				if (dig == '0') {
					return false;
				}
				hasN = true;
				allZero = false;
				result = dig + result;
			}
			oldC = cc;
			j++;
			if (j == 4) {
				k++;
				j = 0;
			}
		}
		if (allZero) {
			result = "零元";
		} else {
			var bb = 0;
			if (!hasN) {
				bb++;
				if (!oldHasN) {
					bb++;
				}
			}
			if (bb != 0) {
				result = result.slice(bb);
			}
			if (result.charAt(0) == '零') {
				result = result.slice(1);
			}
		}

		// after dot
		sAfterDot = sAfterDot.slice(1);
		len = sAfterDot.length;
		var corn = new Array('0', '0');
		var cornunit = new Array('角', '分');
		var n = 0;
		// j is use to subunit,k is use to unit
		var dig = '0';
		corn[0] = sAfterDot.charAt(0);
		if (len > 1) {
			corn[1] = sAfterDot.charAt(1);
		} else {
			corn[1] = '0';
		}
		if ((corn[0] == '0') && (corn[1] == '0')) {
			return result += '整';
		} else {
			if (allZero)
				result = "";
		}
		for (var i = 0; i < 2; i++) {
			var curchar = corn[i];
			dig = sCN_Num[curchar];
			if (i == 0) {
				if (result != "" || curchar != '0') {
					result += dig;
				}
				if (curchar != '0') {
					result += cornunit[0];
				}
			}
			if (i == 1 && curchar != '0') {
				result = result + dig + cornunit[1];
			}
		}
		return result;
	}

	function toStdAmount(sAmount) {
		if (!vx.isDefined(sAmount))
			return;
		var sComma = /\,/gi;
		sAmount = sAmount + "";
		var sResult = sAmount.replace(sComma, "");
		var iDotIndex = sResult.indexOf('.');
		var iLength = sResult.length;
		var toMatchNaNum = /\D/;
		var flag = true;
		if ((iDotIndex != -1 && (iLength - iDotIndex > 3 || toMatchNaNum.test(sResult.slice(0, iDotIndex)))) || toMatchNaNum.test(sResult.slice(iDotIndex + 1, iLength))) {
			flag = false;
			return sResult.substr(0, iDotIndex + 3);
			// 小数点后大于2位数 或 含有非数字字符
		} else {
			// 将金额处理为######.##形式
			if (iDotIndex == -1) {
				sResult = sResult + '.00';
			} else if (iDotIndex === 0) {
				if (iLength - iDotIndex === 1)
					sResult = '0' + sResult + '00';
				if (iLength - iDotIndex === 2)
					sResult = '0' + sResult + '0';
				if (iLength - iDotIndex === 3)
					sResult = '0' + sResult;
			} else {
				if (iLength - iDotIndex === 2)
					sResult = sResult + '0';
				if (iLength - iDotIndex === 1)
					sResult = sResult + '00';
			}

			// 处理金额非前面的0
			var sTemp = "";
			sTemp = sResult.slice(0, iDotIndex);
			var iTemp = new Number(sTemp);
			sTemp = iTemp.toString();
			if (sTemp.length > 16) {
				flag = false;
				return 2;
				// 太长的金额
			}
			iDotIndex = sResult.indexOf('.');
			sResult = sTemp + sResult.slice(iDotIndex);
			// 返回######.##形式的金额
			return sResult;
		}
	}

	function toCashWithComma(cash) {
		while (cash.charAt(0) == '0') {
			cash = cash.substr(1);
		};
		if (!isFloat(cash)) {
			return addComma(cash);
		};
		var dotIndex = cash.indexOf('.');
		var integerCash = cash.substring(0, dotIndex);
		var decimalCash = cash.substring(dotIndex);
		return addComma(integerCash) + decimalCash;
	}

	function toCashWithCommaAndDot(cash) {
		if (cash == null || cash == 'null' || cash == '') {
			return '';
		}
		var temp = toCashWithComma(cash);
		if (temp.length == 0) {
			return "0.00";
		}
		var dotPos = temp.indexOf(".");
		if (dotPos < 0) {
			return temp + '.00';
		}
		if (dotPos == 0) {
			temp = '0' + temp;
			dotPos = temp.indexOf(".");
		}
		if (dotPos == temp.length - 2) {
			return temp + '0';
		}
		if (dotPos == temp.length - 1) {
			return temp + '00';
		}
		return temp;
	}

	function isFloat(s) {
		var isFloat = RegExp(/^([0-9]+(\.+))[0-9]+$/);
		return (isFloat.test(s) );
	}

	function isMoney(s) {
		var isMoney = RegExp(/^[0-9]{0,15}\.{0,1}[0-9]{0,2}$/);
		return ( isMoney.test(s) );
	}

	function addComma(str) {
		if (str.length > 3) {
			var mod = str.length % 3;
			var output = (mod > 0 ? (str.substring(0, mod)) : '');
			for (var i = 0; i < Math.floor(str.length / 3); i++) {
				if ((mod == 0) && (i == 0)) {
					output += str.substring(mod + 3 * i, mod + 3 * i + 3);
				} else {
					output += ',' + str.substring(mod + 3 * i, mod + 3 * i + 3);
				}
			}
			return (output);
		} else {
			return str;
		}
	}

	/*
	 * vLimit
	 */
	var directive = {};
	directive.uiLimit = ['$compile',
	function($compile) {
		return {
			restrict : 'CA',
			link : function(scope, element, attrs) {
				var defaults = {
					"length" : undefined
				};
				var params = $.extend({}, defaults, vx.fromJson(attrs.vLimit || {}));
				scope.$watch(attrs.vModel, function(u) {
				});

				element.bind({
					'keydown' : function(e, value) {
						if (params.length) {
							var theEvent = window.event || e;
							if (($(this).val().toString().length >= params.length)) {
								if (theEvent.keyCode != 13 && theEvent.keyCode != 9 && theEvent.keyCode != 8 && theEvent.keyCode != 37 && theEvent.keyCode != 39) {
									if (window.event) {
										theEvent.keyCode = 0;
										theEvent.returnValue = false;
										theEvent.preventDefault();
									} else {
										theEvent.preventDefault();
									}
								}
							}
						}
					},
					'keyup' : function(e) {
						if (params.length) {
							if (($(this).val().toString().length > params.length)) {
								$(this).val($(this).val().substr(0, 10));
							}
						}
					}
				});
			}
		};
	}];
	// Modify chenguojian
	/**
	 * EX:
	 * 		<input type="number" v-model="payAmount" v-amount="ChineseCashPay" />
	 * 		<span style="color:red;">{{ChineseCashPay}}</span>
	 */
	directive.uiAmount = ['$compile',
	function($compile) {
		return {
			restrict : 'CA',
			link : function(scope, element, attrs) {
				var defaults = {
					"ChineseCash" : "ChineseCash",
					"intlength" : 13,
					"floatlength" : 2
				};
				var params = $.extend({}, defaults, vx.fromJson(attrs.uiAmount || {}));

				if(scope[attrs.ngModel] != undefined){
					scope[attrs.ngModel + "_amount"] = parseFloat(scope[attrs.ngModel].replace(/,/g,''));
				}

				scope.$watch(attrs.ngModel, function(u) {

					if (isMoney(toStdAmount(u))){
						scope[attrs.ngAmount] = toChineseCash(u);
					}
					if (vx.isEmpty(u)){
						scope[params.ChineseCash] = "";
						scope[attrs.ngAmount] = "";
					}
					if (!/\./.test(u) && /,/.test(u))

						scope[attrs.ngModel] = u.replace(",", "");

					// scope[attrs.ngAmount] = scope[params.ChineseCash];
				});

				var flag = false;
				element.bind({
					'focus' : function() {
						if (flag) {
							scope[attrs.ngModel] = undefined;
						} else {
							if (scope[attrs.ngModel] == undefined) {
								scope[attrs.ngModel + "_amount"] = undefined;
							}
							/*if (scope[attrs.ngModel + "_amount"] || scope[attrs.ngModel + "_amount"] === 0) {
								scope[attrs.ngModel] = scope[attrs.ngModel + "_amount"];
							}*/
							if(scope[attrs.ngModel]){
								if(scope[attrs.ngModel + "_amount"] == undefined){
									scope[attrs.ngModel + "_amount"] = parseFloat(scope[attrs.ngModel].replace(/,/g,''));
								}
								scope[attrs.ngModel] = scope[attrs.ngModel + "_amount"];
							}
						}
						scope.$apply(scope);
					},
					'blur' : function() {
						debugger;
						if ($(this).val() != "" && $(this).val() >=0 ) {
							//debugger;
							flag = false;
							scope[attrs.ngModel + "_amount"] = parseFloat($(this).val());
							scope[attrs.ngModel] = toCashWithCommaAndDot(toStdAmount($(this).val() + ''));
							$(this).val(scope[attrs.ngModel].substr(0, scope[attrs.ngModel].indexOf('.') + 3));
							scope.$apply(scope);
						} else {
							flag = true;
							scope[attrs.ngModel + "_amount"] = null;
							scope[attrs.ngModel] = null;
							scope.$apply(scope);
						}
						//进行回调操作（现无参）
						if (params.blurCallBack) {
							eval(params.blurCallBack);
							scope.$apply(scope);
						}
					},
					'keydown' : function(e, value) {
						var value = $(this).val();

						var theEvent = window.event || e;
						if ((theEvent.ctrlKey || theEvent.shiftKey || $(this).val().toString().length == params.maxlength)) {
							if (theEvent.keyCode != 13 && theEvent.keyCode != 9 && theEvent.keyCode != 8) {
								if (window.event) {
									code = 0;
									theEvent.returnValue = false;
								} else {
									theEvent.preventDefault();
								}
							}
						}
						var code = theEvent.keyCode || theEvent.which;
						if (code < 48 || (code > 57 && code < 96) || code > 105) {
							if (code == 229 || code == 110 || code == 37 || code == 39 || code == 46 || code == 8 || code == 180 || code == 190 || code == 9) {
								if ((code == 110 || code == 190) && (value.length == 0 || value.indexOf('.') > -1)) {
									if (window.event) {
										code = 0;
										theEvent.returnValue = false;
									} else {
										theEvent.preventDefault();
									}
								}
							} else {
								if (window.event) {
									code = 0;
									theEvent.returnValue = false;
								} else {
									theEvent.preventDefault();
								}
							}
						}else{
							if(value.split(".")[0].length >= params.intlength && value.indexOf(".") == -1
							||(value.indexOf(".")>-1 && (code == 110 || code == 190))
							|| (value.indexOf(".")>-1 && value.split(".")[1].length > params.floatlength)){
								if(window.event){
									code = 0;
									theEvent.returnValue = false;
								}else{
									theEvent.preventDefault();
								}
							}
						}
					},
					'keyup' : function(e) {

						//						var amount = scope[attrs.vModel].substr(0,scope[attrs.vModel].length()-3);
						//lss
						//						if($(this).val().toString().length=11){
						//							scope.$jsonError = [{
						//								"_exceptionMessage" : "["+attrs.title+"]"+"不能大于11位"
						//							}];
						//
						//							return;
						//						}
						var showValue = $(this).val();
						if (showValue.indexOf('.') >= 0 && showValue.length - showValue.indexOf('.') > 3) {
							$(this).val(scope[attrs.ngModel].substr(0, scope[attrs.ngModel].indexOf('.') + 3));
						}

						scope.$apply(scope);
					}
				});
			}
		};
	}];

	/**
	 * EX:
	 * 		<input type="number" v-model="payAmount" ui-float/>
	 *
	 */
	directive.uiFloat = ['$compile','$log',
		function($compile,$log) {
			return {
				restrict : 'CA',
				link : function(scope, element, attrs) {
					scope.$watch(attrs.ngModel, function(u) {
						//alert(typeof (u));
						// alert("len"+scope.pointlength);
						if(!/^\d{1,}(\.){0,1}\d{0,}$/.test(u)){
							if (typeof (u)=="undefined" || ""==u || null==u){
								return;
							}
							scope[attrs.ngModel] = u.substring(0,u.trim().length-1);
						}
					//	alert("aaa");
					});

					var len=parseInt(attrs.pointlength);
				//	alert(len);
					element.bind(
						{
							'focus' : function() {
								// console.log(scope.pointlength);
								// debugger;
								scope.$apply(scope);
							},
							'blur' : function() {
								if ($(this).val().toString().trim().length==0){//长度为0
									scope[attrs.ngModel]="0.";
									for (var i=0;i<len;i++){
										scope[attrs.ngModel]=scope[attrs.ngModel].toString().trim()+"0";
									}
									//alert("00000");
									scope.$apply(scope);
								}else if($(this).val().toString().trim().length==1){//长度为1
									scope[attrs.ngModel]=$(this).val().toString().trim()+".";
									for (var i=0;i<len;i++){
										scope[attrs.ngModel]=scope[attrs.ngModel].toString().trim()+"0";
									}
								//	alert("11111");
									scope.$apply(scope);
								}else if ($(this).val().toString().trim().length>1){//长度大于1的时候
										if ($(this).val().toString().trim().indexOf('.')!=-1){//有小数点
											scope[attrs.ngModel]=$(this).val().toString().trim();
											var len1=scope[attrs.ngModel].length;
											var len2=scope[attrs.ngModel].indexOf('.');
											if(len1-len2>len){//如果输入的小数点的位数大于设定的小数点的位数，则只保留设定的小数点的位数
												scope[attrs.ngModel]=scope[attrs.ngModel].toString().trim().substring(0,len2+3);
											}
											// alert("len1:"+len1+",len2:"+len2)
											for (var i=0;i<len-(len1-len2-1);i++){
												scope[attrs.ngModel]=scope[attrs.ngModel]+"0";
											}
											scope.$apply(scope);
											return;
										}
										//没有小数点的时候
										scope[attrs.ngModel]=$(this).val().toString().trim()+".";
										for (var i=0;i<len;i++){
											scope[attrs.ngModel]=scope[attrs.ngModel].toString().trim()+"0";
										}
										scope.$apply(scope);
								//	alert("22222");
								}
							}
						});
				}
			};
		}];

	vx.module('ibsapp.libraries').directive(directive);

})(window, window.vx);
/**
 * @ngdoc event
 * @name ngInclude#$includeContentError
 * @eventType emit on the scope ngInclude was declared in
 * @description
 * Emitted when a template HTTP request yields an erroneous response (status < 200 || status > 299)
 *
 * @param {Object} angularEvent Synthetic event object.
 * @param {String} src URL of content to load.
 */
(function(window, vx, undefined) {'use strict';
	var ibsapp = vx.module("ibsapp.libraries");
	var uiIncludeDirective = ['$templateRequest', '$anchorScroll', '$animate', '$compile',
	function($templateRequest, $anchorScroll, $animate, $compile) {
		return {
			restrict : 'ECA',
			priority : 400,
			terminal : true,
			transclude : 'element',
			controller : vx.noop,
			compile : function(element, attr) {
				var srcExp = attr.uiInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;

				return function(scope, $element, $attr, ctrl, $transclude) {
					var changeCounter = 0, currentScope, previousElement, currentElement;

					var cleanupLastIncludeContent = function() {
						if (previousElement) {
							previousElement.remove();
							previousElement = null;
						}
						if (currentScope) {
							currentScope.$destroy();
							currentScope = null;
						}
						if (currentElement) {
							$animate.leave(currentElement).then(function() {
								previousElement = null;
							});
							previousElement = currentElement;
							currentElement = null;
						}
					};

					scope.$watch(srcExp, function ngIncludeWatchAction(src) {
						var afterAnimation = function() {
							if (vx.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
								$anchorScroll();
							}
						};
						var thisChangeId = ++changeCounter;
						if (isNaN(src)) {
							src = srcExp;
						}
						if (src) {
							//set the 2nd param to true to ignore the template request error so that the inner
							//contents and scope can be cleaned up.
							$templateRequest(src, true).then(function(response) {
								if (thisChangeId !== changeCounter)
									return;
								//var newScope = scope.$new();
								var newScope = scope;
								ctrl.template = response;

								// Note: This will also link all children of ui-include that were contained in the original
								// html. If that content contains controllers, ... they could pollute/change the scope.
								// However, using ng-include on an element with additional content does not make sense...
								// Note: We can't remove them in the cloneAttchFn of $transclude as that
								// function is called before linking the content, which would apply child
								// directives to non existing elements.
								var clone = $transclude(newScope, function(clone) {
									cleanupLastIncludeContent();
									$animate.enter(clone, null, $element).then(afterAnimation);
								});

								currentScope = newScope;
								currentElement = clone;

								currentElement.html(ctrl.template);
								$compile(currentElement.contents())(currentScope);

								currentScope.$emit('$includeContentLoaded', src);
								scope.$eval(onloadExp);
							}, function() {
								if (thisChangeId === changeCounter) {
									cleanupLastIncludeContent();
									scope.$emit('$includeContentError', src);
								}
							});
							scope.$emit('$includeContentRequested', src);
						} else {
							cleanupLastIncludeContent();
							ctrl.template = null;
						}
					});
				};
			}
		};
	}];
	ibsapp.directive("uiInclude", uiIncludeDirective);
})(window, window.vx);

/**
 *@author yoyo.liu
 * @param {Object} window
 * @param {Object} vx
 * 步骤页分页指令
 */
(function(window, vx) {'use strict';
	ngPagesController.$inject = ['$scope', '$element', '$attrs', '$http', '$templateCache'];
	function ngPagesController(scope, element, attr, $http, $templateCache) {
		this.pages = [];
		this.activePage = this.historyPage = 0;
	}

	var directive = {};
	directive.ngPages = ['$log',
	function($log) {
		return {
			restrict : 'EA',
			//terminal : true, // disable page inner compile for lazy-compile
			//require : ['vPage', '^vViewport'],
			priority : 99,
			controller : ngPagesController,
			link : function(scope, element, attr, ctrl) {
				ctrl.pages = element.children("div[v-page]");
				for (var i = 1; i < ctrl.pages.length; i++) {
					ctrl.pages[i].style.display = "none";
				}
				scope.$root.$loadPage = function(param) {
					if (/^[#]/.test(param)) {
						ctrl.historyPage = ctrl.activePage;
						if (/^\d$/.test(param.substr(1))) {
							ctrl.activePage = parseInt(param.substr(1)) - 1;
						} else {
							ctrl.activePage = eval(ctrl.historyPage + param.substr(1)) > 0 ? eval(ctrl.historyPage + param.substr(1)) : 0;
						}
						ctrl.pages.eq(ctrl.historyPage).hide();
						ctrl.pages.eq(ctrl.activePage).show();
						//冒泡事件
						scope.$emit("$pageContentLoaded", param);
					}
				};
			}
		};
	}];
	directive.ngPage = ['$templateRequest', '$anchorScroll', '$animate', '$compile',
	function($templateRequest, $anchorScroll, $animate, $compile) {
		return {
			restrict : 'EA',
			//terminal : true, // disable page inner compile for lazy-compile
			//require : ['vPage', '^vViewport'],
			priority : 100,
			//controller : ngPagesController,
			link : function(scope, element, attr) {
				//element[0].style.display="none";
				if (attr.href) {
					$templateRequest(attr.href, true).then(function(response) {
						element.html(response);
						$compile(element.contents())(scope);
					}, function() {
						$log.error(attr.href + "装载失败！");
					});
				}
			}
		};
	}];
	vx.module('ibsapp').directive(directive);
})(window, window.vx);
/**
 * @author yoyo.liu
 * @param {Object} window
 * @param {Object} vx
 * 输入框右侧校验ui-validate
 */
(function(window, vx) {'use strict';
	var directive = {};
	directive.uiValidate = ['$compile', '$log',
	function($compile, $log) {
		return {
			restrict : 'EA',
			//transclude : true, // It transcludes the contents of the directive into the template
			//replace : false, // The element containing the directive will be replaced with the template
			//templateUrl : 'lib/template/blurError/blurError.html',
			//require: 'ngModel',
			controller : ['$scope', '$element', '$attrs',
			function(scope, element, attr) {
				this.message = {};
				this.message["zh_CN"] = {
					required : attr["requiredMessage"] || "不能为空",
					min : attr["minMessage"] || "最小值:" + attr["ngMin"],
					max : attr["maxMessage"] || "最大值:" + attr["ngMax"],
					minlength : attr["minlengthMessage"] || "最小长度:" + attr["ngMinlength"],
					maxlength : attr["maxlengthMessage"] || "最大长度:" + attr["ngMaxlength"],
					pattern : attr["patternMessage"] || "格式不正确",
					"default" : "格式不正确"
				};
				this.message["en"] = {
					required : attr["requiredMessageEn"] || "required invalid",
					min : attr["minMessageEn"] || "min value:" + attr["ngMin"],
					max : attr["maxMessageEn"] || "max value:" + attr["ngMax"],
					minlength : attr["minlengthMessageEn"] || "min length:" + attr["ngMinlength"],
					maxlength : attr["maxlengthMessageEn"] || "max length:" + attr["ngMaxlength"],
					pattern : attr["patternMessageEn"] || "pattern invalid",
					"default" : "pattern invalid"
				};
			}],
			link : function(scope, element, attr, ctrl) {
				var ERRORCLASS = "error";
				var controls = element.controller('form');
				var formName = controls.$name;
				var tr = element.parent().parent();
				var valObj = vx.element(
					'<div class="ferror" v-show="'+formName+'.'+attr.name+'.$invalid"><b class="icon"></b>{{'+formName+'.'+attr.name+'.uiValidateMsg}}</div>'
					);
				element.parent().append(valObj);
				$compile(valObj.contents())(scope);

				var message = ctrl.message;
				var ctrlName = attr['name'] || attr['id'];
				var lang = attr.language || scope["language"] || "zh_CN";
				//取域的title值
				var ctrlComment = lang === "en" ? "[" + (attr['title_en'] || ctrlName) + "]  " : "[" + (attr['title_zh'] || attr.title || ctrlName) + "]  ";
				scope.$watch(function() {
					return scope[attr.name];
				}, function(newVal, oldVal, scope) {
					var model = scope[formName][attr.name];
					if (!model.$dirty)
						return;
					if(model.$valid){
						tr.removeClass(ERRORCLASS);
					}
					for (var key in model.$error) {
						if (model.$error[key]) {
							var errMessageAttrName = lang === "en" ? key + "MessageEn" : key + "Message";
							var errMessage = message[lang][key] || attr[errMessageAttrName] || message[lang]['default'];
							model["uiValidateMsg"] = errMessage;
							//scope.$apply();
							$log.error("ui-validate error:" + ctrlComment + errMessage);
							tr.addClass(ERRORCLASS);
							return;
						}
					}
				},true);
			}
		};
	}];
	vx.module('ibsapp').directive(directive);
})(window, window.vx);
/**
 *@author yoyo
 * slideBox
 */
(function(window, vx) {
	var directive = {};
	directive.uiSlidebox = ["$log",
	function($log) {
		return {
			restrict : 'CA',
			priority : -10,
			compile : function(element, attrs) {
				//change by yoyo
				var wrapper = $(element), ul = wrapper.find('ul.items'), firstPic = ul.find('img'), expa = wrapper.find("[v-repeat]").attr("v-repeat"), rhs = expa.match(/^\s*(.+)\s+in\s+(.*)\s*$/)[2];
				wrapper.css({
					'overflow' : 'hidden'
				});
				ul.css({
					"position" : "relative"
				});
				return {
					pre : function($scope, element, attrs) {
						var options = vx.fromJson(attrs.uiSlidebox || {});

						slideBox(element, options);
						function slideBox(el, options) {
							var defaults = {
								direction : 'left', // left,top
								duration : 0.6, // unit:seconds
								easing : 'swing', // swing,linear
								//delay : 3,// unit:seconds
								startIndex : 0,
								hideClickBar : true,
								clickBarRadius : 5, // unit:px
								hideBottomBar : false,
								autoSize : true,
								order_by : 'ASC', //定义滚动顺序:ASC/DESC,
								picLoop : false //是否是图片轮播 应用场景
							};
							var settings = $.extend(defaults, options || {});
							var li_num, li_height = 0, li_width = 0;

							var init = function() {
								lis = ul.find('li');
								li_num = lis.size(), li_height = 0, li_width = 0;
								if (!wrapper.size()) {
									return false;
								}
								li_height = lis.eq(0).outerHeight(true) ;
								li_width = lis.eq(0).outerWidth(true) ;
								// lis.css({
									// width : li_width + 'px',
									// height : li_height + 'px'
								// });

								if (settings.direction == 'left') {
									ul.css('width', li_num * li_width + 'px');
								} else {
									ul.css('height', li_num * li_height + 'px');
								}

							};

							var start = function(flag) {
								var active = ul.find('li.active');
								var index;
								if (settings.delay) {
									index = active.index();
								} else {
									index = cal(active.index(), flag, active)
								}
								if (settings.direction == 'left') {
									offset = index * li_width * -1;
									param = {
										'left' : offset + 'px'
									};
								} else {
									offset = index * li_height * -1;
									param = {
										'top' : offset + 'px'
									};
								}
								wrapper.find('.nums').find('li:eq(' + index + ')').addClass('active').siblings().removeClass('active');

								ul.stop().animate(param, settings.duration * 1000, settings.easing, function() {
									active.removeClass('active');
									if (settings.delay) {
										if (settings.order_by == 'ASC') {
											if (active.next().size()) {
												active.next().addClass('active');
											} else {
												settings.order_by = 'DESC';
												active.prev().addClass('active');
											}
										} else if (settings.order_by == 'DESC') {
											if (active.prev().size()) {
												active.prev().addClass('active');
											} else {
												settings.order_by = 'ASC';
												active.next().addClass('active');
											}
										}
									} else {
										ul.find('li:eq(' + index + ')').addClass('active');
									}
								});
								if (settings.delay) {
									wrapper.data('timeid', /*settings.delay*1000*/
									window.setTimeout(start, settings.delay * 1000));
								}

							};
							var reload = init;

							var tapping = false, startTime, touchStartX, touchStartY, winWidth;
							if (window.innerWidth)
								winWidth = window.innerWidth;
							else if ((document.body) && (document.body.clientWidth))
								winWidth = document.body.clientWidth;
							element.on('touchstart', function(event) {
								//var temp=event.originalEvent.changedTouches[0].clientX||event.changedTouches[0].clientX
								tapping = true;
								tapElement = event.target ? event.target : event.srcElement;
								// IE uses srcElement.
								// Hack for Safari, which can target text nodes instead of containers.
								if (tapElement.nodeType == 3) {
									tapElement = tapElement.parentNode;
								}
								startTime = Date.now();
								var touches = event.touches && event.touches.length ? event.touches : [event];
								var e = touches[0].originalEvent || touches[0];
								touchStartX = e.clientX || event.originalEvent.changedTouches[0].clientX || event.changedTouches[0].clientX;
								touchStartY = e.clientY || event.originalEvent.changedTouches[0].clientY || event.changedTouches[0].clientY;
							});

							element.on('touchmove', function(event) {
								//resetState();
							});
							element.on('touchcancel', function(event) {
								//resetState();
							});

							element.on('touchend', function(event) {
								var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches : ((event.touches && event.touches.length) ? event.touches : [event]);
								var e = touches[0].originalEvent || touches[0];
								var x = e.clientX || event.originalEvent.changedTouches[0].clientX || event.changedTouches[0].clientX;
								var y = e.clientY || event.originalEvent.changedTouches[0].clientY || event.changedTouches[0].clientY;
								var dist = x - touchStartX;
								var leftTemp = ul.css("left").replace("px", ""), leftNum = parseInt(leftTemp);
								var ulWidth = ul.width();
								if (dist > 12 && ulWidth > winWidth && leftNum < 0) {
									if (dist > -leftNum) {
										ul.stop().animate({
											left : 0 + "px"
										}, 'fast', 'swing');
									} else {
										ul.stop().animate({
											left : (leftNum + dist) + "px"
										}, 'fast', 'swing');
									}
								}
								if (dist < -12 && ulWidth > winWidth) {
									if (leftNum + dist > winWidth - ulWidth) {
										ul.stop().animate({
											left : (leftNum + dist) + "px"
										}, 'fast', 'swing');
									} else {
										ul.stop().animate({
											left : (winWidth - ulWidth) + "px"
										}, 'fast', 'swing');
									}
								}

							});
							$scope.$watch(rhs, function(newVal, oldVal) {
								if (settings.picLoop) {
									//首张图片加载完毕后执行初始化
									var imgLoader = new Image();
									imgLoader.onload = function() {
										imgLoader.onload = null;
										init();
									}
									imgLoader.src = firstPic.attr('src')||'images/cp.png';
								} else {
									init();
								}
							})
						}

					}
				};
			}
		};
	}];
	vx.module('ibsapp').directive(directive);
})(window, window.vx);




(function(window, vx, undefined) {'use strict';
	var ibsapp = vx.module("ibsapp");

	/**
	 * starbar
	 */
	ibsapp.directive('starbar', function() {
		var directive = {};
		directive.restrict = 'E';
		/* restrict this directive to elements */
		directive.link = function(scope, element, atttributes) {
			var dereg = scope.$watch('score', function(newValue, oldValue) {
				var score = parseInt(newValue) / 20;
				if (null == score) {
					score = 0;
				}
				if (score >= 0) {
					for (var i = 0; i < parseInt(score); i++) {
						element.append("<img src=\"images/xing.png\" width=\"21\" height=\"20\">");
						//imgs[i].src = "css/img/star_1.png";
					};
					if (parseInt(score) != Math.ceil(score)) {
						element.append("<img src=\"images/xing3.png\" width=\"21\" height=\"20\">");
						//imgs[parseInt(score)].src = "css/img/star_5.png"
					}
					for (var i = Math.ceil(score); i < 5; i++) {
						element.append("<img src=\"images/xing2.png\" width=\"21\" height=\"20\">");
						//imgs[i].src = "css/img/star_0.png";
					};

					dereg();
				}
			});
		}
		directive.scope = {
			score : "@"
		}
		return directive;
	});
	/**
	 * selectBtn
	 */
	ibsapp.directive('selectBtn', function() {
		var directive = {};

		directive.restrict = 'A';

		directive.link = function(scope, element, atttributes) {

			var children = element.find('a');
			console.log('children', children);
			for (var i = 0; i < children.length; i++) {
				$(children[i]).bind('click', function() {
					scope.valueshow = $(this).text();
					scope.$apply();
					scope.clickfun();
				});
			};

		}
		directive.scope = {
			valueshow : "=",
			clickfun : "&"
		}

		return directive;
	});
	/**
	 * 购买数量
	 */
	ibsapp.directive('amountcount', function() {
		var directive = {};
		directive.restrict = 'E';
		// directive.replace = true;
		directive.template = '<div><button type="button" ng-disabled="isDisabled" ng-class="myVar" ng-click="subAction()">－</button>' + '<input class="control-box-mid orange" ng-model="amount"  type="number" pattern="\\d*">' + '<button type="button"  ng-disabled="isDisabled2" ng-class="myVar2" ng-click="addAction()">＋</button>';

		//ng-disabled="true"
		directive.scope = {
			amount : '=',
			max : '@'
		};

		directive.controller = ["$scope",function($scope) {
			$scope.isDisabled = false;

			$scope.amount = 1;
			$scope.myVar = 'control-box';
			$scope.subAction = function() {
				if ($scope.amount > 1) {
					$scope.amount--;
				};
			};
			$scope.addAction = function() {
				if ($scope.amount != $scope.max) {
					$scope.amount++;
				};
			};
		}];

		directive.link = function($scope, element, atttributes, controller) {
			var dereg = $scope.$watch('amount', function(newValue) {

				if (vx.isUndefined(newValue) || newValue == 0) {
					$scope.amount = 1;
					return;
				}
				if (null == newValue) {
					$scope.isDisabled = true;
					$scope.myVar = 'control-box-disable';
					$scope.isDisabled2 = true;
					$scope.myVar2 = 'control-box-disable';
					return;
				}

				if (newValue == 1) {
					$scope.isDisabled = true;
					$scope.myVar = 'control-box-disable'
				} else {
					$scope.isDisabled = false;
					$scope.myVar = 'control-box';
				}

				if (null != $scope.max) {
					$scope.max = parseInt($scope.max);
					if (newValue >= $scope.max) {
						$scope.isDisabled2 = true;
						$scope.myVar2 = 'control-box-disable';
						if (newValue > $scope.max) {
							$scope.amount = $scope.max;
						}
					} else {
						$scope.isDisabled2 = false;
						$scope.myVar2 = 'control-box';
					}
				}

			});
		}
		return directive;

	});
	//点赞
	ibsapp.directive('commentHeart', ['$remote', '$route', '$nativeCall', '$window',
	function($remote, $route, $nativeCall, $window) {
		return {
			restrict : 'E',
			template : '<p class="gray text-right" ng-click="commentAction()"><img class="store-score" ng-src="{{image}}">{{PraiseNum}}</p>',

			scope : {
				number : "@",
				isheart : "@",
				appriseseq : "@",
				userid : "@"
			},

			controller : ['$scope',function($scope) {
				$scope.commentAction = function() {

					//判断用户名
					if ($scope.userid == window.UserInfo.UserId) {
						$nativeCall.Alert("不能评价自己的评论");
					} else {
						if (window.UserInfo.IsLogin == 'true') {
							if ($scope.isheart == 'true') {
								$remote.post('UserPoint.do', {
									ObjectSeq : $scope.appriseseq,
									Type : 3
								}, function(data) {
									$scope.isheart = 'false';
									$scope.number--;
									$scope.$apply();
								});
							} else {
								$remote.post('UserPoint.do', {
									ObjectSeq : $scope.appriseseq,
									Type : 3
								}, function(data) {
									$scope.isheart = 'true';
									$scope.number++;
									$scope.$apply();
								});
							}
						} else {
							window.NativeCall.isLogin(function() {
								$route.reload();
							});
						}
					}
				}
			}],

			link : function(scope, iElement, iAttrs) {
				var dereg = scope.$watch('number', function(newValue, oldValue) {
					var number = newValue;
					if (number >= 0) {
						scope.PraiseNum = number;
					}
				});
				var dereg1 = scope.$watch('isheart', function(newValue, oldValue) {
					var isHeart = newValue;
					if (isHeart == 'true') {
						scope.image = "css/img/heart-icon.png";
					} else {
						scope.image = "css/img/unheart.png";
					}

				});
			}
		};
	}])

	/**
	 * switchboard
	 */
	ibsapp.directive('switchboard', function() {
		var directive = {};
		directive.restrict = 'E';
		directive.replace = true;
		directive.template = '<div class="col-xs-12 clear-padding">' + '<div class="col-xs-4 clear-padding" ng-repeat="info in titlesList">' + '<p class="text-center ng-class:info.seleced" ng-click="selecedAction(info)">{{info.title}}</p>' + '</div></div>';

		directive.scope = {
			titlesList : '@'
		};
		directive.controller = function($scope) {
			$scope.selecedAction = function(info) {
				vx.forEach($scope.titles, function(value) {
					value.seleced = "switch-btn";
				}, [])

				console.log("title:", info.title);
				info.seleced = "switch-btn-seleced";
			};
			$scope.seleced = "switch-btn";
		};

		directive.link = function($scope, element, atttributes, controller) {

		}
		return directive;
	});
	/**
	 *togglebtn
	 */
	ibsapp.directive('togglebtn', function() {
		var directive = {};
		directive.restrict = 'E';
		directive.replace = true;
		directive.template = '<div class="toggle-btn" ng-class="isopenbg" ng-click="change()">' + '<img src="css/img/toggle-icon-btn.png" class="toggle-icon" ng-class="isopenicon"></div>';

		directive.scope = {
			isopen : '='
		};
		directive.controller = function($scope) {
			$scope.change = function() {
				$scope.isopen = !$scope.isopen;
			};
		};
		directive.link = function($scope, element, atttributes, controller) {
			var dereg = $scope.$watch('isopen', function(newValue) {
				if (newValue == true) {
					$scope.isopenbg = 'open-bg';
					$scope.isopenicon = 'open';
				}
				if (newValue == false) {
					$scope.isopenbg = 'closed-bg';
					$scope.isopenicon = 'closed';
				}
			});
		}
		return directive;
	});
	/**
	 *moveDel
	 */
	ibsapp.directive('moveDel', function() {
		var directive = {};
		directive.restrict = 'A';
		directive.link = function($scope, element, atttributes, controller) {
			var startX, endX;
			var rightStart;
			element.on('touchstart', touchStart);
			element.on('touchmove', touchMove);
			element.on('touchend', touchEnd);

			function touchStart(event) {
				// event.preventDefault();
				var touch = event.originalEvent.targetTouches[0];
				startX = touch.pageX;
				rightStart = parseInt(element.css("right"));

			}

			function touchMove(event) {

				var touch = event.originalEvent.targetTouches[0];
				endX = touch.pageX;
				if (startX - endX > 3) {
					event.preventDefault();
				}

				if (startX - endX > 0 && startX - endX < 80 && rightStart == 0) {
					var move = startX - endX;
					move = move + "px";
					element.css({
						"right" : move
					});
				}
				var right = parseInt(element.css("right"));
				if (startX - endX < 0 && right > 0) {
					event.preventDefault();
					var move = right + startX - endX;
					if (move > 0) {
						move = move + "px";
						element.css({
							"right" : move
						});
					} else {
						element.css({
							"right" : "0"
						});
					}

				}

			}

			function touchEnd(event) {

				var right = parseInt(element.css("right"));
				if (startX - endX > 35) {
					element.css({
						"right" : "20%"
					});
				} else {
					element.css({
						"right" : "0"
					});
				}
			}

		}
		return directive;
	});
	/**
	 * 短信验证码倒计时
	 */
	ibsapp.directive('messageCountdown', ['$remote', '$route',
	function($remote, $route) {
		return {
			restrict : 'E',
			template : '<input class="bt1 bt1grey" value="{{messageText}}" type="button" ng-click="messageAction();" ng-disabled="{{isDisabled}}"/>',

			//传入短信编码用于发交易
			scope : {
				code : "@",
				phone : "=phone",
				checkflag : "@",
				tokenmessage : "@"
			},

			controller : ["$scope", "$window",
				function($scope, $window) {
					$scope.messageText = "获取验证码";
					$scope.isDisabled = false;
					var countDown = 90;
					$scope.messageAction = function() {
						if ($scope.messageText == "获取验证码"||$scope.messageText == "重新获取") {
							if (($scope.phone == "" || $scope.phone === undefined)&&$scope.checkflag!='false') {
								alert("请先输入手机号码");
							} else {
								//$nativeCall.phoneCode($scope.phone, $scope.code, "0");
								var param = {
									"MobilePhone" : $scope.phone
								};
								//登录时发该交易，未登录发GenPhoneTokenForPublic.do
								var url = "GenRegistSMSCode.do";
								if ($scope.tokenmessage == 'sms.ForgetPassWord')
									url = "GenPhoneToken.do";
								$remote.post(url, param, function(data) {
									// alert("验证码已发送");
									// console.log(data);
								});
								$scope.isDisabled = true;
								$scope.messageText = "" + countDown + "s";
								var timer = setInterval(function() {
									countDown--;
									$scope.messageText = "" + countDown + "s";
									if (countDown < 0) {
										$scope.messageText = "重新获取";
										clearInterval(timer);
										countDown = 90;
										$scope.isDisabled = false;
									};
									$scope.$apply();
								}, 1000);
							}

						}
					};
				}],
		};
	}]);
	/**
	 * whenScrolled
	 */
	ibsapp.directive('whenScrolled', function() {
		var directive = {};
		directive.restrict = 'A';
		directive.scope = {
			currentIndex : '@',
			pageSize : '@',
			count : '@',
			whenScrolled : '&'
		};

		directive.link = function($scope, element, atttributes, controller) {

			$(window).scroll(function() {

				if ($(window).scrollTop() + $(window).height() >= $('html').height()) {
					$scope.currentIndex = parseInt($scope.currentIndex);
					$scope.pageSize = parseInt($scope.pageSize);
					$scope.count = parseInt($scope.count);
					if ($scope.currentIndex < $scope.count) {
						$scope.whenScrolled({
							currentIndex : $scope.currentIndex,
							pageSize : $scope.pageSize
						});
						$scope.currentIndex += $scope.pageSize;
					}
				}
			});

		}
		return directive;
	});
	/**
	 * defImg
	 */
	ibsapp.directive('defImg', function() {
		return function(scope, elm, attr) {

			elm.on('error', function() {

				this.src = attr.defImg;

			});
		};
	});
	/**
	 * nextPage
	 */
	ibsapp.directive('nextPage', function() {
		var directive = {};
		directive.restrict = 'A';
		directive.scope = {
			currentIndex : '@',
			pageSize : '@',
			count : '@',
			nextPage : '&'
		};
		directive.link = function($scope, element, atttributes, controller) {
			element.on('click', function() {
				$scope.currentIndex = parseInt($scope.currentIndex);
				$scope.pageSize = parseInt($scope.pageSize);
				$scope.count = parseInt($scope.count);
				if ($scope.currentIndex < $scope.count) {
					$scope.nextPage({
						currentIndex : $scope.currentIndex,
						pageSize : $scope.pageSize
					});
					$scope.currentIndex += $scope.pageSize;
				}

			});
		}
		return directive;
	});
	/**
	 * imageSlide
	 */
	ibsapp.directive('imageSlide', function() {
		var directive = {};
		directive.restrict = "A";
		directive.link = function(scope, iElm, iAttrs, controller) {
			var dereg = scope.$watch("count", function(newValue, oldValue) {
				var count = parseInt(newValue);
				if (count > 0) {
					scope.cur = 1;
					scope.$apply();
					change();
					dereg();
				}
			});

			function change() {
				var slider = iElm.find('.img-detail');
				var cur = iElm.next().find('.cur');
				var length = slider.length;
				var sliderW = parseInt(iElm.parent().width());
				var iElmW = sliderW * length;

				iElm.width(iElmW);
				slider.width(sliderW);

				var current = 0, temp = '', loopSpeed = 5000, loop = function() {
					currentLeft -= sliderW;
					if (current == (length - 1)) {
						currentLeft = 0;
						current = -1;
					}
					current += 1;
					iElm.css({
						left : currentLeft + 'px'
					});
					scope.cur = current + 1;
					scope.$apply();
				};
				var time = setInterval(loop, loopSpeed);

				var startX, endX, move, currentLeft;
				iElm.on('touchstart', touchStart);
				iElm.on('touchmove', touchMove);
				iElm.on('touchend', touchEnd);
				currentLeft = parseInt(iElm.css('left'));

				function touchStart(event) {
					event.preventDefault();
					move = 0;
					var touch = event.originalEvent.targetTouches[0];
					startX = touch.pageX;
					clearInterval(time);
				}

				function touchMove(event) {
					var touch = event.originalEvent.targetTouches[0];
					endX = touch.pageX;
					move = startX - endX;
					if (startX - endX > 0) {
						if (current < length - 1) {
							iElm.css({
								left : currentLeft - move + "px"
							});
						};
					} else {
						if (current > 0) {
							iElm.css({
								left : currentLeft - move + "px"
							});
						};
					}
				}

				function touchEnd() {
					if (move >= -10 && move <= 10) {
						// scope.click2photos();
						scope.$apply(scope.click2photos);
						iElm.css({
							left : currentLeft + 'px'
						});
						return;
					};
					if (move <= 80 && move >= -80) {
						iElm.css({
							left : currentLeft + 'px'
						});
					};
					if (move > 80) {
						if (current < length - 1) {
							currentLeft -= sliderW;
							if (current == (length - 1)) {
								currentLeft = 0;
								current = -1;
							}
							current += 1;
							iElm.css({
								left : currentLeft + 'px'
							});
							scope.cur = current + 1;
							scope.$apply();
						};
					};
					if (move < -80) {
						if (current > 0) {
							currentLeft += sliderW;
							current -= 1;
							iElm.css({
								left : currentLeft + 'px'
							});
							scope.cur = current + 1;
							scope.$apply();
						};
					};
					console.log("move=" + move);
					time = setInterval(loop, loopSpeed);
				}

			}

		}
		directive.scope = {
			count : "@",
			cur : "=",
			click2photos : "&"
		};
		return directive;
	});
	/**
	 * uiLocation
	 */
	ibsapp.directive('uiLocation', function() {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				"title": "@"
			},
			templateUrl: 'lib/template/ui/uiLocation.html?!',
			link: function(scope, element, attrs) {

			}
		}
	});

	ibsapp.directive('uiRightMenu', function () {

	});


	/**
	 * vxBanner, 实现图片轮播
	 * @param {Object} data,图片信息,imageUrl图片地址
	 * @param {function} select
	 */
	ibsapp.directive('vxBanner', function() {
		return {
			restrict: "EA",
			replace: true,
			transclude: true,
			scope: {
				data: "=data",
				onSelect: "&select"
			},
			templateUrl: 'lib/template/banner/banner.html?!',
			link: function(scope, element, attrs) {
				(function($element, el) {
					setTimeout(function() {
						$element.find('.jadv').cycle({
							fx: 'scrollLeft',
							pager: '#btn'
						});
					}, 100);
				})(element, element[0]);
				scope.select = function (obj) {
					scope.data.map(function (item) {
						if(obj == item)
							item.active = true;
						else
							item.active = false;
						return item;
					});
					scope.onSelect();
				}
			}
		}
	});

    /**
     * vxCarousel, 实现图片轮播
     * @param {Object} data,图片信息,imageUrl图片地址
     * @param {function} select
     */
    ibsapp.directive('vxCarousel', function() {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            scope: {
                data: "=data",
                onSelect: "&select",
				onPr:"&Pr"
            },
            templateUrl: 'lib/template/carousel/jcarousel.html?!',
            controller:["$scope","$rootScope","$dataService" ,
				function($scope,$rootScope,$dataService) {
                $scope.goto =function (path, data) {
                    var currentScope = vx.element("div[ng-view]>*").scope() || vx.element("body").scope();
                    if(path.indexOf("Conf")>-1 || path.indexOf("AskForTinyLoan") > -1 || path.indexOf("ChannelClose") > -1){
                        currentScope.$emit("$pageContentLoaded");
                    };
                    $rootScope.SafetyToolCode = "";
                    if (data != undefined) {
                        $dataService.transferTo(path, data);
                    } else {
                        $rootScope.goto(path);
                    }
                }
            }],
            link: function(scope, element, attrs) {
                (function($element, el) {
                    setTimeout(function() {
                        $element.find('.jadv').cycle({
                            fx: 'scrollLeft',
                            pager: '#btn'
                        });
                    }, 1000);
                })(element, element[0]);
                scope.select = function (obj) {
                    scope.data.map(function (item) {
                        if(obj == item)
                            item.active = true;
                        else
                            item.active = false;
                        return item;
                    });
                    scope.onSelect();
                }

                scope.Pr = function (item) {
					scope.goto('/CreditActivityQryDetail',{param : item});
                    scope.onPr();
                }
            }
        }
    });
    /**
     * vxjlinehotbox, 实现图片轮播
     * @param {Object} data,图片信息,imageUrl图片地址
     * @param {function} select
     */
    ibsapp.directive('vxJhotbox', function() {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            scope: {
                data: "=data",
                onSelect: "&select"
            },
            templateUrl: 'lib/template/jlinebox/jlinebox.html?!',
            link: function(scope, element, attrs) {
                (function($element, el) {
                    setTimeout(function() {
                        $element.find('.jline-hot').cycle({
                            fx: 'scrollLeft',
                            pager: '#jhot-btn'
                        });
                    }, 2000);
                })(element, element[0]);
                scope.select = function (obj) {
                    scope.data.map(function (item) {
                        if(obj == item)
                            item.active = true;
                        else
                            item.active = false;
                        return item;
                    });
                    scope.onSelect();
                }
            }
        }
    });

	ibsapp.directive('vPagination', function() {
		return {
        restrict: 'EA',
        template: '<div class="finforfooter" ng-show="conf.numberOfPages > 1">' +
            '<ul ng-show="conf.totalItems > 0">' +
						'<li><input type="button" ng-click="homePage()"value="首页"></li>'+
            '<li><input type="button"  ng-click="prevPage()" value="上一页"></li>' +
			'<li><font>{{conf.currentPage}}</font></li>'+
            '<li><input type="button"  ng-click="nextPage()" value="下一页"></li>' +
						'<li><input type="button" ng-click="lastPage()" value="尾页"></li>'+
						'<li><font>共{{ conf.numberOfPages }}页</font></li>'+
            '<li><font>跳到</font><input class="jfootertext" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"><font>页</font></li>'+
						'<li><input type="button" value="确认" ng-click="jumpToPage()"></li>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            var conf = scope.conf;

            // 默认每页的个数
            var defaultPerPage = 15;


            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            scope.homePage = function () {
							conf.currentPage = 1;
							if(conf.onChange) {
								conf.onChange();
							}
						};

						scope.lastPage = function () {
							conf.currentPage = conf.numberOfPages;
							if(conf.onChange){
								conf.onChange();
							}
						}

            // 变更当前页
            scope.changeCurrentPage = function(item) {

                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    // conf.onChange()函数
                    if(conf.onChange) {
                        conf.onChange();
                    }
                }
            };

            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {

                // 一发展示条数变更，当前页将重置为1
                conf.currentPage = 1;

                // conf.onChange()函数
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // 跳转页
            scope.jumpToPage = function() {
                var num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);

                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }

                        // 跳转
                        conf.currentPage = num;
                        // conf.onChange()函数
                        if(conf.onChange) {
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }

            };

            scope.jumpPageKeyUp = function(e) {
                var keycode = window.event ? e.keyCode :e.which;

                if(keycode == 13) {
                    scope.jumpToPage();
                }
            };

            /*scope.$watch('conf.totalItems', function(value, oldValue) {

                if(  value != 0) {
                    if(conf.onChange) {
                        conf.onChange();
                    }
                }
            })*/

        }
    };
	});

    ibsapp.directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });

	ibsapp.directive("vxChart", ["$parse", function($parse) {
		return {
			restrict: "AE",
			replace: true,
			scope: {
				options: "=options",
				type: "@",
				height : "@"
			},
			template: "<canvas></canvas>",
			controller: ["$scope", "$remote", function lineChartCtrl($scope, $remote) {

			}],
			link: function(scope, element, attrs, lineChartCtrl) {
				(function(scope, el, canvas) {
					el.css({height: scope.height + "px"});
					scope.options.type = scope.type || "line";
					// scope.options.scale = {
					//     gridLines: {display: false}
					// };
					window[attrs.id] = new Chart(canvas, scope.options);
				})(scope, element, element[0]);
			}
		};
	}]);

	ibsapp.directive("vxCardList",function () {
		return {
			restrict : 'AE',
			replace : true,
			templateUrl : 'lib/template/cardList/cardList.html?!',
			scope : {
				data : "=data",
				data2 : "=data2",
				data3 : "=data3"
			},
			controller:["$scope","$remote","$rootScope",function ($scope,$remote,$rootScope) {
				$scope.Query = function () {
					$scope.$goto("/CreditCardQry")
				};

                $scope.RelaActAddPre = function () {
                    $remote.post("RelaActAddPre.do",{},function (result) {
                        $scope.$goto("/MySelf/AcManager/ProAcQry/ProAcAdd",{data:result});
                    })
                };

                $scope.goTransfer = function () {
					$rootScope.$goto('/PAcNoTransfer');
				};

				$scope.goDetailQry = function (item) {
					$remote.post('ActTrsQryPre.do', {}, function (result) {
						var data = {
							param : result,
							prePage : 'Home',
							preAcNo : item.AcNo
						};
						$rootScope.$goto('/ActTrsQryPre', data);
					})
				};

				$scope.CreditCardQry = function (item) {
					var param = {
						prePage : "Home",
						preAcNo : item.AcNo
					};
					$rootScope.$goto('/CreditCardQry',param)
				};

				$scope.LimitAdjust = function (item) {
					var param = {
						prePage : "Home",
						preAcNo : item.AcNo
					};
					$rootScope.$goto('/LimitAdjust',param)
				};

				$scope.NotHaveBillQry = function (item) {
					var param = {
						prePage : "Home",
						preAcNo : item.AcNo
					};
					$rootScope.$goto('/HavedBillQry',param);
				};

				$scope.FastRepay = function (item) {
					var param = {
						prePage : "Home",
						preAcNo : item.AcNo
					};
					$rootScope.$goto('/FastRepay',param);
				};

				$scope.goPInnerTransfer = function (item) {
					$remote.post("InnerQuickTransferPre.do",{},function (result) {
						result.prePage = 'Home';
						result.preAcNo = item.AcNo;
						$rootScope.$goto('/PInnerTransfer',result);
					});
				};

				$scope.goPAcNoTransfer = function (item) {
					$remote.post("AcNoTransferPre.do",{},function (result) {
						result.prePage = 'Home';
						result.preAcNo = item.AcNo;
						$rootScope.$goto('/PAcNoTransfer',result);
					});
				}
			}],
			link : function (scope, element,attr) {

				element.bind('mouseenter',function () {
                     scope.span = 'show';
                    scope.$apply();
				});

                element.bind('mouseleave',function () {
                scope.span = 'hidden';
                scope.$apply();
        });


        scope.next = function () {
          var cardListUL = $(element.find('ul.fcardListUL'));
          var margin_left = parseInt(cardListUL.css("margin-left"));
			var length = 0;
			var num = $("#welcome").width() / 262 - 1;
			if(scope.data){
				length += scope.data.length;
			}
			if(scope.data2){
				length += scope.data2.length;
			}
			if(scope.data3){
				length += scope.data3.length;
			}
					if(margin_left > -(length - num )* 260){
						$(element.find('ul.fcardListUL').not(':animated').animate({'margin-left':margin_left-260},'fast'))
					}
        };
        scope.pre = function () {
          var cardListUL = $(element.find('ul.fcardListUL'));
          var margin_left = parseInt(cardListUL.css("margin-left"));
          if(margin_left < 0) {
            $(element.find('ul.fcardListUL').not(':animated').animate({'margin-left': margin_left + 260}, 'fast'))
          }
        };

        var card = element.find('ul.fcardListUL').find('.fcard2');

        scope.show = function (item) {
          item.balance = 1;
        };


        scope.hide = function (item) {
          item.balance = 0;
        }
			}
		}
	});

	ibsapp.directive("vxSelect",['$parse',function($parse){
		return {
			restrict : 'EA',
			require : 'ngModel',
			replace : false,
			template: '<div class="select-main">' +
			'<div class="select-arrow"></div>' +
			'<div class="select-set"></div>' +
			'<div class="select-block" tabindex="0" style="outline: none"><ul class="select-list"></ul></div> '+
			'</div>',
			link : function(scope,element,attr,ctrl){
                //item.value as item.text for item in dataList
                var rex1=new RegExp(/.*as.*/);
                var nameRex=new RegExp(/^\s*(\w|\.)*\s*\w*/);
                var rex=new RegExp(/\s+as\s+(\w|\.)*\w*/);
                var keyName;
                if(rex1.test(attr.vxOptions)){
                    keyName=attr.vxOptions.match(rex)[0].match(/\s*(\w|\.)*\w*$/)[0].trim();
                }else{
                    keyName=attr.vxOptions.match(nameRex)[0].match(/^\s*(\w|\.)*/)[0].trim();
                }
                var listRex=new RegExp(/\s+in\s+(\w*)/);
                var listName=attr.vxOptions.match(listRex)[1].trim();
                keyName = keyName.split('.')[1];

                scope.$watch(listName,function (oldVal,newVal) {
                    if(scope[listName] != undefined){
                        scope[attr.ngModel] = scope[listName].filter(function (item) {
                            return item == scope[attr.ngModel] ? true : false
                        })[0];

                        draw();
                        //初始值
                        if(scope[attr.ngModel] != undefined){
                            if(scope[attr.ngModel][keyName] != undefined){
                                element.find('.select-set').html(scope[attr.ngModel][keyName]);
                            }
                        }else{
                            element.find('.select-set').html('--请选择--');
                        }


                        element.find('li.select-items').bind('click',function () {
							var index = $(this).attr("index");
							scope[attr.ngModel] = scope[listName][index];
                            element.find('.select-set').html(scope[attr.ngModel][keyName]);
                            element.find('.select-block').hide();
                            element.find('.select-main').removeClass('z-index');
                            element.find('.select-arrow').removeClass('reverse');
                            scope.show = false;
                            scope.$apply();
                        });
                    }else{
                        scope[attr.ngModel]=undefined;
                        element.find('ul.select-list').empty();
                        element.find('.select-set').html('--请选择--');
                        element.find('.select-block').hide();
                        element.find('.select-main').removeClass('z-index');
                        element.find('.select-arrow').removeClass('reverse');
                    }
                });

				//修改ngModel时更新视图
				scope.$watch(attr.ngModel,function(oldVal,newVal){
					if(scope[attr.ngModel] != undefined){
						element.find('.select-set').html(scope[attr.ngModel][keyName]);
					}else if(scope[attr.ngModel]==null || scope[attr.ngModel]==undefined){
						element.find('.select-set').html('--请选择--');
					}

					/*if(oldVal != newVal){
						if(scope[attr.ngChange]){
							(scope[attr.ngChange])();
						}
					}*/
				});

                //选择
                element.find('li.select-items').bind('click',function () {
					var index = $(this).attr("index");
					scope[attr.ngModel] = scope[listName][index];
                    element.find('.select-set').html(scope[attr.ngModel][keyName]);
                    element.find('.select-block').hide();
                    element.find('.select-main').removeClass('z-index');
                    element.find('.select-arrow').removeClass('reverse');
                    scope.show = true;
                    scope.$apply();
                });
				//show dropmenu
				function dropmenu(e){
					//关闭已存在下拉框
					$("body").find('.select-block').hide();
					$("body").find('.select-main').removeClass('z-index');
					$("body").find('.select-arrow').removeClass('reverse');
					if(scope.show == true){
						element.find('.select-block').hide();
						element.find('.select-main').removeClass('z-index');
						element.find('.select-arrow').removeClass('reverse');
						scope.show = false;
					}else {
						element.find('.select-block').show();
						element.find('.select-main').addClass('z-index');
						element.find('.select-arrow').addClass('reverse');
						scope.show = true;
					}
					e.stopPropagation();
				}

				element.find('.select-set').bind('click',dropmenu);
				element.find('.select-arrow').bind('click',dropmenu);
				//body模拟点击事件
				function bodyClick(){
					if(scope.show){
						element.find('.select-set').trigger('click');
					}
				}
				$("body").bind('click',bodyClick);
				//body绑定事件

				function draw(){
                    element.find('ul.select-list').empty();
					for(var i = 0; i < scope[listName].length ; i++){
						var li = vx.element('<li index='+i+'>'+scope[listName][i][keyName]+'</li>');
						li.addClass('select-items');
						element.find('ul.select-list').append(li);
					}
                    element.find('.select-block').hide();
				}


				scope.$watch(attr.disabled,function () {
                    if(scope[attr.disabled] == true){
                        element.find('.select-set').unbind('click',dropmenu);
                        element.find('.select-arrow').unbind('click',dropmenu);
                    }
                })
			},
			controller : ['$scope',function ($scope) {

			}]
		}
	}]);


	// autocapitalize input field
	ibsapp.directive("capitalize", function () {
        return {
        	restrict : 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) {
                        inputValue = '';
                    }
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized != inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);
            }
        };
    });

	ibsapp.directive("vxAuth",function () {
		return {
			restrict : 'E',
			templateUrl : 'lib/template/vxAuth/vxAuth.html',
			replace : true,
			controller : ['$scope','$rootScope',function ($scope,$rootScope) {
				$scope.chooseSaftTool = function (item) {
					$rootScope.cleanError();
					$(document.getElementsByClassName(item.Code)).parent().siblings().children().removeClass("on");
					$(document.getElementsByClassName(item.Code)).addClass("on");
					$scope.SafetyToolCode = item.Code;
					$rootScope.SetSafetyTool($scope.SafetyToolCode, $scope.SafetyToolList);
				};
			}]
		}
	});
})(window, vx);

