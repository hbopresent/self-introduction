function Keyboard() {
  this.keyTable = {
    Escape: "key0",
    Backspace: "key26",
    Tab: "key27",
    CapsLock: "key41",
    Enter: "key53",
    NumpadEnter: "key103",
    ShiftLeft: "key54",
    ShiftRight: "key65",
    ControlLeft: "key66",
    ControlRight: "key73",
    AltLeft: "key68",
    AltRight: "key70",
    MetaLeft: "key67",
    MetaRight: "key71",
    ContextMenu: "key72",
    Insert: "key74",
    Home: "key75",
    PageUp: "key76",
    Delete: "key77",
    End: "key78",
    PageDown: "key79",
    ArrowUp: "key80",
    ArrowLeft: "key81",
    ArrowDown: "key82",
    ArrowRight: "key83",
    NumLock: "key87",
    Digit1: "key14",
    Digit2: "key15",
    Digit3: "key16",
    Digit4: "key17",
    Digit5: "key18",
    Digit6: "key19",
    Digit7: "key20",
    Digit8: "key21",
    Digit9: "key22",
    Digit0: "key23",
    Numpad1: "key97",
    Numpad2: "key98",
    Numpad3: "key99",
    Numpad4: "key94",
    Numpad5: "key95",
    Numpad6: "key96",
    Numpad7: "key91",
    Numpad8: "key92",
    Numpad9: "key93",
    Numpad0: "key100",
    F1: "key1",
    F2: "key2",
    F3: "key3",
    F4: "key4",
    F5: "key5",
    F6: "key6",
    F7: "key7",
    F8: "key8",
    F9: "key9",
    F10: "key10",
    F11: "key11",
    F12: "key12",
    KeyA: "key42",
    KeyB: "key59",
    KeyC: "key57",
    KeyD: "key44",
    KeyE: "key30",
    KeyF: "key45",
    KeyG: "key46",
    KeyH: "key47",
    KeyI: "key35",
    KeyJ: "key48",
    KeyK: "key49",
    KeyL: "key50",
    KeyM: "key61",
    KeyN: "key60",
    KeyO: "key36",
    KeyP: "key37",
    KeyQ: "key28",
    KeyR: "key31",
    KeyS: "key43",
    KeyT: "key32",
    KeyU: "key34",
    KeyV: "key58",
    KeyW: "key29",
    KeyX: "key56",
    KeyY: "key33",
    KeyZ: "key55",
    Backquote: "key13",
    Minus: "key24",
    NumpadSubtract: "key90",
    Equal: "key25",
    BracketLeft: "key38",
    BracketRight: "key39",
    Backslash: "key40",
    Semicolon: "key51",
    Quote: "key52",
    Comma: "key62",
    Period: "key63",
    NumpadDecimal: "key101",
    Slash: "key64",
    NumpadDivide: "key88",
    NumpadMultiply: "key89",
    Pause: "key86",
    ScrollLock: "key85",
    Space: "key69",
    NumpadAdd: "key102"
  };

  this.numLockLight = document.getElementById("NumLock");
  this.capsLockLight = document.getElementById("CapsLock");
  this.scrollLockLight = document.getElementById("ScrollLock");
  this.messageBox = document.getElementById("messageBox");
  this.notePaper = document.getElementById("notePaper");
  this.notePaperLineArray = [];
  this.index = 0;
}
Keyboard.prototype = {
  init: function() {
    for(var i = 0 ; i < 9 ; i++) {
      logitech.notePaperLineArray[i] = document.getElementById("paperLineRow" + i);
    }

    window.addEventListener("keydown", this.lightenKey.bind(this));
    window.addEventListener("keyup", this.darkenKey.bind(this));
  },
  lightenKey: function(e) {
    var property = e.code;
    document.getElementById(logitech.keyTable[property]).classList.add("lightenKey");
    // detect NumLock/CapsLock/ScrollLock key
    if(property == "NumLock" || property == "CapsLock" || property == "ScrollLock") {
      logitech.switchLED(property);
    }

    if(property == "Enter") {
      if(document.getElementById("messageBoxInput").value == "PRINT") {
        document.getElementById("messageBoxInput").style.visibility = "hidden";
        logitech.notePaper.style.animation = "printNotePaper1 6s 1s steps(1) forwards, printNotePaper2 1.5s 6.1s linear forwards";
      }
      else {
        // store value of messageBox
        logitech.storeMessageBoxValue();
        // show messageBox animation
        logitech.jumpToNewLine();
      }
    }
  },
  darkenKey: function(e) {
    var property = e.code;
    document.getElementById(logitech.keyTable[property]).classList.remove("lightenKey");
  },
  switchLED: function(ledID) {
    if(document.getElementById(ledID).classList.contains("turnOn")) {
      document.getElementById(ledID).classList.remove("turnOn");
    }
    else {
      document.getElementById(ledID).classList.add("turnOn");
    }
  },
  jumpToNewLine: function() {
    document.getElementById("messageBoxInput").style.animation = "slideoutmessageBoxInput 1s ease-out forwards";
    document.getElementById("messageBoxInput").blur();
    setTimeout(function() {
      logitech.messageBox.removeChild(logitech.messageBox.firstElementChild);
      logitech.createNewmessageBoxInput();
    }, 1100);
  },
  createNewmessageBoxInput: function() {
    var messageBoxInput = document.createElement("input");
    messageBoxInput.setAttribute("type", "text");
    messageBoxInput.setAttribute("id", "messageBoxInput");
    messageBoxInput.classList.add("messageBox__input");
    logitech.messageBox.appendChild(messageBoxInput);
    messageBoxInput.focus();
  },
  storeMessageBoxValue: function() {
    logitech.notePaperLineArray[logitech.index].innerHTML = document.getElementById("messageBoxInput").value;
    logitech.index++;
  }
};

var logitech = new Keyboard();
logitech.init();
