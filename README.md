# Exploration of custom permissions and authorization based on [How We Built a Custom Permissions DSL at Figma | Figma Blog](https://www.figma.com/blog/how-we-rolled-out-our-own-permissions-dsl-at-figma/)

Goal to see how policies in code (or maybe JSON DSL) may be evaluated in a variety of locations within a stack. Database loader and context path should obscure implementation details and support table or JSON based data forms. 
Examples should be provided that prove useful for REST or GraphQL needs, such as denied fields.

## Show some examples (see go.js)
✅ allow owner view file 1?
✅ deny guest view file owned by another
✅ deny deleted user from view file
✅ allow user to view a file shared by another

## Add more scenarios and examples
[] public url access (viewers, commenters, editors etc.)
[] tiny todo access


## Explore GraphQL needs

//token.deniedFields
// allowedQueriesRule aka allowed Query, Mutation, Subscription

## Explore alternative evaluation engine and/or policy serialization with jsonata
// (async () => {
//   const expression = jsonata('$sum(example.value)');
//   const result = await expression.evaluate(data);  // returns 24
// })()

## Data loading
Policy in code, provides a known static list of dependencies, but I won't fully explore the figma path at this stage.

> Halt at step 1, revisit later

From the resource (in this case, a file) and user object, we can infer all the queries we need in order to load all required resources. We can imagine there being four groups of resources:

1. Resources known at call time (file and user).
2. Resources loaded through references / foreign keys in main resource object (through file).
3. Resources loaded through columns in user object.
4. Resources loaded through columns in both the main resource and user objects.
