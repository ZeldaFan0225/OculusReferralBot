import { AutocompleteInteraction } from "discord.js";
import { AutocompleteContext } from "../classes/autocompleteContext";
import { DiscordBotClient } from "../classes/client";
import { Pool } from "pg";

export async function handleAutocomplete(interaction: AutocompleteInteraction, client: DiscordBotClient, database: Pool) {
    const command = await client.commands.getCommand(interaction).catch(() => null)
    if(!command) return;
    const context = new AutocompleteContext({interaction, client, database})
    if(!interaction.inGuild())
        return await context.error()
    if(!interaction.channel)
        return await context.error()
    if(command.staff_only && !(Array.isArray(interaction.member.roles) ? interaction.member.roles.some(r => client.config.staff_roles?.includes(r)) : interaction.member.roles.cache.some(r => client.config.staff_roles?.includes(r.id))))
        return await context.error()
    return await command.autocomplete(context).catch(console.error)
}