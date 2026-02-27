const userName = () => {
  prompt("Hello stranger from the world, what's your name");

  if (userName == null) {
    alert("You don't have a name? Please give me a way to call you");
    userName = prompt("Hello stranger from the world, what's your name");
  } else return userName;
};

return userName;
