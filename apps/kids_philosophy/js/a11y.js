// Global modal accessibility: Escape to close, focus trap, focus restore.
//
// Modals here are created imperatively and shown by setting display:flex, so
// there is no single open() to hook. A MutationObserver picks them up instead.

(function () {
    const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
    let lastFocused = null;

    function openModals() {
        return [...document.querySelectorAll('.concept-modal-overlay')]
            .filter(m => getComputedStyle(m).display !== 'none');
    }

    function topModal() {
        const open = openModals();
        return open[open.length - 1] || null;
    }

    function visibleFocusable(modal) {
        return [...modal.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
    }

    function closeModal(modal) {
        // Prefer the modal's own close button so app state stays consistent.
        const btn = modal.querySelector('.concept-modal-close');
        if (btn) btn.click(); else modal.style.display = 'none';
        if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    }

    document.addEventListener('keydown', function (e) {
        const modal = topModal();
        if (!modal) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal(modal);
            return;
        }

        if (e.key !== 'Tab') return;

        const items = visibleFocusable(modal);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (!modal.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    new MutationObserver(function () {
        openModals().forEach(function (m) {
            if (m.dataset.a11yReady) return;
            m.dataset.a11yReady = '1';

            m.setAttribute('role', 'dialog');
            m.setAttribute('aria-modal', 'true');

            const heading = m.querySelector('h1, h2, h3');
            if (heading) {
                if (!heading.id) heading.id = 'mdlh_' + Math.random().toString(36).slice(2);
                m.setAttribute('aria-labelledby', heading.id);
            }

            const close = m.querySelector('.concept-modal-close');
            if (close) {
                close.setAttribute('aria-label', 'Close');
                close.setAttribute('type', 'button');
            }

            lastFocused = document.activeElement;
            const items = visibleFocusable(m);
            (items[0] || m).focus();

            // Clicking the dark backdrop closes, like every other dialog on the web.
            m.addEventListener('click', function (ev) { if (ev.target === m) closeModal(m); });
        });

        // Re-arm once hidden so the next open re-runs setup.
        document.querySelectorAll('.concept-modal-overlay').forEach(function (m) {
            if (getComputedStyle(m).display === 'none') delete m.dataset.a11yReady;
        });
    }).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
})();
