// function sequence

let result;

function greet(str){
    result = str;
}

greet("hello");

console.log(result);

// callback, function where you execute it from an argument/parameter

function calculator(a,b,callback){
    if(callback){
        callback(a+b);
    } else {
        console.log("callback doesnt exist")
    }

}

function displayer(result){
    console.log(result);
}

calculator(4,5,displayer);

// nameless function, can be inserted as an argument


calculator(4,5,function(result){
    console.log("you can write anything");
    console.log("result -->", result);
})

// asynchronous - set timeout, built in method/function wait x miliseconds

// setTimeout(function(){
//     console.log("done after 3 seconds");
// }, 3000)

// promise

let list = [
    {name:"Iphone 12", price:1200},
    {name:"Samsung Note20", price:1300},
    {name:"Itel", price:200}
]

let money = 3000;

function buy(money, item, callback){
    console.log("You have bought", item.name, "with the price of", item.price);
    console.log("Your remaining balance is ", (money - item.price));
    if(callback){
        callback(money - item.price);
    } else{

    }
}

buy(money, list[0], function(moneyLeft){
    buy(moneyLeft, list[1], (moneyLeft) =>{
        buy(moneyLeft, list[2])
    })
})

// this will resulted in something called "callback hell"
// to avoid nesting and make it more streamlined
// this is where we use promise state

// let myPromise = new Promise((resolve, reject) => {
//     let isError = false;
//     if (!isError){
//         resolve("success");
//     } else{
//         reject("error");
//     }
// });
// if you insert a nameless function as an argument its called a callback
// then ----> resolve, respond take the argument from resolve
// myPromise.then((respond) => {
//     console.log("respond", respond);
//     return myPromise;
// })
// .then((respond)=>{
//     console.log("respond", respond);
//     return myPromise;
// })
// // catch =====> reject, error take the argument from reject
// .catch((error) => {
//     console.log(error);
// })
// // executed after then or catch function
// .finally(() => {
//     console.log("finish");
//})

console.clear();


function buyPhone(money, item) {
    return new Promise((resolve, reject) => {
        if (money >= item.price) {
            resolve({
                item:item,
                moneyLeft:money - item.price
            });
        } else {
            reject("Not enough money");
        }
    });
}

money = 2000;

buyPhone(money, list[0])
.then((response) => {
    console.log("Purchase successful");
    console.log("You have bought", response.item.name, "for the price of", response.item.price);
    console.log("Your remaining balance is", response.moneyLeft);
    return buyPhone(response.moneyLeft, list[2])
})
.then((response) => {
    console.log("Purchase successful");
    console.log("You have bought", response.item.name, "for the price of", response.item.price);
    console.log("Your remaining balance is", response.moneyLeft);
    return buyPhone(response.moneyLeft, list[1])
    
})
.then((response) => {
    console.log("Purchase successful");
    console.log("You have bought", response.item.name, "for the price of", response.item.price);
    console.log("Your remaining balance is", response.moneyLeft);
    return buyPhone(response.moneyLeft, list[2])
    
})


.catch((error) => {
    console.log("Purchase failed:", error);
});

//set timeout as a promise

function myTimeout(time){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve("done in "+ time /1000 + " seconds")   
        }, time);
    });
}

myTimeout(3000)
.then(res =>{
    console.log("Times up");
    console.log(res); 
    return myTimeout(1000);
} )
.then(res =>{
    console.log("Times up");
    console.log(res);
});

//==============[ async await ]==================

// basically a method that makes a promise synchronous
// promise is async by default, by using async await it will make it pseudo synchronous

async function buyPhone2(money, item) {
    return await new Promise((resolve, reject) => {
        if (money >= item.price) {
            resolve({
                item:item,
                moneyLeft:money - item.price
            });
        } else {
            reject("Not enough money");
        }
    });
}


async function sequence() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    console.log(users[0]);

    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    console.log(posts[0]);
}

sequence();

async function sequence2(){
    
    const to1 = await myTimeout(5000)
    console.log("task 1");
    console.log(to1);
    const to2 = await myTimeout(3000);
    console.log("task 2");
    console.log(to2);
}

sequence2();

async function myFetchData(){
    const myFetch = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await myFetch.json();
    console.log(json[0]);


}

myFetchData();

// error handler for async await

async function myFetchData2() {
    try {
        const myFetch = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!myFetch.ok) {
            throw ('Network response was not ok'); // catch --> error
        }
        const json = await myFetch.json();
        console.log(json[0]);
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}

myFetchData2();

