/**
 * @author Eugene Putsykovich(slesh) May 9, 2015
 *
 */
angular.module("flowertyApplication.utilModule")

.constant("VALIDATE_DATE", (function(){
	var format = "YYYY-MM-DD";
	return{
		validate : function(dateString, isCheckOnPast){
			var now = moment().format(format);
	        var dateToCheck = moment(dateString).format(format);
	        
	        return isCheckOnPast ? moment(dateToCheck).isBefore(now) : moment(dateToCheck).isAfter(now);
		}
	};
})())

.directive("flowertyValidate", ["$compile", "VALIDATE_MESSAGES", "VALIDATE_DATE", 
                            	function($compile, VALIDATE_MESSAGES, VALIDATE_DATE) {
	var template = "<span class='glyphicon form-control-feedback' aria-hidden='true' data-ng-class='info.icon'></span>" +
				   "<small class='btn-danger'>{{info.message}}</small>";

	return {
		require: "ngModel",
		restrict: "A",
		scope:{},
		link: function(scope, element, attributes, ngModelCtrl){
			scope.info = {
					state: "",
					icon: "",
					message: ""
			};
			
			var link = $compile(template);
            var content = link(scope);

            var levelUp = 1;
            if(attributes.levelUp){
            	levelUp = attributes.levelUp;
            }
            
            var parent = null;
            for(var i = 0; i < levelUp; ++i){
            	if(parent === null){
            		parent = element.parent();
            		continue;
            	};
            	parent = parent.parent();
            };
            
            parent.append(content);
            parent.addClass("has-feedback");
			
			function setState(state, icon, message){
				scope.info.state = state,
				scope.info.icon = icon,
				scope.info.message = message;
			}
			
			function validate(currentValue){
				var message = "";
				if(ngModelCtrl.$error.minlength){
					message = VALIDATE_MESSAGES["minlength"](attributes.name, attributes.minlength);
				
				}else if(ngModelCtrl.$error.maxlength){
					message = VALIDATE_MESSAGES["maxlength"](attributes.name, attributes.maxlength);
				
				}else if(ngModelCtrl.$error.required){
					message = VALIDATE_MESSAGES["required"](attributes.name);
				
				}else if(ngModelCtrl.$error.pattern){
					message = VALIDATE_MESSAGES["pattern"](attributes.name);
				
				}else if(ngModelCtrl.$error.email){
					message = VALIDATE_MESSAGES["email"]();
				
				}else if(ngModelCtrl.$error.number){
					message = VALIDATE_MESSAGES["number"](attributes.name);
				
				}else if(ngModelCtrl.$error.password){
					message = VALIDATE_MESSAGES["password"]();
					
				}else if(ngModelCtrl.$error.isFutureDate){
					message = VALIDATE_MESSAGES["date"](attributes.name, "more");
					
				}else if(ngModelCtrl.$error.isPastDate){
					message = VALIDATE_MESSAGES["date"](attributes.name, "less");
					
				};
				
				console.log(ngModelCtrl.$viewValue);
				console.log(JSON.stringify(ngModelCtrl));
				
				var isInvalid = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
				
				if(isInvalid){
					setState("has-error", "glyphicon-remove", message)
				} else {
					setState("has-success", "glyphicon-ok", "")
				};
				
				if(!currentValue){
					setState("", "", "")
				}
				
				parent.removeClass("has-error");
				parent.removeClass("has-success");
				parent.addClass(scope.info.state);
			};
			
			function validateDate(dateString){
				var dateValidateType = attributes.dateValidate;
				if(!!dateValidateType && dateValidateType === "past"){
					ngModelCtrl.$setValidity("isPastDate", VALIDATE_DATE.validate(dateString, true));
				}else if(!!dateValidateType && dateValidateType === "future"){
					ngModelCtrl.$setValidity("isFutureDate", VALIDATE_DATE.validate(dateString, false));
				};
			};
			
			ngModelCtrl.$parsers.unshift(function (viewValue) {
				validateDate(viewValue);
				validate(viewValue);
					
				return viewValue;
            });

            ngModelCtrl.$formatters.unshift(function (modelValue) {
            	validateDate(modelValue)
            	validate(modelValue);

            	return modelValue;
            });
		}
	};
}]);