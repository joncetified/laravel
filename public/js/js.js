/* =========================================
   GLOBAL HELPER & VARIABLES
   ========================================= */

// --- VARIABEL MODAL ---
let modal, modalForm, modalTitle, methodContainer;
let inputBookId, inputJumlah, inputTanggal; // Data Masuk
let bookModal, bookForm, bookTitle, bookMethod; // Data Buku
let inpB_Judul, inpB_Penulis, inpB_Penerbit, inpB_Tahun, inpB_Stok, inpB_Kategori; // Input Buku
let loanModal, loanForm, loanTitle, loanMethod; // Peminjaman
let inpL_Book, inpL_User, inpL_Pinjam, inpL_Kembali, inpL_Status; // Input Peminjaman
let userModal, userForm, userTitle, userMethod; // User
let inpU_Name, inpU_Email, inpU_Password, inpU_Level, passHint; // Input User

// --- VARIABEL LAPORAN & PAGINATION ---
let currentPage = 1;
const rowsPerPage = 5; // JUMLAH BARIS PER HALAMAN (Ganti angka ini sesuka hati)
let filteredRows = []; // Penampung data hasil filter

// Fungsi Tampilkan Pesan
function showModal(message, isSuccess = false) {
    const popupModal = document.getElementById("popupModal");
    const modalText = document.getElementById("modalText");
    if (popupModal && modalText) {
        modalText.innerText = message;
        popupModal.style.display = "flex";
        
        // Auto close after 3 seconds for success messages
        if (isSuccess) {
            setTimeout(() => {
                popupModal.style.display = "none";
            }, 3000);
        }
    }
}

// Helper function to safely get element
function getElement(id) {
    return document.getElementById(id);
}

// Helper function to safely set value
function setValue(element, value) {
    if (element) {
        element.value = value || "";
    }
}

/* =========================================
   1. LOGIC MODAL DATA MASUK (CRUD)
   ========================================= */
function initModalElements() {
    if (!modal) {
        modal = getElement('dataModal');
        modalForm = getElement('modalForm');
        modalTitle = getElement('modalTitle');
        methodContainer = getElement('methodInputContainer');
        inputBookId = getElement('inputBookId');
        inputJumlah = getElement('inputJumlah');
        inputTanggal = getElement('inputTanggal');
    }
}

window.openAddModal = function() {
    initModalElements();
    if (!modal) return;
    
    if (modalForm) {
        modalForm.reset();
        modalForm.action = "/datamasuk/store";
    }
    if (modalTitle) modalTitle.innerText = "Tambah Data Masuk";
    if (methodContainer) methodContainer.innerHTML = "";
    
    modal.style.display = 'flex';
}

window.openEditModal = function(button) {
    initModalElements();
    if (!modal) return;
    
    const id = button.getAttribute('data-id');
    
    setValue(inputBookId, button.getAttribute('data-book_id'));
    setValue(inputJumlah, button.getAttribute('data-jumlah'));
    setValue(inputTanggal, button.getAttribute('data-tanggal'));
    
    if (modalForm) modalForm.action = "/datamasuk/update/" + id;
    if (modalTitle) modalTitle.innerText = "Edit Data Masuk";
    if (methodContainer) methodContainer.innerHTML = '<input type="hidden" name="_method" value="PUT">';
    
    modal.style.display = 'flex';
}

window.closeModal = function() {
    initModalElements();
    if (modal) modal.style.display = 'none';
}

/* =========================================
   2. LOGIC MODAL DATA BUKU
   ========================================= */
function initBookElements() {
    if (!bookModal) {
        bookModal = getElement('bookModal');
        bookForm = getElement('bookModalForm');
        bookTitle = getElement('bookModalTitle');
        bookMethod = getElement('bookMethodContainer');
        inpB_Judul = getElement('bookJudul');
        inpB_Penulis = getElement('bookPenulis');
        inpB_Penerbit = getElement('bookPenerbit');
        inpB_Tahun = getElement('bookTahun');
        inpB_Stok = getElement('bookStok');
        inpB_Kategori = getElement('bookKategori');
    }
}

window.openAddBookModal = function() {
    initBookElements();
    if (!bookModal) return;
    
    if (bookForm) {
        bookForm.reset();
        bookForm.action = "/databuku/store";
    }
    if (bookTitle) bookTitle.innerText = "Tambah Buku Baru";
    if (bookMethod) bookMethod.innerHTML = "";
    
    bookModal.style.display = 'flex';
}

