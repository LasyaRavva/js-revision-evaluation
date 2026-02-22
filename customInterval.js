function mySetInterval(callback, delay) {
    let isActive = true;
    let timerId = null;

    function schedule(){
        if(!isActive) return;

        timerId = setTimeout(() => {
            if (isActive) {
                try{
                    callback();
                } catch (err) {
                    console.log("error in mysetinterval callback:", err);
                }
                schedule();
            }
        }, delay);
    }
    schedule();

    return {id: timerId};
}

function myClearInterval(intervalObj) {
    if(!intervalObj || !intervalObj.id) return;
    clearTimeout(intervalObj.id);
    intervalObj.id = null;
}

if(require.main === module) {
    console.log("starting custom interval...");

    const counter = {value: 0};
    const interval = mySetInterval(() => {
        counter.value++;
        console.log(`tick: ${counter.value} [${new Date().toLocaleTimeString()}]`);

        if(counter.value >= 5) {
            console.log("stopping after 5 ticks...");
            myClearInterval(interval);
        }
    }, 800);

    setTimeout(() => {
        console.log("Manually clearing interval afer 3s");
        myClearInterval(interval);
    }, 3000)
}

module.exports = { mySetInterval, myClearInterval};