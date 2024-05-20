interface JSONTemplate {
    name:string;
    version:string;
    author:string;
    type:"commonjs"|"module"
    main:string;
    dependencies:Record<string, string>
}

const JSONTEMPLATE: JSONTemplate = {
    name: "scratch-for-discord-bot",
    version: "1.0.0",
    author: "scratch_for_discord_code_generation",
    type: "commonjs",
    main: "index.js",
    dependencies:{
        "discord.js": "13.6.0",
        "moment": "latest",
        "process": "^0.11.10",
        "easy-json-database": "^1.5.0",
        "dotenv": "16.4.5"
    }
}

export function generateJSONFile(code:string) {
    let packages: String[] = []

    if (code.includes("//ahq mod api")) {
        packages.push(`"discord-anti-spam":"git+https://github.com/ahqsoftwares/discord-anti-spam.git"`)
        packages.push('"discord-antiraid":"2"')
        packages.push('"gif-frames":"1.0.1"')
    }
    if (code.includes("const deepai = require('deepai')")) {
        packages.push(`"deepai":"1.0.21"`)
    }
    if (code.includes("const qdb = new QuickDB()")) {
        packages.push(`"quick.db":"9.0.2"`)
    }
    if (code.includes(`const { TicTacToe } = require("discord-gamecord")`)){
        packages.push(`"discord-gamecord":"^2.1.0"`)
    }
    if (code.includes("s4d.client.dashboard = new Dashboard")) {
        packages.push(`"discord-easy-dashboard":"^1.2.1"`)
    }
    if (code.includes("const QRCode = require('qrcode')")) {
        packages.push(`"qrcode":"1.5.0"`)
    }
    if (code.includes(`const discordModals = require('discord-modals');`)) {
        packages.push(`"discord-modals":"1.2.1"`)
    }
    if (code.includes("const ticket = require('tickets-discord');")) {
        packages.push(`"tickets-discord":"3.0.0"`)
    }
    if (code.includes("s4d.client.dashboard =")) {
        packages.push(`"discord-easy-dashboard":"git+https://github.com/ahqsoftwares/discord-easy-dashboard-2.git"`)
    }
    if (code.includes(".chat")) {
        packages.push(`"smartestchatbot":"2.0.1"`)
    }
    if (code.includes("const stream = discordTTS")) {
        packages.push(`"discord-tts":"1.2.1"`)
        packages.push(`"@discord.js/voice":"0.7.5"`)
    }
    if (code.includes(`const TempChannels = require("discord-temp-channels");`)) {
        packages.push(`"discord-temp-channels":"3.0.1"`)
        packages.push(`"quick.db":"7.1.3"`)
    }
    if (code.includes(`const { Calculator Snake Fight } = require('weky')`)) {
        packages.push(`"weky":"git+https://github.com/ahqsoftwares/weky-npm.git"`)
    }
    if (code.includes("censor")) {
        packages.push(`"discord-censor":"1.0.9"`)
    }
    if (code.includes("discord-player")) {
        packages.push(`"avconv":"3.1.0"`)
        packages.push(`"discord-player":"5.2.0"`)
        packages.push(`"play-dl":"^1.4.4"`)
        packages.push(`"ffmpeg-static":^5.0.0"`)
        packages.push(`"@discordjs/opus":"0.7.0"`)
    }
    if (code.includes("discord-music-player")) {
        packages.push(`"discord-music-player":"8.3.1"`)
        packages.push(`"ytdl-core":"^4.9.1"`)
        packages.push(`"ffmpeg-static":^5.0.0"`)
        packages.push(`"@discordjs/opus":"0.7.0"`)
    }
    if (code.includes("youtube-notification-module")) {
        packages.push(`"youtube-notification-module":"1.1.0"`)
    }
    if (code.includes("discord-backup")) {
        packages.push(`"discord-backup":"3.0.1"`)
    }
    if (code.includes("node-os-utils")) {
        packages.push(`"node-os-utils":"^1.3.5"`)
    }
    if (code.includes("discord-giveaways")) {
        packages.push(`"discord-giveaways":"5.0.1"`)
    }
    if (code.includes("ms")) {
        packages.push(`"ms":"^2.1.3"`)
    }
    if (code.includes("discord-logs")) {
        packages.push(`"discord-logs":"2.0.0"`)
    }
    if (code.includes("discord-badges")) {
        packages.push(`"discord-badges":"0.0.0"`)
    }
    if (code.includes("discord-together")) {
        packages.push(`"discord-together":"^1.3.3"`)
    }
    if (code.includes("anti-link-for-discord")) {
        packages.push(`"anti-link-for-discord":"5.0.0"`)
    }
    if (code.includes("discord-inviter-tracker")) {
        packages.push(`"discord-inviter-tracker":"1.0.3"`)
    }
    if (code.includes("moment")) {
        packages.push(`"moment":"2.29.1"`)
    }
    if (code.includes("mongquick")) {
        packages.push(`"mongquick":"git+https://github.com/ahqsoftwares/quickmongo.git"`)
    }
    if (code.includes("discord-image-generation")) {
        packages.push(`"discord-image-generation":"1.4.9"`)
    }
    if (code.includes("regex")) {
        packages.push(`"regex":"0.1.1"`)
    }
    if (code.includes("firebase")) {
        packages.push(`"firebase":"9.5.0"`)
    }
    if (code.includes("string-progressbar")) {
        packages.push(`"string-progressbar":"1.0.4"`)
    }
    if (code.includes("weirdToNormalChars")) {
        packages.push(`"weird-to-normal-chars":"1.8.1"`)
    }
    if (code.includes("captcha")) {
        packages.push(`"@haileybot/captcha-generator":"1.7.0"`)
    }
    if (code.includes("paginationEmbed")) {
        packages.push(`"discord-pagination-fixed":"1.0.0"`)
    }
    if (code.includes("AntiSpam")) {
        packages.push(`"discord-anti-spam":"2.6.1"`)
    }
    if (code.includes("easy-db-json")) {
        packages.push(`"easy-db-json":"1.1.1"`)
    }
    if (code.includes("lyricsFinder")) {
        packages.push(`"lyrics-finder":"^21.7.0"`)
    }
    if (code.includes("os")) {
        packages.push(`"os-utils":"0.0.14"`)
    }
    if (code.includes("synchronizeSlashCommands")) {
        packages.push(`"@frostzzone/discord-sync-commands":"0.3.0"`)
    }
    if (code.includes("S4D_APP_NOBLOX")) {
        packages.push(`"noblox.js":"^4.13.1"`)
    }
    if (code.includes("S4D_APP_write")) {
        packages.push(`"write":"^2.0.0"`)
    }
    if (code.includes("S4D_APP_DJS_VOICE")) {
        packages.push(`"@discordjs/voice":"0.10.0"`)
        packages.push('"ffmpeg-static":"^5.0.0"')
        packages.push('"node-opus":"0.3.3"')
        packages.push('"tweetnacl":"1.0.3"')
    }

    if(packages.length > 0) {
        packages.filter((pkgs, i) => packages.indexOf(pkgs) === i)

        packages[packages.length - 1] = packages[packages.length - 1].replace("", "")
    
        packages.forEach((val) => {
            const [name, version] = val.split(":").map(val => val.replace(/\"/g, ""))
    
            JSONTEMPLATE.dependencies[name] = version
        })
    }

    return JSON.stringify(JSONTEMPLATE, null, 4)
}