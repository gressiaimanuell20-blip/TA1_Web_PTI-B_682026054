
document.addEventListener("DOMContentLoaded", () => {

    // 1. TAHUN OTOMATIS PADA FOOTER
    const yearSpan = document.getElementById("currentYear");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // 2. NAVBAR SHADOW KETIKA HALAMAN DIGULIR
    const navbar = document.getElementById("mainNavbar");

    const updateNavbar = () => {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    // 3. TUTUP MENU NAVIGASI SETELAH LINK DIPILIH
    const navbarCollapse = document.getElementById("navbarNav");

    document.querySelectorAll(
        ".navbar-nav .nav-link, .navbar-nav .btn"
    ).forEach((link) => {

        link.addEventListener("click", () => {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }

        });

    });


    // 4. FILTER PENDIDIKAN DAN ORGANISASI
    const filterButtons = document.querySelectorAll(".btn-filter");
    const journeyGroups = document.querySelectorAll(".journey-group");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filterValue = button.dataset.filter || "all";

            // Mengatur tombol aktif
            filterButtons.forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            // Menampilkan kategori sesuai filter
            journeyGroups.forEach((group) => {

                const category = group.dataset.category;

                const visible =
                    filterValue === "all" ||
                    category === filterValue;

                group.hidden = !visible;

                // Mengatur ukuran kolom Bootstrap
                group.classList.remove(
                    "col-lg-5",
                    "col-lg-7",
                    "col-12"
                );

                if (filterValue === "all") {

                    group.classList.add(
                        category === "pendidikan"
                            ? "col-lg-5"
                            : "col-lg-7"
                    );

                } else if (visible) {

                    group.classList.add("col-12");

                }

            });

        });

    });

});
