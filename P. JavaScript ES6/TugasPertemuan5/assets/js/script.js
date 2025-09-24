let produkList = [
    {id: 1, nama: "Mouse Gaming RGB", harga: 250000, stok: 15},
    {id: 2, nama: "Keyboard Mekanik Tactile", harga: 550000, stok: 10},
    {id: 3, nama: "Headset Gaming Surround", harga: 480000, stok: 8},
    {id: 4, nama: "Monitor 144Hz 24 Inch", harga: 1800000, stok: 5},
    {id: 5, nama: "Kursi Gaming Ergonomis", harga: 2200000, stok: 3},
    {id: 6, nama: "Mousepad XL Anti-Slip", harga: 120000, stok: 20},
    {id: 7, nama: "Webcam Full HD", harga: 400000, stok: 6},
    {id: 8, nama: "Microphone Condenser USB", harga: 750000, stok: 4},
    {id: 9, nama: "Cooling Pad Laptop Gaming", harga: 300000, stok: 7},
    {id: 10, nama: "Controller Wireless", harga: 650000, stok: 9},
    {id: 11, nama: "PC Rakitan Gaming i5", harga: 8500000, stok: 2},
    {id: 12, nama: "SSD NVMe 1TB", harga: 1300000, stok: 5},
    {id: 13, nama: "RAM DDR4 16GB", harga: 900000, stok: 6},
    {id: 14, nama: "GPU RTX 3060 12GB", harga: 5200000, stok: 3},
    {id: 15, nama: "Power Supply 650W Modular", harga: 1100000, stok: 4},
    {id: 16, nama: "Casing Gaming RGB", harga: 950000, stok: 5},
    {id: 17, nama: "Laptop Gaming Ryzen 7", harga: 12500000, stok: 2},
    {id: 18, nama: "Speaker Bluetooth Gaming", harga: 600000, stok: 7},
    {id: 19, nama: "USB Hub 7 Port", harga: 180000, stok: 10},
    {id: 20, nama: "Stand Headset RGB", harga: 220000, stok: 12}
];

// event listener dom content loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Event Listener: DOM Content Loaded triggered");
    formToAdd();
    tampilkanProduk();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Event Listener: Menampilkan data produk di console");
    setTimeout(() => {
        tampilkanProdukDiConsole();
    }, 1000);
});

let IDBaru = produkList.length + 1;

// event handler object
const eventHandler = {
    tambah: (event) => {
        console.log("Event Listener: Tombol Tambah diklik");
        event.preventDefault();
        tambahProduk();
    },
    edit: (event) => {
        console.log("Event Listener: Tombol Edit diklik");
        event.preventDefault();
        editProduk();
    },
    reset: (event) => {
        console.log("Event Listener: Tombol Reset diklik");
        event.preventDefault();
        resetForm();
    },
    batalEdit: (event) => {
        console.log("Event Listener: Tombol Batal Edit diklik");
        event.preventDefault();
        formToAdd();
        resetForm();
    }
};

// menambahkan produk dengan spread operator
function tambahProduk() {
    console.log("Spread Operator: Menambah produk baru");
    
    const nama = document.getElementById("inputNama").value;
    const harga = parseFloat(document.getElementById("inputHarga").value);
    const stok = parseInt(document.getElementById("inputStok").value);

    if (!nama || isNaN(harga) || isNaN(stok) || harga <= 0 || stok < 0) {
        alert("Silakan isi semua field dengan benar!");
        return;
    }

    const produkBaru = { id: IDBaru, nama, harga, stok };
    console.log("Produk baru sebelum Spread Operator:", produkBaru);
    
    // spread operator untuk menambah produk ke array
    produkList = [...produkList, produkBaru];
    console.log("Spread Operator: Produk berhasil ditambahkan");
    console.log("Jumlah produk sekarang:", produkList.length);

    tampilkanProduk();
    IDBaru++;

    if (document.getElementById("checkResetForm").checked) {
        resetForm();
    }

    formToAdd();
}

// menghapus produk dengan rest parameter
function hapusProduk(...ids) { // rest parameter
    console.log("Rest Parameter: Menghapus produk dengan IDs:", ids);
    
    ids.forEach(id => {
        if (confirm(`Apakah Anda yakin ingin menghapus produk ID: ${id}?`)) {
            produkList = produkList.filter(produk => produk.id !== id);
            console.log(`Rest Parameter: Produk ID ${id} berhasil dihapus`);
        }
    });
    tampilkanProduk();
}

