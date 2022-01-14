# React Apprenticeship: Performance

React is fast, but sometimes we can run into performance issues. Let's apply some React optimization techniques to our code.

## Instructions

Follow the list in each technique. Consider:

- Selecting the network `SLow 3G` and CPU `6x slowdown` to cover slow networks and devices.
- Using the Chrome DevTools for debugging:
  - Coverage
  - Performance
  - Profiler (React Dev Tools)
  - Components (React Dev Tools)

## Code Splitting

Reduce the bundle size by lazy-loading components.

1. Import the component City using `React.lazy`.
2. Wrap the conditional rendering of City in `React.Suspense`.

## Memoization

Avoid unnecessary renders and computations.

We need to avoid:

- Re-filtering the cities when the parent re-renders.
- Re-rendering all the inputs when an input's value changes.

To do so, in App.jsx, we have to:

1. Wrap the function `getCitiesByName` in `React.useMemo`.
2. Wrap the component `CityInput` in `React.memo` passing a comparison function.
3. Wrap the function `setValue` in `React.useCallback`.

## Debouncing and Throttling

Control function calls over time.

```js
const debounce = (func, time) => {
  let debounceHandler;
  return function () {
    clearTimeout(debounceHandler);
    debounceHandler = setTimeout(() => func.apply(this, arguments), time);
  };
};
```

```js
const throttle = (func, time) => {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), time);
    }
  };
};
```

In Cities.jsx:

1. Create the file `functions.js` and export the function `debounce`.
2. Refactor the function `getCitiesByName` so the filtered cities are stored in a state.
3. Create a debounced handler for `getCitiesByName` using the `useRef` hook.
4. Call the debounced handler inside the function `handleNameChange`.

In App.jsx:

1. Export the function `throttle` from the file `functions.js`.
2. Create a throttled handler for `handleToggleClick` using the `useRef` hook.
3. Replace the onClick function with the throttled handler.

## Optimize Context Value

Avoid unintentional re-renders when using Context.

We need to avoid:

- Re-rendering the cities when the context re-renders.
- Re-rendering all the inputs when an input's value changes.

To do so, whe have to:

Before: Create the cities context and consume it from `Cities.jsx` and `CityInput.jsx` using a custom hook.

### Approach 1: Memoizing the context value

1. Wrap the context value in `React.useMemo`.
2. Wrap the component `CityInput` in `React.memo`.

### Approach 2: Splitting the context value

1. Create two context:
   - CitiesStateContext: state `cities` as value.
   - CitiesUpdaterContext: function `setCities` as value.
2. Create a custom hook for each context.
3. Move the function `setValue` to the updater custom hook.
4. Wrap the updater custom hook value in `React.useMemo`.
