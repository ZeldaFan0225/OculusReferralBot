import { ApplicationCommand, ApplicationCommandData } from "discord.js";
import { OculusReferralClient } from "./client";
import { CommandContext } from "./commandContext";

export class Command{
    name: string
    staffOnly: boolean
    command: ApplicationCommandData
    client?: OculusReferralClient
    description?: string
    constructor(command: ApplicationCommandData){
        this.name = ""
        this.staffOnly = false
        this.command = command
        this.client = undefined,
        this.description
    }

    async run(_ctx: CommandContext): Promise<any> {

    }
}