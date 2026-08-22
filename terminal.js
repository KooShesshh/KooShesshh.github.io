document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');

  createNewLine();

  terminal.addEventListener('click', () => {
    const activeCommand = terminal.querySelector('.terminal-line.active .command');
    if (activeCommand) {
      activeCommand.focus();
    }
  });

  terminal.addEventListener('keydown', (e) => {
    const activeLine = terminal.querySelector('.terminal-line.active');
    if (!activeLine) return;

    const commandElement = activeLine.querySelector('.command');

    if (e.key === 'Enter') {
      e.preventDefault();

      const commandText = commandElement.textContent.trim();

      activeLine.classList.remove('active');
      commandElement.contentEditable = false;

      const shouldCreateNewLine = processCommand(commandText);

       if (shouldCreateNewLine !== false) {
        createNewLine();
      }
    }
  });

  function processCommand(command) {
    if (command === '') return true;

    const args = command.trim().split(/\s+/);
    const cmd = args[0].toLowerCase();

    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands:
  help       - Show this help
  clear      - Clear the terminal
  date       - Show current date and time
  whoami     - Show current user
  echo       - Repeat the text
  fastfetch  - Show system info + ASCII
  exit       - Exit the terminal`;
        break;

      case 'clear':
        terminal.innerHTML = '';
        createNewLine();
        return false;

      case 'date':
        output = new Date().toLocaleString();
        break;

      case 'whoami':
        output = 'User';
        break;

      case 'exit':
        window.location.href = "index.html";
        return false;

      case 'fastfetch':
      case 'neofetch':
        output = `⣿⣿⣿⣿⣿⣿⠛⣙⣥⣭⣶⣬⣥⣭⣛⠿⢿⢸⡇⣿⣀⣿⣿⣿⣿⣿⡇
⣿⣿⣿⣿⠁ ⣸⣿⡿⠋⠙⢿⢿⣿⣿⣷⣆⠸⡇⣿⡇⣿⠵⠿⡿⣿⡇
⣿⣿⣟⣀⣀⡴⣣⠛   ⠨⡿⣿⣿⣿⣿⣷⣀⣅⣵⣾⢿⣻⣽⣶⠃
⣿⣿⣡⣿⡿⢁      ⢇⣿⣿⣿⣿⣿⣇⢻⠿⢗⣻⣽⣿⣿⠄
⣿⣿⢸⡿⠅       ⠘⢺⣿⡏⣿⣿⡿⢐⡀⣿⢻⣿⣿⣿ 
⣿⣇⢼⠋ ⢨       ⢠⡿⠇⢿⢿⢃⣿⡇⣿⣿⣿⣿⣿ 
⣿⢗⠈  ⠸⠃   ⢰⡧  ⠈ ⡀⠅⡄⣿⡇⣿⣿⣿⣿⣿ 
⣟⣾ ⣄       ⠁   ⡈⢀⣰⣿⣽⡇⣿⣿⣿⣿⣿ 
⣿⣿⡄⣿⣿⢴⣤⡄ ⣀⣀ ⢄⡀ ⣿⣿⣿⣿⣿⠣⣿⣿⣿⣿⣿ 
⣿⣿⣧⣻⢃⣛   ⠇⠠⠁ ⠈⡜⠟⣋⠅⣒⣒⡂⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⡎  ⠠⢀⠅ ⡐ ⣧⣭⢶⢫⡇⣿⡇⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⡇ ⠠⠂⠌⠄⢢  ⣿⣿⣿⢸⡇⣿⠇⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⡇ ⠁⢪ ⡏⠊  ⣿⣿⣿⢸⡇⣿ ⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⠁    ⠁   ⠻⢿⣿⢸⡇⣿ ⣿⣿⣿⣿⣿ `;
        break;

      default:
        if (cmd === 'echo') {
          output = command.slice(5);
        } else {
          output = `Command not found: ${command}`;
        }
    }

    if (output) {
      output.split('\n').forEach(line => appendOutput(line));
    }

    return true;
  }

  function appendOutput(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line output';
    line.innerHTML = `<span class="output-text">${text}</span>`;
    terminal.appendChild(line);
  }

  function createNewLine() {
    const line = document.createElement('div');
    line.className = 'terminal-line active';
    line.innerHTML = `
      <span class="terminal-prompt">
        <span class="prompt-user">[User</span>
        <span class="prompt-at">@</span>
        <span class="prompt-host">KooTerm</span>
        <span class="prompt-path"> ~]</span>
        <span class="prompt-symbol">$</span>
      </span>
      <span class="command" contenteditable="true" spellcheck="false"></span>
    `;
    terminal.appendChild(line);
    line.querySelector('.command').focus();
    terminal.scrollTop = terminal.scrollHeight;
  }
});