window.openEditBookModal = function(button) {
    initBookElements();
    if (!bookModal) return;
    
    const id = button.getAttribute('data-id');
    
    setValue(inpB_Judul, button.getAttribute('data-judul'));
    setValue(inpB_Penulis, button.getAttribute('data-penulis'));
    setValue(inpB_Penerbit, button.getAttribute('data-penerbit'));
    setValue(inpB_Tahun, button.getAttribute('data-tahun'));
    setValue(inpB_Stok, button.getAttribute('data-stok'));
    setValue(inpB_Kategori, button.getAttribute('data-kategori_id'));

    if (bookForm) bookForm.action = "/databuku/update/" + id;
    if (bookTitle) bookTitle.innerText = "Edit Data Buku";
    if (bookMethod) bookMethod.innerHTML = "";
    
    bookModal.style.display = 'flex';
}

window.closeBookModal = function() {
    initBookElements();
    if (bookModal) bookModal.style.display = 'none';
}

/* =========================================
   3. LOGIC MODAL DATA PEMINJAMAN
   ========================================= */
function initLoanElements() {
    if (!loanModal) {
        loanModal = getElement('loanModal');
        loanForm = getElement('loanModalForm');
        loanTitle = getElement('loanModalTitle');
        loanMethod = getElement('loanMethodContainer');
        inpL_Book = getElement('loanBookId');
        inpL_User = getElement('loanUserId');
        inpL_Pinjam = getElement('loanTglPinjam');
        inpL_Kembali = getElement('loanTglKembali');
        inpL_Status = getElement('loanStatus');
    }
}

window.openAddLoanModal = function() {
    initLoanElements();
    if (!loanModal) return;
    
    if (loanForm) {
        loanForm.reset();
        loanForm.action = "/peminjaman/store";
    }
    if (loanTitle) loanTitle.innerText = "Tambah Peminjaman";
    if (loanMethod) loanMethod.innerHTML = "";
    
    loanModal.style.display = 'flex';
}

window.openEditLoanModal = function(button) {
    initLoanElements();
    if (!loanModal) return;
    
    const id = button.getAttribute('data-id');
    
    setValue(inpL_Book, button.getAttribute('data-book_id'));
    setValue(inpL_User, button.getAttribute('data-user_id'));
    setValue(inpL_Pinjam, button.getAttribute('data-tanggal_pinjam'));
    setValue(inpL_Kembali, button.getAttribute('data-tanggal_kembali'));
    setValue(inpL_Status, button.getAttribute('data-status'));

    if (loanForm) loanForm.action = "/peminjaman/update/" + id;
    if (loanTitle) loanTitle.innerText = "Edit Peminjaman";
    if (loanMethod) loanMethod.innerHTML = '<input type="hidden" name="_method" value="PUT">';
    
    loanModal.style.display = 'flex';
}

window.closeLoanModal = function() {
    initLoanElements();
    if (loanModal) loanModal.style.display = 'none';
}

/* =========================================
   4. LOGIC MODAL DATA USER
   ========================================= */
function initUserElements() {
    if (!userModal) {
        userModal = getElement('userModal');
        userForm = getElement('userModalForm');
        userTitle = getElement('userModalTitle');
        userMethod = getElement('userMethodContainer');
        inpU_Name = getElement('userName');
        inpU_Email = getElement('userEmail');
        inpU_Password = getElement('userPassword');
        inpU_Level = getElement('userLevel');
        passHint = getElement('passwordHint');
    }
}

window.openAddUserModal = function() {
    initUserElements();
    if (!userModal) return;
    
    if (userForm) {
        userForm.reset();
        userForm.action = "/datauser/store";
    }
    if (userTitle) userTitle.innerText = "Tambah User Baru";
    if (userMethod) userMethod.innerHTML = "";
    if (inpU_Password) inpU_Password.required = true;
    if (passHint) passHint.style.display = 'none';
    
    userModal.style.display = 'flex';
}

window.openEditUserModal = function(button) {
    initUserElements();
    if (!userModal) return;
    
    const id = button.getAttribute('data-id');
    
    setValue(inpU_Name, button.getAttribute('data-name'));
    setValue(inpU_Email, button.getAttribute('data-email'));
    setValue(inpU_Level, button.getAttribute('data-level_id'));
    
    if (inpU_Password) {
        inpU_Password.value = "";
        inpU_Password.required = false;
    }
    if (passHint) passHint.style.display = 'block';
    if (userForm) userForm.action = "/datauser/update/" + id;
    if (userTitle) userTitle.innerText = "Edit Data User";
    if (userMethod) userMethod.innerHTML = "";
    
    userModal.style.display = 'flex';
}

