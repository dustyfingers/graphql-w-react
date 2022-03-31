# What is GraphQL?
GraphQL is a query language for APIs, and a server-side runtime for executing queries using a type system to define your data.

Lets continue this example of taking a user and finding the companies all of their friends work at. In GraphQL, we would use a query that looks like this:

```
query {
    user(id: 23) {
        friends() {
            company {
                name
            }
        }
    }
}
```

