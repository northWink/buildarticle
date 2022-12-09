import readline from "readline";

function question(r1, { text, value }) {
    const q = `${text}(${value})\n`;
    return new Promise((resolve) => {
        r1.question(q, (answer) => {
            resolve(answer || value);
        })
    })
}

export async function inject(questions) {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const answer = await question(r1, q); // 等待问题的输入
        answers.push(answer)
    }
    r1.close();
    return answers;
}

// export function inject(questions){
//     // questions 是一个数组,内容 如{text,value}
//     process.stdin.setEncoding('utf8');

//     return new Promise((resolve)=>{
//         const answers = [];
//         let i = 0;
//         let {text,value} = questions[i++];
//         console.log(`${text}(${value})`);
//         process.stdin.on('readable',()=>{
//             const chunk = process.stdin.read().replace(/\r?\n$/,"");
//             // 保存用户的输入，如果用户输入为空，则使用缺省值
//             answers.push(chunk || value);
//             const nextQuestion = questions[i++];
//             if(nextQuestion){
//                 // 如果问题还未结束，继续监听用户输入
//                 process.stdin.read();
//                 text = nextQuestion.text;
//                 value = nextQuestion.value;
//                 console.log(`${text}(${value})`);
//             }else{// 如果问题结束了，结束readable监听事件
//                 resolve(answers)
//             }
//         })
//     })
// }