window.closeUserModal = function() {
    initUserElements();
    if (userModal) userModal.style.display = 'none';
}

/* =========================================
   5. LOGIC FILTER, PRINT, EXCEL & PAGINATION (THE KING'S REQUEST) 
   ========================================= */

// Fungsi untuk menyiapkan Pagination di HTML
function setupPaginationHTML() {
    const table = getElement('tableLaporan');
    if (!table) return;

    // Cek apakah pagination container sudah ada, kalau belum buat baru
    let pagContainer = getElement('paginationContainer');
    if (!pagContainer) {
        pagContainer = document.createElement('div');
        pagContainer.id = 'paginationContainer';
        pagContainer.style.cssText = "display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 20px;";
        
        // Insert setelah tabel
        if (table.parentElement) {
            table.parentElement.appendChild(pagContainer);
        }
    }
    
    // Simpan semua baris tabel ke variabel global saat pertama kali load
    const tbody = table.getElementsByTagName('tbody')[0];
    if (tbody) {
        const rows = tbody.getElementsByTagName('tr');
        // Ubah HTMLCollection jadi Array biar enak diolah
        filteredRows = Array.from(rows);
    }
}

function renderTablePartition() {
    const table = getElement('tableLaporan');
    if (!table) return;
    
    const tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) return;
    
    const allRows = Array.from(tbody.getElementsByTagName('tr'));
    
    // Hide all rows first
    allRows.forEach(row => row.style.display = 'none');

    // Calculate which rows to show
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rowsToShow = filteredRows.slice(startIndex, endIndex);
    
    // Show only the rows for current page
    rowsToShow.forEach(row => {
        row.style.display = '';
    });

    renderPaginationControls();
}

function renderPaginationControls() {
    const pagContainer = getElement('paginationContainer');
    if (!pagContainer) return;

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    
    // Jangan tampilkan pagination kalau data kosong atau cuma 1 halaman
    if (totalPages <= 1) {
        pagContainer.innerHTML = '';
        return;
    }

    let html = '';
    
    // Tombol Previous
    if (currentPage > 1) {
        html += `<button onclick="changePage(${currentPage - 1})" class="btn-custom" style="padding: 5px 10px; background: #374151; color: white; border: none; border-radius: 4px; cursor: pointer;">&laquo; Prev</button>`;
    }

    // Info Halaman
    html += `<span style="color: white; font-size: 0.9rem;">Page ${currentPage} of ${totalPages}</span>`;

    // Tombol Next
    if (currentPage < totalPages) {
        html += `<button onclick="changePage(${currentPage + 1})" class="btn-custom" style="padding: 5px 10px; background: #374151; color: white; border: none; border-radius: 4px; cursor: pointer;">Next &raquo;</button>`;
    }

    pagContainer.innerHTML = html;
}

