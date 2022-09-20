const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkNotification = async (id) => {
    const found = await prisma.notifications.findFirstOrThrow({
        where:{
            AND:[
                {userid: id},
                {deletetime: null}
            ]
        }
    }).catch((err) => { return false; })

    return found;
}

const addNotification = async (id, message) => {
    
    if(await checkNotification(id)){
        return;
    }

    const notification = await prisma.notifications.create({
        data:{
            message: message,
            userid: parseInt(id)
        },
        select:{
            message: true
        }
    })

    return notification;
}

const checkDob = async () => {

    let message;

    const profile = await prisma.userdetails.findMany({
        select:{
            userId: true,
            dob: true
        }
    }).catch((err) => {return;})

    for(let i = 0 ; i < profile.length ; i++){
        if(new Date().getDate() + 1 == profile[i].dob.getDate()){
            addNotification(profile[i].userId, "User " + (profile[i].userId).toString() + " has birthday tomorrow")
        }

        if(new Date().getDate()  == profile[i].dob.getDate()){
            addNotification(profile[i].userId, "User " + (profile[i].userId).toString() + " has birthday today")
        }

        if(new Date().getDate() - 3 == profile[i].dob.getDate()){
            resetNotification(profile[i].userId)
        }
    }

    return profile;
}

const resetNotification = async (id) =>{
    const deleted = await prisma.notifications.updateMany({
        where:{
            AND:[
                {userid: id},
                {deletetime: null}
            ]
        },
        data:{
            deletetime: new Date(Date.now()).toISOString()
        }
    })

    return deleted;
}

module.exports = { checkDob };