#!/usr/bin/env node
var { argv } = require("yargs")
    .scriptName("node app.js")
    .usage("CLI Status Application")
    .example(
        "$0 -ram",
        "Returns the ram usage."
    )
    .option("arch", {
        // alias: "width",
        describe: "Show computer Architecture.",
        // demandOption: "The width is required.",
        // type: "number",
        // nargs: 1,
    })
    .option("cpu", {
        describe: "Shows cpu."
    })
    .option("ram", {
        describe: "Shows ram."
    })
    .option("hdd <drive>", {
        // argv:"diskkkk",
        // alias: "$0disk",
        describe: "Shows disk space.",
        demandOption: "The path of drive is required.",
        // type: "string",
        default: "c"
    })
    .option("hostname", {
        describe: "Shows hostname."
    })
    .option("ip", {
        describe: "Shows ip address."
    })
    .describe("help", "Show help.") // Override --help usage message.
    .describe("version", "Show version number.") // Override --version usage message.
    .epilog("copyright 2021 Kit So")
    .argv

const os = require('os')
const yargs = require('yargs');
const checkDiskSpace = require('check-disk-space').default
const disk = (drive) => {

    try {
        checkDiskSpace(`${drive}:/`).then((diskSpace) => {
            console.log(diskSpace)
        })
    } catch (err) {
        console.log(`${err} drive is invalid`)
    }

}
if (yargs.argv.arch === true) { console.log(os.arch()) }
if (yargs.argv.cpu === true) { console.log(os.cpus()[0].model) }
if (yargs.argv.ram === true) { console.log(`${Math.round(os.totalmem() / 1024 / 1024)} Mb`) }
if (yargs.argv.hdd) {
    const drive = yargs.argv.hdd
    // console.log(yargs.argv.hdd)
    disk(drive)

}
if (yargs.argv.hostname === true) { console.log(os.hostname()) }

const checkIp = () => {
    // console.log(os.networkInterfaces())
    const ipObject = os.networkInterfaces()
    for (const name of Object.keys(ipObject)) {
        if (name !== 'Wi-Fi') {
            for (const net of ipObject[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    console.log(net.address)
                }
            }
        }
    }
}

if (yargs.argv.ip === true) { checkIp() }



