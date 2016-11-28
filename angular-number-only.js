/*!
 _        _         _            
| \      (_)       | |           
| |       _  ____  | |  _   ___  
| |      | ||  _ \ | |_/ ) / _ \ 
| |_____ | || | | ||  _ ( | (_) |
\_______)|_||_| |_||_| \_) \___/ 
                                      

 * angular-number-only v0.1.1
 * Angular number-only directive 
 *
 * http://ddmweb.it/
 * Licensed under the MIT license
 *
 * @author Davide Di Modica
 * @requires angular
 
*/

(function () {
  'use strict';

	angular
	.module('angular-number-only', [])

	.directive('numberOnlyPositive', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            scope: { 
                noZero : '@',
            },
            link: function (scope, element, attr, ngModelCtrl) {
                var noZero = scope.noZero !== undefined;

                function check(text) {
                    if (text) {
                        var transformedInput = text.toString().replace(/[^0-9]+/gim, '');
                        if(noZero){
                            transformedInput = parseInt(transformedInput);
                            if(transformedInput === 0) transformedInput = '';
                        }

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return text;
                }
                ngModelCtrl.$parsers.push(check);

                element.bind('keypress', function(event) {
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    });

}());