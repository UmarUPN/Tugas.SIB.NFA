import { index, store, destroy, update, customDestroy } from "./controller.js";
import users from "./data.js";

// function sesuai tugas
const main = () => {
    console.log('\n==================================');
    console.log('Data awal sebelum penambahan:');
    index();
    console.log('==================================\n');

    // tambahkan minimal 2 data
    store({ nama: 'Tambah data 1', umur: 25, alamat: 'Jl. Data 1', email: 'data1@email.com' });
    store({ nama: 'Tambah data 2', umur: 26, alamat: 'Jl. Data 2', email: 'data2@email.com' });

    console.log('\n==================================');
    console.log('Data setelah penambahan:');
    index();
    console.log('==================================\n');

    destroy();

    console.log('\n==================================');
    console.log('\nData setelah penghapusan terakhir (destroy):');
    index();
    console.log('==================================\n');
};

main();

document.addEventListener("DOMContentLoaded", () => {
    index();
    formToAdd();
});

// form
function actionButton1() {
    if (document.getElementById("formButton1").textContent === "Tambah anggota") {
        tambahanggota(); // tambah anggota
        formToAdd()

        const checkboxReset = document.getElementById("checkResetForm");

        if (checkboxReset.checked) {
            resetForm();
        }
    } else {
        editanggota(); // konfirmasi edit
    }
} window.actionButton1 = actionButton1;

function actionButton2() {
    if (document.getElementById("formButton2").textContent === "Kosongkan form") {
        resetForm(); // kosongkan form
    } else {
        formToAdd(); // batalkan edit
        resetForm();
    }
} window.actionButton2 = actionButton2;

let indeksEdit = 0;

function formToEdit(indeks) {
    indeksEdit = indeks;

    document.getElementById("formTitle").textContent = "Edit anggota";
    document.getElementById("subForm").textContent = "Edit anggota ke: " + (indeksEdit + 1);
    document.getElementById("checkResetForm").disabled = true;
    document.getElementById("checkResetForm").checked = true;
    document.getElementById("formButton1").textContent = "Konfirmasi edit";
    document.getElementById("formButton2").textContent = "Batalkan edit";

    const {nama, umur, alamat, email} = users[indeks];
    document.getElementById("inputNama").value = nama;
    document.getElementById("inputUmur").value = umur;
    document.getElementById("inputAlamat").value = alamat;
    document.getElementById("inputEmail").value = email;

    
} window.formToEdit = formToEdit;

function formToAdd() {
    document.getElementById("formTitle").textContent = "Tambahkan anggota";
    document.getElementById("subForm").textContent = "No. anggota selanjutnya: " + (users.length + 1);
    document.getElementById("checkResetForm").disabled = false;
    document.getElementById("formButton1").textContent = "Tambah anggota";
    document.getElementById("formButton2").textContent = "Kosongkan form";
}

function resetForm() {
    // ["inputNama", "inputUmur", "inputAlamat", "inputEmail"].forEach(id => {
    //     document.getElementById(id).value = "";
    // });

    document.querySelectorAll("#formAnggota input").forEach(input => {
        input.value = "";
    });
}

// CRUD
function getInputValues() { // untuk destructuring nantinya
  return {
    nama: document.getElementById("inputNama").value.trim(),
    umur: parseInt(document.getElementById("inputUmur").value.trim()),
    alamat: document.getElementById("inputAlamat").value.trim(),
    email: document.getElementById("inputEmail").value.trim()
  };
}

function tambahanggota() {
    const {nama, umur, alamat, email} = getInputValues(); // object destructuring input values supaya kode lebih singkat

    if (!validasiInput(getInputValues())) return;
    
    store({nama, umur, alamat, email});
    index();
}

function editanggota() {
    const {nama, umur, alamat, email} = getInputValues(); 

    if (users[indeksEdit]) {
        if (!validasiInput(getInputValues())) return;

        update(indeksEdit, {nama, umur, alamat, email})
        index();
        resetForm();
        formToAdd();
    } else {
        alert("Error bro! Anggota ke-" + (indeksEdit + 1) + " tidak ditemukan! udah dihapus mungkin.");
    }
}

function hapusAnggota(indeks) {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ke-" + (indeks + 1) + "?")) {
        customDestroy(indeks);
        index();
        formToAdd();
        resetForm();
    }
} window.hapusAnggota = hapusAnggota;

function validasiInput({nama, umur, alamat, email}) {
    if (!nama || !alamat || !email || isNaN(umur) || umur <= 0) {
        alert("Silakan isi semua field dengan bsdsdsenar!");
        return false;
    }

    return true;
}

