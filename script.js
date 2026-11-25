
document.addEventListener("DOMContentLoaded", () => {

    // Tahun otomatis pada footer
    const yearSpan = document.getElementById("currentYear");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar shadow ketika halaman digulir
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

    // Tutup menu navigasi setelah link dipilih di layar kecil
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

    // Filter pendidikan dan organisasi
    const filterButtons = document.querySelectorAll(".btn-filter");
    const journeyGroups = document.querySelectorAll(".journey-group");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filterValue = button.dataset.filter || "all";

            // Atur tombol aktif
            filterButtons.forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            // Tampilkan kategori sesuai filter
            journeyGroups.forEach((group) => {

                const category = group.dataset.category;

                const visible =
                    filterValue === "all" ||
                    category === filterValue;

                group.hidden = !visible;

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