// menampilkan produk dengan destructuring
function tampilkanProduk() {
    console.log("Destructuring: Menampilkan produk");
    
    document.getElementById("dataProduk").innerHTML = "";
    let totalSeluruhStok = 0;

    produkList.forEach((produk) => {
        // destructuring object produk
        const { id, nama, harga, stok } = produk;
        console.log(`Destructuring: Produk ID ${id} - ${nama}, Harga: ${harga}, Stok: ${stok}`);
        
        totalSeluruhStok += stok;

        document.getElementById("dataProduk").innerHTML += `
            <tr align="center">
                <td>${id}</td>
                <td align="left">${nama}</td>
                <td>${formatUang(harga)}</td>
                <td>${stok} pcs</td>
                <td>
                    <span class="icon-link icon-link-hover me-4" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                        <i class="bi bi-pencil-square text-warning icon-hover" onclick="formToEdit(${id})" title="Edit produk ID ${id}"></i>
                    </span>
                    <span class="icon-link icon-link-hover" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                        <i class="bi bi-trash3 text-danger icon-hover" onclick="hapusProduk(${id})" title="Hapus produk ID ${id}"></i>
                    </span>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalSemua").textContent = totalSeluruhStok + " pcs";
    console.log("Destructuring: Semua produk berhasil ditampilkan");

    tampilkanProdukDiConsole();
}

let IDEdit = 0;

function editProduk() {
    console.log("Spread Operator: Mengedit produk");
    
    const id = IDEdit;
    const index = produkList.findIndex(produk => produk.id === id);

    if (index !== -1) {
        const nama = document.getElementById("inputNama").value;
        const harga = parseFloat(document.getElementById("inputHarga").value);
        const stok = parseInt(document.getElementById("inputStok").value);

        if (!nama || isNaN(harga) || isNaN(stok) || harga <= 0 || stok < 0) {
            alert("Silakan isi semua field dengan benar!");
            return;
        }

        console.log("Data sebelum edit:", produkList[index]);
        
        // spread operator untuk update data produk
        produkList[index] = { ...produkList[index], nama, harga, stok };
        console.log("Spread Operator: Produk berhasil diupdate");
        console.log("Data setelah edit:", produkList[index]);

        tampilkanProduk();
        resetForm();
        formToAdd();
    } else {
        alert("Error bro! ID " + id + " tidak ditemukan! udah dihapus mungkin.");
    }
}

// event listener untuk tombol
console.log("Event Listener: Mendaftarkan event listener untuk tombol");
document.getElementById("formButton1").addEventListener("click", function(event) {
    if (this.textContent === "Tambah produk") {
        eventHandler.tambah(event);
    } else {
        eventHandler.edit(event);
    }
});

document.getElementById("formButton2").addEventListener("click", function(event) {
    if (this.textContent === "Kosongkan form") {
        eventHandler.reset(event);
    } else {
        eventHandler.batalEdit(event);
    }
});

function formToEdit(id) {
    console.log("Destructuring: Membuka form edit");
    
    const produk = produkList.find(produk => produk.id === id);

    if (produk) {
        // destructuring object produk
        const { id, nama, harga, stok } = produk;
        console.log(`Destructuring: Data produk ID ${id} siap diedit`);
        
        IDEdit = id;
        document.getElementById("formTitle").textContent = "Edit produk";
        document.getElementById("subForm").textContent = `Edit produk ID: ${IDEdit}`;
        document.getElementById("checkResetForm").disabled = true;
        document.getElementById("checkResetForm").checked = true;
        document.getElementById("formButton1").textContent = "Konfirmasi edit";
        document.getElementById("formButton2").textContent = "Batalkan edit";

        document.getElementById("inputNama").value = nama;
        document.getElementById("inputHarga").value = harga;
        document.getElementById("inputStok").value = stok;
        
        console.log("Destructuring: Form edit berhasil diisi");
    } else {
        alert(`Error bro! ID ${id} tidak ditemukan!`);
    }
}

function formToAdd() {
    console.log("Event Listener: Mengubah form ke mode tambah");
    document.getElementById("formTitle").textContent = "Tambahkan produk";
    document.getElementById("subForm").textContent = `ID produk selanjutnya: ${IDBaru}`;
    document.getElementById("checkResetForm").disabled = false;
    document.getElementById("formButton1").textContent = "Tambah produk";
    document.getElementById("formButton2").textContent = "Kosongkan form";
}

function resetForm() {
    console.log("Event Listener: Reset form");
    document.getElementById("inputNama").value = "";
    document.getElementById("inputHarga").value = "";
    document.getElementById("inputStok").value = "";
}

function formatUang(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}


function tampilkanProdukDiConsole() {
    console.log("===== DAFTAR PRODUK =====");
    console.log("   Total Produk:", produkList.length);
    console.log("==========================================");
    
    // destructuring dalam loop untuk menampilkan di console
    produkList.forEach((produk, index) => {
        const { id, nama, harga, stok } = produk; // destructuring
        
        console.log(`   Produk #${index + 1}:`);
        console.log(`   ID    : ${id}`);
        console.log(`   Nama  : ${nama}`);
        console.log(`   Harga : ${formatUang(harga)}`);
        console.log(`   Stok  : ${stok} pcs`);
        console.log("   ---");
    });
    
    // menghitung total nilai inventory menggunakan reduce dan destructuring
    const totalNilaiInventory = produkList.reduce((total, produk) => {
        const { harga, stok } = produk; // destructuring
        return total + (harga * stok);
    }, 0);
    
    const totalStok = produkList.reduce((total, { stok }) => total + stok, 0); // destructuring dalam parameter
    
    console.log("===== SUMMARY =====");
    console.log(`   Total Stok Semua Produk: ${totalStok} pcs`);
    console.log(`   Total Nilai Inventory: ${formatUang(totalNilaiInventory)}`);
    console.log("==========================================\n");
}