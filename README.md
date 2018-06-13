# Array.prototype.pack (non-standard)

Bin packing algorithm (https://en.wikipedia.org/wiki/Bin_packing_problem)

## Usage

```
var blocks = [
  { text: 'Rolly', height: 50 },
  { text: 'Golly', height: 40 },
  { text: 'Folly', height: 30 },
  { text: 'Jolly', height: 20 },
  { text: 'Holly', height: 30 },
  { text: 'Bolly', height: 30 }
];

const columns = blocks.pack(100, block => block.height, 'FFD');
console.log(columns);
```

```
// example output:
[
  [
    { text: 'Rolly', height: 50 },
    { text: 'Golly', height: 40 }
  ],
  [
    { text: 'Folly', height: 30 },
    { text: 'Holly', height: 30 },
    { text: 'Bolly', height: 30 }
  ],
  [
    { text: 'Jolly', height: 20 }
  ]
]
```

## Parameters

### Bin Max Size (optional)

Max size of any bin. If negative or falsy, it will use the default.

Default: Will use the largest size in the array.

### Size function

Function that gets the size from an object.

Default: (identity function, returns itself).

### Method

Bin packing algorithm to use.

Available:
- `FFD`: first fit decreasing (https://en.wikipedia.org/wiki/Bin_packing_problem#First-fit_algorithm)

To be added:
- `MFFD`: modified first fit decreasing (https://en.wikipedia.org/wiki/Bin_packing_problem?oldformat=true#cite_ref-7)

Default: `FFD` (will be `MFFD` in later versions).

## Return value

A new array of arrays containing the original array's elements.

The original array, or the elements inside will not be modified.

All references to non-primitive elements of the original array will be
used in the return value.

This means:
- you can wrap a primitive in an object or array to identify the primitive.
- mutating non-primitive elements in either the original array or the returned
  array of arrays would mutate the other.

Example:

```
const original = [{ weight: 10 }, { weight: 5 }];
const result = original.pack(null, obj => obj.weight);
console.log(result); // [[{ weight: 10 }], [{ weight: 5 }]]
console.log(original); // [{ weight: 10 }, { weight: 5 }]

original[0].weight = 11;
console.log(original); // [{ weight: 11 }, { weight: 5 }]
console.log(result); // [[{ weight: 11 }], [{ weight: 5 }]]
```

## Notes

For items with a size larger than the specified 'Bin max size',
they will be placed in their own bin.
