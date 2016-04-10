var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for(var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
        var input = document.querySelector('.screen');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        // 按下C，清零
        if(btnVal == 'C') {
            input.innerHTML = '';
            decimalAdded = false;
        }

        // 按下=，计算
        else if(btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];

            // 替换x号
            equation = equation.replace(/x/g, '*');

            // 如果没有运算符，或者最后一个字符串是.
            if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, '');

            if(equation)
                input.innerHTML = eval(equation);  //计算函数

            decimalAdded = false;
        }

        // Basic functionality of the calculator is complete. But there are some problems like
        // 1. No two operators should be added consecutively.
        // 2. The equation shouldn't start from an operator except minus
        // 3. not more than 1 decimal should be there in a number

        // We'll fix these issues using some simple checks

        // indexOf works only in IE9+
        else if(operators.indexOf(btnVal) > -1) {
            // Operator is clicked
            // Get the last character from the equation
            var lastChar = inputVal[inputVal.length - 1];

            // Only add operator if input is not empty and there is no operator at the last
            if(inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;

            // Allow minus if the string is empty
            else if(inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;

            // Replace the last operator (if exists) with the newly pressed operator
            if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                // Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalAdded =false;
        }
        else if(btnVal == '.') {
            if(!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
        else {
            input.innerHTML += btnVal;
        }
        e.preventDefault();
    }
}