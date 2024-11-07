// Data Awal
let huruf = ["a", "b", "c", "d", "e"];

// Data yang akan di hapus
let hurufDiHapus = "c";

// pencarian index
let hurufindex = huruf.findIndex((huruf) => huruf === hurufDiHapus);
console.log('huruf index : ',hurufindex);

// penghapusan berdasarkan index
huruf.splice(hurufindex, -1);
console.log('data huruf setelah di hapus berdasarkan index :', huruf)