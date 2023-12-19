
const actions = {
    follow : 0,
    unfollow : 1,
    like : 2
}

const restTime = {
    pocetak: 1,
    kraj : 14,
}
const maxActionsPerDay = 150
const maxActionsPerHour = 30

function follow(){console.log('Followed')}
function unfollow(){console.log('Unfollowed')}
function like(){console.log('Liked')}

function perform_action(action_type){
    switch (action_type) {
        case 0:
            follow()
            break
      
        case 1:
            unfollow()
            break

        case 2:
            like()
            break

        default:
            console.log("Invalid action")
            break
    }
}

function randInt(max, min = 0){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function timeUntilRest(){
    if (isRestTime()) return -1

    const now = new Date();
    const target = new Date(now);
    target.setHours(restTime.pocetak, 0, 0, 0);

    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    const timeDifference = Math.floor((target - now) / (1000 * 60));

    return timeDifference;
}

function isRestTime() {
    const currentHour = new Date().getHours();
    return currentHour >= restTime.pocetak && currentHour < restTime.kraj;
}

function timeUntilRestEnd(){
    if (!isRestTime()) return -1
    const now = new Date();
    const target = new Date(now);
    target.setHours(restTime.kraj, 0, 0, 0);

    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    const timeDifference = Math.floor((target - now) / (1000 * 60));

    return timeDifference;
}
const fs = require('fs');

function writeToFile(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Task times written to file:', filePath);
      }
    });
  }

function calculate_actions(){
    const time_left = timeUntilRest()
    let base_action_time = (time_left < (maxActionsPerDay/maxActionsPerHour) * 60) ? 2 : time_left / ( maxActionsPerDay * 2 );
    let max_actions = Math.floor(time_left / base_action_time)
    let curr_time = new Date()
    let action_biases = split_number(max_actions, 5)
    let actions = []
    let follows = 0;
    let likes= 0;
    for (let i = 0; i < action_biases.length; i++){
        let type = randInt(1) == 1 ? 'follow' : 'like'
        actions.push({
            bias: action_biases[i],
            time: curr_time.toISOString(),
            type: type
        })
        if (type == 'follow') follows += action_biases[i] 
        else likes += action_biases[i]
        curr_time = new Date(curr_time.getTime() + base_action_time * action_biases[i] * 60000)
        console.log(typeof(curr_time))
    }

    console.log(base_action_time, max_actions)
    console.log(follows, likes)
    writeToFile('task_times.json', actions)
}

function split_number(n, b){
    let res = []
    if (n <= b) {
        res.push(n)
        return res
    }
    while (n > 0){
        let rn = Math.min(n, Math.abs(b + randInt(-3, 3)))
        res.push(rn)
        n -= rn
    }
    return res;
}


function initialize(){
    console.log(timeUntilRest())
    console.log(timeUntilRestEnd())
    console.log(split_number(28, 5))
    calculate_actions()
}


initialize()