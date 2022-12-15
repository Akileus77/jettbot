import { config } from 'dotenv';
import {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { REST } from '@discordjs/rest'; 
import PingCommand from './commands/ping.js';

config();

const TOKEN = env.TOKEN;
const CLIENT_ID = env.CLIENT_ID
const GUILD_ID =  env.GUILD_ID

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log('Chat Command');
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
      await interaction.followUp('Pong again!');
    } 
 
});

async function main() {
  const commands = [ 
    PingCommand
  ];
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
