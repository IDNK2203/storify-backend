# Lessons Learnt

## register user controller

### Async function

if an async function is return returns a value the value becomes a promise
the async function can acts as a promise inside another async function.

### Handelling Async functions errors (Promise Rejects)

if an async function rejects a promise and you want to handelling the error in the outer scope
async function. return the promise value from the inner function without adding a try catch block
and handle the error on the outerscope async function.

## - get user stats controller

### mongoDB/Mongoose Aggreagation

used the aggregation pipeline to query the list of register user in the part year per month.

### Date Object

calculate the last year from the current year
