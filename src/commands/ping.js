import { SlashCommandBuilder } from '@discordjs/builders';

const pingCommand = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('pong') 

export default pingCommand.toJSON();
