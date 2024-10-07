import { Transpiler } from "@core/Transpiler"
import { Client } from "discord.js"

class DiscordClient extends Client {
    transpiler = new Transpiler()
}