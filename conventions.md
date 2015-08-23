# Conventions

recipe
queue
flow
run
rule
variable definition
task
target
dependencies



## Taret

A `target` is an object that gives special meaning to the following properties:

- `src`
- `dest`
- `options`: options to pass to plugins in the pipeline
- `pipeline`

```js
{src: '', dest: ''}
```

## Task

```js
jslint: {
  options: {},
  pipeline: [],
  src: '',
  dest: ''
}
```

**Normalizes to**

At runtime, the above task normalizes to:

```js
jslint: {
  options: {},
  pipeline: [],
  targets: [{src: '', dest: ''}]
}
```



## Task

```js
assemble: {
  options: {},
  pipeline: [],
  site: {
    options: {},
    pipeline: [],
    src: '',
    dest: ''
  },
  blog: {
    deps: [],
    options: {},
    pipeline: [],
    files: {
      src: '',
      dest: ''
    },
    run: function() {},
  },
  docs: {
    deps: [],
    run: function() {},
    options: {},
    pipeline: [],
    files: [
      {src: '', dest: '', options: {}},
      {src: '', dest: '', pipeline: []},
      {src: '', dest: '', options: {}, pipeline: []},
    ]
  }
}
```
