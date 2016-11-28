/*!
 _        _         _            
| \      (_)       | |           
| |       _  ____  | |  _   ___  
| |      | ||  _ \ | |_/ ) / _ \ 
| |_____ | || | | ||  _ ( | (_) |
\_______)|_||_| |_||_| \_) \___/ 
                                      

 * angular-number-only v0.1.0
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
            link: function (scope, element, attr, ngModelCtrl) {
                function check(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]+/gim, '');
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