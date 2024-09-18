export class HashBucketLinkedList {
  #head;

  constructor() {
    this.#head = null;
  }

  append(pair) {
    if (this.#head === null) {
      this.#head = pair;
    } else {
      this.tail().next = pair;
    }
  }

  prepend(pair) {
    if (this.#head === null) {
      this.#head = pair;
    } else {
      pair.next = this.#head;
    }
  }

  size() {
    let counter = 1;
    let pointer = this.#head;
    if (this.#head === null) {
      return 0;
    } else {
      while (pointer.next !== null) {
        counter++;
        pointer = pointer.next;
      }

      return counter;
    }
  }

  head() {
    return this.#head;
  }

  tail() {
    let pointer = this.#head;

    if (pointer === null) {
      return new Error("Linked list is empty.");
    } else {
      while (pointer.next !== null) {
        pointer = pointer.next;
      }

      return pointer;
    }
  }

  at(index) {
    let counter = 0;
    let pointer = this.#head;

    if (index < 0 || index === null) {
      return new Error("Index must be a non-negative number");
    }
    if (this.#head === null) {
      return new Error("Linked list is empty");
    } else {
      while (counter < index && pointer !== null) {
        counter++;
        pointer = pointer.next;
      }

      if (pointer === null) {
        return new Error("Index out of bounds.");
      } else {
        return pointer;
      }
    }
  }

  pop() {
    let prevPointer = null;
    let currPointer = this.#head;

    if (this.#head === null) {
      return new Error("Linked list is empty.");
    } else if (this.#head.next === null) {
      this.#head = null;
    } else {
      while (currPointer.next !== null) {
        prevPointer = currPointer;
        currPointer = currPointer.next;
      }

      prevPointer.next = null;
    }
  }

  contains(key) {
    let pointer = this.#head;

    if (this.#head === null) {
      return false;
    } else {
      while (pointer !== null) {
        if (pointer.key === key) {
          return true;
        } else {
          pointer = pointer.next;
        }
      }

      return false;
    }
  }

  find(key) {
    let counter = 0;
    let pointer = this.#head;

    if (this.#head === null) {
      return null;
    } else {
      while (pointer !== null) {
        if (pointer.key === key) {
          return counter;
        } else {
          pointer = pointer.next;
          counter++;
        }
      }

      return null;
    }
  }

  removeAt(index) {
    let counter = 0;
    let prevPointer = null;
    let currPointer = this.#head;

    if (this.#head === null) {
      return new Error("Linked list is empty.");
    } else if (index < 0) {
      return new Error("Index out of bounds.");
    } else if (index === 0) {
      this.#head = this.#head.next;
    } else {
      while (currPointer.next !== null && counter < index) {
        prevPointer = currPointer;
        currPointer = currPointer.next;
        counter++;
      }

      if (index > counter) {
        return new Error("Index out of bounds.");
      } else {
        let temp = currPointer;
        prevPointer.next = currPointer.next;
        return temp;
      }
    }
  }

  toString() {
    let output = "";
    let pointer = this.#head;

    if (this.#head === null) {
      return "null";
    } else {
      while (pointer !== null) {
        output += pointer.toString();
        pointer = pointer.next;
      }

      output += "null";
      return output;
    }
  }
}

export class Pair {
  #key;
  #value;
  #next;

  constructor(key, value) {
    this.#key = key;
    this.#value = value;
    this.#next = null;
  }

  get key() {
    return this.#key;
  }

  set key(key) {
    this.#key = key;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get next() {
    return this.#next;
  }

  set next(next) {
    this.#next = next;
  }

  toString() {
    return "( { " + this.#key + " : " + this.#value + " } ) -> ";
  }
}
