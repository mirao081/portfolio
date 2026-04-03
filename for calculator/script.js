const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      display.value = "";
    } else if (button.classList.contains("equal")) {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += button.getAttribute("data-value");
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  if ((/[0-9+\-*/.]/).test(event.key)) {
    display.value += event.key;
  } else if (event.key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (event.key === "Escape") {
    display.value = "";
  } else if (event.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});
