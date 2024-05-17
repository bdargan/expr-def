# Exploration of custom permissions and authorization

This is not a library, just an exploration of concepts from a great blog article: [How We Built a Custom Permissions DSL at Figma | Figma Blog](https://www.figma.com/blog/how-we-rolled-out-our-own-permissions-dsl-at-figma/)

Goal is to see how policies in code might work for various use cases. Ideally these could be in a variety of locations within a stack. 

I expect the combination of Database loader with context path mapping should obscure implementation details that simplifies the policy expressions (and support tables or JSON based data forms). 
I use REST and/or GraphQL so examples with restricted field/column access need to be added.

## Example:
```
pnpm go
```
✅ allow owner view file 1?

✅ deny guest view file owned by another

✅ deny deleted user from view file

✅ allow user to view a file shared by another

## Add more scenarios and examples
*  public url access (viewers, commenters, editors etc.)
*  tiny todo access
* Column / field restrictions. GQL deniedFields

## Explore alternative evaluation engine and/or policy serialization with jsonata
```// (async () => {
//   const expression = jsonata('$sum(example.value)');
//   const result = await expression.evaluate(data);  // returns 24
// })()
```

## Data loader
Policy in code provides a known static list of dependencies, but I won't fully explore the figma path at this stage.

> From the resource (in this case, a file) and user object, we can infer all the queries we need in order to load all required resources. We can imagine there being four groups of resources:
> 1. Resources known at call time (file and user).
> 2. Resources loaded through references / foreign keys in main resource object (through file).
> 3. Resources loaded through columns in user object.

