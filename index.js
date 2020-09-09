const fs = require('fs');
const Discord = require('discord.js');
const  ownerID = '563881575750828032';
const prefix = ';'; // The prefix that bot listens to when it listens for commands
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
  client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server,  Make sure to head to #rules and join our group!`);
});
   client.user.setActivity("with depression", {
  type: "STREAMING",
  url: "https://www.twitch.tv/monstercat"
});
 });

client.on('message', message => {
 if (!message.content.startsWith(prefix) || message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if(command  === 'suggest') {
  const channel = client.channels.cache.get('745765324149751951');
  const argsmessage = args.join(" ");
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle("New suggestion!")
	.setDescription(argsmessage)
	.setFooter(`${message.author.tag}`);

channel.send(exampleEmbed).then(sentMessage => {
	sentMessage.react('👍');
	sentMessage.react('👎');
});
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    // And we get the bot to say the thing: 
  }
  else if(command === "eval") {
    if(message.author.id !== '563881575750828032') return message.channel.send('This command is only for the bot owner!');
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    eval(sayMessage)
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send();
  }


    
	  // If the message content starts with "!kick"
  if (message.content === `${prefix}hi`) {
  mesage.channel.send('hi')
	

}	else if (message.content === ';phelp') {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "You have asked for my help!",
    description: "Here is a list of my commands and what they do.",
    fields: [{
        name: ";flight",
        value: "Shows the current flight times and status."
      },
      {
        name: ";suggest",
        value: "Suggest stuff to our development team or suggest things about the bot. Do not abuse this."
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Lufthansa 2020. All rights belong to the IRL Lufthansa. "
    }
  }
});
    
	  message.react('✅');


    } else if (message.content === `${prefix}flight`) {
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Lufthansa Flights",
    description: "Here you will see Lufthansas upcoming flights and their status. If they are blanked, there are no scheduled flights.",
    fields: [{
        name: "FLIGHT | 2:00 PST",
        value: "2:00 PST flight at SERIFOS INTL. AIRCRAFT: A320neo"
      },
      {
        name: "No flights scheduled.",
        value: "No flights scheduled."
      },
      {
        name: "No flights scheduled.",
        value: "No flights scheduled."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Lufthansa RBLX. All rights belong to the IRL Lufthansa. "
    }
  }
});

 } else if (message.content.startsWith(';kick')) {
    // Assuming we mention someone in the message, this will return the user
     if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
       const audit = args.join(" ")
        member
          .kick(audit)
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }  
 } else if (message.content === `${prefix}slock`) {
   message.delete().catch(O_o=>{});
   if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`Uh oh, you have missing permissions. If you have the correct permissions, please contact a Bot Manager.`)
    }
	message.channel.send('** The flight is now slocked, we apologize if you could not join, however, more flights can be found on the flight planner here: **');

  } else if (message.content === `${prefix}flightshout serifos`) {
     message.delete().catch(O_o=>{});
   if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`Uh oh, you have missing permissions. If you have the correct permissions, please contact a Bot Manager.`)
    }
	message.channel.send(`A flight at Serifos Intl. is now starting! Please join via this link or go to the group and find the game there. https://www.roblox.com/games/5615132802/Airport`);
 
 

}
  
});


client.login(process.env.BOT_TOKEN);
