/**
 * Interactive In-Browser Git CLI Terminal Simulator for GitHub Quest
 */

(function(exports) {

  class GitTerminalEngine {
    constructor() {
      this.resetState();
    }

    resetState() {
      this.workingDirectory = ["chapter1.md", "character_sheets.json"];
      this.stagedFiles = [];
      this.branches = ["main"];
      this.currentBranch = "main";
      this.commitHistory = [
        { hash: "7a2f10b", branch: "main", msg: "Initial story manuscript commit", date: new Date().toLocaleString() }
      ];
    }

    executeCommand(cmdStr) {
      const raw = cmdStr.trim();
      if (!raw) return "";

      const parts = raw.split(/\s+/);
      const mainCmd = parts[0].toLowerCase();

      if (mainCmd === "clear") {
        return { clear: true };
      }

      if (mainCmd === "help") {
        return `
📌 Available Git Terminal Commands:
- git status                     : Check working tree and staged files
- git add <file>                 : Stage a file for commit (or git add .)
- git commit -m "your message"   : Create a commit snapshot with a message
- git branch                     : List all branches in the manuscript repository
- git checkout -b <branch_name>  : Create and switch to a new branch
- git log --graph                : View visual commit timeline graph
- clear                          : Clear terminal output screen
        `;
      }

      if (mainCmd !== "git") {
        return `bash: command not found: ${mainCmd}. Type 'help' to see valid git commands.`;
      }

      const gitSub = (parts[1] || "").toLowerCase();

      if (gitSub === "status") {
        let output = `On branch ${this.currentBranch}\n`;
        if (this.stagedFiles.length === 0 && this.workingDirectory.length === 0) {
          output += "nothing to commit, working tree clean";
        } else {
          if (this.stagedFiles.length > 0) {
            output += "Changes to be committed:\n  (use \"git restore --staged <file>...\" to unstage)\n";
            this.stagedFiles.forEach(f => output += `\t\x1b[32mmodified:   ${f}\x1b[0m\n`);
          }
          if (this.workingDirectory.length > 0) {
            output += "Untracked / Modified files in workspace:\n  (use \"git add <file>...\" to include in what will be committed)\n";
            this.workingDirectory.forEach(f => output += `\t\x1b[31mmodified:   ${f}\x1b[0m\n`);
          }
        }
        return output;
      }

      if (gitSub === "add") {
        const target = parts[2];
        if (!target) return "error: missing file argument. Usage: git add <filename> or git add .";
        
        if (target === ".") {
          this.stagedFiles = [...this.stagedFiles, ...this.workingDirectory];
          this.workingDirectory = [];
          return `Staged all ${this.stagedFiles.length} files for commit.`;
        }

        const idx = this.workingDirectory.indexOf(target);
        if (idx !== -1) {
          this.workingDirectory.splice(idx, 1);
          this.stagedFiles.push(target);
          return `Staged file '${target}' successfully.`;
        }
        return `fatal: pathspec '${target}' did not match any files.`;
      }

      if (gitSub === "commit") {
        const msgIdx = raw.indexOf("-m");
        if (msgIdx === -1) {
          return "error: missing commit message. Usage: git commit -m \"your message here\"";
        }
        const msg = raw.substring(msgIdx + 2).replace(/['"]/g, '').trim();
        if (!msg) return "error: commit message cannot be empty.";

        if (this.stagedFiles.length === 0) {
          return "no changes added to commit (use \"git add\" first).";
        }

        const hash = Math.random().toString(16).substring(2, 9);
        const commit = {
          hash: hash,
          branch: this.currentBranch,
          msg: msg,
          files: [...this.stagedFiles],
          date: new Date().toLocaleTimeString()
        };

        this.commitHistory.unshift(commit);
        this.stagedFiles = [];
        this.workingDirectory = ["chapter2_draft.md"]; // Generate new draft file for continued play

        if (exports.SuitePassport) {
          exports.SuitePassport.addXP(20, 'kids_github');
          exports.SuitePassport.saveJournalEntry({
            appId: "kids_github",
            appName: "GitHub Quest",
            title: `Git Commit [${hash}]: ${msg}`,
            category: "Git Manuscript Commit",
            content: `Commit Hash: ${hash}\nBranch: ${this.currentBranch}\nMessage: ${msg}`,
            tags: ["git", "github", "commit"]
          });
        }

        return `[${this.currentBranch} ${hash}] ${msg}\n ${commit.files.length} file(s) changed, +42 insertions(+)`;
      }

      if (gitSub === "branch") {
        let output = "";
        this.branches.forEach(b => {
          if (b === this.currentBranch) {
            output += `* \x1b[32m${b}\x1b[0m\n`;
          } else {
            output += `  ${b}\n`;
          }
        });
        return output;
      }

      if (gitSub === "checkout") {
        const isNew = parts[2] === "-b";
        const branchName = isNew ? parts[3] : parts[2];

        if (!branchName) return "error: missing branch name. Usage: git checkout -b <branch_name>";

        if (isNew) {
          if (this.branches.includes(branchName)) {
            return `fatal: A branch named '${branchName}' already exists.`;
          }
          this.branches.push(branchName);
          this.currentBranch = branchName;
          return `Switched to a new branch '${branchName}'`;
        } else {
          if (this.branches.includes(branchName)) {
            this.currentBranch = branchName;
            return `Switched to branch '${branchName}'`;
          }
          return `error: pathspec '${branchName}' did not match any branch.`;
        }
      }

      if (gitSub === "log") {
        let output = "Git Commit Timeline Graph:\n\n";
        this.commitHistory.forEach((c, i) => {
          output += `*  \x1b[33mcommit ${c.hash}\x1b[0m (\x1b[36m${c.branch}\x1b[0m)\n`;
          output += `|  Date: ${c.date}\n`;
          output += `|  Message: ${c.msg}\n|\n`;
        });
        return output;
      }

      return `git: '${gitSub}' is not a recognized git command. Type 'help' for options.`;
    }
  }

  exports.GitTerminalEngine = GitTerminalEngine;

})(typeof window !== 'undefined' ? window : global);
