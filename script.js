function stt(){
    if(localStorage.getItem("statusUjian") === "aktif"){
        alert("Jawaban anda sudah dikirim");
        let durasi = 0 * 60 * 1000;
        let waktuSelesai = Date.now() + durasi;
        localStorage.setItem("waktuSelesai", waktuSelesai);
        window.location.href = "soal.html";
    }
}

window.addEventListener("load", stt);
window.addEventListener("pageshow", stt);

function kembali(){
    document.getElementById("nim_sama").style.display = "none";
}

async function mulaiUjian(){
    localStorage.clear();
    localStorage.setItem("statusUjian", "aktif");

    let nama = document.getElementById("nama").value.trim();
    let nim = document.getElementById("nim").value.trim();

    if(nama==""){
        alert("Nama belum diisi");
        return;
    }

    if(nim==""){
        alert("NIM belum diisi");
        return;
    }

    document.getElementById("loading_mulai").style.display = "flex";

    // Cek apakah NIM sudah pernah ujian pada MK yang sama
    let hasil = await periksa(nama, nim);

    document.getElementById("loading_mulai").style.display = "none";

    if(hasil.trim() == "SUDAH"){
        //alert("Anda sudah pernah mengikuti ujian mata kuliah ini.");
        document.getElementById("nim_sama").style.display = "flex";
        return;
    }

    // Simpan ke localStorage jika belum pernah ujian
    localStorage.setItem("nama", nama);
    localStorage.setItem("nim", nim);
    let durasi = 60 * 60 * 1000;
    let waktuSelesai = Date.now() + durasi;
    localStorage.setItem("waktuSelesai", waktuSelesai);

    window.location.href = "soal.html";
}

async function periksa(nama, nim){

    let data = {
        nama: nama,
        nim: nim,
    };

    let response = await fetch("https://script.google.com/macros/s/AKfycbzCiEH0y_kC3oHbsE-c9FjqGcBlmfGAH1GFhomANZiU3k6ET-LzcGA6B6iqOVU4C2A83A/exec",{
        method: "POST",
        body: JSON.stringify(data)
    });

    let hasil = await response.text();

    return hasil;

}