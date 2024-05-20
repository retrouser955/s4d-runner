#!/usr/bin/env node

import { program } from "commander";
import fs from "node:fs"
import fsAsync from "node:fs/promises"
import process from "node:process"
import chalk from "chalk";
import ora from "ora"
import { WebSocketServer } from "ws";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from "node:path";
import spawn from "cross-spawn"

const __dirname = dirname(fileURLToPath(import.meta.url));

const [LEFT, RIGHT] = [chalk.blue("["), chalk.blue("]")]

function debug(message) {
    console.log(`${LEFT}DEBUG${RIGHT} | ${chalk.grey(message)}`)
}

function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
}

await fsAsync.rm(join(__dirname, "..", "bot"), {
    recursive: true,
    force: true
})

await fsAsync.mkdir(join(__dirname, "..", "bot"))

const packageData = JSON.parse(fs.readFileSync(join(__dirname, "..", "package.json")).toString())

let proc

program
    .version(packageData.version)
    .description(packageData.description)
    .option("-p --port <number>", "Add the port number")
    .option("-d --dev <boolean>", "Start in development mode?")
    .action(options => {
        const { dev = false, port = 5730 } = options

        let isConnected = false

        const spinner = ora("Spinning up web sockets on port " + port).start()

        const wss = new WebSocketServer({ port })

        spinner.text = "Awaiting connection. Please click connect on the website."

        wss.on("connection", (ws) => {
            spinner.succeed("A client has connected")

            if (isConnected) {
                if (dev) debug("A second client attempted to connect. The connection was terminated")
                return ws.terminate()
            }

            isConnected = true

            ws.on("message", async (msg) => {
                if (msg.toString() === "ping!") {
                    return ws.send("pong!")
                }

                if (msg.toString() === "stop") {
                    if (proc) return proc.kill('SIGINT')
                }

                const jsonStruct = JSON.parse(msg.toString())

                const { env, index, json } = jsonStruct

                fs.writeFileSync(join(__dirname, "..", "bot", "index.js"), index)
                fs.writeFileSync(join(__dirname, '..', "bot", ".env"), env)
                fs.writeFileSync(join(__dirname, "..", "bot", "package.json"), json)

                const botDir = join(__dirname, '..', "bot")

                const installSpinner = ora("Installing packages").start()

                await new Promise((resolve, reject) => {
                    const install = spawn('npm', ['install'], {
                        cwd: botDir
                    })

                    install.stdout.on("data", (d) => {
                        installSpinner.text = "Installing packages: " + d.toString()
                    })

                    install.on("exit", (code) => {
                        if (code === 0) {
                            resolve()
                        } else {
                            reject()
                        }
                    })
                })

                installSpinner.succeed("Finished installing packages. Started node process!")

                const startProcess = spawn("node", ['index.js'], {
                    cwd: botDir
                })

                debug(`Process running on ${startProcess.pid}`)

                startProcess.on("exit", (code) => {
                    if (code !== 0) {
                        throw new Error("Bot crashed!")
                    }
                })

                startProcess.stdout.on("data", (d) => {
                    ws.send(d.toString())
                })

                proc = startProcess
            })

            if (dev) debug(`A Client has connected`)
        })
    })
    .parse(process.argv)

function emitExit(signal) {
    const exitCode = 0;
    if (proc) proc.kill('SIGINT')
    console.log(`Received "${signal}" signal. Will terminate with exit code "${exitCode}".`);
    process.exit(exitCode);
}

// Catches Ctrl + C events
process.on('SIGINT', () => emitExit('SIGINT'));

// Catches "kill pid" events (for example: nodemon restarts)
process.on('SIGUSR1', () => emitExit('SIGUSR1'));
process.on('SIGUSR2', () => emitExit('SIGUSR2'));

// Catches unhandled errors
process.on('uncaughtException', error => {
    console.log('Unhandled error.', error);
    if (proc) proc.kill('SIGINT')
    process.exit(1);
});

// Catches unhandled Promise rejections
process.on('unhandledRejection', error => {
    console.log('Unhandled Promise rejection.', error);
    if (proc) proc.kill('SIGINT')
    process.exit(1);
});

// `process.exit` callback
process.on('exit', (code) => {
    if (proc) proc.kill('SIGINT')
    console.log(`App exits with code "${code}". Synchronous cleanup can be done here.`);
});