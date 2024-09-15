/**
 * Don't just mug up things, first learn what exactly is Observer pattern and how it works
 */

// simple pattern
class SimpleObserver {
  constructor() {
    this.observerArray = [];
  }
  subscribe(fn) {
    this.observerArray.push(fn);
  }
  publish(data) {
    this.observerArray.forEach((fn) => {
      fn(data);
    });
  }
  unSubscribe(func) {
    this.observerArray = this.observerArray.filter((fn) => fn !== func);
  }
}
function test1(data) {
  console.log(data);
}
function test2(data) {
  console.log(data);
}
let observable = new SimpleObserver();
observable.subscribe(test1);
observable.subscribe(test2);
observable.publish("testData1");
observable.unSubscribe(test2);
observable.publish("testData2");
