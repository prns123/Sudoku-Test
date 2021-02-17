export default class Stack {
    constructor() {
      this.data = new Array(10); //play will be able to go a maximum of 10 moves back
      this.pointer = -1;
    }
  
    push(data) { //method to push data onto the stack
      this.pointer++;
      if (this.pointer < 10) {
        this.data[this.pointer] = data;
      } else {
        for (var x = 0; x < 9; x++) {
          this.data[x] = this.data[x + 1];
        }
        this.data[9] = data;
        this.pointer = 9;
      }
    }
  
    pop() { //removed data from the stack
      if (this.pointer != -1) {
        var holder = this.data[this.pointer];
        this.data[this.pointer] = undefined;
        this.pointer--;
        return holder;
      }
    }
  
    peak() { //returns the data at the stop of the stack
      return this.data[this.pointer];
    }
  
    isEmpty() { //checks whether the stack is empty
      if (this.pointer == -1) {
        return true;
      } else {
        return false;
      }
    }
  
    myStatus() { //logs the value of the data and pointer for debugging
      console.log(this.data);
      console.log(this.pointer);
    }

    reset() { //removes all data
      this.data = new Array(10);
      this.pointer = -1;
    }
  }
  

  