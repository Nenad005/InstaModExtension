
const actions = {
    follow : 0,
    unfollow : 1,
    like : 2
}

const restTime = {
    pocetak: 2,
    kraj : 14,
}
const maxActionsPerDay = 150

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

function initialize(){
    // a = randInt(2, 0)
    // console.log(a)
    // perform_action(a)
    console.log(timeUntilRest())
    console.log(timeUntilRestEnd())
}


initialize()