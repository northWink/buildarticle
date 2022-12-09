// 随机模块，用于提供随机算法
// randomInt 函数返回一个大于等于 min，小于 max 的随机整数
const randomInt = (min, max)=>{
    const p = Math.random();
    return Math.floor(min * (1 - p) + max * p);
}
// 随机选出数组中的一个元素
const createRandomPicker = (arr)=>{
    arr = [...arr];//copy 数组，以免修改原始数据
    function randomPick (){
        const len = arr.length -1;
        const index = randomInt(0,len);
        const picked = arr[index];
        // 位置调换
        [arr[index],arr[len]] = [arr[len],arr[index]];
        return picked;
    }
    randomPick(); // 抛弃第一次选择结果
    return randomPick;
}

export {randomInt,createRandomPicker}