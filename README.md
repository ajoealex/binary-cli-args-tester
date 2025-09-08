# ArgWriter

binary-cli-args-tester is a minimal Node.js → Windows EXE utility that captures **any
command-line arguments** passed to it and writes them into a timestamped
file in the user's home folder.

## 🎯 Purpose

-   Debugging: Confirm what arguments are actually being passed to a
    process.
-   Logging: Persist CLI invocations for auditing or testing.
-   Portability: One self-contained EXE, no Node.js runtime required.

## ⚙️ How It Works

1.  Run `binary-cli-args-tester` with any arguments.
2.  The program extracts all arguments **after the executable path**
    (`process.argv.slice(2)`).
3.  It writes them line-by-line, exactly as received, to a file named:

```{=html}
<!-- -->
```
    %USERPROFILE%\argdump_<unix_timestamp>.txt

## 📄 Example

``` powershell
.\binary-cli-args-tester --test 500 --mode=demo
```

Produces a file in your home directory, e.g.\
`C:\Users\<you>\argdump_1725798123.txt` with contents:

    --test
    500
    --mode=demo

## 🚀 Build Instructions

1.  Install dependencies:

    ``` powershell
    npm init -y
    npm i -g pkg
    ```

2.  Add the `app.js` and `package.json` files from this repo.

3.  Compile into a standalone Windows EXE:

    ``` powershell
    pkg . --targets node18-win-x64 --output binary-cli-args-tester.exe
    ```

## 🔍 Notes

-   Works with any arbitrary args (`--flag`, `--flag value`,
    `key=value`, positional args, etc.).
-   Output file names are unique per run due to the Unix timestamp.
-   Uses `%USERPROFILE%` as the home folder. On Linux/macOS builds it
    would resolve to `$HOME`.

## 📦 Use Cases

-   Validate CLI args passed by automation frameworks or scheduled
    tasks.
-   Capture invocation patterns in testing scenarios.
-   Quick drop-in logger during troubleshooting where argument handling
    is suspect.
