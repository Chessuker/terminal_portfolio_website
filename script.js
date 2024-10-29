document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  let currentDirectory = "/home/user";
  initialPrint();

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const command = input.value.trim();
      handleCommand(command);
      input.style.width = 150 + "px";
      input.value = "";
    }
  });

  function handleCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];
    const param = args.slice(1).join(" ");
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: ls, pwd, cat, clear, help";
        printResponse(response, command);
        break;
      case "ls":
        response = "about.txt contact.txt skills.txt projects.txt education.txt";
        printResponse(response, command);
        break;
      case "pwd":
        response = currentDirectory;
        printResponse(response, command);
        break;
      case "cat":
        if (param) {
          loadFile(param, command);
        } else {
          response = "cat: missing file operand";
          printResponse(response, command);
        }
        return;
      case "clear":
        output.innerHTML = "";
        return;
      default:
        response = `${cmd}: command not found`;
        printResponse(response, command);
    }
  }

  function loadFile(fileName, command) {
    fetch(`./files/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`cat: ${fileName}: No such file`);
        }
        return response.text();
      })
      .then((text) => {
        printResponse(text, command);
      })
      .catch((error) => {
        printResponse(error.message, command);
      });
  }

  function printResponse(response, command) {
    output.innerHTML += `<p>(<span style="color: #458588; font-weight: 800;">user㉿terminal</span>)-[<span style="color: #b16286; font-weight: 800;">~</span>] $ ${command}</p><p>${response}</p>`;
    output.scrollTop = output.scrollHeight;
  }


  function initialPrint() {
    output.innerHTML += `<div style="white-space: pre;">
        |_|  _  | |  _     _. ._   _|         _  |  _  _  ._ _   _    _|_  _  
        | | (/_ | | (_)   (_| | | (_|   \\\/\\/ (/_ | (_ (_) | | | (/_    |_ (_) 
___________.__                           __    __________                                   __    
\\__    ___/|  |__ _____ __  _  _______ _/  |_  \\______   \\ ____   ____   ____   ________ __|  | __
  |    |   |  |  \\\\__  \\\\ \\\/ \\\/ /\\__  \\\\   __\\  |    |  _//  _ \\ /  _ \\ /    \\ /  ___/  |  \\  |/ /
  |    |   |   Y  \\\/ __ \\\\     /  / __ \\|  |    |    |   (  <_> |  <_> )   |  \\\\___ \\|  |  /    < 
  |____|   |___|  (____  /\\/\\_/  (____  /__|    |______  /\\____/ \\____/|___|  /____  >____/|__|_ \\
                \\\/     \\\/             \\\/               \\\/                   \\\/     \\\/           \\\/
                      ▄▄▄·      ▄▄▄  ▄▄▄▄▄·▄▄▄      ▄▄▌  ▪        
                      ▐█ ▄█▪     ▀▄ █·•██  ▐▄▄·▪     ██•  ██ ▪     
                      ██▀· ▄█▀▄ ▐▀▀▄  ▐█.▪██▪  ▄█▀▄ ██▪  ▐█· ▄█▀▄ 
                      ▐█▪·•▐█▌.▐▌▐█•█▌ ▐█▌·██▌.▐█▌.▐▌▐█▌▐▌▐█▌▐█▌.▐▌
                      .▀    ▀█▄▀▪.▀  ▀ ▀▀▀ ▀▀▀  ▀█▄▀▪.▀▀▀ ▀▀▀ ▀█▄▀▪
    </div>
    <div>*type 'help' to see available commands*</div>
    <span style="white-space = pre;"> </span>`;
    output.scrollTop = output.scrollHeight;
  }
});