// Fungsi Ganti Halaman (Dipanggil tombol Next/Prev)
window.changePage = function(page) {
    currentPage = page;
    renderTablePartition();
    
    // Scroll to table for better UX
    const table = getElement('tableLaporan');
    if (table) {
        table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Fungsi Filter Utama (Tanggal) + Update Link Export
window.filterTableByDate = function() {
    const filterFrom = getElement('filterFrom');
    const filterTo = getElement('filterTo');
    const table = getElement('tableLaporan');
    
    if (!table) return;
    
    const fromDateVal = filterFrom ? filterFrom.value : '';
    const toDateVal = filterTo ? filterTo.value : '';

    const tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) return;
    
    const allRows = Array.from(tbody.getElementsByTagName('tr')); // Ambil semua baris asli

    // Update URL Export Buttons
    updateExportLinks(fromDateVal, toDateVal);

    // Filter Logic
    // Kita reset array filteredRows dengan data yang cocok saja
    filteredRows = allRows.filter(row => {
        const dateCell = row.getElementsByClassName('tgl-pinjam')[0];
        if (!dateCell) return false; // Kalau header atau footer

        const rowDateStr = dateCell.textContent.trim();
        let showRow = true;

        if (fromDateVal && rowDateStr < fromDateVal) showRow = false;
        if (toDateVal && rowDateStr > toDateVal) showRow = false;

        return showRow;
    });

    // Reset ke halaman 1 setiap kali filter berubah
    currentPage = 1;
    
    // Tampilkan pesan kosong jika tidak ada data
    const noDataMsg = getElement('noDataMessage');
    const pagContainer = getElement('paginationContainer');
    
    if (filteredRows.length === 0) {
        if (noDataMsg) noDataMsg.style.display = "block";
        table.style.display = "none";
        if (pagContainer) pagContainer.innerHTML = '';
    } else {
        if (noDataMsg) noDataMsg.style.display = "none";
        table.style.display = "table";
        renderTablePartition(); // Panggil fungsi pagination
    }
}

window.resetFilter = function() {
    const filterFrom = getElement('filterFrom');
    const filterTo = getElement('filterTo');
    const table = getElement('tableLaporan');
    const noDataMsg = getElement('noDataMessage');
    
    if (filterFrom) filterFrom.value = "";
    if (filterTo) filterTo.value = "";
    
    // Reset filteredRows ke semua baris lagi
    if (table) {
        const tbody = table.getElementsByTagName('tbody')[0];
        if (tbody) {
            filteredRows = Array.from(tbody.getElementsByTagName('tr'));
        }
        
        if (noDataMsg) noDataMsg.style.display = "none";
        table.style.display = "table";
        
        currentPage = 1;
        renderTablePartition();
        updateExportLinks("", "");
    }
}

function updateExportLinks(from, to) {
    const btnPrint = getElement('btnPrint');
    const btnPdf = getElement('btnPdf');
    const btnExcel = getElement('btnExcel');
    const queryParams = `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

    if (btnPrint) btnPrint.href = "/laporanpeminjaman/print" + queryParams;
    if (btnPdf) btnPdf.href = "/laporanpeminjaman/pdf" + queryParams;
    if (btnExcel) btnExcel.href = "/laporanpeminjaman/excel" + queryParams;
}


/* =========================================
   6. EVENT LISTENERS (ON LOAD)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Init Semua Modal
    initModalElements();
    initBookElements();
    initLoanElements();
    initUserElements();

    // SETUP PAGINATION PERTAMA KALI
    setupPaginationHTML();
    renderTablePartition(); // Tampilkan halaman 1

    // Global Close Modal (click outside)
    window.onclick = function(event) {
        if (modal && event.target === modal) modal.style.display = 'none';
        if (bookModal && event.target === bookModal) bookModal.style.display = 'none';
        if (loanModal && event.target === loanModal) loanModal.style.display = 'none';
        if (userModal && event.target === userModal) userModal.style.display = 'none';
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (modal && modal.style.display === 'flex') modal.style.display = 'none';
            if (bookModal && bookModal.style.display === 'flex') bookModal.style.display = 'none';
            if (loanModal && loanModal.style.display === 'flex') loanModal.style.display = 'none';
            if (userModal && userModal.style.display === 'flex') userModal.style.display = 'none';
        }
    });

    // Logic Login
    const loginBtn = getElement('loginBtn');
    const emailInput = getElement('email');
    const passwordInput = getElement('password');
    const loginForm = getElement('login-form');
    const popupModal = getElement("popupModal");
    const closeModalBtn = getElement("closeModal");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault(); 
            const email = emailInput ? emailInput.value.trim() : "";
            const pass = passwordInput ? passwordInput.value.trim() : "";
            
            if (!email || !pass) {
                showModal("Email sama Password Jangan kosong");
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showModal("Format email tidak valid!");
                return;
            }
            
            if (loginForm) loginForm.submit();
        });
    }

    if (closeModalBtn && popupModal) {
        closeModalBtn.addEventListener("click", () => {
            popupModal.style.display = "none";
        });
    }

    // Logic Navbar Mobile
    const menuToggleBtn = getElement('menu-toggle-btn');
    const navMobile = getElement('nav-mobile');
    
    if (menuToggleBtn && navMobile) {
        menuToggleBtn.addEventListener('click', () => {
            const isHidden = navMobile.style.display === 'none' || navMobile.style.display === '';
            navMobile.style.display = isHidden ? 'block' : 'none';
        });
    }

    // Logic Konfirmasi Hapus
    const deleteButtons = document.querySelectorAll('.btn-delete');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                if (confirm("Yakin mau hapus data ini secara permanen?")) {
                    window.location.href = href;
                }
            });
        });
    }

    // Filter on Enter key press
    const filterFrom = getElement('filterFrom');
    const filterTo = getElement('filterTo');
    
    if (filterFrom) {
        filterFrom.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.filterTableByDate();
            }
        });
    }
    
    if (filterTo) {
        filterTo.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.filterTableByDate();
            }
        });
    }
});