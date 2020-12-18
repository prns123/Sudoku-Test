export default class Stack {
    constructor() {
      this.data = new Array(10); //play will be able to go a maximum of 10 moves back
      this.pointer = -1;
    }
  
    push(data) {
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
  
    pop() {
      if (this.pointer != -1) {
        var holder = this.data[this.pointer];
        this.data[this.pointer] = undefined;
        this.pointer--;
        return holder;
      }
    }
  
    peak() {
      return this.data[this.pointer];
    }
  
    isEmpty() {
      if (this.pointer == -1) {
        return true;
      } else {
        return false;
      }
    }
  
    myStatus() {
      console.log(this.data);
      // console.log(this.pointer);
    }
  }
  