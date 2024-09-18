import { HashBucketLinkedList, Pair } from "./linkedlist.mjs";

export class HashMap {
  #buckets;

  constructor() {
    this.#buckets = new Array(16);
    for (let i = 0; i < 16; i++) {
      this.#buckets[i] = new HashBucketLinkedList();
    }
  }

  hash(key, numOfBuckets) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % numOfBuckets;
    }

    return hashCode;
  }

  set(key, value) {
    let bucketIndex = this.hash(key, this.#buckets.length);

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }

    let bucket = this.#buckets[bucketIndex];

    if (bucket.contains(key)) {
      let existingPair = bucket.at(bucket.find(key));
      existingPair.value = value;
    } else if (bucket.contains(key) === false) {
      bucket.append(new Pair(key, value));
    }

    if (this.length() > this.#buckets.length * 0.75) {
      this.growBuckets();
    }
  }

  growBuckets() {
    let resizedBuckets = new Array(this.#buckets.length * 2);

    for (let i = 0; i < resizedBuckets.length; i++) {
      resizedBuckets[i] = new HashBucketLinkedList();
    }

    for (let i = 0; i < this.#buckets.length; i++) {
      // MORE REHASHING WORK AAAA, REALLOCATE KEYS INSTEAD OF BUCKET POSITIONS
      let bucketSize = this.#buckets[i].size();

      for (let j = 0; j < bucketSize; j++) {
        let currentPair = this.#buckets[i].tail();
        let indexOfNewBucket = this.hash(
          currentPair.key,
          resizedBuckets.length
        );
        resizedBuckets[indexOfNewBucket].append(currentPair);
        this.#buckets[i].pop();
      }
    }

    this.#buckets = resizedBuckets;
  }

  get(key) {
    let bucketIndex = this.hash(key, this.#buckets.length);

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }

    let bucket = this.#buckets[bucketIndex];

    if (bucket.contains(key)) {
      return bucket.at(bucket.find(key)).value;
    } else {
      return null;
    }
  }

  has(key) {
    let bucketIndex = this.hash(key, this.#buckets.length);

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }

    let bucket = this.#buckets[bucketIndex];

    return bucket.contains(key);
  }

  remove(key) {
    let bucketIndex = this.hash(key, this.#buckets.length);

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }

    let bucket = this.#buckets[bucketIndex];

    let linkedListIndexOfKey = bucket.find(key);
    if (linkedListIndexOfKey === null) {
      return false;
    } else {
      bucket.removeAt(linkedListIndexOfKey);
      return true;
    }
  }

  length() {
    let numOfKeys = 0;
    for (let bucket of this.#buckets) {
      if (bucket.size() > 0) {
        numOfKeys += bucket.size();
      }
    }

    return numOfKeys;
  }

  clear() {
    for (let bucket of this.#buckets) {
      while (bucket.size() !== 0) {
        bucket.pop();
      }
    }
  }

  keys() {
    let keysArray = [];

    for (let bucket of this.#buckets) {
      let head = bucket.head();

      while (head !== null) {
        keysArray.push(head.key);
        head = head.next;
      }
    }

    return keysArray;
  }

  values() {
    let valuesArray = [];

    for (let bucket of this.#buckets) {
      let head = bucket.head();

      while (head !== null) {
        valuesArray.push(head.value);
        head = head.next;
      }
    }

    return valuesArray;
  }

  entries() {
    let entriesArray = [];

    for (let bucket of this.#buckets) {
      let head = bucket.head();

      while (head !== null) {
        entriesArray.push([head.key, head.value]);
        head = head.next;
      }
    }

    return entriesArray;
  }
}
