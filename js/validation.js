
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".contact-form").forEach(form=>form.addEventListener("submit",e=>{
  e.preventDefault();let valid=true;
  form.querySelectorAll("[required]").forEach(input=>{const error=input.parentElement.querySelector(".error");if(!input.value.trim()||!input.checkValidity()){valid=false;if(error)error.textContent="⚠ INVALID INPUT — TRY AGAIN"}else if(error)error.textContent=""});
  const status=form.querySelector(".form-status");
  if(valid){status.className="form-status success";status.textContent="✓ MESSAGE SENT — THANK YOU, PLAYER!";form.reset()}else status.className="form-status";
 }));
});
