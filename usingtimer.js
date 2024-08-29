
const factorial=n=>n>1?factorial(n-1)*n:1


const outer=()=>{
    console.log(factorial(6))
}

const inner=(callback)=>{
    console.log("Introduction to js programming")
   const timerId= setInterval(callback,1000)
    console.log("End of Introduction to js programming");
    setTimeout(()=>{
        clearInterval(timerId)
    },5500)
    
}

console.log("Test 1");
inner(outer)
console.log("Test 2");





