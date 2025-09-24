import Pelanggan from "./Pelanggan.js";
import SistemManajemenPenyewaan from "./SistemManajemenPenyewaan.js";

const sistem = new SistemManajemenPenyewaan();

// CRUD
function tambahpelanggan() {
    const nama = document.getElementById("inputNama").value;
    const noTelp = document.getElementById("inputNoTelp").value;
    const kendaraan = document.getElementById("inputKendaraan").value;

    if (!nama || !noTelp || isNaN(noTelp)) {
        alert("Silakan isi field nama dan no. telp dengan benar!");
        return;
    } else {
        const pelangganBaru = new Pelanggan(nama, noTelp);
        pelangganBaru.sewaKendaraan(kendaraan);

        sistem.createPelanggan(pelangganBaru);

        sistem.readPelanggan();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    sistem.readPelanggan()
    formToAdd();
});

let indexEdit = 0;

function editpelanggan() {
    const nama = document.getElementById("inputNama").value;
    const noTelp = document.getElementById("inputNoTelp").value;
    const kendaraan = document.getElementById("inputKendaraan").value;

    if (document.getElementById("inputKendaraan").disabled) {
        if (!nama || !noTelp || isNaN(noTelp)) {
            alert("Silakan isi nama dan no. telp dengan benar!");
            return;
        } else {
            sistem.updatePelanggan(indexEdit, {nama: nama, nomorTelepon: noTelp, kendaraanDisewa: kendaraan});
            sistem.readPelanggan();
        }
    } else {
        if (!nama || !noTelp || isNaN(noTelp) || !kendaraan) {
            alert("Silakan isi semua field dengan benar! Jika ingin menyelesaikan penyewaan, silakan gunakan tombol selesai");
            return;
        } else {
            sistem.updatePelanggan(indexEdit, {nama: nama, nomorTelepon: noTelp, kendaraanDisewa: kendaraan});
            sistem.readPelanggan();
        }
    }
    formToAdd();
    resetForm();
}

function hapusPelanggan(index) {
    if (confirm("Apakah Anda yakin ingin menghapus pelanggan ke-" + (index + 1) + "?")) {
        sistem.deletePelanggan(index);
        sistem.readPelanggan();
        formToAdd();
    }
} window.hapusPelanggan = hapusPelanggan;

// sewa, kembalikan
function setSelesai(index) {
    sistem.setSewa(index, null);
} window.setSelesai = setSelesai;

const konfirmasiSewa = document.getElementById("konfirmasiSewa");
const inputKendaraanSewa = document.getElementById("inputKendaraanSewa");

inputKendaraanSewa.addEventListener("input", function() {
    konfirmasiSewa.disabled = inputKendaraanSewa.value.trim() === "";
});

let indexSewa = 0;
function berikanSewa(index) {
    indexSewa = index;

    document.getElementById("staticBackdropLabel").textContent = "Berikan sewa kendaraan ke pelanggan-" + (index + 1);
} window.berikanSewa = berikanSewa;

konfirmasiSewa.addEventListener("click", function() {
    const jenisKendaraan = inputKendaraanSewa.value;

    sistem.setSewa(indexSewa, jenisKendaraan);

    inputKendaraanSewa.value = "";
    konfirmasiSewa.disabled = true;
});

// form
function actionButton1() {
    console.log(document.getElementById("formButton1").textContent);
    if (document.getElementById("formButton1").textContent === "Tambah pelanggan") {
        tambahpelanggan(); // tambah pelanggan
        formToAdd()

        const checkboxReset = document.getElementById("checkResetForm");

        if (checkboxReset.checked) {
            resetForm();
        }
    } else {
        editpelanggan(); // konfirmasi edit
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

function formToEdit(index) {
    indexEdit = index;

    document.getElementById("formTitle").textContent = "Edit pelanggan";
    document.getElementById("subForm").textContent = "Edit pelanggan ke: " + (indexEdit + 1);
    document.getElementById("checkResetForm").disabled = true;
    document.getElementById("checkResetForm").checked = true;
    document.getElementById("formButton1").textContent = "Konfirmasi edit";
    document.getElementById("formButton2").textContent = "Batalkan edit";

    const detailPelanggan = sistem.daftarPelanggan[index].getDetailPelanggan();
    document.getElementById("inputNama").value = detailPelanggan.nama;
    document.getElementById("inputNoTelp").value = detailPelanggan.nomorTelepon;
    if (detailPelanggan.kendaraanDisewa) {
        document.getElementById("inputKendaraan").disabled = false;
        document.getElementById("inputKendaraan").value = detailPelanggan.kendaraanDisewa;
    } else {
        document.getElementById("inputKendaraan").disabled = true;
        document.getElementById("inputKendaraan").value = "";
    }
    
} window.formToEdit = formToEdit;

function formToAdd() {
    document.getElementById("formTitle").textContent = "Tambahkan pelanggan";
    document.getElementById("subForm").textContent = "No. pelanggan selanjutnya: " + (sistem.daftarPelanggan.length + 1);
    document.getElementById("checkResetForm").disabled = false;
    document.getElementById("formButton1").textContent = "Tambah pelanggan";
    document.getElementById("formButton2").textContent = "Kosongkan form";

    document.getElementById("inputKendaraan").disabled = false;
}

function resetForm() {
    document.getElementById("inputNama").value = "";
    document.getElementById("inputNoTelp").value = "";
    document.getElementById("inputKendaraan").value = "";
}