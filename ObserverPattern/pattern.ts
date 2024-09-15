interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}
type Teardown = () => void;
class Observable<T> {
  constructor(private init: (observer: Observer<T>) => Teardown) {}
  subscribe(observer: Observer<T>) {
    const subscriber = new Subscriber<T>(observer);
    return this.init(subscriber);
  }
  map() {
    return () => {
      console.log("data done");
    };
  }
}
class Subscriber<T> implements Observer<T> {
  closed = false;
  constructor(private destination: Observer<T>) {}
  next(value: T) {
    if (!this.closed) {
      this.destination.next(value);
    }
  }
  error(err: any) {}
  complete() {}
}
const myObservable = new Observable((observer: Observer<number>) => {
  observer.next(100);
  observer.next(200);
  return () => {
    console.log("teardown");
  };
});
myObservable.subscribe({
  next(value) {
    console.log(value);
  },
  error(err) {
    console.log(err);
  },
  complete() {
    console.log("done");
  },
});
myObservable.map()();

///////////////////with function
function myFn(observer: Observer<number>) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}
let teardown = myFn({
  next(value) {
    console.log(value);
  },
  error(err) {
    console.log(err);
  },
  complete() {
    console.log("done");
  },
});
// teardown();
