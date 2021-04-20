// API
// var emitter = new EventEmitter
// emitter.on(eventName, listener)
// emitter.off(eventName, listener)
// emitter.once(eventName, listener)
// emitter.emit(eventName, args)
// emitter.allOff(eventName)
//----------------

class EventEmitter {
  constructor() {
    this.__events = {};
  }

  on(eventName, listener) {
    if (!eventName || !listener) return;
    if (typeof listener !== "function") {
      throw new TypeError("listener must be a function");
    }
    if (!this.__events[eventName]) {
      this.__events[eventName] = [listener];
    } else {
      this.__events[eventName].push(listener);
    }
    return this;
  }

  off(eventName, listener) {
    const listenerList = this.__events[eventName];
    if (listenerList) {
      const index = listenerList.indexOf(listener);
      listenerList.splice(index, 1);
    }
    return this;
  }

  emit(eventName, ...args) {
    const listenerList = this.__events[eventName];
    if (!listenerList) return this;
    listenerList.forEach((fn) => {
      fn.call(this, ...args);
    });
    return this;
  }

  allOff(eventName) {
    const listenerList = this.__events[eventName];
    if (listenerList) {
      this.__events[eventName] = [];
    }
  }

  once(eventName, listener) {
    this.on(eventName, function one(...args) {
      listener.call(this, ...args);
      this.off(eventName, one);
    });
  }
}
