console.log("Hello, world!");

// fetch
const x = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Inside the promise!");
        resolve("Hello from the promise!");
    }, 2000);
});

x.then((message) => {
    console.log(message);
});

console.log("1111!");
