🎞️ Open API를 활용한 영화 사이트 (https://www.omdbapi.com)

## 1. useEffect

Executed after the component mounts (initial render)

Executed after subsequent re-renders (according to dependency array)

→ Used to keep a component synchronized with some external system

📌 _Rules of effect_

- Each effect should do only one thing
- Use one useEffect hook for each side effect (→ This makes effects easier to clean up)

#### [Dependency Array]

: We can use dependency array to run effects when the component renders or re-renders

- _Runs on every render_

```javascript
useEffect(() => {
  console.log("hello");
}); // no array
```

- _Runs only on mount (initial render)_

```javascript
useEffect(() => {
  console.log("hello");
}, []); // empty array
```

- _Runs when state and props inside the effect updates_

```javascript
useEffect(() => {
  // count가 변경될 때마다 useEffect가 작동
  console.log("hello");
}, [count]);
```

#### [Clean up Function]

Function that we can return from an useEffect (optional)

_Runs on two different occasions_

- Before the effect is executed again
- After a component has unmounted

#### _Why clean up function is necessary?_

> Whenever side effect keeps happening after the component has been re-rendered or unmounted

## 2. useRef

“Box” (object) with a mutable

Refs are for data that is not rendered → Usually only appear in event handlers or effects

```javascript
const myRef = useRef(100);

// Can read from the ref using .current
console.log(myRef.current); // 100
```

#### _Where to use?_

> Creating variables that stays the same between renders <br>
> Selecting and storing DOM elements (like querySelector or getElementById)

#### _STATE vs REF_

|       | Persists Across Renders | Updating causes Re-Render | Immutable |
| :---: | :---------------------: | :-----------------------: | :-------: |
| STATE |            O            |             O             |     O     |
|  REF  |            O            |             X             |     X     |

## 3. Custom Hooks

Allow us to reuse non-visual logic in multiple components

One custom hook should have one purpose, to make it reusable and portable

#### _How to use?_

> Custom hook is a function whose name starts with ”use” <br>
> It may call other Hooks (useState, useEffect etc)
