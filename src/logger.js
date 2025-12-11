const chalk = require('chalk');

// Helper to get formatted timestamp
const getTimestamp = () => {
    return new Date().toLocaleTimeString('es-ES', { hour12: false });
};

const logger = {
    // Large Header for starting sections
    header: (text) => {
        console.log('\n' + chalk.bgBlue.bold.white(` ${text} `) + ' ' + chalk.gray(new Date().toLocaleString()));
        console.log(chalk.blue('═'.repeat(50)));
    },

    // Success messages
    success: (text) => {
        console.log(`${chalk.gray(`[${getTimestamp()}]`)} ${chalk.green.bold('✔ SUCCESS:')} ${chalk.green(text)}`);
    },

    // Info messages
    info: (text) => {
        console.log(`${chalk.gray(`[${getTimestamp()}]`)} ${chalk.cyan('ℹ INFO:')} ${chalk.white(text)}`);
    },

    // Warning messages
    warn: (text) => {
        console.log(`${chalk.gray(`[${getTimestamp()}]`)} ${chalk.yellow.bold('⚠ WARNING:')} ${chalk.yellow(text)}`);
    },

    // Error messages
    error: (text, err = null) => {
        console.log(`${chalk.gray(`[${getTimestamp()}]`)} ${chalk.red.bold('✖ ERROR:')} ${chalk.red(text)}`);
        if (err) {
            console.log(chalk.red(err.stack || err.message || err));
        }
    },

    // Waiting/Status messages
    waiting: (text) => {
        console.log(`${chalk.gray(`[${getTimestamp()}]`)} ${chalk.magenta('⏳ WAITING:')} ${chalk.magenta(text)}`);
    },

    // Boxed message for special notifications
    box: (text) => {
        const lines = text.split('\n');
        const maxLength = Math.max(...lines.map(l => l.length));
        const border = '═'.repeat(maxLength + 4);

        console.log(chalk.hex('#FFA500')(`
╔${border}╗
${lines.map(line => `║  ${line.padEnd(maxLength)}  ║`).join('\n')}
╚${border}╝
`));
    }
};

module.exports = logger;
