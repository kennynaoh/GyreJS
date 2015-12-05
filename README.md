# GyreJS
[![Build Status](https://travis-ci.org/WRidder/GyreJS.svg)](https://travis-ci.org/WRidder/GyreJS)  
Uni-directional data flow library. This is an experimental project.

## Vision / Motivation
With projects like ReactJS emerging there is a lot of attention lately to uni-drectional data flow concepts.
While not a new idea there are currently a lot of projects exploring this realm. E.g. all the flux-like libraries currently
emerging for ReactJS (like Redux, alt, etc.). 

At the moment, when using libraries like Alt, Reflux, Redux or the like, for every new project usually the developers has to set up
actions, a store and anything related. Most of this work is done again and again for new projects.

This projects introduces the concept of gyres which are basically a preset of actions, reducers (how to mutate the state after an action), a store and selectors. 
The community can create new presets which can be used by anyone else for their projects creating a low barrier of entry for using 
uni-directional data flow (flux like) approaches.

## Features
- Enforces uni-directional data flow using actions, reduces, store and selectors.
- Minimal surface API
- Isomorphic
- Immutable data

## Examples
### Create and use an empty gyre (Counter)
```javascript  
import GyreJS from "gyrejs";

// Create a new empty gyre instance
const simpleGyre = GyreJS.createGyre();

// Set initial state and create actions (chained)
simpleGyre
  .setState({
    counter: 0
  })
  .addAction("increment",
    (state) =>
      state.set("counter", state.get("counter") + 1))
  .addAction("decrement",
    (state) =>
      state.set("counter", state.get("counter") - 1))

// Create selector callback
const selectorCb = (count) => {
  console.log(`Update! New count: ${count}`);
};

// Create selectors
simpleGyre.createSelector((state, cb) => {
  cb(state.get("counter"));
}, selectorCb);

// Dispatch actions
simpleGyre
  .dispatch("increment")
  .dispatch("decrement")
  .dispatch("decrement");
  
// Output: 
// > Update! New count: 0
// > Update! New count: 1
// > Update! New count: 0
// > Update! New count: -1  
```

## Ecosystem
### Gyres
- [Smart REST](https://github.com/WRidder/gyrejs-smartrestgyre) (Relay inspired gyre)
- [Local - Simple key/value](https://github.com/WRidder/gyrejs-localgyre)

### Middleware
- [Action dispatch logger](https://github.com/WRidder/gyrejs-dispatchlogger) (Logs any actions dispatched)

## Alternatives
- [Redux](http://redux.org)
- [Marty/Alt](http://alt.js.org)
- [Reflux](https://github.com/reflux/refluxjs)
- [Relay](https://facebook.github.io/relay/)

## Versioning
As long as the library is in exploratory/beta phase versions will be < 1.0 and breaking changes may occur on minor or patch version updates.
Once 1.0 hits the project will adhere to semantic versioning.

## Inspiration
### Articles
- [Turning the database inside out](http://blog.confluent.io/2015/03/04/turning-the-database-inside-out-with-apache-samza/)
- [The two pillars of Javascript FRP](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4)

### Libraries
- [Redux](http://redux.org)
- [Marty/Alt](http://alt.js.org)
- [KefirJS](http://www.kefirjs.org)
- [RxJS](https://github.com/Reactive-Extensions/RxJS)
- [GraphQL/Relay](https://gist.github.com/wincent/598fa75e22bdfa44cf47)
- [ImmutableJS](https://facebook.github.io/immutable-js/)
 
## Gyre?
[Gyre](https://en.wikipedia.org/wiki/Ocean_gyre) = vortex. A wink to unidirectional data flow.  
![Oceanic Gyre](https://upload.wikimedia.org/wikipedia/commons/8/8a/Oceanic_gyres.png)
