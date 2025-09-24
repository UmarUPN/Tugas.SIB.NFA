export default class Pelanggan {
    #nama;
    #nomorTelepon;
    #kendaraanDisewa;

    constructor(nama, nomorTelepon) {
        this.#nama = nama;
        this.#nomorTelepon = nomorTelepon;
        this.#kendaraanDisewa = null;
    }

    sewaKendaraan(kendaraan) {
        if (!this.#kendaraanDisewa) {
            this.#kendaraanDisewa = kendaraan;
        } else {
            alert(this.#nama + "sudah menyewa kendaraan " + this.#kendaraanDisewa + ".")
        }
    }

    kembalikanKendaraan() {
        if (this.#kendaraanDisewa) {
            this.#kendaraanDisewa = null;
        } else {
            alert(this.#nama + "tidak menyewa kendaraan.")
        }
    }

    getDetailPelanggan() {
        return {
            nama: this.#nama,
            nomorTelepon: this.#nomorTelepon,
            kendaraanDisewa: this.#kendaraanDisewa
        };
    }

    setDetailPelanggan({ nama, nomorTelepon, kendaraanDisewa }) {
        if (nama) this.#nama = nama;
        if (nomorTelepon) this.#nomorTelepon = nomorTelepon;
        if (kendaraanDisewa) this.#kendaraanDisewa = kendaraanDisewa;
    }

}