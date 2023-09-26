const editBtns = document.querySelectorAll('.edit-btn')
const editForms = document.querySelectorAll('.edit-form')
editBtns.forEach((btn, idx) => {
  btn.addEventListener('click', function () {
    editForms[idx].style.display = editForms[idx].style.display === "flex" ? "none" : "flex"
  })
})

console.log(editBtns);
console.log(editForms);;

