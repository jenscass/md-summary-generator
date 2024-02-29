# md-summary-generator

`md-summary-generator` is a command-line tool designed to automatically extract titles from a Markdown file and generate a content summary. This tool is especially useful for quickly creating documentation navigation or understanding the structure of lengthy Markdown documents.

## Features

- Generates content summaries from local Markdown files.
- Downloads and generates content summaries from Markdown files specified by a URL.
- Supports outputting the generated summary to a specified file or standard output.

## Installation

First, clone this repository to your local machine:

git clone https://your-repository-url/md-summary-generator.git
cd md-summary-generator

Then, install the necessary dependencies:

npm install

## Usage

### Generating a Content Summary from a Local Markdown File

node index.js -f /path/to/your/markdown.md -o /path/to/output/summary.md

### Generating a Content Summary from a Markdown File URL

node index.js -u https://yourmarkdownfileurl.com/path/to/markdown.md -o /path/to/output/summary.md

If you do not specify the `-o` option, the summary will be output to the console.

### Command-Line Options

- `-f, --file`: Specifies the path to the local Markdown file.
- `-u, --url`: Specifies the URL of the Markdown file.
- `-o, --output`: Specifies the path to the output Markdown file for the summary (if omitted, output will be printed to standard output).

## Contributing

Contributions are welcome in all forms, whether it's new features, code reviews, documentation improvements, or bug reports. Please feel free to contribute by opening an issue or submitting a pull request.

