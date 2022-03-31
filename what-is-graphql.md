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

to grab a company (or two!)  and its associated users:

```
query fetchCompaniesWUsers{
  zaronology: company(id: "1") {
    name
    description
    users {
      id
      firstName
      age
    }
  }
  apple: company(id: "2") {
    name
    description
    users {
      id
      firstName
      age
    }
  }
}
```


to grab a company (or two!) and its associated users even cleaner, use query fragments:

```
fragment CompanyDetails on Company {
    name
    description
}

fragment UserDetails on User {
    id
    firstName
    age
}
query fetchCompaniesWUsers{
  zaronology: company(id: "1") {
    ...CompanyDetails
    users {
        ...UserDetails
    }
  }
  apple: company(id: "2") {
    ...CompanyDetails
    users {
        ...UserDetails
    }
  }
}
```

to create/edit/delete records, use mutations!

```
mutation {
  addUser(firstName: "Stephen", age: 26) {
      id
      firstName
      age
  }
}
```

