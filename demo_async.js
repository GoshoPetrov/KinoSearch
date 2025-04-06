async function start() {

    console.log("Hello, world!");

    // fetch
    const message = await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside the promise!");
            resolve("Hello from the promise!");
        }, 2000);
    });

    console.log(message);

}

start().then(() => {
    console.log("End!");
});
