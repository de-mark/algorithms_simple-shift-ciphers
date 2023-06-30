const pEntry = document.getElementById("usr-p");

const onlyNumberEntry = () =>  {
    pEntry.value = pEntry.value.replace(/\D/g, "");
}

pEntry.addEventListener("change", onlyNumberEntry);