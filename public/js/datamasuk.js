// ======================================= //
// ========== MODAL ELEMENTS ============= //
// ======================================= //
const modal = document.getElementById('dataModal');
const modalForm = document.getElementById('modalForm');
const modalTitle = document.getElementById('modalTitle');
const methodContainer = document.getElementById('methodInputContainer');

// Input fields
const inputJudul = document.getElementById('inputJudul');
const inputJumlah = document.getElementById('inputJumlah');
const inputTanggal = document.getElementById('inputTanggal');

// ======================================= //
// ========== HELPER FUNCTIONS =========== //
// ======================================= //

// Safely get element value
function getValue(element) {
    return element ? element.value : '';
}

// Safely set element value
function setValue(element, value) {
    if (element) {
        element.value = value || '';
    }
}

// Check if modal elements exist
function validateModalElements() {
    return modal && modalForm && modalTitle && methodContainer;
}

// Add animation class
function addAnimation(element, animationClass) {
    if (element) {
        element.classList.remove('animate-scale-in', 'animate-fade-out');
        element.classList.add(animationClass);
    }
}

// Focus first input in form
function focusFirstInput() {
    const firstInput = modalForm ? modalForm.querySelector('input:not([type="hidden"]), textarea, select') : null;
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

// ======================================= //
// ========== MODAL FUNCTIONS ============ //
// ======================================= //

// 1. Fungsi Buka Modal TAMBAH
function openAddModal() {
    if (!validateModalElements()) {
        console.warn('Modal elements not found');
        return;
    }
    
    // Reset form agar kosong
    modalForm.reset();
    
    // Set Action URL ke route STORE (Sesuaikan dengan route Laravel kamu)
    modalForm.action = "/datamasuk/store";
    
    // Set Judul Modal
    modalTitle.innerText = "Tambah Data Masuk";
    
    // Hapus input hidden _method (karena Tambah pakai POST biasa)
    methodContainer.innerHTML = "";
    
    // Tampilkan Modal dengan animasi
    modal.style.display = 'flex';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-container, .modal-content');
    addAnimation(modalContent, 'animate-scale-in');
    
    // Focus first input
    focusFirstInput();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// 2. Fungsi Buka Modal EDIT
function openEditModal(button) {
    if (!validateModalElements()) {
        console.warn('Modal elements not found');
        return;
    }
    
    if (!button) {
        console.warn('Button element not provided');
        return;
    }
    
    // Ambil data dari tombol yang diklik
    const id = button.getAttribute('data-id');
    const judul = button.getAttribute('data-judul');
    const jumlah = button.getAttribute('data-jumlah');
    const tanggal = button.getAttribute('data-tanggal');
    
    // Validasi ID
    if (!id) {
        console.warn('Data ID not found');
        return;
    }
    
    // Isi form dengan data tersebut
    setValue(inputJudul, judul);
    setValue(inputJumlah, jumlah);
    setValue(inputTanggal, tanggal);
    
    // Set Action URL ke route UPDATE (Sesuaikan dengan route Laravel kamu)
    modalForm.action = "/datamasuk/update/" + id;
    
    // Set Judul Modal
    modalTitle.innerText = "Edit Data Masuk";
    
    // Tambahkan input hidden _method PUT (Karena Laravel butuh PUT untuk update)
    methodContainer.innerHTML = '<input type="hidden" name="_method" value="PUT">';
    
    // Tampilkan Modal dengan animasi
    modal.style.display = 'flex';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-container, .modal-content');
    addAnimation(modalContent, 'animate-scale-in');
    
    // Focus first input
    focusFirstInput();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// 3. Fungsi Tutup Modal
function closeModal() {
    if (!modal) return;
    
    // Add fade out animation
    const modalContent = modal.querySelector('.modal-container, .modal-content');
    
    if (modalContent) {
        addAnimation(modalContent, 'animate-fade-out');
        
        // Wait for animation then hide
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.classList.remove('animate-fade-out');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }, 200);
    } else {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ======================================= //
// ========== EVENT LISTENERS ============ //
// ======================================= //

// Tutup modal jika user klik di luar area kotak modal (overlay)
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});

// Form validation before submit
if (modalForm) {
    modalForm.addEventListener('submit', function(event) {
        // Get required fields
        const requiredFields = modalForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('input-error');
                
                // Remove error class on input
                field.addEventListener('input', function() {
                    this.classList.remove('input-error');
                }, { once: true });
            }
        });
        
        if (!isValid) {
            event.preventDefault();
            
            // Focus first error field
            const firstError = modalForm.querySelector('.input-error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
}

// ======================================= //
// ============ ANIMATIONS =============== //
// ======================================= //

// Add animation styles if not exist
if (!document.getElementById('modalAnimationStyles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modalAnimationStyles';
    styleSheet.textContent = `
        .animate-scale-in {
            animation: scaleIn 0.2s ease forwards;
        }
        
        .animate-fade-out {
            animation: fadeOut 0.2s ease forwards;
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }
        
        .input-error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}