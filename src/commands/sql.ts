import { AttachmentBuilder, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { Command } from "../classes/command";
import { CommandContext } from "../classes/commandContext";


const command_data = new SlashCommandBuilder()
    .setName("sql")
    .setDMPermission(false)
    .setDescription(`Query the database`)
    .addStringOption(
        new SlashCommandStringOption()
        .setName("query")
        .setDescription("The query you want to query")
        .setRequired(true)
    )

Array.from({length: 24}, (_, i) => {
    command_data
    .addStringOption(
        new SlashCommandStringOption()
        .setName(`argument_${i+1}`)
        .setDescription("A $ parameter argument")
        .setRequired(false)
    )
})

let owner = ["134295609287901184", "102858961551634432", "683655307356143706"]

export default class extends Command {
    constructor() {
        super({
            name: "sql",
            command_data: command_data.toJSON(),
            staff_only: true,
        })
    }

    override async run(ctx: CommandContext): Promise<any> {
        if(!owner.includes(ctx.interaction.user.id)) return ctx.error({error: "You can't use this command"})
        let query = ctx.interaction.options.getString("query", true)
        const args = ctx.interaction.options.data.filter(c => c.name.includes("argument_")).map(o => o.value)
        let res = await ctx.database.query(query, args || []).catch(e => e)
        const text = JSON.stringify(res)
        if(text.length > 1900) {
            let file = new AttachmentBuilder(Buffer.from(text), {name: "result.json"})
            ctx.interaction.reply({files: [file], content: "Result attached below"})
        } else {
            ctx.interaction.reply({content: `\`\`\`json\n${text}\n\`\`\``})
        }
    }
}