$(document).ready(function() {
    let statement = '';
    let finalResult = '';

    $(document).on('click', function(event) {
        const clicked = event.target;
        if(clicked.tagName === 'BUTTON'){
            const temp = clicked.value;
            
            if(temp != '='){
                if(temp === 'clear'){
                    clearAll();
                }else if(temp == 'delete'){
                    //delete last one
                    statement = statement.substring(0, statement.length - 1);
                }else if(['-', '+', '*', '/', '%'].includes(temp)){
                    if(statement.charAt(statement.length - 1) != temp){
                        if(!isNaN(statement.charAt(statement.length - 1))){
                            statement += temp;
                        }else{
                            statement = statement.slice(0, -1);
                            statement += temp;
                        }
                    }
                }else if(temp == 'negative'){
                    if(statement.charAt(statement.length - 1) == '-'){
                        statement = statement.slice(0, -1);
                        statement += '+';
                    }else if(statement.charAt(statement.length - 1) == '+'){
                        statement = statement.slice(0, -1);
                        statement += '-';
                    }else{
                        statement += '-';
                    }
                }else{
                    statement += temp;
                }

                if(finalResult != ''){
                    if(['-', '+', '*', '/', '%'].includes(temp)){
                        statement = finalResult + temp;
                        finalResult = '';
                    }else if(temp == 'negative'){
                        statement = '-';
                        finalResult = '';
                    }else if(temp != 'delete'){
                        statement = temp;
                        finalResult = '';
                    }
                }
            }else if(temp == '='){
                showTheResult();
            }
            $("#statement").text(statement);
        }
    });

    function clearAll(){
        //remove the all then start again
        statement = '';
        finalResult = '';
        $('#statement').value = '';
        $("#result").value = '';
    }

    function showTheResult(){
        let num1 =0 ;
        let operation;
        let num2;

        if(statement != ''){
            //'.filter(Boolean)' after split() -> remove empty strings from the array.
            const numbers = statement.split(/([-+=*/%])/).filter(Boolean);
            console.log(numbers);

            if((['*', '/', '%'].includes(numbers[0])) || (['*', '/', '%'].includes(numbers[numbers.length-1]))){
                alert('Please enter a valid inputs!.')
                clearAll();
                return;
            }
    
            // if the sign before the first number
            if((['-', '+'].includes(numbers[0]) && !isNaN(numbers[1]))){
                if(numbers[0] == '+'){
                    numbers.splice(0, 1);
                }else{
                    numbers[0] = -parseFloat(numbers[1]); 
                    numbers.splice(1, 1);
                }
            }

            // if the sign after the last number
            if(['-', '+'].includes(numbers[numbers.length-1]) && !isNaN(numbers[numbers.length-2])){
                if(numbers[numbers.length-1] == '+'){
                    numbers.splice(numbers.length-1, numbers.length-1);
                }else{
                    numbers[numbers.length-2] = -parseFloat(numbers[numbers.length-2]); 
                    numbers.splice(numbers.length-1, numbers.length-1);
                }
            }
    
            for(let i=0 ; i<numbers.length ; i++){
                if(['*', '/', '%'].includes(numbers[i])){
                    if(['*', '/', '%'].includes(numbers[i+1])){
                        alert('Please enter a valid inputs!.')
                        clearAll();
                        return;
                    }
                    // if the negative sign before the number
                    if(['-', '+'].includes(numbers[i+1])){
                        if(numbers[i+1] == '+'){
                            numbers.splice(i + 1, 1); 
                        }else{
                            numbers[i+1] = -parseFloat(numbers[i+2]); 
                            numbers.splice(i + 2, 1);
                        }
                    }
                }
                // if the negative sign after the number
                if(!isNaN(numbers[i-1]) && numbers[i] == '-' && isNaN(numbers[i+1])){
                    numbers[i-1] = -parseFloat(numbers[i-1]); 
                    numbers.splice(i, 1);
                }
            }
            console.log(numbers);

            num1 = parseFloat(numbers[0]);
            for(let i=1 ; i<numbers.length ; i+=2){
                operation = numbers[i];
                num2 = parseFloat(numbers[i+1]);

                switch (operation) {
                    case '+':
                        num1 += num2;
                        break;
                    case '-':
                        num1 -= num2;
                        break;
                    case '*':
                        num1 *= num2;
                        break;
                    case '/':
                        if (num2 !== 0) {
                            num1 /= num2;
                        } else {
                            alert("Error! Division by zero is not allowed.");
                            statement = '';
                            return;
                        }
                        break;
                    case '%':
                        if (num2 !== 0) {
                            num1 %= num2;
                        } else {
                            alert("Error! Division by zero is not allowed.");
                            statement = '';
                            return;
                        }
                        break;
                }
            }
            finalResult = num1;
            statement = '';
            $("#result").text(finalResult);
        }
    }
});

