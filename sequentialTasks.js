async function runSequentialTasks(tasks, delayMs = 0){
    if(!Array.isArray(tasks)) {
        throw new TypeError("tasks must be an array");

    }
    const results = [];
    for(let i = 0; i < tasks.length; i++){
        try{
            const result = await tasks[i]();
            results.push(result);
            if(i < tasks.length -1 && delayMs > 0 ){
                await new Promise(resolve => setTimeout(resolve.delayMs));
            } 
        } catch(error){
            throw error;
        }
    }
    return results;
}

if(require.main === module) {
    const delay = ms => new Promise(r => setTimeout(r,ms));

    const tasks =[
        async () => await delay(400); console.log("task1"); return 10;},
    ];
}