const { ActivityType } = require('discord.js');
const createCommands = require('./createcommands');

const activityMessages = [
    "1",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9",
];

module.exports = async (client) => {
    client.once('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
        
        const updateActivity = () => {
            const randomMessage = activityMessages[Math.floor(Math.random() * activityMessages.length)];
            
            client.user.setPresence({
                activities: [{ name: randomMessage, type: ActivityType.Playing }],
                status: 'Online',
            });
        };
        
        updateActivity();
        
        setInterval(updateActivity, 30 * 60 * 1000);

        const guild = client.guilds.cache.first();

        if (guild) {
            const memberCount = guild.memberCount;
            const botCount = guild.members.cache.filter((member) => member.user.bot).size;

            console.log(`👥 Membros: ${memberCount}`);
            console.log(`🤖 Bots: ${botCount}`);
        } 

        await createCommands.createCommands(client);
    });
};
