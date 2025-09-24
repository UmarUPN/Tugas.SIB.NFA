import Pelanggan from "./Pelanggan.js";

export default class SistemManajemenPenyewaan {
    constructor() {
        this.daftarPelanggan = [];
    }

    createPelanggan(dataBaru) {
        this.daftarPelanggan.push(dataBaru)
        this.daftarPelanggan.forEach((pelanggan, index) => {
                console.log(`${index + 1}. ${pelanggan.getDetailPelanggan()}`);
            });
    }

    readPelanggan() {
        const tbody = document.querySelector("#tablePelanggan tbody");
        tbody.innerHTML = "";

        if (this.daftarPelanggan.length == 0) {
            tbody.innerHTML = `
                <tr align="center">
                    <td colspan="5">Belum ada pelanggan.</td>
                </tr>
            `;
            return;
        }

        let totalDisewa = 0;

        this.daftarPelanggan.forEach((pelanggan, i) => {
            const detailPelanggan = pelanggan.getDetailPelanggan();

            const nama = detailPelanggan.nama;
            const nomorTelepon = detailPelanggan.nomorTelepon;
            const kendaraanDisewa = detailPelanggan.kendaraanDisewa ? detailPelanggan.kendaraanDisewa : "-";
            
            let aksiSewa = "";

            if (detailPelanggan.kendaraanDisewa) {
                aksiSewa = `
                <span id="selesaiSewa" title="Selesaikan sewa pelanggan ke-${i + 1}" class="icon-link icon-link-hover me-4" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                    <i class="bi bi-check-lg text-success icon-hover" onclick="setSelesai(${i})"></i>
                </span>
                `;
            } else {
                aksiSewa = `
                <span id="beriSewa" title="Berikan sewa pelanggan ke-${i + 1}" class="icon-link icon-link-hover me-4" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                    <i class="bi bi-car-front text-primary icon-hover" onclick="berikanSewa(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </span>
                `;
            }

                    // karena properti class Pelanggan pakai # maka tidak bisa langsung dipanggil begini:
                    // <td align="left">${pelanggan.nama}</td>
                    // <td>${toString(pelanggan.nomorTelepon)}</td>
                    // <td>${pelanggan.kendaraanDisewa}</td>
            const row = `
                <tr align="center">
                    <td>${i + 1}.</td>
                    <td align="left">${nama}</td>
                    <td>${nomorTelepon}</td>
                    <td>${kendaraanDisewa}</td>
                    <td>
                        ${aksiSewa}
                        <span title="Edit pelanggan ke-${i + 1}" class="icon-link icon-link-hover me-4" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                            <i class="bi bi-pencil-square text-warning icon-hover" onclick="formToEdit(${i})"></i>
                        </span>
                        <span title="Hapus pelanggan ke-${i + 1}" class="icon-link icon-link-hover" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                            <i class="bi bi-trash3 text-danger icon-hover" onclick="hapusPelanggan(${i})"></i>
                        </span>
                    </td>
                </tr>
            `;

            tbody.innerHTML += row;

            if (detailPelanggan.kendaraanDisewa) {
                totalDisewa++;
            }

            document.getElementById("totalSemua").innerText = totalDisewa;
        })

    }

    updatePelanggan(index, dataBaru) {
        if (this.daftarPelanggan[index]) {
            this.daftarPelanggan[index].setDetailPelanggan(dataBaru);
        } else {
            alert("Pelanggan ke-" + (index + 1) + " tidak ditemukan.")
        }
    }

    // sewa, kembalikan
    setSewa(index, kendaraan) {
        if (kendaraan) {
            this.daftarPelanggan[index].sewaKendaraan(kendaraan);
            this.readPelanggan();
        } else {
            if (confirm("Apakah Anda yakin ingin kembalikan sewa pelanggan ke-" + (index + 1) + "?")) {
                this.daftarPelanggan[index].kembalikanKendaraan();
                this.readPelanggan();
            }
        }
    }

    deletePelanggan(index) {
        if (this.daftarPelanggan[index]) {
            this.daftarPelanggan.splice(index, 1);
            alert("Pelanggan ke-" + (index + 1) + " berhasil dihapus.")
        } else {
            alert("Pelanggan ke-" + (index + 1) + " tidak ditemukan.")
        }
    }
}