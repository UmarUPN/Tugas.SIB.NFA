import users from './data.js';

// melihat data
const index = () => {
    const tbody = document.querySelector("#tableAnggota tbody");
    tbody.innerHTML = "";

    if (users.length == 0) {
        tbody.innerHTML = `
            <tr align="center">
                <td colspan="6">Belum ada anggota.</td>
            </tr>
        `;
        return;
    } else {
        document.getElementById("totalSemua").innerText = users.length;
    }

    users.map((user, i) => {
        const {nama, umur, alamat, email} = user;

        console.log(`   ${i + 1}. ${nama}, ${umur} tahun, ${alamat}, ${email}`);

        const row = `
            <tr align="center">
                <td>${i + 1}.</td>
                <td align="left">${nama}</td>
                <td>${umur} tahun</td>
                <td>${alamat}</td>
                <td>${email}</td>
                <td>
                    <span title="Edit anggota ke-${i + 1}" class="icon-link icon-link-hover me-4" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                        <i class="bi bi-pencil-square text-warning icon-hover" onclick="formToEdit(${i})"></i>
                    </span>
                    <span title="Hapus anggota ke-${i + 1}" class="icon-link icon-link-hover" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);">
                        <i class="bi bi-trash3 text-danger icon-hover" onclick="hapusAnggota(${i})"></i>
                    </span>
                </td>
            </tr>
        `;

        // tbody.innerHTML += row;
        tbody.insertAdjacentHTML("beforeend", row);
    });
};

// menambah data
const store = (user) => {
    users.push(user);
};

// menghapus data
const destroy = () => {
    users.pop();
};

// menghapus data (custom)
const customDestroy = (index) => {
    if (users[index]) {
        users.splice(index, 1);
        alert("Anggota ke-" + (index + 1) + " berhasil dihapus.")
    } else {
        alert("Anggota ke-" + (index + 1) + " tidak ditemukan.")
    }
};

// mengedit data
const update = (index, user) => {
    if (users[index]) {
        users[index] = user;
        // users[index] = {...users[index], ...user} // edit dengan spread operator
    } else {
        alert("Gagal mengedit, anggota ke-" + (index + 1) + " tidak ditemukan.")
    }
};

export { index, store, destroy, update, customDestroy };