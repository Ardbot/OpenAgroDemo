// Works with 1 line in the browser
class Local_DB {

  constructor(key_LS) {
    this.key_LS = key_LS
  }

  setKeyLS(newName) {
    this.key_LS = newName;
    console.log(this.key_LS)
  }

  // Reading
  read() {
    var LS = JSON.parse(localStorage.getItem(this.key_LS));
    // log(LS)
    return LS
  }
  // Memory write
  write(data) {
    localStorage.setItem(this.key_LS, JSON.stringify(data));
  }
  // Add a note
  add_record() {
    log("В разработке")
  }
  // Clear entry
  clear_record() {
    localStorage.setItem(this.key_LS, '{}');
  }
}

function setData() {
  key = keyInput.value
  if (key == "") {
    alert("key: пусто!");
  }
  else {
    db.setKeyLS(key);
  }

  val = valInput.value
  if (val == "") {
    alert("val: пусто!")
  }
  else {
    db.write(val);
  }

  alert(db.read())
}

document.querySelectorAll('.writeLSbtn').forEach(el => el.addEventListener('click', () => { setData() }));
