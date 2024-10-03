// const isVarified = false;
// if(isVarified == true){
//     console.log("user is varified");
// }
// else{
//     console.log("user is not varified");
// }
// console.log(`${isVarified === true ? "user is varified": "user is not varified"}`)

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}
console.log(getTimeString(4325));