$(document).ready(function(){
  
  function operate(total, operator, next) {
    switch(operator) {
      case "/":
        return total / next;
        break;
      case "*":
        return total * next;
        break;
      case "-":
        return total - next;
        break;
      case "+":
        return total + next;
        break;
    }
  }
  
  var memory = [];
  
  $("button").click(function(){
    //type of button clicked
    var type = this.className;
    //content of button (number or operator)
    var value = $(this).text();
    
    switch(type) {
      case "number":
        //clear screen if it displays an operator
        var screen = $("#view").text();
        if (screen == "/" || screen == "*" || screen == "-" || screen == "+") {
          $("#view").empty();
        }
        $("#view").append(value);
        break;
        
      case "function":
        //assume 0 if no number on screen
        if ($("#view").text() === "") {
          memory.push(0);
        } else {
          //commit existing display to memory
          memory.push(parseFloat($("#view").text()));
          $("#view").empty();
        }
        //add the operator to memory
        //check the length of the memory (is it chained?)
        //if there are three items in memory, there is a chain
        //carry out the function in memory
        if (memory.length > 2) {
          //get result
          var result = operate(memory[0], memory[1], memory[2]);
          //clear memory, add result and operator as new values for next time
          memory = [result, value];
          //clear screen to avoid errors, display operator
          $("#view").empty();
          $("#view").append(value);
        } else {
          //carry on as normal
          memory.push(value);
          //display operator on screen
          $("#view").append(value);
        }
        break;
        
      case "allclear":
        //clear display and memory
        $("#view").empty();
        memory = [];
        break;
        
      case "clearentry":
        if ($("#view").text() === "") {
          memory = memory.slice(0, memory.length-1);
        } else {
          $("#view").empty();
        }
        break;
        
      case "backspace":
        //remove one from the display. Does not affect memory.
        var toBack = $("#view").text();
        $("#view").empty().append(toBack.substring(0, toBack.length-1));
        break;
        
      case "sum":
        //as before assume 0 if nothing on screen
        if ($("#view").text() === "") {
          memory.push(0);
        } else {
          //commit existing display to memory
          memory.push(parseFloat($("#view").text()));
          $("#view").empty();
        }
        //display answer
        $("#view").append(operate(memory[0], memory[1], memory[2]));
        //clear memory
        memory = [];
        break;
    }
  });
  
});