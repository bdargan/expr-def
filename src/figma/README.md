# Demo of Figma blog article
## Data loading

From the resource (in this case, a file) and user object, we can infer all the queries we need in order to load all required resources. We can imagine there being four groups of resources:

1. Resources known at call time (file and user).
2. Resources loaded through references / foreign keys in main resource object (through file).
3. Resources loaded through columns in user object.
4. Resources loaded through columns in both the main resource and user objects.

## Extend this to GraphQL needs

//token.deniedFields
// allowedQueriesRule aka allowed object
// resourceRestrictedRule

// (async () => {
//   const expression = jsonata('$sum(example.value)');
//   const result = await expression.evaluate(data);  // returns 24
// })()

