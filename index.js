const fs = require('fs');
const axios = require('axios');
const markdownIt = require('markdown-it');
const yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 -f [inputFile] -o [outputFile] -u [url]')
  .help('h')
  .alias('h', 'help')
  .options({
    f: {
      alias: 'file',
      describe: 'Path to the local input Markdown file',
      type: 'string',
    },
    o: {
      alias: 'output',
      describe: 'Path to the output Markdown file (optional)',
      type: 'string',
    },
    u: {
      alias: 'url',
      describe: 'URL of the input Markdown file',
      type: 'string',
    },
  })
  .conflicts('f', 'u')
  .argv;

// Function to generate summary from markdown content
function generateSummaryFromContent(content, outputFile) {
    let summary = "# Content Summary\n\n";
    const lines = content.split('\n');

    lines.forEach((line) => {
      if (line.startsWith('#')) {
        const level = (line.match(/#/g) || []).length;
        const title = line.replace(/#/g, '').trim();
        const indent = ' '.repeat((level - 1) * 2);
        const sanitizedTitle = title.toLowerCase().replace(/[^\w]+/g, '-');
        summary += `${indent}- [${title}](#${sanitizedTitle})\n`;
      }
    });

    if (outputFile) {
      fs.writeFile(outputFile, summary, (err) => {
        if (err) {
          console.error(`Error writing the summary file: ${err.message}`);
          return;
        }
        console.log(`Summary has been generated and saved to ${outputFile}`);
      });
    } else {
      console.log(summary);
    }
}

// Function to process local file
function processLocalFile(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, content) => {
    if (err) {
      console.error(`Error reading the file: ${err.message}`);
      return;
    }
    generateSummaryFromContent(content, outputFile);
  });
}

// Function to download and process file from URL
async function processUrl(url, outputFile) {
  try {
    const response = await axios.get(url);
    console.log("Downloaded content:", response.data.substring(0, 100)); // print the 1st 100 strings
    generateSummaryFromContent(response.data, outputFile);
  } catch (error) {
    console.error(`Error downloading the file: ${error.message}`);
  }
}

// Main function
function main() {
  if (argv.file) {
    processLocalFile(argv.file, argv.output);
  } else if (argv.url) {
    processUrl(argv.url, argv.output);
  } else {
    console.error('Please specify a local file path or a URL.');
    process.exit(1);
  }
}

main();
