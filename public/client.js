$( document ).ready(function() {
  
  const counter = document.getElementById('num-users');
  const messages = document.getElementById('messages');
  const form = document.getElementById('form');
  const input = document.getElementById('m');
  
    /* global io */
  var socket = io();
   
  socket.on('user', function(data) {
    console.log(data);
    const { name, currentUsers, connected } = data;
    let message = name;
    
    counter.innerText = currentUsers + (currentUsers == 1 ? ' user' : ' users') + ' online';
    
    if(connected) {
      message += ' has joined the chat.';
    } else {
      message += ' has left the chat.';
    }
    
    const li = document.createElement('li');
    li.innerHTML = '<b>' + message + '</b>';
    messages.append(li);
  });
  
  socket.on('chat message', function(data) {
    console.log('got a new message from server!!');
    const { name, message } = data;
    const li = document.createElement('li');
    li.innerText = name + ': ' + message;
    messages.append(li);
  });
  
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var messageToSend = input.value;
    console.log('send message to server');
    socket.emit('chat message', messageToSend);
    input.value = '';
  });
  
});
